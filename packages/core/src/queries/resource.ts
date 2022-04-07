import { Resource, CreateResource, Resources } from '@logto/schemas';
import { sql } from 'slonik';

import { buildInsertInto } from '@/database/insert-into';
import pool from '@/database/pool';
import { buildUpdateWhere } from '@/database/update-where';
import {
  convertToIdentifiers,
  OmitAutoSetFields,
  getTotalRowCount,
  conditionalSql,
} from '@/database/utils';
import { DeletionError } from '@/errors/SlonikError';

const { table, fields } = convertToIdentifiers(Resources);

export const findTotalNumberOfResources = async () => getTotalRowCount(table);

export const findAllResources = async (limit: number, offset: number) =>
  pool.many<Resource>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
    ${conditionalSql(limit, (limit) => sql`limit ${limit}`)}
    ${conditionalSql(offset, (offset) => sql`offset ${offset}`)}
  `);

export const findResourceByIndicator = async (indicator: string) =>
  pool.maybeOne<Resource>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
    where ${fields.indicator}=${indicator}
  `);

export const findResourceById = async (id: string) =>
  pool.one<Resource>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
    where ${fields.id}=${id}
  `);

export const insertResource = buildInsertInto<CreateResource, Resource>(pool, Resources, {
  returning: true,
});

const updateResource = buildUpdateWhere<CreateResource, Resource>(pool, Resources, true);

export const updateResourceById = async (
  id: string,
  set: Partial<OmitAutoSetFields<CreateResource>>
) => updateResource({ set, where: { id } });

export const deleteResourceById = async (id: string) => {
  const { rowCount } = await pool.query(sql`
    delete from ${table}
    where ${fields.id}=${id}
  `);

  if (rowCount < 1) {
    throw new DeletionError(Resources.table, id);
  }
};
