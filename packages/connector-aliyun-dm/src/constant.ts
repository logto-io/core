import { ConnectorType, ConnectorMetadata } from '@logto/connector-types';

/**
 * @doc https://help.aliyun.com/document_detail/29444.html
 */
export interface SingleSendMail {
  AccountName: string;
  AddressType: '0' | '1';
  ClickTrace?: '0' | '1';
  FromAlias?: string;
  HtmlBody?: string;
  ReplyToAddress: 'true' | 'false';
  Subject: string;
  TagName?: string;
  TextBody?: string;
  ToAddress: string;
}

export const endpoint = 'https://dm.aliyuncs.com/';

export const staticConfigs = {
  Format: 'json',
  SignatureMethod: 'HMAC-SHA1',
  SignatureVersion: '1.0',
  Version: '2015-11-23',
};

export const defaultMetadata: ConnectorMetadata = {
  id: 'aliyun-dm',
  type: ConnectorType.Email,
  name: {
    en: 'Aliyun Direct Mail',
    'zh-CN': '阿里云邮件推送',
  },
  logo: './logo.png',
  description: {
    en: 'A simple and efficient email service to help you send transactional notifications and batch email.',
    'zh-CN':
      '邮件推送（DirectMail）是款简单高效的电子邮件群发服务，构建在阿里云基础之上，帮您快速、精准地实现事务邮件、通知邮件和批量邮件的发送。',
  },
};
