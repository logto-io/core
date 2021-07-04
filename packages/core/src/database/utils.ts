import { IdentifierSqlTokenType, sql, ValueExpressionType } from 'slonik';

type Table = { table: string; fields: Record<string, string> };
type FieldIdentifiers<Key extends string | number | symbol> = {
  [key in Key]: IdentifierSqlTokenType;
};

export const convertToIdentifiers = <T extends Table>(
  { table, fields }: T,
  withPrefix = false
) => ({
  table: sql.identifier([table]),
  fields: Object.entries<string>(fields).reduce(
    (previous, [key, value]) => ({
      ...previous,
      [key]: sql.identifier(withPrefix ? [table, value] : [value]),
    }),
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as FieldIdentifiers<keyof T['fields']>
  ),
});

export const insertInto = <T extends string>(
  table: IdentifierSqlTokenType,
  fields: FieldIdentifiers<T>,
  fieldKeys: readonly T[],
  value: { [key in T]?: ValueExpressionType }
) => sql`
  insert into ${table} (${sql.join(Object.values(fields), sql`, `)})
  values (${sql.join(
    fieldKeys.map((key) => value[key] ?? null),
    sql`, `
  )})`;
