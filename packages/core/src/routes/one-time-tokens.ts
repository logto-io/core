import { OneTimeTokens, oneTimeTokenContextGuard } from '@logto/schemas';
import { generateStandardId, generateStandardSecret } from '@logto/shared';
import { z } from 'zod';

import { EnvSet } from '#src/env-set/index.js';
import koaGuard from '#src/middleware/koa-guard.js';

import type { ManagementApiRouter, RouterInitArgs } from './types.js';

// Default expiration time: 2 days.
// Both Cloudflare and Spotify are using this value.
const defaultExpiresTime = 2 * 24 * 60 * 60;

export default function oneTimeTokenRoutes<T extends ManagementApiRouter>(
  ...[
    router,
    {
      queries: {
        oneTimeTokens: { insertOneTimeToken },
      },
    },
  ]: RouterInitArgs<T>
) {
  if (!EnvSet.values.isDevFeaturesEnabled) {
    return;
  }

  router.post(
    '/one-time-tokens',
    koaGuard({
      body: OneTimeTokens.createGuard
        .pick({ email: true })
        .merge(
          z.object({
            // Expiration time in seconds.
            expiresIn: z.number().optional(),
          })
        )
        .merge(oneTimeTokenContextGuard),
      response: OneTimeTokens.guard,
      status: [201, 422],
    }),
    async (ctx, next) => {
      const { body } = ctx.guard;
      const { email, expiresIn, ...context } = body;

      const expiresAt = new Date(Date.now() + (expiresIn ?? defaultExpiresTime) * 1000);
      const oneTimeToken = await insertOneTimeToken({
        id: generateStandardId(),
        email,
        // TODO: export generate random string with specified length from @logto/shared.
        token: generateStandardSecret(),
        expiresAt: expiresAt.getTime(),
        context,
      });

      ctx.status = 201;
      ctx.body = oneTimeToken;
      return next();
    }
  );
}
