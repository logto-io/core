import { InteractionEvent } from '@logto/schemas';
import { mockEsm, mockEsmWithActual, pickDefault } from '@logto/shared/esm';

import RequestError from '#src/errors/RequestError/index.js';

import type { Identifier } from '../types/index.js';

const { jest } = import.meta;

await mockEsmWithActual('#src/queries/user.js', () => ({
  findUserById: jest.fn().mockResolvedValue({ id: 'foo' }),
  hasUserWithEmail: jest.fn().mockResolvedValue(false),
  hasUserWithPhone: jest.fn().mockResolvedValue(false),
  hasUserWithIdentity: jest.fn().mockResolvedValue(false),
}));

mockEsm('#src/connectors/index.js', () => ({
  getLogtoConnectorById: jest.fn().mockResolvedValue({
    metadata: { target: 'logto' },
  }),
}));

const verifyProfile = await pickDefault(import('./profile-verification.js'));

describe('profile protected identifier verification', () => {
  const baseInteraction = { event: InteractionEvent.SignIn, accountId: 'foo' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('email, phone and social identifier must be verified', () => {
    it('email without a verified identifier should throw', async () => {
      const interaction = {
        ...baseInteraction,
        profile: {
          email: 'email',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
    });

    it('email with unmatched identifier should throw', async () => {
      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'phone' }];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          email: 'email',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
    });

    it('email with proper identifier should not throw', async () => {
      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'email' }];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          email: 'email',
        },
      };

      await expect(verifyProfile(interaction)).resolves.not.toThrow();
    });

    it('phone without a verified identifier should throw', async () => {
      const interaction = {
        ...baseInteraction,
        profile: {
          phone: 'phone',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
    });

    it('phone with unmatched identifier should throw', async () => {
      const identifiers: Identifier[] = [{ key: 'phoneVerified', value: 'email' }];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          phone: 'phone',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.verification_session_not_found', status: 404 })
      );
    });

    it('phone with proper identifier should not throw', async () => {
      const identifiers: Identifier[] = [{ key: 'phoneVerified', value: 'phone' }];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          phone: 'phone',
        },
      };

      await expect(verifyProfile(interaction)).resolves.not.toThrow();
    });

    it('connectorId without a verified identifier should throw', async () => {
      const identifiers: Identifier[] = [{ key: 'emailVerified', value: 'foo@logto.io' }];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          connectorId: 'connectorId',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.connector_session_not_found', status: 404 })
      );
    });

    it('connectorId with unmatched identifier should throw', async () => {
      const identifiers: Identifier[] = [
        { key: 'social', connectorId: 'connectorId', userInfo: { id: 'foo' } },
      ];
      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          connectorId: 'logto',
        },
      };

      await expect(verifyProfile(interaction)).rejects.toMatchError(
        new RequestError({ code: 'session.connector_session_not_found', status: 404 })
      );
    });

    it('connectorId with proper identifier should not throw', async () => {
      const identifiers: Identifier[] = [
        { key: 'accountId', value: 'foo' },
        { key: 'social', connectorId: 'logto', userInfo: { id: 'foo' } },
      ];

      const interaction = {
        ...baseInteraction,
        identifiers,
        profile: {
          connectorId: 'logto',
        },
      };

      await expect(verifyProfile(interaction)).resolves.not.toThrow();
    });
  });
});
