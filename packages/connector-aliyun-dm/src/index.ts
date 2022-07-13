import {
  ConnectorError,
  ConnectorErrorCodes,
  ConnectorMetadata,
  EmailSendMessageFunction,
  ValidateConfig,
  EmailConnector,
  GetConnectorConfig,
} from '@logto/connector-types';
import { assert } from '@silverhand/essentials';
import { HTTPError } from 'got';
import { ZodError } from 'zod';

import { defaultMetadata } from './constant';
import { singleSendMail } from './single-send-mail';
import {
  AliyunDmConfig,
  aliyunDmConfigGuard,
  sendEmailResponseGuard,
  sendMailErrorResponseGuard,
} from './types';

export default class AliyunDmConnector implements EmailConnector {
  public metadata: ConnectorMetadata = defaultMetadata;
  private _configZodError: ZodError = new ZodError([]);

  private get configZodError() {
    return this._configZodError;
  }

  private set configZodError(zodError: ZodError) {
    this._configZodError = zodError;
  }

  constructor(public readonly getConfig: GetConnectorConfig) {}

  public validateConfig: ValidateConfig<AliyunDmConfig> = (
    config: unknown
  ): config is AliyunDmConfig => {
    const result = aliyunDmConfigGuard.safeParse(config);

    if (!result.success) {
      this.configZodError = result.error;
    }

    return result.success;
  };

  // eslint-disable-next-line complexity
  public sendMessage: EmailSendMessageFunction = async (address, type, data, config) => {
    const emailConfig = config ?? (await this.getConfig(this.metadata.id));

    if (!this.validateConfig(emailConfig)) {
      throw new ConnectorError(ConnectorErrorCodes.InvalidConfig, this.configZodError);
    }

    const { accessKeyId, accessKeySecret, accountName, fromAlias, templates } = emailConfig;
    const template = templates.find((template) => template.usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Cannot find template for type: ${type}`
      )
    );

    try {
      const httpResponse = await singleSendMail(
        {
          AccessKeyId: accessKeyId,
          AccountName: accountName,
          ReplyToAddress: 'false',
          AddressType: '1',
          ToAddress: address,
          FromAlias: fromAlias,
          Subject: template.subject,
          HtmlBody:
            typeof data.code === 'string'
              ? template.content.replace(/{{code}}/g, data.code)
              : template.content,
        },
        accessKeySecret
      );

      const result = sendEmailResponseGuard.safeParse(JSON.parse(httpResponse.body));

      if (!result.success) {
        throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error.message);
      }

      return result.data;
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const {
          response: { body: rawBody },
        } = error;

        assert(
          typeof rawBody === 'string',
          new ConnectorError(ConnectorErrorCodes.InvalidResponse)
        );

        this.errorHandler(rawBody);
      }

      throw error;
    }
  };

  private readonly errorHandler = (errorResponseBody: string) => {
    const result = sendMailErrorResponseGuard.safeParse(JSON.parse(errorResponseBody));

    if (!result.success) {
      throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error.message);
    }

    const { Message: errorDescription, ...rest } = result.data;

    throw new ConnectorError(ConnectorErrorCodes.General, { errorDescription, ...rest });
  };
}
