import { getEnv, Optional } from '@silverhand/essentials';
import { DatabasePool } from 'slonik';

import createPoolByEnv from './create-pool-by-env';
import loadOidcValues from './oidc';

export enum MountedApps {
  Api = 'api',
  Oidc = 'oidc',
  Console = 'console',
}

const loadEnvValues = async () => {
  const isProduction = getEnv('NODE_ENV') === 'production';
  const isTest = getEnv('NODE_ENV') === 'test';
  const isHttpsEnabled = Boolean(process.env.HTTPS_CERT_PATH && process.env.HTTPS_KEY_PATH);
  const port = Number(getEnv('PORT', '3001'));
  const localhostUrl = `${isHttpsEnabled ? 'https' : 'http'}://localhost:${port}`;

  return Object.freeze({
    isTest,
    isProduction,
    isHttpsEnabled,
    httpsCert: process.env.HTTPS_CERT_PATH,
    httpsKey: process.env.HTTPS_KEY_PATH,
    port,
    localhostUrl,
    developmentUserId: getEnv('DEVELOPMENT_USER_ID'),
    trustProxyHeader: getEnv('TRUST_PROXY_HEADER') === 'true',
    oidc: await loadOidcValues(localhostUrl),
    adminConsoleUrl: getEnv('ADMIN_CONSOLE_URL', `${localhostUrl}/console`),
  });
};

const throwNotLoadedError = () => {
  throw new Error(
    'The env set is not loaded. Make sure to call `await envSet.load()` before using it.'
  );
};

/* eslint-disable @silverhand/fp/no-let, @silverhand/fp/no-mutation */
function createEnvSet() {
  let values: Optional<Awaited<ReturnType<typeof loadEnvValues>>>;
  let pool: Optional<DatabasePool>;

  return {
    get values() {
      if (!values) {
        return throwNotLoadedError();
      }

      return values;
    },
    get pool() {
      if (!pool) {
        return throwNotLoadedError();
      }

      return pool;
    },

    load: async () => {
      values = await loadEnvValues();
      pool = await createPoolByEnv(values.isTest);
    },
  };
}
/* eslint-enable @silverhand/fp/no-let, @silverhand/fp/no-mutation */

const envSet = createEnvSet();

export default envSet;
