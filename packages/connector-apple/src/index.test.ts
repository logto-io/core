import { GetConnectorConfig } from '@logto/connector-types';

import AppleConnector from '.';
import { authorizationEndpoint } from './constant';
import { mockedConfig } from './mock';
import { AppleConfig } from './types';

const getConnectorConfig = jest.fn() as GetConnectorConfig<AppleConfig>;

const appleMethods = new AppleConnector(getConnectorConfig);

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
  // LOG-2726
});
