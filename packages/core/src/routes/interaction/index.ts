import type { Provider } from 'oidc-provider';

import RequestError from '#src/errors/RequestError/index.js';
import assertThat from '#src/utils/assert-that.js';

import type { AnonymousRouter } from '../types.js';
import koaInteractionBodyGuard from './middleware/koa-interaction-body-guard.js';
import koaSessionSignInExperienceGuard from './middleware/koa-session-sign-in-experience-guard.js';
import { identifierVerification } from './verifications/index.js';

export default function interactionRoutes<T extends AnonymousRouter>(
  router: T,
  provider: Provider
) {
  router.put(
    '/interaction',
    koaInteractionBodyGuard(),
    koaSessionSignInExperienceGuard(provider),
    async (ctx, next) => {
      // Check interaction session
      await provider.interactionDetails(ctx.req, ctx.res);

      // PUT method must provides an event type
      assertThat(ctx.interactionPayload.event, new RequestError('guard.invalid_input'));

      const verifiedIdentifiers = await identifierVerification(ctx);

      return next();
    }
  );
}
