import {
  assertEnv,
  conditional,
  conditionalString,
  getEnv,
  Optional,
} from '@silverhand/essentials';
import inquirer from 'inquirer';
import { createPool } from 'slonik';
import { createInterceptors } from 'slonik-interceptor-preset';

import { createDatabase, createDatabaseCli } from '@/database/seed';

import { appendDotEnv } from './dot-env';
import { allYes, noInquiry } from './parameters';

const defaultDatabaseUrl = getEnv('DB_URL_DEFAULT', 'postgres://@localhost:5432');
const defaultDatabaseName = 'logto';

const inquireForLogtoDsn = async (key: string): Promise<[Optional<string>, boolean]> => {
  if (allYes) {
    return [await createDatabase(defaultDatabaseUrl, defaultDatabaseName), true];
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

  const hasEmptyDatabase = await inquirer.prompt({
    type: 'confirm',
    name: 'value',
    default: false,
    message: 'Do you have an empty database for Logto?',
  });

  const dsnAnswer = await inquirer.prompt({
    name: 'value',
    default: new URL(hasEmptyDatabase.value ? defaultDatabaseName : '', defaultDatabaseUrl).href,
    message: `Please input the DSN _WITH${conditionalString(
      !hasEmptyDatabase.value && 'OUT'
    )}_ database name:`,
  });
  const dsn = conditional<string>(dsnAnswer.value && String(dsnAnswer.value));

  if (!dsn) {
    return [dsn, false];
  }

  if (!hasEmptyDatabase.value) {
    return [await createDatabase(dsn, defaultDatabaseName), true];
  }

  return [dsn, true];
};

const createPoolByEnv = async (isTest: boolean) => {
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

    const cli = createDatabaseCli(dsn);

    if (needsSeed) {
      await cli.createTables();
      await cli.seedTables();
    }

    appendDotEnv(key, dsn);

    return cli.pool;
  }
};

export default createPoolByEnv;
