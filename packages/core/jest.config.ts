import type { Config } from '@silverhand/jest-config';
import { merge } from '@silverhand/jest-config';

const config: Config.InitialOptions = {
  ...merge({
    testPathIgnorePatterns: ['/core/connectors/'],
    setupFilesAfterEnv: ['jest-matcher-specific-error', './jest.setup.ts'],
    moduleNameMapper: {
      '^#src/(.*)\\.js(x)?$': '<rootDir>/src/$1',
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '^(chalk|inquirer|ora)$': '<rootDir>/../shared/src/utils/module-proxy.ts',
    },
  }),
  // Will update common config soon
  transformIgnorePatterns: ['node_modules/(?!(.*(nanoid|jose|ky|@logto|got))/)'],
};

export default config;
