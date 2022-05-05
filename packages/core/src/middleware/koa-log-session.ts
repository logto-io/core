import { MiddlewareType } from 'koa';
import { Provider } from 'oidc-provider';

import { WithLogContext } from '@/middleware/koa-log';

export default function koaLogSession<StateT, ContextT extends WithLogContext, ResponseBodyT>(
  provider: Provider
): MiddlewareType<StateT, ContextT, ResponseBodyT> {
  return async (ctx, next) => {
    const nextPromise = next();

    const {
      jti,
      params: { client_id },
    } = await provider.interactionDetails(ctx.req, ctx.res);
    ctx.logSession({ sessionId: jti, applicationId: String(client_id) });

    return nextPromise;
  };
}
