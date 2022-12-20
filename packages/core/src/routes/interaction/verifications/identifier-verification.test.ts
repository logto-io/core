import { Event } from '@logto/schemas';
import { mockEsmWithActual, mockEsmDefault, pickDefault } from '@logto/shared/esm';

import { createMockLogContext } from '#src/test-utils/koa-audit-log.js';
import { createMockProvider } from '#src/test-utils/oidc-provider.js';
import { createContextWithRouteParameters } from '#src/utils/test-utils.js';

import type { SignInInteractionResult } from '../types/index.js';

const { jest } = import.meta;

const { storeInteractionResult } = await mockEsmWithActual('../utils/interaction.js', () => ({
  storeInteractionResult: jest.fn(),
}));
const verifyUserAccount = mockEsmDefault('./user-identity-verification.js', () => jest.fn());

const verifyIdentifier = await pickDefault(import('./identifier-verification.js'));

const verifyUserAccountMock = verifyUserAccount;

describe('verifyIdentifier', () => {
  const ctx = {
    ...createContextWithRouteParameters(),
    ...createMockLogContext(),
  };
  const provider = createMockProvider();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the interaction record if the event is register', async () => {
    const interactionRecord = {
      event: Event.Register,
    };

    const result = await verifyIdentifier(ctx, provider, interactionRecord);

    expect(result).toBe(interactionRecord);
    expect(verifyUserAccountMock).not.toBeCalled();
    expect(storeInteractionResult).not.toBeCalled();
  });

  it('should return and assign the verified result to the interaction record if the event is sign in', async () => {
    const interactionRecord: SignInInteractionResult = {
      event: Event.SignIn,
      identifiers: [{ key: 'emailVerified', value: 'email@logto.io' }],
    };

    const verifiedRecord = {
      ...interactionRecord,
      accountId: 'foo',
    };

    verifyUserAccountMock.mockResolvedValue(verifiedRecord);

    const result = await verifyIdentifier(ctx, provider, interactionRecord);

    expect(result).toBe(verifiedRecord);
    expect(verifyUserAccountMock).toBeCalledWith(interactionRecord);
    expect(storeInteractionResult).toBeCalledWith(verifiedRecord, ctx, provider);
  });
});
