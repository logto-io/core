import type { MiddlewareType } from 'koa';
import type { IRouterParamContext } from 'koa-router';
import type Provider from 'oidc-provider';

import envSet from '#src/env-set/index.js';
import { appendPath } from '#src/utils/url.js';

// Need To Align With UI
export const sessionNotFoundPath = '/unknown-session';
export const guardedPath = [
  '/sign-in',
  '/register',
  '/social/register',
  '/reset-password',
  '/forgot-password',
];

export default function koaSpaSessionGuard<
  StateT,
  ContextT extends IRouterParamContext,
  ResponseBodyT
>(provider: Provider): MiddlewareType<StateT, ContextT, ResponseBodyT> {
  const { endpoint } = envSet.values;

  return async (ctx, next) => {
    const requestPath = ctx.request.path;
    const isPreview = ctx.request.URL.searchParams.get('preview');
    const isSessionRequiredPath = guardedPath.some((path) => requestPath.startsWith(path));

    if (isSessionRequiredPath && !isPreview) {
      try {
        await provider.interactionDetails(ctx.req, ctx.res);
      } catch {
        ctx.redirect(appendPath(endpoint, sessionNotFoundPath).toString());

        return;
      }
    }

    return next();
  };
}
