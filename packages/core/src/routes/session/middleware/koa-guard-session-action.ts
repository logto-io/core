import { SignInMode } from '@logto/schemas';
import { adminConsoleApplicationId } from '@logto/schemas/lib/seeds';
import type { MiddlewareType } from 'koa';
import type { Provider } from 'oidc-provider';
import { errors } from 'oidc-provider';

import RequestError from '@/errors/RequestError';
import { getApplicationIdFromInteraction } from '@/lib/session';
import { getSignInExperienceForApplication } from '@/lib/sign-in-experience';
import assertThat from '@/utils/assert-that';

export default function koaGuardSessionAction<StateT, ContextT, ResponseBodyT>(
  provider: Provider,
  forType: 'sign-in' | 'register'
): MiddlewareType<StateT, ContextT, ResponseBodyT> {
  const forbiddenError = new RequestError({ code: 'auth.forbidden', status: 403 });

  return async (ctx, next) => {
    const interaction = await provider
      .interactionDetails(ctx.req, ctx.res)
      .catch((error: unknown) => {
        // Should not block if interaction is not found
        if (error instanceof errors.SessionNotFound) {
          return null;
        }

        throw error;
      });

    /**
     * We don't guard admin console in API for now since logically there's no need.
     * Update to honor the config if we're implementing per-app SIE.
     */
    if (interaction?.params.client_id === adminConsoleApplicationId) {
      return next();
    }

    const { signInMode } = await getSignInExperienceForApplication(
      await getApplicationIdFromInteraction(ctx, provider)
    );

    if (forType === 'sign-in') {
      assertThat(signInMode !== SignInMode.Register, forbiddenError);
    }

    if (forType === 'register') {
      assertThat(signInMode !== SignInMode.SignIn, forbiddenError);
    }

    return next();
  };
}
