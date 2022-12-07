import type { Config } from '@silverhand/jest-config';
import { merge } from '@silverhand/jest-config';

const config: Config.InitialOptions = {
  ...merge({
    setupFilesAfterEnv: ['./jest.setup.ts'],
    roots: ['./src'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '^(chalk|inquirer|ora)$': '<rootDir>/../shared/src/utils/module-proxy.ts',
    },
  }),
  // Will update common config soon
  transformIgnorePatterns: ['node_modules/(?!(.*(nanoid|jose|ky|@logto))/)'],
};

export default config;
