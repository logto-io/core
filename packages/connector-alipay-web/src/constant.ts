import { ConnectorType, ConnectorMetadata, ConnectorPlatform } from '@logto/connector-types';

export const authorizationEndpoint = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm';
export const alipayEndpoint = 'https://openapi.alipay.com/gateway.do';
export const scope = 'auth_user';
export const methodForAccessToken = 'alipay.system.oauth.token';
export const methodForUserInfo = 'alipay.user.info.share';

export const alipaySigningAlgorithmMapping = {
  RSA: 'RSA-SHA1',
  RSA2: 'RSA-SHA256',
} as const;
export const alipaySigningAlgorithms = ['RSA', 'RSA2'] as const;
export const charsetEnum = ['GBK', 'UTF8'] as const;
export const fallbackCharset = 'UTF8';

export const invalidAccessTokenCode = ['20001'];

export const invalidAccessTokenSubCode = ['isv.code-invalid'];

export const defaultMetadata: ConnectorMetadata = {
  id: 'alipay-web',
  target: 'alipay',
  type: ConnectorType.Social,
  platform: ConnectorPlatform.Web,
  name: {
    en: 'Alipay',
    'zh-CN': '支付宝',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Alipay is a third-party mobile and online payment platform.',
    'zh-CN': '支付宝是一个第三方支付平台。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};

export const defaultTimeout = 5000;

export const timestampFormat = 'YYYY-MM-DD HH:mm:ss';
