import { SignInExperiences } from '@logto/schemas';

import { getEnabledSocialConnectorIds } from '@/connectors';
import koaGuard from '@/middleware/koa-guard';
import {
  findDefaultSignInExperience,
  updateDefaultSignInExperience,
} from '@/queries/sign-in-experience';

import { AuthedRouter } from './types';

export default function signInExperiencesRoutes<T extends AuthedRouter>(router: T) {
  /**
   * As we only support single signInExperience settings for V1
   * always return the default settings in DB for the /sign-in-exp get method
   */
  router.get('/sign-in-exp', async (ctx, next) => {
    const signInExperience = await findDefaultSignInExperience();
    const { socialSignInConnectorIds: selectedSocialSignInConnectorIds } = signInExperience;
    const enabledSocialConnectorIds = new Set(await getEnabledSocialConnectorIds());
    const socialSignInConnectorIds = selectedSocialSignInConnectorIds.filter((id) =>
      enabledSocialConnectorIds.has(id)
    );

    ctx.body = {
      ...signInExperience,
      socialSignInConnectorIds,
    };

    return next();
  });

  router.patch(
    '/sign-in-exp',
    koaGuard({
      body: SignInExperiences.createGuard.omit({ id: true }).partial(),
    }),
    async (ctx, next) => {
      const { body } = ctx.guard;

      ctx.body = await updateDefaultSignInExperience({
        ...body,
      });

      return next();
    }
  );
}
