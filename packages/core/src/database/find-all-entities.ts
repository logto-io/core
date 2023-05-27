import { type GeneratedSchema, type SchemaLike } from '@logto/schemas';
import {
  type FieldIdentifiers,
  conditionalSql,
  convertToIdentifiers,
  manyRows,
} from '@logto/shared';
import { sql, type CommonQueryMethods } from 'slonik';

export const buildFindAllEntitiesWithPool =
  (pool: CommonQueryMethods) =>
  <CreateSchema extends SchemaLike, Schema extends CreateSchema>(
    schema: GeneratedSchema<CreateSchema, Schema>,
    orderBy?: Array<{
      field: keyof FieldIdentifiers<keyof GeneratedSchema<CreateSchema, Schema>['fields']>;
      order: 'asc' | 'desc';
    }>
  ) => {
    const { table, fields } = convertToIdentifiers(schema);

    return async (limit?: number, offset?: number) =>
      manyRows(
        pool.query<Schema>(sql`
          select ${sql.join(Object.values(fields), sql`, `)}
          from ${table}
          ${conditionalSql(orderBy, (orderBy) => {
            const orderBySql = orderBy.map(({ field, order }) =>
              // Note: 'desc' and 'asc' are keywords, so we don't pass them as values
              order === 'desc' ? sql`${fields[field]} desc` : sql`${fields[field]} asc`
            );
            return sql`order by ${sql.join(orderBySql, sql`, `)}`;
          })}
          ${conditionalSql(limit, (limit) => sql`limit ${limit}`)}
          ${conditionalSql(offset, (offset) => sql`offset ${offset}`)}
        `)
      );
  };
