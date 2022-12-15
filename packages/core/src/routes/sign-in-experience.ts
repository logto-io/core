import { ConnectorType, SignInExperiences } from '@logto/schemas';
import { literal, object, string } from 'zod';

import { getLogtoConnectors } from '#src/connectors/index.js';
import {
  validateBranding,
  validateLanguageInfo,
  validateSignUp,
  validateSignIn,
} from '#src/libraries/sign-in-experience/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import {
  findDefaultSignInExperience,
  updateDefaultSignInExperience,
} from '#src/queries/sign-in-experience.js';

import type { AuthedRouter } from './types.js';

export default function signInExperiencesRoutes<T extends AuthedRouter>(router: T) {
  /**
   * As we only support single signInExperience settings for V1
   * always return the default settings in DB for the /sign-in-exp get method
   */
  router.get('/sign-in-exp', async (ctx, next) => {
    ctx.body = await findDefaultSignInExperience();

    return next();
  });

  router.patch(
    '/sign-in-exp',
    koaGuard({
      body: SignInExperiences.createGuard
        .omit({ id: true, termsOfUseUrl: true })
        .merge(
          object({
            termsOfUseUrl: string().url().optional().nullable().or(literal('')),
          })
        )
        .partial(),
    }),
    async (ctx, next) => {
      const { socialSignInConnectorTargets, ...rest } = ctx.guard.body;
      const { branding, languageInfo, signUp, signIn } = rest;

      if (branding) {
        validateBranding(branding);
      }

      if (languageInfo) {
        await validateLanguageInfo(languageInfo);
      }

      const connectors = await getLogtoConnectors();

      // Remove unavailable connectors
      const filteredSocialSignInConnectorTargets = socialSignInConnectorTargets?.filter((target) =>
        connectors.some(
          (connector) =>
            connector.metadata.target === target && connector.type === ConnectorType.Social
        )
      );

      if (signUp) {
        validateSignUp(signUp, connectors);
      }

      if (signIn && signUp) {
        validateSignIn(signIn, signUp, connectors);
      } else if (signIn) {
        const signInExperience = await findDefaultSignInExperience();
        validateSignIn(signIn, signInExperience.signUp, connectors);
      }
      ctx.body = await updateDefaultSignInExperience(
        filteredSocialSignInConnectorTargets
          ? {
              ...rest,
              socialSignInConnectorTargets: filteredSocialSignInConnectorTargets,
            }
          : rest
      );

      return next();
    }
  );
}
