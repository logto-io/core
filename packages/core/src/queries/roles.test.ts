import { Roles } from '@logto/schemas';
import { convertToIdentifiers } from '@logto/shared';
import { createMockPool, createMockQueryResult, sql } from 'slonik';

import { mockRole } from '#src/__mocks__/index.js';
import envSet from '#src/env-set/index.js';
import type { QueryType } from '#src/utils/test-utils.js';
import { expectSqlAssert } from '#src/utils/test-utils.js';

import {
  findAllRoles,
  findRoleByRoleName,
  findRolesByRoleIds,
  findRolesByRoleNames,
} from './roles.js';

const { jest } = import.meta;

const mockQuery: jest.MockedFunction<QueryType> = jest.fn();

jest.spyOn(envSet, 'pool', 'get').mockReturnValue(
  createMockPool({
    query: async (sql, values) => {
      return mockQuery(sql, values);
    },
  })
);

describe('roles query', () => {
  const { table, fields } = convertToIdentifiers(Roles);

  it('findAllRoles', async () => {
    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([]);

      return createMockQueryResult([mockRole]);
    });

    await expect(findAllRoles()).resolves.toEqual([mockRole]);
  });

  it('findRolesByRoleIds', async () => {
    const roleIds = [mockRole.id];
    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      where ${fields.id} in (${sql.join(roleIds, sql`, `)})
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([roleIds.join(', ')]);

      return createMockQueryResult([mockRole]);
    });

    await expect(findRolesByRoleIds(roleIds)).resolves.toEqual([mockRole]);
  });

  it('findRoleByRoleName', async () => {
    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      where ${fields.name} = ${mockRole.name}
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([mockRole.name]);

      return createMockQueryResult([mockRole]);
    });

    await expect(findRoleByRoleName(mockRole.name)).resolves.toEqual(mockRole);
  });

  it('findRolesByRoleNames', async () => {
    const roleNames = ['foo'];

    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      where ${fields.name} in (${sql.join(roleNames, sql`, `)})
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([roleNames.join(', ')]);

      return createMockQueryResult([mockRole]);
    });

    await expect(findRolesByRoleNames(roleNames)).resolves.toEqual([mockRole]);
  });
});
