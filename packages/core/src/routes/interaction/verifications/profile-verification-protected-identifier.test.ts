import { Event } from '@logto/schemas';
import { Provider } from 'oidc-provider';

import RequestError from '#src/errors/RequestError/index.js';
import { createContextWithRouteParameters } from '#src/utils/test-utils.js';

import type { Identifier, InteractionContext } from '../types/index.js';
import { storeInteractionResult } from '../utils/interaction.js';
import verifyProfile from './profile-verification.js';

jest.mock('oidc-provider', () => ({
  Provider: jest.fn(() => ({
    interactionDetails: jest.fn(async () => ({ params: {}, jti: 'jti' })),
  })),
}));

jest.mock('../utils/interaction.js', () => ({
  storeInteractionResult: jest.fn(),
}));

jest.mock('#src/queries/user.js', () => ({
  findUserById: jest.fn().mockResolvedValue({ id: 'foo' }),
  hasUserWithEmail: jest.fn().mockResolvedValue(false),
  hasUserWithPhone: jest.fn().mockResolvedValue(false),
  hasUserWithIdentity: jest.fn().mockResolvedValue(false),
}));

jest.mock('#src/connectors/index.js', () => ({
  getLogtoConnectorById: jest.fn().mockResolvedValue({
    metadata: { target: 'logto' },
  }),
}));

describe('profile protected identifier verification', () => {
  const baseCtx = createContextWithRouteParameters();
  const interaction = { event: Event.SignIn, accountId: 'foo' };
  const provider = new Provider('');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('email, phone and social identifier must be verified', () => {
    it('email without a verified identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            email: 'email',
          },
        },
      };

      await expect(verifyProfile(ctx, provider, interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('email with unmatched identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            email: 'email',
          },
        },
      };

      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'phone' }];
      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('email with proper identifier should not throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            email: 'email',
          },
        },
      };

      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'email' }];
      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).resolves.not.toThrow();
      expect(storeInteractionResult).toBeCalledWith(
        {
          ...interaction,
          identifiers,
          profile: ctx.interactionPayload.profile,
        },
        ctx,
        provider
      );
    });

    it('phone without a verified identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            phone: 'phone',
          },
        },
      };

      await expect(verifyProfile(ctx, provider, interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('phone with unmatched identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            phone: 'phone',
          },
        },
      };

      const identifiers: Identifier[] = [{ key: 'phoneVerified', value: 'email' }];
      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('phone with proper identifier should not throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            phone: 'phone',
          },
        },
      };

      const identifiers: Identifier[] = [{ key: 'phoneVerified', value: 'phone' }];
      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).resolves.not.toThrow();
      expect(storeInteractionResult).toBeCalledWith(
        {
          ...interaction,
          identifiers,
          profile: ctx.interactionPayload.profile,
        },
        ctx,
        provider
      );
    });

    it('connectorId without a verified identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            connectorId: 'connectorId',
          },
        },
      };

      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'foo@logto.io' }];

      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).rejects.toMatchError(
        new RequestError({ code: 'session.connector_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('connectorId with unmatched identifier should throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            connectorId: 'logto',
          },
        },
      };

      const identifiers: Identifier[] = [
        { key: 'social', connectorId: 'connectorId', userInfo: { id: 'foo' } },
      ];
      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).rejects.toMatchError(
        new RequestError({ code: 'session.connector_session_not_found', status: 404 })
      );
      expect(storeInteractionResult).not.toBeCalled();
    });

    it('connectorId with proper identifier should not throw', async () => {
      const ctx: InteractionContext = {
        ...baseCtx,
        interactionPayload: {
          event: Event.SignIn,
          profile: {
            connectorId: 'logto',
          },
        },
      };

      const identifiers: Identifier[] = [
        { key: 'accountId', value: 'foo' },
        { key: 'social', connectorId: 'logto', userInfo: { id: 'foo' } },
      ];

      await expect(
        verifyProfile(ctx, provider, { ...interaction, identifiers })
      ).resolves.not.toThrow();
      expect(storeInteractionResult).toBeCalledWith(
        {
          ...interaction,
          identifiers,
          profile: ctx.interactionPayload.profile,
        },
        ctx,
        provider
      );
    });
  });
});
