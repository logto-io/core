import { managementApiHooksRegistration } from '@logto/schemas';
import { trySafe } from '@silverhand/essentials';
import { type MiddlewareType } from 'koa';
import { type IRouterParamContext } from 'koa-router';

import { ManagementHookContextManager } from '#src/libraries/hook/types.js';
import {
  buildManagementApiHookRegistrationKey,
  hasRegisteredManagementApiHook,
} from '#src/libraries/hook/utils.js';
import type Libraries from '#src/tenants/Libraries.js';

export type WithHookContext<ContextT extends IRouterParamContext = IRouterParamContext> =
  ContextT & { appendHookContext: ManagementHookContextManager['appendContext'] };

/**
 * The factory to create a new management hook middleware function.
 *
 * To trigger management hooks, use `appendHookContext` to append the context.
 *
 * @param hooks The hooks library.
 * @returns The middleware function.
 */
export const koaManagementApiHooks = <StateT, ContextT extends IRouterParamContext, ResponseT>(
  hooks: Libraries['hooks']
): MiddlewareType<StateT, WithHookContext<ContextT>, ResponseT> => {
  return async (ctx, next) => {
    const {
      header: { 'user-agent': userAgent },
      ip,
    } = ctx;

    const managementHooks = new ManagementHookContextManager({ userAgent, ip });

    /**
     * Append a hook context to trigger management hooks. If multiple contexts are appended, all of
     * them will be triggered.
     */
    ctx.appendHookContext = managementHooks.appendContext.bind(managementHooks);

    await next();

    // Auto append pre-registered management API hooks if any
    const { path, method, body, status, _matchedRoute } = ctx;
    const hookRegistrationKey = buildManagementApiHookRegistrationKey(method, _matchedRoute);

    // TODO: @simeng-li do we need to insert the request body to the hook context?
    if (hasRegisteredManagementApiHook(hookRegistrationKey)) {
      const event = managementApiHooksRegistration[hookRegistrationKey];
      managementHooks.appendContext({ event, data: { path, method, body, status } });
    }

    if (managementHooks.contextArray.length > 0) {
      // Hooks should not crash the app
      void trySafe(hooks.triggerManagementHooks(managementHooks));
    }
  };
};
