import type { Application, CreateApplication } from '@logto/schemas';
import { ApplicationType, Applications } from '@logto/schemas';
import type { OmitAutoSetFields } from '@logto/shared';
import { convertToIdentifiers, conditionalSql, conditionalArraySql } from '@logto/shared';
import type { CommonQueryMethods, SqlSqlToken } from 'slonik';
import { sql } from 'slonik';

import { buildFindAllEntitiesWithPool } from '#src/database/find-all-entities.js';
import { buildFindEntityByIdWithPool } from '#src/database/find-entity-by-id.js';
import { buildInsertIntoWithPool } from '#src/database/insert-into.js';
import { getTotalRowCountWithPool } from '#src/database/row-count.js';
import { buildUpdateWhereWithPool } from '#src/database/update-where.js';
import { DeletionError } from '#src/errors/SlonikError/index.js';
import { buildConditionsFromSearch } from '#src/utils/search.js';
import type { Search } from '#src/utils/search.js';

const { table, fields } = convertToIdentifiers(Applications);

const buildApplicationConditions = (search: Search) => {
  const hasSearch = search.matches.length > 0;
  const searchFields = [
    Applications.fields.id,
    Applications.fields.name,
    Applications.fields.description,
  ];

  return conditionalSql(hasSearch, () => sql`${buildConditionsFromSearch(search, searchFields)}`);
};

const buildConditionArray = (conditions: SqlSqlToken[]) => {
  const filteredConditions = conditions.filter((condition) => condition.sql !== '');
  return conditionalArraySql(
    filteredConditions,
    (filteredConditions) => sql`where ${sql.join(filteredConditions, sql` and `)}`
  );
};

export const createApplicationQueries = (pool: CommonQueryMethods) => {
  const countApplications = async (search: Search, types?: ApplicationType[]) => {
    const { count } = await pool.one<{ count: string }>(sql`
      select count(*)
      from ${table}
      ${buildConditionArray([
        conditionalSql(types, (types) =>
          types.length > 0 ? sql`${fields.type} in (${sql.join(types, sql`, `)})` : sql``
        ),
        buildApplicationConditions(search),
      ])}
    `);

    return { count: Number(count) };
  };

  const findApplications = async (
    search: Search,
    limit?: number,
    offset?: number,
    types?: ApplicationType[]
  ) =>
    pool.any<Application>(sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      ${buildConditionArray([
        conditionalSql(types, (types) =>
          types.length > 0 ? sql`${fields.type} in (${sql.join(types, sql`, `)})` : sql``
        ),
        buildApplicationConditions(search),
      ])}
      order by ${fields.createdAt} desc
      ${conditionalSql(limit, (value) => sql`limit ${value}`)}
      ${conditionalSql(offset, (value) => sql`offset ${value}`)}
    `);

  const findTotalNumberOfApplications = async () => getTotalRowCountWithPool(pool)(table);

  const findAllApplications = buildFindAllEntitiesWithPool(pool)(Applications, [
    { field: 'createdAt', order: 'desc' },
  ]);

  const findApplicationById = buildFindEntityByIdWithPool(pool)(Applications);

  const insertApplication = buildInsertIntoWithPool(pool)(Applications, {
    returning: true,
  });

  const updateApplication = buildUpdateWhereWithPool(pool)(Applications, true);

  const updateApplicationById = async (
    id: string,
    set: Partial<OmitAutoSetFields<CreateApplication>>
  ) => updateApplication({ set, where: { id }, jsonbMode: 'merge' });

  const countNonM2mApplications = async () => {
    const { count } = await pool.one<{ count: string }>(sql`
      select count(*)
      from ${table}
      where ${fields.type} != ${ApplicationType.MachineToMachine}
    `);

    return { count: Number(count) };
  };

  const countM2mApplications = async () => {
    const { count } = await pool.one<{ count: string }>(sql`
      select count(*)
      from ${table}
      where ${fields.type} = ${ApplicationType.MachineToMachine}
    `);

    return { count: Number(count) };
  };

  const countM2mApplicationsByIds = async (search: Search, applicationIds: string[]) => {
    if (applicationIds.length === 0) {
      return { count: 0 };
    }

    const { count } = await pool.one<{ count: string }>(sql`
      select count(*)
      from ${table}
      ${buildConditionArray([
        sql`${fields.type} = ${ApplicationType.MachineToMachine}`,
        sql`${fields.id} in (${sql.join(applicationIds, sql`, `)})`,
        buildApplicationConditions(search),
      ])}
    `);

    return { count: Number(count) };
  };

  const findM2mApplicationsByIds = async (
    search: Search,
    limit: number,
    offset: number,
    applicationIds: string[]
  ) => {
    if (applicationIds.length === 0) {
      return [];
    }

    return pool.any<Application>(sql`
      select ${sql.join(Object.values(fields), sql`, `)}
      from ${table}
      ${buildConditionArray([
        sql`${fields.type} = ${ApplicationType.MachineToMachine}`,
        sql`${fields.id} in (${sql.join(applicationIds, sql`, `)})`,
        buildApplicationConditions(search),
      ])}
      limit ${limit}
      offset ${offset}
    `);
  };

  const deleteApplicationById = async (id: string) => {
    const { rowCount } = await pool.query(sql`
      delete from ${table}
      where ${fields.id}=${id}
    `);

    if (rowCount < 1) {
      throw new DeletionError(Applications.table, id);
    }
  };

  return {
    countApplications,
    findApplications,
    findTotalNumberOfApplications,
    findAllApplications,
    findApplicationById,
    insertApplication,
    updateApplication,
    updateApplicationById,
    countNonM2mApplications,
    countM2mApplications,
    countM2mApplicationsByIds,
    findM2mApplicationsByIds,
    deleteApplicationById,
  };
};
