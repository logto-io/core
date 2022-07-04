import { ConnectorType, ConnectorMetadata } from '@logto/connector-types';

export const endpoint = 'https://api.twilio.com/2010-04-01/Accounts/{{accountSID}}/Messages.json';

export const defaultMetadata: ConnectorMetadata = {
  id: 'twilio-short-message-service',
  target: 'twilio-sms',
  type: ConnectorType.SMS,
  platform: null,
  name: {
    en: 'Twilio SMS Service',
    'zh-CN': 'Twilio 短信服务',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Twilio provides programmable communication tools for phone calls and text messages using its web service APIs.',
    'zh-CN': 'Twilio 是一个提供面向消费者的可编程通讯服务的平台。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
