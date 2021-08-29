import { UserDBEntry, Users } from '@logto/schemas';
import { sql } from 'slonik';

import { buildInsertInto } from '@/database/insert-into';
import pool from '@/database/pool';
import { convertToIdentifiers } from '@/database/utils';

const { table, fields } = convertToIdentifiers(Users);

export const findUserByUsername = async (username: string) =>
  pool.one<UserDBEntry>(sql`
  select ${sql.join(Object.values(fields), sql`,`)}
  from ${table}
  where ${fields.username}=${username}
`);

export const findUserById = async (id: string) =>
  pool.one<UserDBEntry>(sql`
  select ${sql.join(Object.values(fields), sql`,`)}
  from ${table}
  where ${fields.id}=${id}
`);

export const hasUser = async (username: string) =>
  pool.exists(sql`
  select ${fields.id}
  from ${table}
  where ${fields.username}=${username}
`);

export const hasUserWithId = async (id: string) =>
  pool.exists(sql`
  select ${fields.id}
  from ${table}
  where ${fields.id}=${id}
`);

export const insertUser = buildInsertInto<UserDBEntry>(pool, Users, { returning: true });
