import { GetConnectorConfig } from '@logto/connector-types';

import { TwilioSmsConnector } from '.';
import { mockedConfig } from './mock';
import { TwilioSmsConfig } from './types';

const getConnectorConfig = jest.fn() as GetConnectorConfig<TwilioSmsConfig>;

const twilioSmsMethods = new TwilioSmsConnector(getConnectorConfig);

describe('validateConfig()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass on valid config', async () => {
    await expect(twilioSmsMethods.validateConfig(mockedConfig)).resolves.not.toThrow();
  });

  it('throws if config is invalid', async () => {
    await expect(twilioSmsMethods.validateConfig({})).rejects.toThrow();
  });
});
