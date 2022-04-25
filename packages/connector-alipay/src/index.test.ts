import { ConnectorError, ConnectorErrorCodes, GetConnectorConfig } from '@logto/connector-types';
import nock from 'nock';
import snakeCaseKeys from 'snakecase-keys';

import { AlipayConnector } from '.';
import {
  alipayEndpoint,
  authorizationEndpoint,
  methodForAccessToken,
  methodForUserInfo,
} from './constant';
import {
  mockedAlipayConfig,
  mockedAlipayConfigWithValidPrivateKey,
  mockedAlipayPublicParameters,
  mockedTimestamp,
} from './mock';
import { AlipayConfig } from './types';

const getConnectorConfig = jest.fn() as GetConnectorConfig<AlipayConfig>;

const alipayMethods = new AlipayConnector(getConnectorConfig);

beforeAll(() => {
  jest.spyOn(alipayMethods, 'getConfig').mockResolvedValue(mockedAlipayConfig);
  jest.spyOn(alipayMethods, 'getTimestamp').mockReturnValue(mockedTimestamp);
});

const listenJSONParse = jest.spyOn(JSON, 'parse');
const listenJSONStringify = jest.spyOn(JSON, 'stringify');

const mockedSigningParameters = jest.spyOn(alipayMethods, 'signingPamameters');

describe('validateConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass on valid config', async () => {
    await expect(
      alipayMethods.validateConfig({ appId: 'appId', privateKey: 'privateKey', signType: 'RSA' })
    ).resolves.not.toThrow();
  });

  it('should throw on empty config', async () => {
    await expect(alipayMethods.validateConfig({})).rejects.toThrowError();
  });

  it('should throw when missing required properties', async () => {
    await expect(alipayMethods.validateConfig({ appId: 'appId' })).rejects.toThrowError();
  });
});

describe('signingParameters', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const testingParameters = {
    ...mockedAlipayPublicParameters,
    ...mockedAlipayConfigWithValidPrivateKey,
    method: methodForAccessToken,
    code: '7ffeb112fbb6495c9e7dfb720380DD39',
  };

  it('should return exact signature with the given parameters (functionality check)', () => {
    const decamelizedParameters = alipayMethods.signingPamameters(testingParameters);
    expect(decamelizedParameters.sign).toBe(
      'td9+u0puul3HgbwLGL1X6z/vKKB/K25K5pjtLT/snQOp292RX3Y5j+FQUVuazTI2l65GpoSgA83LWNT9htQgtmdBmkCQ3bO6RWs38+2ZmBmH7MvpHx4ebUDhtebLUmHNuRFaNcpAZW92b0ZSuuJuahpLK8VNBgXljq+x0aD7WCRudPxc9fikR65NGxr5bwepl/9IqgMxwtajh1+PEJyhGGJhJxS1dCktGN0EiWXWNiogYT8NlFVCmw7epByKzCBWu4sPflU52gJMFHTdbav/0Tk/ZBs8RyP8Z8kcJA0jom2iT+dHqDpgkdzEmsR360UVNKCu5X7ltIiiObsAWmfluQ=='
    );
  });

  it('should return exact signature with the given parameters (with empty property in testingParameters)', () => {
    const decamelizedParameters = alipayMethods.signingPamameters({
      ...testingParameters,
      emptyProperty: '',
    });
    expect(decamelizedParameters.sign).toBe(
      'td9+u0puul3HgbwLGL1X6z/vKKB/K25K5pjtLT/snQOp292RX3Y5j+FQUVuazTI2l65GpoSgA83LWNT9htQgtmdBmkCQ3bO6RWs38+2ZmBmH7MvpHx4ebUDhtebLUmHNuRFaNcpAZW92b0ZSuuJuahpLK8VNBgXljq+x0aD7WCRudPxc9fikR65NGxr5bwepl/9IqgMxwtajh1+PEJyhGGJhJxS1dCktGN0EiWXWNiogYT8NlFVCmw7epByKzCBWu4sPflU52gJMFHTdbav/0Tk/ZBs8RyP8Z8kcJA0jom2iT+dHqDpgkdzEmsR360UVNKCu5X7ltIiiObsAWmfluQ=='
    );
  });

  it('should not call JSON.parse() when biz_content is empty', () => {
    alipayMethods.signingPamameters(testingParameters);
    expect(listenJSONParse).not.toHaveBeenCalled();
  });

  it('should call JSON.parse() when biz_content is not empty', () => {
    alipayMethods.signingPamameters({
      ...testingParameters,
      biz_content: JSON.stringify({ AB: 'AB' }),
    });
    expect(listenJSONParse).toHaveBeenCalled();
  });

  it('should call JSON.stringify() when some value is object string', () => {
    alipayMethods.signingPamameters({
      ...testingParameters,
      testObject: JSON.stringify({ AB: 'AB' }),
    });
    expect(listenJSONStringify).toHaveBeenCalled();
  });
});

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by redirectUri and state', async () => {
    jest.spyOn(alipayMethods, 'getConfig').mockResolvedValueOnce(mockedAlipayConfig);
    const authorizationUri = await alipayMethods.getAuthorizationUri(
      'http://localhost:3001/callback',
      'some_state'
    );
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
  const parameters = {
    ...mockedAlipayPublicParameters,
    method: methodForAccessToken,
    ...mockedAlipayConfig,
    code: 'code',
    sign: 'sign',
  };
  const searchParameters = new URLSearchParams(snakeCaseKeys(parameters));

  it('should get an accessToken by exchanging with code', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(searchParameters)
      .reply(200, {
        alipay_system_oauth_token_response: {
          user_id: '2088000000000000',
          access_token: 'access_token',
          expires_in: '3600',
          refresh_token: 'refresh_token',
          re_expires_in: '7200', // Expiring time of refresh token, in seconds
        },
        sign: '<signature>',
      });

    const { accessToken } = await alipayMethods.getAccessToken('code');
    expect(accessToken).toEqual('access_token');
  });

  it('should throw when accessToken is empty', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(searchParameters)
      .reply(200, {
        alipay_system_oauth_token_response: {
          user_id: '2088000000000000',
          access_token: undefined,
          expires_in: '3600',
          refresh_token: 'refresh_token',
          re_expires_in: '7200', // Expiring time of refresh token, in seconds
        },
        sign: '<signature>',
      });

    await expect(alipayMethods.getAccessToken('code')).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid)
    );
  });

  it('should fail with wrong code', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(new URLSearchParams(snakeCaseKeys({ ...parameters, code: 'wrong_code' })))
      .reply(200, {
        error_response: {
          code: '20001',
          msg: 'Invalid code',
          sub_code: 'isv.code-invalid	',
        },
        sign: '<signature>',
      });

    await expect(alipayMethods.getAccessToken('wrong_code')).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, 'Invalid code')
    );
  });
});

