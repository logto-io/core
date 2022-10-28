import { z } from 'zod';

import RequestError from '@/errors/RequestError';
import { verifyBearerTokenFromRequest } from '@/middleware/koa-auth';
import koaGuard from '@/middleware/koa-guard';
import assertThat from '@/utils/assert-that';

import type { AnonymousRouter } from './types';

/**
 * Authn stands for authentication.
 * This router will have a route `/authn` to authenticate tokens with a general manner.
 * For now, we only implement the API for Hasura authentication.
 */
export default function authnRoutes<T extends AnonymousRouter>(router: T) {
  router.get(
    '/authn/hasura',
    koaGuard({
      query: z.object({ resource: z.string().min(1), unauthorizedRole: z.string().optional() }),
      status: [200, 401],
    }),
    async (ctx, next) => {
      const { resource, unauthorizedRole } = ctx.guard.query;
      const expectedRole = ctx.headers['expected-role']?.toString();

      const verifyToken = async (expectedResource?: string) => {
        try {
          return await verifyBearerTokenFromRequest(ctx.request, expectedResource);
        } catch {
          return {
            sub: undefined,
            roleNames: undefined,
          };
        }
      };

      const { sub, roleNames } = await verifyToken(resource);

      if (unauthorizedRole && (!expectedRole || !roleNames?.includes(expectedRole))) {
        ctx.body = {
          'X-Hasura-User-Id':
            sub ??
            // When the previous token verification throws, the reason could be resource mismatch.
            // So we verify the token again with no resource provided.
            (await verifyToken().then(({ sub }) => sub)),
          'X-Hasura-Role': unauthorizedRole,
        };
        ctx.status = 200;

        return next();
      }

      if (expectedRole) {
        assertThat(
          roleNames?.includes(expectedRole),
          new RequestError({ code: 'auth.expected_role_not_found', status: 401 })
        );
      }

      ctx.body = {
        'X-Hasura-User-Id': sub,
        'X-Hasura-Role': expectedRole,
      };
      ctx.status = 200;

      return next();
    }
  );
}
