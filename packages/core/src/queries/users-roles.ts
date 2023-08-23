import type { CreateUsersRole, UsersRole } from '@logto/schemas';
import { UsersRoles } from '@logto/schemas';
import { conditionalSql, convertToIdentifiers } from '@logto/shared';
import type { CommonQueryMethods } from 'slonik';
import { sql, CheckIntegrityConstraintViolationError } from 'slonik';

import { DeletionError, InsertionError } from '#src/errors/SlonikError/index.js';

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

  const insertUsersRoles = async (usersRoles: CreateUsersRole[]) => {
    try {
      await pool.query(sql`
        insert into ${table} (${fields.id}, ${fields.userId}, ${fields.roleId}) values
        ${sql.join(
          usersRoles.map(({ id, userId, roleId }) => sql`(${id}, ${userId}, ${roleId})`),
          sql`, `
        )}
      `);
    } catch (error: unknown) {
      if (error instanceof CheckIntegrityConstraintViolationError) {
        throw new InsertionError(UsersRoles);
      }
      throw error;
    }
  };

  const deleteUsersRolesByUserIdAndRoleId = async (userId: string, roleId: string) => {
    const { rowCount } = await pool.query(sql`
      delete from ${table}
      where ${fields.userId} = ${userId} and ${fields.roleId} = ${roleId}
    `);

    if (rowCount < 1) {
      throw new DeletionError(UsersRoles.table);
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
