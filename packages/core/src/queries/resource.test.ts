import { Resources } from '@logto/schemas';
import { createMockPool, createMockQueryResult, sql } from 'slonik';

import { mockResource } from '@/__mocks__';
import { convertToIdentifiers, convertToPrimitiveOrSql } from '@/database/utils';
import envSet from '@/env-set';
import { DeletionError } from '@/errors/SlonikError';
import { expectSqlAssert, QueryType } from '@/utils/test-utils';

import {
  findTotalNumberOfResources,
  findAllResources,
  findResourceById,
  findResourceByIndicator,
  insertResource,
  updateResourceById,
  deleteResourceById,
} from './resource';

const mockQuery: jest.MockedFunction<QueryType> = jest.fn();

jest.spyOn(envSet, 'pool', 'get').mockReturnValue(
  createMockPool({
    query: async (sql, values) => {
      return mockQuery(sql, values);
    },
  })
);

describe('resource query', () => {
  const { table, fields } = convertToIdentifiers(Resources);

  it('findTotalNumberOfResources', async () => {
    const expectSql = sql`
      select count(*)
      from ${table}
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual(expectSql.values);

      return createMockQueryResult([{ count: 10 }]);
    });

    await expect(findTotalNumberOfResources()).resolves.toEqual({ count: 10 });
  });

  it('findAllResources', async () => {
    const limit = 10;
    const offset = 1;

    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      limit $1
      offset $2
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([limit, offset]);

      return createMockQueryResult([mockResource]);
    });

    await expect(findAllResources(limit, offset)).resolves.toEqual([mockResource]);
  });

  it('findResourcesById', async () => {
    const id = 'foo';

    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      where ${fields.id}=$1
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([id]);

      return createMockQueryResult([mockResource]);
    });

    await expect(findResourceById(id)).resolves.toEqual(mockResource);
  });

  it('findResourceByIndicator', async () => {
    const indicator = 'foo';

    const expectSql = sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      where ${fields.indicator}=$1
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([indicator]);

      return createMockQueryResult([mockResource]);
    });

    await expect(findResourceByIndicator(indicator)).resolves.toEqual(mockResource);
  });

  it('insertResource', async () => {
    const expectSql = sql`
      insert into ${table} (${sql.join(Object.values(fields), sql`, `)})
      values (${sql.join(
        Object.values(fields).map((_, index) => `$${index + 1}`),
        sql`, `
      )})
      returning *
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);

      expect(values).toEqual(
        Resources.fieldKeys.map((k) => convertToPrimitiveOrSql(k, mockResource[k]))
      );

      return createMockQueryResult([mockResource]);
    });

    await expect(insertResource(mockResource)).resolves.toEqual(mockResource);
  });

  it('updateResourceById', async () => {
    const id = 'foo';
    const name = 'foo';

    const expectSql = sql`
      update ${table}
      set ${fields.name}=$1
      where ${fields.id}=$2
      returning *
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([name, id]);

      return createMockQueryResult([mockResource]);
    });

    await expect(updateResourceById(id, { name })).resolves.toEqual(mockResource);
  });

  it('deleteResourceById', async () => {
    const id = 'foo';
    const expectSql = sql`
      delete from ${table}
      where ${fields.id}=$1
    `;

    mockQuery.mockImplementationOnce(async (sql, values) => {
      expectSqlAssert(sql, expectSql.sql);
      expect(values).toEqual([id]);

      return createMockQueryResult([mockResource]);
    });

    await deleteResourceById(id);
  });

  it('deleteResourceById throw error if return row count is 0', async () => {
    const id = 'foo';

    mockQuery.mockImplementationOnce(async () => {
      return createMockQueryResult([]);
    });

    await expect(deleteResourceById(id)).rejects.toMatchError(
      new DeletionError(Resources.table, id)
    );
  });
});
