import { GetConnectorConfig } from '@logto/connector-types';
import { jwtVerify } from 'jose';

import AppleConnector from '.';
import { authorizationEndpoint } from './constant';
import { mockedConfig } from './mock';
import { AppleConfig } from './types';

const getConnectorConfig = jest.fn() as GetConnectorConfig<AppleConfig>;

const appleMethods = new AppleConnector(getConnectorConfig);

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
  createRemoteJWKSet: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(appleMethods, 'getConfig').mockResolvedValue(mockedConfig);
});

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by redirectUri and state', async () => {
    const authorizationUri = await appleMethods.getAuthorizationUri({
      state: 'some_state',
      redirectUri: 'http://localhost:3000/callback',
    });
    expect(authorizationUri).toEqual(
      `${authorizationEndpoint}?client_id=%3Cclient-id%3E&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=&state=some_state&response_type=code+id_token&response_mode=fragment`
    );
  });
});

describe('validateConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass on valid config', async () => {
    await expect(appleMethods.validateConfig({ clientId: 'clientId' })).resolves.not.toThrow();
  });

  it('should throw on empty config', async () => {
    await expect(appleMethods.validateConfig({})).rejects.toThrowError();
  });
});

describe('getUserInfo', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get user id from id token payload', async () => {
    const userId = 'userId';
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => ({ payload: { sub: userId } }));
    const userInfo = await appleMethods.getUserInfo({ id_token: 'idToken' });
    expect(userInfo).toEqual({ id: userId });
  });

  it('should throw if id token is missing', async () => {
    await expect(appleMethods.getUserInfo({})).rejects.toThrowError();
  });

  it('should throw if verify id token failed', async () => {
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => {
      throw new Error('jwtVerify failed');
    });
    await expect(appleMethods.getUserInfo({ idToken: 'idToken' })).rejects.toThrowError();
  });

  it('should throw if the id token payload does not contains sub', async () => {
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => ({
      payload: { iat: 123_456 },
    }));
    await expect(appleMethods.getUserInfo({ idToken: 'idToken' })).rejects.toThrowError();
  });
});
