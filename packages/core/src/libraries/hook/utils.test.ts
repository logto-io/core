import { HookEvent } from '@logto/schemas';
import { createMockUtils } from '@logto/shared/esm';
import { got } from 'got';

const { jest } = import.meta;

const { mockEsm, mockEsmWithActual } = createMockUtils(jest);

const post = jest
  .spyOn(got, 'post')
  // @ts-expect-error
  .mockImplementation(jest.fn(async () => ({ statusCode: 200, body: '{"message":"ok"}' })));

const mockSignature = 'mockSignature';
mockEsm('#src/utils/sign.js', () => ({
  sign: () => mockSignature,
}));

const mockNanoId = 'mockNanoidId';
await mockEsmWithActual('@logto/shared', () => ({
  buildIdGenerator: jest.fn().mockReturnValue(mockNanoId),
  generateStandardId: jest.fn().mockReturnValue(mockNanoId),
}));

const { generateHookTestPayload, sendWebhookRequest } = await import('./utils.js');

describe('sendWebhookRequest', () => {
  it('should call got.post with correct values', async () => {
    const mockHookId = 'mockHookId';
    const mockEvent: HookEvent = HookEvent.PostSignIn;
    const testPayload = generateHookTestPayload(mockHookId, mockEvent);

    const mockUrl = 'https://logto.gg';
    const mockSigningKey = 'mockSigningKey';

    await sendWebhookRequest({
      hookConfig: {
        url: mockUrl,
        headers: { foo: 'bar' },
      },
      payload: testPayload,
      signingKey: mockSigningKey,
    });

    expect(post).toBeCalledWith(mockUrl, {
      headers: {
        'user-agent': 'Logto (https://logto.io/)',
        foo: 'bar',
        'logto-signature-sha-256': mockSignature,
        'logto-message-id': mockNanoId,
      },
      json: testPayload,
      retry: { limit: 3 },
      timeout: { request: 10_000 },
    });
  });
});
