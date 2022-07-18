import { ConnectorType, ConnectorMetadata } from '@logto/connector-types';

export const defaultMetadata: ConnectorMetadata = {
  id: 'simple-mail-transfer-protocol',
  target: 'smtp',
  type: ConnectorType.Email,
  platform: null,
  name: {
    en: 'SMTP',
    'zh-CN': 'SMTP',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'The SMTP is an internet standard communication protocol for electronic mail transmission.',
    'zh-CN': 'SMTP 是简单邮件通讯协议的缩写，可对接所有邮件服务提供商。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
