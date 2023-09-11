import type { RoleResponse } from '@logto/schemas';
import {
  userInfoSelectFields,
  userProfileResponseGuard,
  Roles,
  RoleType,
  Users,
} from '@logto/schemas';
import { generateStandardId } from '@logto/shared';
import { pick, tryThat } from '@silverhand/essentials';
import { object, string, z, number } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import koaPagination from '#src/middleware/koa-pagination.js';
import koaQuotaGuard from '#src/middleware/koa-quota-guard.js';
import koaRoleRlsErrorHandler from '#src/middleware/koa-role-rls-error-handler.js';
import assertThat from '#src/utils/assert-that.js';
import { parseSearchParamsForSearch } from '#src/utils/search.js';

import type { AuthedRouter, RouterInitArgs } from './types.js';

export default function roleRoutes<T extends AuthedRouter>(
  ...[
    router,
    {
      queries,
      libraries: { quota },
    },
  ]: RouterInitArgs<T>
) {
  const {
    rolesScopes: { insertRolesScopes },
    roles: {
      countRoles,
      deleteRoleById,
      findRoleById,
      findRoleByRoleName,
      findRoles,
      insertRole,
      updateRoleById,
    },
    scopes: { findScopeById },
    users: { findUserById, findUsersByIds, countUsers, findUsers },
    usersRoles: {
      countUsersRolesByRoleId,
      deleteUsersRolesByUserIdAndRoleId,
      findUsersRolesByRoleId,
      findUsersRolesByUserId,
      insertUsersRoles,
    },
  } = queries;

  router.use('/roles(/.*)?', koaRoleRlsErrorHandler());

  router.get(
    '/roles',
    koaPagination(),
    koaGuard({
      response: Roles.guard
        .merge(
          object({
            usersCount: number(),
            featuredUsers: Users.guard
              .pick({
                avatar: true,
                id: true,
                name: true,
              })
              .array(),
          })
        )
        .array(),
      status: [200, 400],
    }),
    async (ctx, next) => {
      const { limit, offset } = ctx.pagination;
      const { searchParams } = ctx.request.URL;

      return tryThat(
        async () => {
          const search = parseSearchParamsForSearch(searchParams);
          const excludeUserId = searchParams.get('excludeUserId');
          const usersRoles = excludeUserId ? await findUsersRolesByUserId(excludeUserId) : [];
          const excludeRoleIds = usersRoles.map(({ roleId }) => roleId);

          const [{ count }, roles] = await Promise.all([
            countRoles(search, { excludeRoleIds }),
            findRoles(search, limit, offset, { excludeRoleIds }),
          ]);

          const rolesResponse: RoleResponse[] = await Promise.all(
            roles.map(async (role) => {
              const { count } = await countUsersRolesByRoleId(role.id);
              const usersRoles = await findUsersRolesByRoleId(role.id, 3);
              const users = await findUsersByIds(usersRoles.map(({ userId }) => userId));

              return {
                ...role,
                usersCount: count,
                featuredUsers: users.map(({ id, avatar, name }) => ({ id, avatar, name })),
              };
            })
          );

          // Return totalCount to pagination middleware
          ctx.pagination.totalCount = count;
          ctx.body = rolesResponse;

          return next();
        },
        (error) => {
          if (error instanceof TypeError) {
            throw new RequestError(
              { code: 'request.invalid_input', details: error.message },
              error
            );
          }
          throw error;
        }
      );
    }
  );

  router.post(
    '/roles',
    koaQuotaGuard({ key: 'rolesLimit', quota }),
    koaGuard({
      body: Roles.createGuard
        .omit({ id: true })
        .extend({ scopeIds: z.string().min(1).array().optional() }),
      status: [200, 422],
      response: Roles.guard,
    }),
    async (ctx, next) => {
      const { body } = ctx.guard;
      const { scopeIds, ...roleBody } = body;

      assertThat(
        !(await findRoleByRoleName(roleBody.name)),
        new RequestError({
          code: 'role.name_in_use',
          name: roleBody.name,
          status: 422,
        })
      );

      const role = await insertRole({
        ...roleBody,
        id: generateStandardId(),
      });

      if (scopeIds) {
        await Promise.all(scopeIds.map(async (scopeId) => findScopeById(scopeId)));
        await insertRolesScopes(
          scopeIds.map((scopeId) => ({ id: generateStandardId(), roleId: role.id, scopeId }))
        );
      }

      ctx.body = role;

      return next();
    }
  );

  router.get(
    '/roles/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      response: Roles.guard,
      status: [200, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;

      ctx.body = await findRoleById(id);

      return next();
    }
  );

  router.patch(
    '/roles/:id',
    koaGuard({
      body: Roles.createGuard.pick({ name: true, description: true }).partial(),
      params: object({ id: string().min(1) }),
      response: Roles.guard,
      status: [200, 404, 422],
    }),
    async (ctx, next) => {
      const {
        body,
        body: { name },
        params: { id },
      } = ctx.guard;

      await findRoleById(id);
      assertThat(
        !name || !(await findRoleByRoleName(name, id)),
        new RequestError({
          code: 'role.name_in_use',
          name,
          status: 422,
        })
      );
      ctx.body = await updateRoleById(id, body);

      return next();
    }
  );

  router.delete(
    '/roles/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      status: [204, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;
      await deleteRoleById(id);
      ctx.status = 204;

      return next();
    }
  );

  router.get(
    '/roles/:id/users',
    koaPagination(),
    koaGuard({
      params: object({ id: string().min(1) }),
      response: userProfileResponseGuard.array(),
      status: [200, 400, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;
      const { limit, offset } = ctx.pagination;
      const { searchParams } = ctx.request.URL;

      await findRoleById(id);

      return tryThat(
        async () => {
          const search = parseSearchParamsForSearch(searchParams);
          const usersRoles = await findUsersRolesByRoleId(id);
          const userIds = usersRoles.map(({ userId }) => userId);

          const [{ count }, users] = await Promise.all([
            countUsers(search, undefined, userIds),
            findUsers(limit, offset, search, undefined, userIds),
          ]);

          ctx.pagination.totalCount = count;
          ctx.body = users.map((user) => pick(user, ...userInfoSelectFields));

          return next();
        },
        (error) => {
          if (error instanceof TypeError) {
            throw new RequestError(
              { code: 'request.invalid_input', details: error.message },
              error
            );
          }
          throw error;
        }
      );
    }
  );

  router.post(
    '/roles/:id/users',
    koaGuard({
      params: object({ id: string().min(1) }),
      body: object({ userIds: string().min(1).array().nonempty() }),
      status: [201, 404, 422],
    }),
    async (ctx, next) => {
      const {
        params: { id },
        body: { userIds },
      } = ctx.guard;

      const role = await findRoleById(id);
      assertThat(
        role.type === RoleType.User,
        new RequestError({ code: 'user.invalid_role_type', status: 422, roleId: role.id })
      );

      const usersRoles = await findUsersRolesByRoleId(id);
      const existingUserIds = new Set(usersRoles.map(({ userId }) => userId));
      const userIdsToAdd = userIds.filter((id) => !existingUserIds.has(id)); // Skip existing user ids.

      if (userIdsToAdd.length > 0) {
        await Promise.all(userIdsToAdd.map(async (userId) => findUserById(userId)));
        await insertUsersRoles(
          userIdsToAdd.map((userId) => ({ id: generateStandardId(), roleId: id, userId }))
        );
      }
      ctx.status = 201;

      return next();
    }
  );

  router.delete(
    '/roles/:id/users/:userId',
    koaGuard({
      params: object({ id: string().min(1), userId: string().min(1) }),
      status: [204, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id, userId },
      } = ctx.guard;
      await deleteUsersRolesByUserIdAndRoleId(userId, id);
      ctx.status = 204;

      return next();
    }
  );
}
