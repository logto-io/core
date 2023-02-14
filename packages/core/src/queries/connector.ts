import type { StorageValue, Storage } from '@logto/connector-kit';
import type { Connector, CreateConnector } from '@logto/schemas';
import { Connectors } from '@logto/schemas';
import { manyRows, convertToIdentifiers } from '@logto/shared';
import type { Nullable } from '@silverhand/essentials';
import type { CommonQueryMethods } from 'slonik';
import { sql } from 'slonik';

import { buildInsertIntoWithPool } from '#src/database/insert-into.js';
import { buildUpdateWhereWithPool } from '#src/database/update-where.js';
import { DeletionError } from '#src/errors/SlonikError/index.js';

const { table, fields } = convertToIdentifiers(Connectors);

export const createConnectorQueries = (pool: CommonQueryMethods) => {
  const findAllConnectors = async () =>
    manyRows(
      pool.query<Connector>(sql`
        select ${sql.join(Object.values(fields), sql`, `)}
        from ${table}
        order by ${fields.id} asc
      `)
    );
  const findConnectorById = async (id: string) =>
    pool.one<Connector>(sql`
      select ${sql.join(Object.values(fields), sql`,`)}
      from ${table}
      where ${fields.id}=${id}
    `);
  const countConnectorByConnectorId = async (connectorId: string) =>
    pool.one<{ count: number }>(sql`
      select count(*)
      from ${table}
      where ${fields.connectorId}=${connectorId}
    `);

  const setValueByIdAndKey = async (
    id: string,
    key: string,
    value: StorageValue
  ): Promise<Storage> => {
    const { storage } = await pool.one<Connector>(sql`
      update ${table}
      set ${fields.storage} = coalesce(${fields.storage}, '{}'::jsonb) || ${sql.jsonb({
      [key]: sql.jsonb(value).value,
    })}
      where ${fields.id} = ${id}
      returning *;
    `);

    return storage;
  };

  const getValueByIdAndKey = async <T = Nullable<StorageValue>>(
    id: string,
    key: string
  ): Promise<T> => {
    const { value } = await pool.one<{ value: T }>(sql`
      select ${fields.storage}->${key} as value
      from ${table}
      where ${fields.id} = ${id};
    `);

    return value;
  };

  const deleteConnectorById = async (id: string) => {
    const { rowCount } = await pool.query(sql`
      delete from ${table}
      where ${fields.id}=${id}
    `);

    if (rowCount < 1) {
      throw new DeletionError(Connectors.table, id);
    }
  };

  const deleteConnectorByIds = async (ids: string[]) => {
    const { rowCount } = await pool.query(sql`
      delete from ${table}
      where ${fields.id} in (${sql.join(ids, sql`, `)})
    `);

    if (rowCount !== ids.length) {
      throw new DeletionError(Connectors.table, JSON.stringify({ ids }));
    }
  };
  const insertConnector = buildInsertIntoWithPool(pool)<CreateConnector, Connector>(Connectors, {
    returning: true,
  });
  const updateConnector = buildUpdateWhereWithPool(pool)<CreateConnector, Connector>(
    Connectors,
    true
  );

  return {
    findAllConnectors,
    findConnectorById,
    countConnectorByConnectorId,
    setValueByIdAndKey,
    getValueByIdAndKey,
    deleteConnectorById,
    deleteConnectorByIds,
    insertConnector,
    updateConnector,
  };
};
