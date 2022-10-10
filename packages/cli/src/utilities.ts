import { execSync } from 'child_process';
import { createWriteStream } from 'fs';
import path from 'path';

import { conditionalString, Optional } from '@silverhand/essentials';
import chalk from 'chalk';
import got, { Progress } from 'got';
import { HttpsProxyAgent } from 'hpagent';
import inquirer from 'inquirer';
import { customAlphabet } from 'nanoid';
import ora from 'ora';

export const safeExecSync = (command: string) => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch {}
};

type Log = Readonly<{
  info: typeof console.log;
  succeed: typeof console.log;
  warn: typeof console.log;
  error: (...args: Parameters<typeof console.log>) => never;
}>;

export const log: Log = Object.freeze({
  info: (...args) => {
    console.log(chalk.blue('[info]'), ...args);
  },
  succeed: (...args) => {
    log.info(chalk.green('✔'), ...args);
  },
  warn: (...args) => {
    console.warn(chalk.yellow('[warn]'), ...args);
  },
  error: (...args) => {
    console.error(chalk.red('[error]'), ...args);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  },
});

export const downloadFile = async (url: string, destination: string) => {
  const { HTTPS_PROXY, HTTP_PROXY, https_proxy, http_proxy } = process.env;
  const file = createWriteStream(destination);
  const proxy = HTTPS_PROXY ?? https_proxy ?? HTTP_PROXY ?? http_proxy;
  const stream = got.stream(url, {
    ...(proxy && { agent: { https: new HttpsProxyAgent({ proxy }) } }),
  });
  const spinner = ora({
    text: 'Connecting',
    prefixText: chalk.blue('[info]'),
  }).start();

  stream.pipe(file);

  return new Promise((resolve, reject) => {
    stream.on('downloadProgress', ({ total, percent }: Progress) => {
      if (!total) {
        return;
      }

      // eslint-disable-next-line @silverhand/fp/no-mutation
      spinner.text = `${(percent * 100).toFixed(1)}%`;
    });

    file.on('error', (error) => {
      spinner.fail();
      reject(error.message);
    });

    file.on('finish', () => {
      file.close();
      spinner.succeed();
      resolve(file);
    });
  });
};

export const getPathInModule = (moduleName: string, relativePath = '/') =>
  // https://stackoverflow.com/a/49455609/12514940
  path.join(
    // Until we migrate to ESM
    // eslint-disable-next-line unicorn/prefer-module
    path.dirname(require.resolve(`${moduleName}/package.json`)),
    relativePath
  );

export const oraPromise = async <T>(
  promise: PromiseLike<T>,
  options?: ora.Options,
  exitOnError = false
) => {
  const spinner = ora(options).start();

  try {
    const result = await promise;
    spinner.succeed();

    return result;
  } catch (error: unknown) {
    spinner.fail();

    if (exitOnError) {
      log.error(error);
    }

    throw error;
  }
};

const cliConfig = new Map<string, Optional<string>>();

export type GetCliConfig = {
  key: string;
  readableKey: string;
  comments?: string;
  defaultValue?: string;
};

export const getCliConfig = async ({ key, readableKey, comments, defaultValue }: GetCliConfig) => {
  if (cliConfig.has(key)) {
    return cliConfig.get(key);
  }

  const { [key]: value } = process.env;

  if (!value) {
    const { input } = await inquirer
      .prompt<{ input?: string }>({
        type: 'input',
        name: 'input',
        message: `Enter your ${readableKey}${conditionalString(comments && ' ' + comments)}`,
        default: defaultValue,
      })
      .catch(async (error) => {
        if (error.isTtyError) {
          log.error(`No ${readableKey} (${chalk.green(key)}) configured in env`);
        }

        // The type definition does not give us type except `any`, throw it directly will honor the original behavior.
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error;
      });

    cliConfig.set(key, input);

    return input;
  }

  cliConfig.set(key, value);

  return value;
};

// TODO: Move to `@silverhand/essentials`
// Intended
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const deduplicate = <T>(array: T[]) => [...new Set(array)];

export const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const buildIdGenerator = (size: number) => customAlphabet(alphabet, size);

export const buildApplicationSecret = buildIdGenerator(21);
