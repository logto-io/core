import { DefaultState, DefaultContext, ParameterizedContext, Next } from 'koa';

declare module 'koa' {
  // Have to do this patch since `compose.Middleware` returns `any`.
  export type KoaNext<T> = () => Promise<T>;
  export type KoaMiddleware<T, R> = (context: T, next: KoaNext<R>) => Promise<void>;
  export type MiddlewareType<
    StateT = DefaultState,
    ContextT = DefaultContext,
    ResponseBodyT = any,
    NextT = void
  > = KoaMiddleware<ParameterizedContext<StateT, ContextT, ResponseBodyT>, NextT>;
}
