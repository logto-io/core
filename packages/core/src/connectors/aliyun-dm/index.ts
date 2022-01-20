import { ConnectorType } from '@logto/schemas';
import { z } from 'zod';

import {
  ConnectorConfigError,
  ConnectorError,
  ConnectorMetadata,
  EmailSendMessageFunction,
  ValidateConfig,
} from '../types';
import { getConnectorConfig } from '../utilities';
import { singleSendMail } from './single-send-mail';

export const metadata: ConnectorMetadata = {
  id: 'aliyun-dm',
  type: ConnectorType.Email,
  name: {
    en: 'Aliyun Direct Mail',
    zh_CN: '阿里云邮件推送',
  },
  logo: './logo.png',
  description: {
    en: 'A simple and efficient email service to help you send transactional notifications and batch email.',
    zh_CN:
      '邮件推送（DirectMail）是款简单高效的电子邮件群发服务，构建在阿里云基础之上，帮您快速、精准地实现事务邮件、通知邮件和批量邮件的发送。',
  },
};

export const validateConfig: ValidateConfig = async (config: unknown) => {
  if (!config) {
    throw new ConnectorConfigError('Missing config');
  }

  const result = configGuard.safeParse(config);
  if (!result.success) {
    throw new ConnectorConfigError(result.error.message);
  }
};

const configGuard = z.object({
  accessKeyId: z.string(),
  accessKeySecret: z.string(),
  accountName: z.string(),
  fromAlias: z.string().optional(),
  templates: z.array(
    z.object({
      type: z.string(),
      subject: z.string(),
      content: z.string(), // With variable {{code}}, support HTML
    })
  ),
});

export type AliyunDmConfig = z.infer<typeof configGuard>;

export const sendMessage: EmailSendMessageFunction = async (address, type, data) => {
  const config: AliyunDmConfig = await getConnectorConfig<AliyunDmConfig>(
    metadata.id,
    metadata.type
  );
  const template = config.templates.find((template) => template.type === type);

  if (!template) {
    throw new ConnectorError(`Can not find template for type: ${type}`);
  }

  return singleSendMail(
    {
      AccessKeyId: config.accessKeyId,
      AccountName: config.accountName,
      ReplyToAddress: 'false',
      AddressType: '1',
      ToAddress: address,
      FromAlias: config.fromAlias,
      Subject: template.subject,
      HtmlBody:
        typeof data.code === 'string'
          ? template.content.replaceAll('{{code}}', data.code)
          : template.content,
    },
    config.accessKeySecret
  );
};
