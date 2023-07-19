import type { Role } from '@logto/schemas';
import {
  demoAppApplicationId,
  buildDemoAppDataForTenant,
  Applications,
  InternalRole,
} from '@logto/schemas';
import { generateStandardId, buildIdGenerator } from '@logto/shared';
import { boolean, object, string, z } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import koaPagination from '#src/middleware/koa-pagination.js';
import koaQuotaGuard from '#src/middleware/koa-quota-guard.js';
import { buildOidcClientMetadata } from '#src/oidc/utils.js';
import assertThat from '#src/utils/assert-that.js';

import type { AuthedRouter, RouterInitArgs } from './types.js';

const applicationId = buildIdGenerator(21);
const includesInternalAdminRole = (roles: Readonly<Array<{ role: Role }>>) =>
  roles.some(({ role: { name } }) => name === InternalRole.Admin);

export default function applicationRoutes<T extends AuthedRouter>(
  ...[router, { queries, id: tenantId, cloudConnection }]: RouterInitArgs<T>
) {
  const {
    deleteApplicationById,
    findApplicationById,
    findAllApplications,
    insertApplication,
    updateApplicationById,
    findTotalNumberOfApplications,
  } = queries.applications;
  const { findApplicationsRolesByApplicationId, insertApplicationsRoles, deleteApplicationRole } =
    queries.applicationsRoles;
  const { findRoleByRoleName } = queries.roles;

  router.get(
    '/applications',
    koaPagination({ isOptional: true }),
    koaGuard({ response: z.array(Applications.guard), status: 200 }),
    async (ctx, next) => {
      const { limit, offset, disabled: paginationDisabled } = ctx.pagination;

      if (paginationDisabled) {
        ctx.body = await findAllApplications();

        return next();
      }

      const [{ count }, applications] = await Promise.all([
        findTotalNumberOfApplications(),
        findAllApplications(limit, offset),
      ]);

      // Return totalCount to pagination middleware
      ctx.pagination.totalCount = count;
      ctx.body = applications;

      return next();
    }
  );

  router.post(
    '/applications',
    koaQuotaGuard({ key: 'applicationsLimit', cloudConnection, queries }),
    koaGuard({
      body: Applications.createGuard
        .omit({ id: true, createdAt: true })
        .partial()
        .merge(Applications.createGuard.pick({ name: true, type: true })),
      response: Applications.guard,
      status: [200, 422],
    }),
    async (ctx, next) => {
      const { oidcClientMetadata, ...rest } = ctx.guard.body;

      ctx.body = await insertApplication({
        id: applicationId(),
        secret: generateStandardId(),
        oidcClientMetadata: buildOidcClientMetadata(oidcClientMetadata),
        ...rest,
      });

      return next();
    }
  );

  router.get(
    '/applications/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      response: Applications.guard.merge(z.object({ isAdmin: z.boolean() })),
      status: [200, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;

      // Somethings console needs to display demo app info. Build a fixed one for it.
      if (id === demoAppApplicationId) {
        ctx.body = { ...buildDemoAppDataForTenant(tenantId), isAdmin: false };

        return next();
      }

      const application = await findApplicationById(id);
      const applicationsRoles = await findApplicationsRolesByApplicationId(id);

      ctx.body = {
        ...application,
        isAdmin: includesInternalAdminRole(applicationsRoles),
      };

      return next();
    }
  );

  router.patch(
    '/applications/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      body: Applications.createGuard
        .omit({ id: true, createdAt: true })
        .deepPartial()
        .merge(
          object({
            isAdmin: boolean().optional(),
          })
        ),
      response: Applications.guard,
      status: [200, 404, 500],
    }),
    async (ctx, next) => {
      const {
        params: { id },
        body,
      } = ctx.guard;

      const { isAdmin, ...rest } = body;

      // User can enable the admin access of Machine-to-Machine apps by switching on a toggle on Admin Console.
      // Since those apps sit in the user tenant, we provide an internal role to apply the necessary scopes.
      // This role is NOT intended for user assignment.
      if (isAdmin !== undefined) {
        const [applicationsRoles, internalAdminRole] = await Promise.all([
          findApplicationsRolesByApplicationId(id),
          findRoleByRoleName(InternalRole.Admin),
        ]);
        const usedToBeAdmin = includesInternalAdminRole(applicationsRoles);

        assertThat(
          internalAdminRole,
          new RequestError({
            code: 'entity.not_exists',
            status: 500,
            data: { name: InternalRole.Admin },
          })
        );

        if (isAdmin && !usedToBeAdmin) {
          await insertApplicationsRoles([
            { id: generateStandardId(), applicationId: id, roleId: internalAdminRole.id },
          ]);
        } else if (!isAdmin && usedToBeAdmin) {
          await deleteApplicationRole(id, internalAdminRole.id);
        }
      }

      ctx.body = await (Object.keys(rest).length > 0
        ? updateApplicationById(id, rest)
        : findApplicationById(id));

      return next();
    }
  );

  router.delete(
    '/applications/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      response: z.undefined(),
      status: [204, 404],
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;
      // Note: will need delete cascade when application is joint with other tables
      await deleteApplicationById(id);
      ctx.status = 204;

      return next();
    }
  );
}
