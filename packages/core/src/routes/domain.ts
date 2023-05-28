import { Domains, domainResponseGuard, domainSelectFields } from '@logto/schemas';
import { generateStandardId } from '@logto/shared';
import { pick } from '@silverhand/essentials';
import { z } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import assertThat from '#src/utils/assert-that.js';

import type { AuthedRouter, RouterInitArgs } from './types.js';

export default function domainRoutes<T extends AuthedRouter>(
  ...[router, { queries }]: RouterInitArgs<T>
) {
  const {
    domains: { findAllDomains, findDomainById, insertDomain, deleteDomainById },
  } = queries;

  router.get(
    '/domains',
    koaGuard({ response: domainResponseGuard.array(), status: 200 }),
    async (ctx, next) => {
      const domains = await findAllDomains();
      ctx.body = domains.map((domain) => pick(domain, ...domainSelectFields));

      return next();
    }
  );

  router.get(
    '/domains/:id',
    koaGuard({
      params: z.object({ id: z.string() }),
      response: domainResponseGuard,
      status: [200, 404],
    }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;

      const domain = await findDomainById(id);

      ctx.body = pick(domain, ...domainSelectFields);

      return next();
    }
  );

  router.post(
    '/domains',
    koaGuard({
      body: Domains.createGuard.pick({ domain: true }),
      response: domainResponseGuard,
      status: [201, 422],
    }),
    async (ctx, next) => {
      const existingDomains = await findAllDomains();
      assertThat(
        existingDomains.length === 0,
        new RequestError({
          code: 'domain.limit_to_one_domain',
          status: 422,
        })
      );

      const domain = await insertDomain({
        ...ctx.guard.body,
        id: generateStandardId(),
      });

      ctx.status = 201;
      ctx.body = pick(domain, ...domainSelectFields);

      return next();
    }
  );

  router.delete(
    '/domains/:id',
    koaGuard({ params: z.object({ id: z.string() }), status: [204, 404] }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;
      await deleteDomainById(id);
      ctx.status = 204;

      return next();
    }
  );
}
