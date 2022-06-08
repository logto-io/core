import { MiddlewareType } from 'koa';
import { IRouterParamContext } from 'koa-router';

import { hasAdminUsers } from '@/queries/user';

export default function koaWelcomeProxy<
  StateT,
  ContextT extends IRouterParamContext,
  ResponseBodyT
>(): MiddlewareType<StateT, ContextT, ResponseBodyT> {
  return async (ctx, next) => {
    if (await hasAdminUsers()) {
      ctx.redirect('/console');

      return;
    }

    await next();
  };
}
