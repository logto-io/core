import { createMockContext } from '@shopify/jest-koa-mocks';

import RequestError from '@/errors/RequestError';

import koaErrorHandler from './koa-error-handler';

describe('koaErrorHandler middleware', () => {
  const mockBody = { data: 'foo' };

  const ctx = createMockContext({
    customProperties: {
      body: mockBody,
    },
  });

  const next = jest.fn().mockReturnValue(Promise.resolve());

  beforeEach(() => {
    ctx.body = mockBody;
    ctx.status = 200;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('expect to return error response if error type is RequestError', async () => {
    const error = new RequestError('auth.unauthorized');
    next.mockRejectedValueOnce(error);
    await koaErrorHandler()(ctx, next);
    expect(ctx.status).toEqual(error.status);
    expect(ctx.body).toEqual(error.body);
  });

  it('expect to return orginal body if not error found', async () => {
    await koaErrorHandler()(ctx, next);
    expect(ctx.status).toEqual(200);
    expect(ctx.body).toEqual(mockBody);
  });

  it('expect status 500 if error type is not RequestError', async () => {
    next.mockRejectedValueOnce(new Error('err'));
    await koaErrorHandler()(ctx, next);
    expect(ctx.status).toEqual(500);
  });
});
