import { createContextWithRouteParameters } from '@/utils/test-utils';

import koaRootProxy from './koa-root-proxy';

describe('koaRootProxy', () => {
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('empty path should directly return', async () => {
    const ctx = createContextWithRouteParameters({
      url: '/',
    });

    await koaRootProxy()(ctx, next);

    expect(next).not.toBeCalled();
  });

  it('non-empty path should return next', async () => {
    const ctx = createContextWithRouteParameters({
      url: '/console',
    });
    await koaRootProxy()(ctx, next);
    expect(next).toBeCalled();
  });
});
