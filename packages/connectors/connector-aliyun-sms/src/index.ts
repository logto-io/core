import { assert } from '@silverhand/essentials';
import { HTTPError } from 'got';

import type {
  GetConnectorConfig,
  SendMessageFunction,
  SmsConnector,
  CreateConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
  parseJson,
} from '@logto/connector-kit';

import { defaultMetadata } from './constant.js';
import { sendSms } from './single-send-text.js';
import type { Template } from './types.js';
import { aliyunSmsConfigGuard, sendSmsResponseGuard } from './types.js';

// When `isStrictOnRegionNumber` is true, it means the mobile phone number area code needs to be strictly matched; the default is false, for backward compatibility, as some old phone numbers do not have region codes, which would cause the method to make mistakes on validation.
export const isChinaNumber = (to: string, isStrictOnRegionNumber?: boolean) => {
  if (isStrictOnRegionNumber) {
    return /^(\+86|0086|86)\d{11}$/.test(to);
  }

  return /^(\+86|0086|86)?\d{11}$/.test(to);
};

const getTemplateCode = (
  { templateCode }: Template,
  to: string,
  strictPhoneRegionNumberCheck?: boolean
) => {
  if (typeof templateCode === 'string') {
    return templateCode;
  }

  return isChinaNumber(to, strictPhoneRegionNumberCheck)
    ? templateCode.china
    : templateCode.overseas;
};

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig(config, aliyunSmsConfigGuard);
    const { accessKeyId, accessKeySecret, signName, templates, strictPhoneRegionNumberCheck } =
      config;
    const template = templates.find(({ usageType }) => usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Cannot find template for type: ${type}`
      )
    );

    try {
      const httpResponse = await sendSms(
        {
          AccessKeyId: accessKeyId,
          PhoneNumbers: to,
          SignName: signName,
          TemplateCode: getTemplateCode(template, to, strictPhoneRegionNumberCheck),
          TemplateParam: JSON.stringify(payload),
        },
        accessKeySecret
      );

      const { Code, Message, ...rest } = parseResponseString(httpResponse.body);

      assert(
        Code === 'OK',
        new ConnectorError(
          /**
           * See https://help.aliyun.com/document_detail/101347.html for more details.
           * Some errors (like rate limit) can be addressed by end users.
           */
          Code === 'isv.BUSINESS_LIMIT_CONTROL'
            ? ConnectorErrorCodes.RateLimitExceeded
            : ConnectorErrorCodes.General,
          {
            errorDescription: Message,
            Code,
            ...rest,
          }
        )
      );

      return { Code, Message, ...rest };
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const {
          response: { body: rawBody },
        } = error;

        assert(
          typeof rawBody === 'string',
          new ConnectorError(
            ConnectorErrorCodes.InvalidResponse,
            `Invalid response raw body type: ${typeof rawBody}`
          )
        );

        const { Message, ...rest } = parseResponseString(rawBody);
        throw new ConnectorError(ConnectorErrorCodes.General, {
          errorDescription: Message,
          ...rest,
        });
      }

      throw error;
    }
  };

const parseResponseString = (response: string) => {
  const result = sendSmsResponseGuard.safeParse(parseJson(response));

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error);
  }

  return result.data;
};

const createAliyunSmsConnector: CreateConnector<SmsConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Sms,
    configGuard: aliyunSmsConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createAliyunSmsConnector;
