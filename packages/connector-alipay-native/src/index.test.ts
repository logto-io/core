import { ConnectorError, ConnectorErrorCodes, GetConnectorConfig } from '@logto/connector-types';
import nock from 'nock';

import AlipayNativeConnector from '.';
import { alipayEndpoint } from './constant';
import { mockedAlipayNativeConfig, mockedAlipayNativeConfigWithValidPrivateKey } from './mock';
import { AlipayNativeConfig } from './types';

const getConnectorConfig = jest.fn() as GetConnectorConfig<AlipayNativeConfig>;

const alipayNativeMethods = new AlipayNativeConnector(getConnectorConfig);

describe('validateConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass on valid config', async () => {
    await expect(
      alipayNativeMethods.validateConfig(mockedAlipayNativeConfig)
    ).resolves.not.toThrow();
  });

  it('should throw on empty config', async () => {
    await expect(alipayNativeMethods.validateConfig({})).rejects.toThrowError();
  });

  it('should throw when missing required properties', async () => {
    await expect(alipayNativeMethods.validateConfig({ appId: 'appId' })).rejects.toThrowError();
  });
});

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by state', async () => {
    jest
      .spyOn(alipayNativeMethods, 'getConfig')
      .mockResolvedValueOnce(mockedAlipayNativeConfigWithValidPrivateKey);
    const authorizationUri = await alipayNativeMethods.getAuthorizationUri({
      state: 'dummy-state',
      redirectUri: 'dummy-redirect-uri',
    });
    expect(authorizationUri).toBe('alipay://?app_id=2021000000000000&state=dummy-state');
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
          re_expires_in: 7200, // Expiring time of refresh token, in seconds
        },
        sign: '<signature>',
      });

    const response = await alipayNativeMethods.getAccessToken(
      'code',
      mockedAlipayNativeConfigWithValidPrivateKey
    );
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
          re_expires_in: 7200, // Expiring time of refresh token, in seconds
        },
        sign: '<signature>',
      });

    await expect(
      alipayNativeMethods.getAccessToken('code', mockedAlipayNativeConfigWithValidPrivateKey)
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
      alipayNativeMethods.getAccessToken('wrong_code', mockedAlipayNativeConfigWithValidPrivateKey)
    ).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, 'Invalid code')
    );
  });
});

describe('getUserInfo', () => {
  beforeEach(() => {
    jest
      .spyOn(alipayNativeMethods, 'getConfig')
      .mockResolvedValue(mockedAlipayNativeConfigWithValidPrivateKey);
    jest
      .spyOn(alipayNativeMethods, 'getAccessToken')
      .mockResolvedValue({ accessToken: 'access_token' });
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
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

    const { id, name, avatar } = await alipayNativeMethods.getUserInfo({ auth_code: 'code' });
    expect(id).toEqual('2088000000000000');
    expect(name).toEqual('PlayboyEric');
    expect(avatar).toEqual('https://www.alipay.com/xxx.jpg');
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

    await expect(alipayNativeMethods.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid, '无效的访问令牌')
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

    await expect(alipayNativeMethods.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(
        ConnectorErrorCodes.SocialAuthCodeInvalid,
        '授权码 (auth_code) 错误、状态不对或过期'
      )
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

    await expect(alipayNativeMethods.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, '参数无效')
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

    await expect(alipayNativeMethods.getUserInfo({ auth_code: 'wrong_code' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.InvalidResponse)
    );
  });

  it('should throw with other request errors', async () => {
    nock(alipayEndpointUrl.origin).post(alipayEndpointUrl.pathname).query(true).reply(500);

    await expect(alipayNativeMethods.getUserInfo({ auth_code: 'wrong_code' })).rejects.toThrow();
  });
});
