import { ConnectorMetadata, ConnectorType } from '@logto/connector-types';

export const endpoint = 'https://dysmsapi.aliyuncs.com/';

export const staticConfigs = {
  Format: 'json',
  RegionId: 'cn-hangzhou',
  SignatureMethod: 'HMAC-SHA1',
  SignatureVersion: '1.0',
  Version: '2017-05-25',
};

/**
 * Details of SmsTemplateType can be found at:
 * https://next.api.aliyun.com/document/Dysmsapi/2017-05-25/QuerySmsTemplateList.
 *
 * For our use case is to send passcode sms for passwordless sign-in/up as well as
 * reset password, the default value of type code is set to be 2.
 */
export enum SmsTemplateType {
  Notification = 0,
  Promotion = 1,
  Passcode = 2,
  InternationalMessage = 6,
  PureNumber = 7,
}

export const defaultMetadata: ConnectorMetadata = {
  id: 'aliyun-short-message-service',
  target: 'aliyun-sms',
  type: ConnectorType.SMS,
  platform: null,
  name: {
    en: 'Aliyun Short Message Service',
    'zh-CN': '阿里云短信服务',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: "Aliyun provides cloud computing services to online businesses and Alibaba's e-commerce ecosystem.",
    'zh-CN': '阿里云是全球性的云服务提供商。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
