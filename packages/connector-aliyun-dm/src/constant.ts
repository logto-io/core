import { ConnectorType, ConnectorMetadata } from '@logto/connector-types';

export const endpoint = 'https://dm.aliyuncs.com/';

export const staticConfigs = {
  Format: 'json',
  SignatureMethod: 'HMAC-SHA1',
  SignatureVersion: '1.0',
  Version: '2015-11-23',
};

export const defaultMetadata: ConnectorMetadata = {
  id: 'aliyun-direct-mail',
  target: 'aliyun-dm',
  type: ConnectorType.Email,
  platform: null,
  name: {
    en: 'Aliyun Direct Mail',
    'zh-CN': '阿里云邮件推送',
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
