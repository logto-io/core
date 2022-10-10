import { readdir, readFile } from 'fs/promises';
import path from 'path';

import { logtoConfigGuards, LogtoOidcConfigKey, seeds } from '@logto/schemas';
import chalk from 'chalk';
import { DatabasePool, DatabaseTransactionConnection, sql } from 'slonik';
import { raw } from 'slonik-sql-tag-raw';
import { CommandModule } from 'yargs';
import { z } from 'zod';

import { createPoolAndDatabaseIfNeeded, insertInto } from '../../../database';
import {
  getRowsByKeys,
  updateDatabaseTimestamp,
  updateValueByKey,
} from '../../../queries/logto-config';
import { buildApplicationSecret, getPathInModule, log, oraPromise } from '../../../utilities';
import { getLatestAlterationTimestamp } from '../alteration';
import { oidcConfigReaders } from './oidc-config';

const createTables = async (connection: DatabaseTransactionConnection) => {
  const tableDirectory = getPathInModule('@logto/schemas', 'tables');
  const directoryFiles = await readdir(tableDirectory);
  const tableFiles = directoryFiles.filter((file) => file.endsWith('.sql'));
  const queries = await Promise.all(
    tableFiles.map<Promise<[string, string]>>(async (file) => [
      file,
      await readFile(path.join(tableDirectory, file), 'utf8'),
    ])
  );

  // Await in loop is intended for better error handling
  for (const [, query] of queries) {
    // eslint-disable-next-line no-await-in-loop
    await connection.query(sql`${raw(query)}`);
  }
};

const seedTables = async (connection: DatabaseTransactionConnection) => {
  const {
    managementResource,
    defaultSignInExperience,
    createDefaultSetting,
    createDemoAppApplication,
    defaultRole,
  } = seeds;

  await Promise.all([
    connection.query(insertInto(managementResource, 'resources')),
    connection.query(insertInto(createDefaultSetting(), 'settings')),
    connection.query(insertInto(defaultSignInExperience, 'sign_in_experiences')),
    connection.query(
      insertInto(createDemoAppApplication(buildApplicationSecret()), 'applications')
    ),
    connection.query(insertInto(defaultRole, 'roles')),
    updateDatabaseTimestamp(connection, await getLatestAlterationTimestamp()),
  ]);
};

const seedOidcConfigs = async (pool: DatabaseTransactionConnection) => {
  const configGuard = z.object({
    key: z.nativeEnum(LogtoOidcConfigKey),
    value: z.unknown(),
  });
  const { rows } = await getRowsByKeys(pool, Object.values(LogtoOidcConfigKey));
  // Filter out valid keys that hold a valid value
  const result = await Promise.all(
    rows.map<Promise<LogtoOidcConfigKey | undefined>>(async (row) => {
      try {
        const { key, value } = await configGuard.parseAsync(row);
        await logtoConfigGuards[key].parseAsync(value);

        return key;
      } catch {}
    })
  );
  const existingKeys = new Set(result.filter(Boolean));

  const validOptions = Object.values(LogtoOidcConfigKey).filter((key) => {
    const included = existingKeys.has(key);

    if (included) {
      log.info(`Key ${chalk.green(key)} exists, skipping`);
    }

    return !included;
  });

  // The awaits in loop is intended since we'd like to log info in sequence
  /* eslint-disable no-await-in-loop */
  for (const key of validOptions) {
    const { value, fromEnv } = await oidcConfigReaders[key]();

    if (fromEnv) {
      log.info(`Read config ${chalk.green(key)} from env`);
    } else {
      log.info(`Generated config ${chalk.green(key)}`);
    }

    await updateValueByKey(pool, key, value);
  }
  /* eslint-enable no-await-in-loop */

  log.succeed('Seed OIDC config');
};

const seedChoices = Object.freeze(['all', 'oidc'] as const);

type SeedChoice = typeof seedChoices[number];

export const seedByPool = async (pool: DatabasePool, type: SeedChoice) => {
  await pool.transaction(async (connection) => {
    if (type !== 'oidc') {
      await oraPromise(createTables(connection), {
        text: 'Create tables',
        prefixText: chalk.blue('[info]'),
      });
      await oraPromise(seedTables(connection), {
        text: 'Seed data',
        prefixText: chalk.blue('[info]'),
      });
    }

    await seedOidcConfigs(connection);
  });
};

const seed: CommandModule<Record<string, unknown>, { type: string }> = {
  command: 'seed [type]',
  describe: 'Create database then seed tables and data',
  builder: (yargs) =>
    yargs.positional('type', {
      describe: 'Optional seed type',
      type: 'string',
      choices: seedChoices,
      default: 'all',
    }),
  handler: async ({ type }) => {
    const pool = await createPoolAndDatabaseIfNeeded();

    try {
      // Cannot avoid `as` since the official type definition of `yargs` doesn't work.
      // The value of `type` can be ensured, so it's safe to use `as` here.
      // eslint-disable-next-line no-restricted-syntax
      await seedByPool(pool, type as SeedChoice);
    } catch (error: unknown) {
      console.error(error);
      console.log();
      log.warn(
        'Error ocurred during seeding your database.\n\n' +
          '  Nothing has changed since the seeding process was in a transaction.\n' +
          '  Try to fix the error and seed again.'
      );
    }
    await pool.end();
  },
};

export default seed;
