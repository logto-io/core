import { mountedApps } from '@/env/consts';
import { createContextWithRouteParameters } from '@/utils/test-utils';

import koaUIProxy from './koa-ui-proxy';

const mockProxyMiddleware = jest.fn();
const mockStaticMiddleware = jest.fn();

jest.mock('fs/promises', () => ({
  ...jest.requireActual('fs/promises'),
  readdir: jest.fn().mockResolvedValue(['sign-in']),
}));

jest.mock('koa-proxies', () => jest.fn(() => mockProxyMiddleware));
jest.mock('koa-static', () => jest.fn(() => mockStaticMiddleware));

describe('koaUIProxy middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  const next = jest.fn();

  for (const app of mountedApps) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    it(`${app} path should not call uiProxy`, async () => {
      const ctx = createContextWithRouteParameters({
        url: `/${app}/foo`,
      });

      await koaUIProxy()(ctx, next);

      expect(mockProxyMiddleware).not.toBeCalled();
    });
  }

  it('dev env should call proxy middleware for ui paths', async () => {
    const ctx = createContextWithRouteParameters();
    await koaUIProxy()(ctx, next);
    expect(mockProxyMiddleware).toBeCalled();
  });

  it('production env should overwrite the request path to root if no target ui file are detected', async () => {
    // Mock the @/env/consts
    jest.mock('@/env/consts', () => ({
      ...jest.requireActual('@/env/consts'),
      isProduction: true,
    }));

    /* eslint-disable @typescript-eslint/no-require-imports */
    /* eslint-disable @typescript-eslint/no-var-requires */
    /* eslint-disable unicorn/prefer-module */
    const koaUIProxyModule = require('./koa-ui-proxy') as { default: typeof koaUIProxy };
    /* eslint-enable @typescript-eslint/no-require-imports */
    /* eslint-enable @typescript-eslint/no-var-requires */
    /* eslint-enable unicorn/prefer-module */
    const ctx = createContextWithRouteParameters({
      url: '/foo',
    });

    await koaUIProxyModule.default()(ctx, next);
    expect(mockStaticMiddleware).toBeCalled();
    expect(ctx.request.path).toEqual('/');
  });

  it('production env should call the static middleware if path hit the ui file directory', async () => {
    // Mock the @/env/consts
    jest.mock('@/env/consts', () => ({
      ...jest.requireActual('@/env/consts'),
      isProduction: true,
    }));

    /* eslint-disable @typescript-eslint/no-require-imports */
    /* eslint-disable @typescript-eslint/no-var-requires */
    /* eslint-disable unicorn/prefer-module */
    const koaUIProxyModule = require('./koa-ui-proxy') as { default: typeof koaUIProxy };
    /* eslint-enable @typescript-eslint/no-require-imports */
    /* eslint-enable @typescript-eslint/no-var-requires */
    /* eslint-enable unicorn/prefer-module */
    const ctx = createContextWithRouteParameters({
      url: '/sign-in',
    });

    await koaUIProxyModule.default()(ctx, next);
    expect(mockStaticMiddleware).toBeCalled();
  });
});
