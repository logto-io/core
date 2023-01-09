import type { UsersRole } from '@logto/schemas';
import { RolesScopes, UsersRoles } from '@logto/schemas';
import { conditionalSql, convertToIdentifiers } from '@logto/shared';
import type { CommonQueryMethods } from 'slonik';
import { sql } from 'slonik';

import envSet from '#src/env-set/index.js';
import { DeletionError } from '#src/errors/SlonikError/index.js';

const { table, fields } = convertToIdentifiers(UsersRoles);

export const createUsersRolesQueries = (pool: CommonQueryMethods) => {
  const countUsersRolesByRoleId = async (roleId: string) =>
    pool.one<{ count: number }>(sql`
      select count(*)
      from ${table}
      where ${fields.roleId}=${roleId}
    `);

  const findFirstUsersRolesByRoleIdAndUserIds = async (roleId: string, userIds: string[]) =>
    userIds.length > 0
      ? pool.maybeOne<UsersRole>(sql`
        select ${sql.join(Object.values(fields), sql`,`)}
        from ${table}
        where ${fields.roleId}=${roleId}
        and ${fields.userId} in (${sql.join(userIds, sql`, `)})
        limit 1
      `)
      : null;

  const findUsersRolesByUserId = async (userId: string) =>
    pool.any<UsersRole>(sql`
      select ${sql.join(Object.values(fields), sql`,`)}
      from ${table}
      where ${fields.userId}=${userId}
    `);

  const findUsersRolesByRoleId = async (roleId: string, limit?: number) =>
    pool.any<UsersRole>(sql`
      select ${sql.join(Object.values(fields), sql`,`)}
      from ${table}
      where ${fields.roleId}=${roleId}
      ${conditionalSql(limit, (value) => sql`limit ${value}`)}
    `);

  const insertUsersRoles = async (usersRoles: UsersRole[]) =>
    pool.query(sql`
      insert into ${table} (${fields.userId}, ${fields.roleId}) values
      ${sql.join(
        usersRoles.map(({ userId, roleId }) => sql`(${userId}, ${roleId})`),
        sql`, `
      )}
    `);

  const deleteUsersRolesByUserIdAndRoleId = async (userId: string, roleId: string) => {
    const { rowCount } = await pool.query(sql`
      delete from ${table}
      where ${fields.userId} = ${userId} and ${fields.roleId} = ${roleId}
    `);

    if (rowCount < 1) {
      throw new DeletionError(RolesScopes.table);
    }
  };

  return {
    countUsersRolesByRoleId,
    findFirstUsersRolesByRoleIdAndUserIds,
    findUsersRolesByUserId,
    findUsersRolesByRoleId,
    insertUsersRoles,
    deleteUsersRolesByUserIdAndRoleId,
  };
};

/** @deprecated Will be removed soon. Use createUsersRolesQueries() factory instead. */
export const {
  countUsersRolesByRoleId,
  findFirstUsersRolesByRoleIdAndUserIds,
  findUsersRolesByUserId,
  findUsersRolesByRoleId,
  insertUsersRoles,
  deleteUsersRolesByUserIdAndRoleId,
} = createUsersRolesQueries(envSet.pool);
