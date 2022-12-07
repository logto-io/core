import { Event, MissingProfile, SignInIdentifier } from '@logto/schemas';

import { mockSignInExperience } from '#src/__mocks__/sign-in-experience.js';
import RequestError from '#src/errors/RequestError/index.js';
import { findUserById } from '#src/queries/user.js';
import { createContextWithRouteParameters } from '#src/utils/test-utils.js';

import type { IdentifierVerifiedInteractionResult } from '../types/index.js';
import { isUserPasswordSet } from '../utils/index.js';
import validateMandatoryUserProfile from './mandatory-user-profile-validation.js';

jest.mock('oidc-provider', () => ({
  Provider: jest.fn(() => ({
    interactionDetails: jest.fn(async () => ({ params: {}, jti: 'jti' })),
  })),
}));

jest.mock('#src/queries/user.js', () => ({
  findUserById: jest.fn(),
}));

jest.mock('../utils/index.js', () => ({
  isUserPasswordSet: jest.fn(),
}));

describe('validateMandatoryUserProfile', () => {
  const baseCtx = createContextWithRouteParameters();
  const interaction: IdentifierVerifiedInteractionResult = {
    event: Event.SignIn,
    accountId: 'foo',
  };

  it('username and password missing but required', async () => {
    const ctx = {
      ...baseCtx,
      signInExperience: mockSignInExperience,
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).rejects.toMatchError(
      new RequestError(
        { code: 'user.missing_profile', status: 422 },
        { missingProfile: [MissingProfile.password, MissingProfile.username] }
      )
    );

    await expect(
      validateMandatoryUserProfile(ctx, {
        ...interaction,
        profile: {
          username: 'username',
          password: 'password',
        },
      })
    ).resolves.not.toThrow();
  });

  it('user account has username and password', async () => {
    (findUserById as jest.Mock).mockResolvedValueOnce({
      username: 'foo',
    });
    (isUserPasswordSet as jest.Mock).mockResolvedValueOnce(true);

    const ctx = {
      ...baseCtx,
      signInExperience: mockSignInExperience,
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).resolves.not.toThrow();
  });

  it('email missing but required', async () => {
    const ctx = {
      ...baseCtx,
      signInExperience: {
        ...mockSignInExperience,
        signUp: { identifiers: [SignInIdentifier.Email], password: false, verify: true },
      },
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).rejects.toMatchError(
      new RequestError(
        { code: 'user.missing_profile', status: 422 },
        { missingProfile: [MissingProfile.email] }
      )
    );
  });

  it('user account has email', async () => {
    (findUserById as jest.Mock).mockResolvedValueOnce({
      primaryEmail: 'email',
    });

    const ctx = {
      ...baseCtx,
      signInExperience: {
        ...mockSignInExperience,
        signUp: { identifiers: [SignInIdentifier.Email], password: false, verify: true },
      },
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).resolves.not.toThrow();
  });

  it('phone missing but required', async () => {
    const ctx = {
      ...baseCtx,
      signInExperience: {
        ...mockSignInExperience,
        signUp: { identifiers: [SignInIdentifier.Sms], password: false, verify: true },
      },
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).rejects.toMatchError(
      new RequestError(
        { code: 'user.missing_profile', status: 422 },
        { missingProfile: [MissingProfile.phone] }
      )
    );
  });

  it('user account has phone', async () => {
    (findUserById as jest.Mock).mockResolvedValueOnce({
      primaryPhone: 'phone',
    });

    const ctx = {
      ...baseCtx,
      signInExperience: {
        ...mockSignInExperience,
        signUp: { identifiers: [SignInIdentifier.Sms], password: false, verify: true },
      },
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).resolves.not.toThrow();
  });

  it('email or Phone required', async () => {
    const ctx = {
      ...baseCtx,
      signInExperience: {
        ...mockSignInExperience,
        signUp: {
          identifiers: [SignInIdentifier.Email, SignInIdentifier.Sms],
          password: false,
          verify: true,
        },
      },
    };

    await expect(validateMandatoryUserProfile(ctx, interaction)).rejects.toMatchError(
      new RequestError(
        { code: 'user.missing_profile', status: 422 },
        { missingProfile: [MissingProfile.emailOrPhone] }
      )
    );

    await expect(
      validateMandatoryUserProfile(ctx, { ...interaction, profile: { email: 'email' } })
    ).resolves.not.toThrow();

    await expect(
      validateMandatoryUserProfile(ctx, { ...interaction, profile: { phone: '123456' } })
    ).resolves.not.toThrow();
  });
});
