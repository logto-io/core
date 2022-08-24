import { ConnectorError, ConnectorErrorCodes, validateConfig } from '@logto/connector-core';
import nock from 'nock';

import createConnector, { getAccessToken } from '.';
import { alipayEndpoint, authorizationEndpoint } from './constant';
import { mockedAlipayConfigWithValidPrivateKey } from './mock';
import { AlipayConfig, alipayConfigGuard } from './types';

const getConfig = jest.fn().mockResolvedValue(mockedAlipayConfigWithValidPrivateKey);

function validator(config: unknown): asserts config is AlipayConfig {
  validateConfig<AlipayConfig>(config, alipayConfigGuard);
}

describe('validateConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Assertion functions always need explicit annotations.
   * See https://github.com/microsoft/TypeScript/issues/36931#issuecomment-589753014
   */

  it('should pass on valid config', async () => {
    expect(() => {
      validator({
        appId: 'appId',
        privateKey: 'privateKey',
        signType: 'RSA',
      });
    }).not.toThrow();
  });

  it('should fail on empty config', async () => {
    expect(() => {
      validator({});
    }).toThrow();
  });

  it('should fail when missing required properties', async () => {
    expect(() => {
      validator({ appId: 'appId' });
    }).toThrow();
  });
});

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by redirectUri and state', async () => {
    const connector = await createConnector({ getConfig });
    const authorizationUri = await connector.getAuthorizationUri({
      state: 'some_state',
      redirectUri: 'http://localhost:3001/callback',
    });
    expect(authorizationUri).toEqual(
      `${authorizationEndpoint}?app_id=2021000000000000&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&scope=auth_user&state=some_state`
    );
  });
});

describe('getAccessToken', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const alipayEndpointUrl = new URL(alipayEndpoint);

  it('should get an accessToken by exchanging with code', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_system_oauth_token_response: {
          user_id: '2088000000000000',
          access_token: 'access_token',
          expires_in: 3600,
          refresh_token: 'refresh_token',
          re_expires_in: 7200, // Expiration timeout of refresh token, in seconds
        },
        sign: '<signature>',
      });
    const response = await getAccessToken('code', mockedAlipayConfigWithValidPrivateKey);
    const { accessToken } = response;
    expect(accessToken).toEqual('access_token');
  });

  it('should throw when accessToken is empty', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_system_oauth_token_response: {
          user_id: '2088000000000000',
          access_token: '',
          expires_in: 3600,
          refresh_token: 'refresh_token',
          re_expires_in: 7200, // Expiration timeout of refresh token, in seconds
        },
        sign: '<signature>',
      });

    await expect(
      getAccessToken('code', mockedAlipayConfigWithValidPrivateKey)
    ).rejects.toMatchError(new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid));
  });

  it('should fail with wrong code', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        error_response: {
          code: '20001',
          msg: 'Invalid code',
          sub_code: 'isv.code-invalid	',
        },
        sign: '<signature>',
      });

    await expect(
      getAccessToken('wrong_code', mockedAlipayConfigWithValidPrivateKey)
    ).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, 'Invalid code')
    );
  });
});

describe('getUserInfo', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .once()
      .reply(200, {
        alipay_system_oauth_token_response: {
          user_id: '2088000000000000',
          access_token: 'access_token',
          expires_in: 3600,
          refresh_token: 'refresh_token',
          re_expires_in: 7200, // Expiration timeout of refresh token, in seconds
        },
        sign: '<signature>',
      });
  });

  const alipayEndpointUrl = new URL(alipayEndpoint);

  it('should get userInfo with accessToken', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_user_info_share_response: {
          code: '10000',
          msg: 'Success',
          user_id: '2088000000000000',
          nick_name: 'PlayboyEric',
          avatar: 'https://www.alipay.com/xxx.jpg',
        },
        sign: '<signature>',
      });
    const connector = await createConnector({ getConfig });
    const { id, name, avatar } = await connector.getUserInfo({ auth_code: 'code' });
    expect(id).toEqual('2088000000000000');
    expect(name).toEqual('PlayboyEric');
    expect(avatar).toEqual('https://www.alipay.com/xxx.jpg');
  });

  it('throw General error if auth_code not provided in input', async () => {
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({})).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.InvalidResponse, '{}')
    );
  });

  it('should throw SocialAccessTokenInvalid with code 20001', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_user_info_share_response: {
          code: '20001',
          msg: 'Invalid auth token',
          sub_code: 'aop.invalid-auth-token',
          sub_msg: '无效的访问令牌',
        },
        sign: '<signature>',
      });
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid, 'Invalid auth token')
    );
  });

  it('should throw SocialAuthCodeInvalid with sub_code `isv.code-invalid`', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_user_info_share_response: {
          code: '40002',
          msg: 'Invalid auth code',
          sub_code: 'isv.code-invalid',
          sub_msg: '授权码 (auth_code) 错误、状态不对或过期',
        },
        sign: '<signature>',
      });
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, 'Invalid auth code')
    );
  });

  it('should throw General error with other response error codes', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_user_info_share_response: {
          code: '40002',
          msg: 'Invalid parameter',
          sub_code: 'isv.invalid-parameter',
          sub_msg: '参数无效',
        },
        sign: '<signature>',
      });
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, {
        errorDescription: 'Invalid parameter',
        code: '40002',
        sub_code: 'isv.invalid-parameter',
        sub_msg: '参数无效',
      })
    );
  });

  it('should throw with right accessToken but empty userInfo', async () => {
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(true)
      .reply(200, {
        alipay_user_info_share_response: {
          code: '10000',
          msg: 'Success',
          user_id: undefined,
          nick_name: 'PlayboyEric',
          avatar: 'https://www.alipay.com/xxx.jpg',
        },
        sign: '<signature>',
      });
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ auth_code: 'code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.InvalidResponse)
    );
  });

  it('should throw with other request errors', async () => {
    nock(alipayEndpointUrl.origin).post(alipayEndpointUrl.pathname).query(true).reply(500);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ auth_code: 'code' })).rejects.toThrow();
  });
});