describe('getUserInfo', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const alipayEndpointUrl = new URL(alipayEndpoint);
  const parameters = {
    ...mockedAlipayPublicParameters,
    method: methodForUserInfo,
    ...mockedAlipayConfig,
    auth_token: 'access_token',
    biz_content: '{}',
    sign: 'sign',
  };
  const searchParameters = new URLSearchParams(snakeCaseKeys(parameters));

  it('should get userInfo with accessToken', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(searchParameters)
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

    const { id, name, avatar } = await alipayMethods.getUserInfo({ accessToken: 'access_token' });
    expect(id).toEqual('2088000000000000');
    expect(name).toEqual('PlayboyEric');
    expect(avatar).toEqual('https://www.alipay.com/xxx.jpg');
  });

  it('should throw with wrong accessToken', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(
        new URLSearchParams(snakeCaseKeys({ ...parameters, auth_token: 'wrong_access_token' }))
      )
      .reply(200, {
        alipay_user_info_share_response: {
          code: '20001',
          msg: 'Invalid auth token',
          sub_code: 'aop.invalid-auth-token',
        },
        sign: '<signature>',
      });

    await expect(
      alipayMethods.getUserInfo({ accessToken: 'wrong_access_token' })
    ).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid, 'Invalid auth token')
    );
  });

  it('should throw General error with other response error codes', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(
        new URLSearchParams(snakeCaseKeys({ ...parameters, auth_token: 'wrong_access_token' }))
      )
      .reply(200, {
        alipay_user_info_share_response: {
          code: '40002',
          msg: 'Invalid parameter',
          sub_code: 'isv.invalid-parameter',
        },
        sign: '<signature>',
      });

    await expect(
      alipayMethods.getUserInfo({ accessToken: 'wrong_access_token' })
    ).rejects.toMatchError(new ConnectorError(ConnectorErrorCodes.General));
  });

  it('should throw with right accessToken but empty userInfo', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(searchParameters)
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

    await expect(alipayMethods.getUserInfo({ accessToken: 'access_token' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.InvalidResponse)
    );
  });

  it('should throw with other request errors', async () => {
    mockedSigningParameters.mockImplementationOnce((parameters) => {
      return snakeCaseKeys({ ...parameters, sign: 'sign' }) as Record<string, string>;
    });
    nock(alipayEndpointUrl.origin)
      .post(alipayEndpointUrl.pathname)
      .query(searchParameters)
      .reply(500);

    await expect(alipayMethods.getUserInfo({ accessToken: 'access_token' })).rejects.toThrow();
  });
});
