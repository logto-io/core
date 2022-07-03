import { assertEnv, conditional, getEnv, Optional } from '@silverhand/essentials';
import inquirer from 'inquirer';
import { createPool } from 'slonik';
import { createInterceptors } from 'slonik-interceptor-preset';
import { z } from 'zod';

import { createDatabase, createDatabaseCli, replaceDsnDatabase } from '@/database/seed';

import { appendDotEnv } from './dot-env';
import { allYes, noInquiry } from './parameters';

const defaultDatabaseUrl = getEnv('DB_URL_DEFAULT', 'postgres://@localhost:5432');
const defaultDatabaseName = 'logto';

const createDatabaseIfNotExists = async (dsn: string): Promise<[string, boolean]> => {
  try {
    return [await createDatabase(dsn, defaultDatabaseName), true];
  } catch (error: unknown) {
    const result = z.object({ code: z.string() }).safeParse(error);

    // https://www.postgresql.org/docs/12/errcodes-appendix.html
    // Database already exists
    if (result.success && result.data.code === '42P04') {
      if (allYes) {
        return [replaceDsnDatabase(dsn, defaultDatabaseName), false];
      }

      const useCurrent = await inquirer.prompt({
        type: 'confirm',
        name: 'value',
        message: `A database named "${defaultDatabaseName}" already exists. Would you like to use it without seeding?`,
      });

      if (useCurrent.value) {
        return [replaceDsnDatabase(dsn, defaultDatabaseName), false];
      }
    }

    throw error;
  }
};

const inquireForLogtoDsn = async (key: string): Promise<[Optional<string>, boolean]> => {
  if (allYes) {
    return createDatabaseIfNotExists(defaultDatabaseUrl);
  }

  const setUp = await inquirer.prompt({
    type: 'confirm',
    name: 'value',
    message: `No Postgres DSN (${key}) found in env variables. Would you like to set up a new Logto database?`,
  });

  if (!setUp.value) {
    const dsn = await inquirer.prompt({
      name: 'value',
      default: new URL(defaultDatabaseName, defaultDatabaseUrl).href,
      message: 'Please input the DSN which points to an existing Logto database:',
    });

    return [conditional<string>(dsn.value && String(dsn.value)), false];
  }

  const dsnAnswer = await inquirer.prompt({
    name: 'value',
    default: new URL(defaultDatabaseUrl).href,
    message: `Please input the DSN _WITHOUT_ database name:`,
  });
  const dsn = conditional<string>(dsnAnswer.value && String(dsnAnswer.value));

  if (!dsn) {
    return [dsn, false];
  }

  return createDatabaseIfNotExists(dsn);
};

const createPoolByEnv = async (isTest: boolean, demoAppUrl: string) => {
  // Database connection is disabled in unit test environment
  if (isTest) {
    return;
  }

  const key = 'DB_URL';
  const interceptors = [...createInterceptors()];

  try {
    const databaseDsn = assertEnv(key);

    return createPool(databaseDsn, { interceptors });
  } catch (error: unknown) {
    if (noInquiry) {
      throw error;
    }

    const [dsn, needsSeed] = await inquireForLogtoDsn(key);

    if (!dsn) {
      throw error;
    }

    const cli = createDatabaseCli(dsn, demoAppUrl);

    if (needsSeed) {
      await cli.createTables();
      await cli.seedTables();
    }

    appendDotEnv(key, dsn);

    return cli.pool;
  }
};

export default createPoolByEnv;
