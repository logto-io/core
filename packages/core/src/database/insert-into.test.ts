/* eslint-disable sql/no-unsafe-query */
import { CreateUser, Users } from '@logto/schemas';
import decamelize from 'decamelize';

import RequestError from '@/errors/RequestError';
import { createTestPool } from '@/utils/test-utils';

import { buildInsertInto } from './insert-into';
import { convertToIdentifiers } from './utils';

const buildExpectedInsertIntoSql = (keys: string[]) => [
  `insert into "users" (${keys.map((key) => `"${decamelize(key)}"`).join(', ')})`,
  `values (${keys.map((_, index) => `$${index + 1}`).join(', ')})`,
];

describe('buildInsertInto()', () => {
  it('resolves a promise with `undefined` when `returning` is false', async () => {
    const user: CreateUser = { id: 'foo', username: '456' };
    const expectInsertIntoSql = buildExpectedInsertIntoSql(Object.keys(user));
    const pool = createTestPool(expectInsertIntoSql.join('\n'));
    const insertInto = buildInsertInto(pool, Users);
    await expect(insertInto(user)).resolves.toBe(undefined);
  });

  it('resolves a promise with `undefined` when `returning` is false and `onConflict` is enabled', async () => {
    const user: CreateUser = { id: 'foo', username: '456', primaryEmail: 'foo@bar.com' };
    const expectInsertIntoSql = buildExpectedInsertIntoSql(Object.keys(user));
    const pool = createTestPool(
      [
        ...expectInsertIntoSql,
        'on conflict ("id", "username") do update',
        'set "primary_email"=excluded."primary_email"',
      ].join('\n')
    );
    const { fields } = convertToIdentifiers(Users);
    const insertInto = buildInsertInto(pool, Users, {
      onConflict: {
        fields: [fields.id, fields.username],
        setExcludedFields: [fields.primaryEmail],
      },
    });
    await expect(insertInto(user)).resolves.toBe(undefined);
  });

  it('resolves a promise with single entity when `returning` is true', async () => {
    const user: CreateUser = { id: 'foo', username: '123', primaryEmail: 'foo@bar.com' };
    const expectInsertIntoSql = buildExpectedInsertIntoSql(Object.keys(user));
    const pool = createTestPool(
      [...expectInsertIntoSql, 'returning *'].join('\n'),
      (_, [id, username, primaryEmail]) => ({
        id: String(id),
        username: String(username),
        primaryEmail: String(primaryEmail),
      })
    );
    const insertInto = buildInsertInto(pool, Users, { returning: true });
    await expect(
      insertInto({ id: 'foo', username: '123', primaryEmail: 'foo@bar.com' })
    ).resolves.toStrictEqual(user);
  });

  it('throws `entity.create_failed` error with `undefined` when `returning` is true', async () => {
    const user: CreateUser = { id: 'foo', username: '123', primaryEmail: 'foo@bar.com' };
    const expectInsertIntoSql = buildExpectedInsertIntoSql(Object.keys(user));
    const pool = createTestPool([...expectInsertIntoSql, 'returning *'].join('\n'));
    const insertInto = buildInsertInto(pool, Users, { returning: true });

    await expect(
      insertInto({ id: 'foo', username: '123', primaryEmail: 'foo@bar.com' })
    ).rejects.toMatchError(
      new RequestError({
        code: 'entity.create_failed',
        name: Users.tableSingular,
      })
    );
  });
});
