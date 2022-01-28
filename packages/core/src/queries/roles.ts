import { Roles, Role } from '@logto/schemas';
import { sql } from 'slonik';

import pool from '@/database/pool';
import { convertToIdentifiers } from '@/database/utils';

const { table, fields } = convertToIdentifiers(Roles);

export const findAllRoles = async () =>
  pool.any<Role>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
  `);

export const findRolesByRoleNames = async (roleNames: string[]) =>
  pool.any<Role>(sql`
    select ${sql.join(Object.values(fields), sql`,`)}
    from ${table}
    where ${fields.name} in (${sql.join(roleNames, sql`,`)})
  `);
