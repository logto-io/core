import type { User, CreateUser, Scope } from '@logto/schemas';
import { Users, UsersPasswordEncryptionMethod } from '@logto/schemas';
import { generateStandardShortId, generateStandardId } from '@logto/shared';
import type { OmitAutoSetFields } from '@logto/shared';
import type { Nullable } from '@silverhand/essentials';
import { deduplicate } from '@silverhand/essentials';
import { argon2Verify } from 'hash-wasm';
import pRetry from 'p-retry';

import { buildInsertIntoWithPool } from '#src/database/insert-into.js';
import { EnvSet } from '#src/env-set/index.js';
import RequestError from '#src/errors/RequestError/index.js';
import { createUsersRolesQueries } from '#src/queries/users-roles.js';
import type Queries from '#src/tenants/Queries.js';
import assertThat from '#src/utils/assert-that.js';
import { encryptPassword } from '#src/utils/password.js';

export const encryptUserPassword = async (
  password: string
): Promise<{
  passwordEncrypted: string;
  passwordEncryptionMethod: UsersPasswordEncryptionMethod;
}> => {
  const passwordEncryptionMethod = UsersPasswordEncryptionMethod.Argon2i;
  const passwordEncrypted = await encryptPassword(
    password,

    passwordEncryptionMethod
  );

  return { passwordEncrypted, passwordEncryptionMethod };
};

export const verifyUserPassword = async (user: Nullable<User>, password: string): Promise<User> => {
  assertThat(user, new RequestError({ code: 'session.invalid_credentials', status: 422 }));
  const { passwordEncrypted, passwordEncryptionMethod } = user;

  assertThat(
    passwordEncrypted && passwordEncryptionMethod,
    new RequestError({ code: 'session.invalid_credentials', status: 422 })
  );

  const result = await argon2Verify({ password, hash: passwordEncrypted });

  assertThat(result, new RequestError({ code: 'session.invalid_credentials', status: 422 }));

  return user;
};

export type UserLibrary = ReturnType<typeof createUserLibrary>;

export const createUserLibrary = (queries: Queries) => {
  const {
    pool,
    roles: { findRolesByRoleNames, findRoleByRoleName, findRolesByRoleIds },
    users: { hasUser, hasUserWithEmail, hasUserWithId, hasUserWithPhone, findUsersByIds },
    usersRoles: { findUsersRolesByRoleId, findUsersRolesByUserId },
    rolesScopes: { findRolesScopesByRoleIds },
    scopes: { findScopesByIdsAndResourceIndicator },
  } = queries;

  const generateUserId = async (retries = 500) =>
    pRetry(
      async () => {
        const id = generateStandardShortId();

        if (!(await hasUserWithId(id))) {
          return id;
        }

        throw new Error('Cannot generate user ID in reasonable retries');
      },
      { retries, factor: 0 } // No need for exponential backoff
    );

  const insertUser = async (data: OmitAutoSetFields<CreateUser>, additionalRoleNames: string[]) => {
    const roleNames = deduplicate([...EnvSet.values.userDefaultRoleNames, ...additionalRoleNames]);
    const roles = await findRolesByRoleNames(roleNames);

    assertThat(roles.length === roleNames.length, 'role.default_role_missing');

    return pool.transaction(async (connection) => {
      const insertUserQuery = buildInsertIntoWithPool(connection)(Users, {
        returning: true,
      });

      const user = await insertUserQuery(data);

      if (roles.length > 0) {
        const { insertUsersRoles } = createUsersRolesQueries(connection);
        await insertUsersRoles(
          roles.map(({ id }) => ({ id: generateStandardId(), userId: user.id, roleId: id }))
        );
      }

      return user;
    });
  };

  const checkIdentifierCollision = async (
    identifiers: {
      username?: Nullable<string>;
      primaryEmail?: Nullable<string>;
      primaryPhone?: Nullable<string>;
    },
    excludeUserId?: string
  ) => {
    const { primaryEmail, primaryPhone, username } = identifiers;

    if (primaryEmail && (await hasUserWithEmail(primaryEmail, excludeUserId))) {
      throw new RequestError({ code: 'user.email_already_in_use', status: 422 });
    }

    if (primaryPhone && (await hasUserWithPhone(primaryPhone, excludeUserId))) {
      throw new RequestError({ code: 'user.phone_already_in_use', status: 422 });
    }

    if (username && (await hasUser(username, excludeUserId))) {
      throw new RequestError({ code: 'user.username_already_in_use', status: 422 });
    }
  };

  const findUsersByRoleName = async (roleName: string) => {
    const role = await findRoleByRoleName(roleName);

    if (!role) {
      return [];
    }

    const usersRoles = await findUsersRolesByRoleId(role.id);

    if (usersRoles.length === 0) {
      return [];
    }

    return findUsersByIds(usersRoles.map(({ userId }) => userId));
  };

  const findUserScopesForResourceIndicator = async (
    userId: string,
    resourceIndicator: string
  ): Promise<readonly Scope[]> => {
    const usersRoles = await findUsersRolesByUserId(userId);
    const rolesScopes = await findRolesScopesByRoleIds(usersRoles.map(({ roleId }) => roleId));

    const scopes = await findScopesByIdsAndResourceIndicator(
      rolesScopes.map(({ scopeId }) => scopeId),
      resourceIndicator
    );

    return scopes;
  };

  const findUserRoles = async (userId: string) => {
    const usersRoles = await findUsersRolesByUserId(userId);
    const roles = await findRolesByRoleIds(usersRoles.map(({ roleId }) => roleId));

    return roles;
  };

  return {
    generateUserId,
    insertUser,
    checkIdentifierCollision,
    findUsersByRoleName,
    findUserScopesForResourceIndicator,
    findUserRoles,
  };
};
