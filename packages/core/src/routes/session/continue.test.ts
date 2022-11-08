import { PasscodeType } from '@logto/schemas';
import dayjs from 'dayjs';
import { Provider } from 'oidc-provider';

import { mockUser } from '@/__mocks__';
import { createRequester } from '@/utils/test-utils';

import continueRoutes, { continueRoute } from './continue';

const getVerificationStorageFromInteraction = jest.fn();

const checkRequiredProfile = jest.fn();
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  checkRequiredProfile: () => checkRequiredProfile(),
  getVerificationStorageFromInteraction: () => getVerificationStorageFromInteraction(),
}));

jest.mock('@/queries/sign-in-experience', () => ({
  findDefaultSignInExperience: jest.fn(),
}));

const updateUserById = jest.fn(async (..._args: unknown[]) => mockUser);
const findUserById = jest.fn(async (..._args: unknown[]) => mockUser);
const hasUser = jest.fn();
const hasUserWithPhone = jest.fn();
const hasUserWithEmail = jest.fn();

jest.mock('@/queries/user', () => ({
  updateUserById: async (...args: unknown[]) => updateUserById(...args),
  findUserById: async () => findUserById(),
  hasUser: async () => hasUser(),
  hasUserWithPhone: async () => hasUserWithPhone(),
  hasUserWithEmail: async () => hasUserWithEmail(),
}));

const interactionResult = jest.fn(async () => 'redirectTo');
const interactionDetails: jest.MockedFunction<() => Promise<unknown>> = jest.fn(async () => ({}));

jest.mock('oidc-provider', () => ({
  Provider: jest.fn(() => ({
    interactionDetails,
    interactionResult,
  })),
}));

afterEach(() => {
  interactionResult.mockClear();
});

describe('session -> continueRoutes', () => {
  const sessionRequest = createRequester({
    anonymousRoutes: continueRoutes,
    provider: new Provider(''),
    middlewares: [
      async (ctx, next) => {
        ctx.addLogContext = jest.fn();
        ctx.log = jest.fn();

        return next();
      },
    ],
  });

  describe('POST /session/sign-in/continue/password', () => {
    it('updates user password, checks required profile, and sign in', async () => {
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
        result: {
          continueSignIn: {
            userId: mockUser.id,
            expiresAt: dayjs().add(1, 'day').toISOString(),
          },
        },
      });
      findUserById.mockResolvedValueOnce({
        ...mockUser,
        passwordEncrypted: null,
        identities: {},
      });
      const response = await sessionRequest.post(`${continueRoute}/password`).send({
        password: 'password',
      });
      expect(response.statusCode).toEqual(200);
      expect(checkRequiredProfile).toHaveBeenCalled();
      expect(updateUserById).toHaveBeenCalledWith(mockUser.id, expect.anything());
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ login: { accountId: mockUser.id } }),
        expect.anything()
      );
    });
  });

  describe('POST /session/sign-in/continue/username', () => {
    it('updates user username, checks required profile, and sign in', async () => {
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
        result: {
          continueSignIn: {
            userId: mockUser.id,
            expiresAt: dayjs().add(1, 'day').toISOString(),
          },
        },
      });
      findUserById.mockResolvedValueOnce({
        ...mockUser,
        username: null,
      });
      const response = await sessionRequest.post(`${continueRoute}/username`).send({
        username: 'username',
      });
      expect(response.statusCode).toEqual(200);
      expect(checkRequiredProfile).toHaveBeenCalled();
      expect(hasUser).toHaveBeenCalled();
      expect(updateUserById).toHaveBeenCalledWith(mockUser.id, expect.anything());
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ login: { accountId: mockUser.id } }),
        expect.anything()
      );
    });
  });

  describe('POST /session/sign-in/continue/email', () => {
    beforeEach(() => {
      getVerificationStorageFromInteraction.mockResolvedValueOnce({ email: 'email' });
    });

    it('updates user email, checks required profile, and sign in', async () => {
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
        result: {
          continueSignIn: {
            userId: mockUser.id,
            expiresAt: dayjs().add(1, 'day').toISOString(),
            type: PasscodeType.Continue,
          },
        },
      });
      findUserById.mockResolvedValueOnce({
        ...mockUser,
        primaryEmail: null,
      });
      const response = await sessionRequest.post(`${continueRoute}/email`).send();
      expect(response.statusCode).toEqual(200);
      expect(checkRequiredProfile).toHaveBeenCalled();
      expect(hasUser).toHaveBeenCalled();
      expect(updateUserById).toHaveBeenCalledWith(mockUser.id, expect.anything());
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ login: { accountId: mockUser.id } }),
        expect.anything()
      );
    });
  });

  describe('POST /session/sign-in/continue/sms', () => {
    it('updates user phone, checks required profile, and sign in', async () => {
      getVerificationStorageFromInteraction.mockResolvedValueOnce({ phone: 'phone' });
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
        result: {
          continueSignIn: {
            userId: mockUser.id,
            expiresAt: dayjs().add(1, 'day').toISOString(),
            type: PasscodeType.Continue,
          },
        },
      });
      findUserById.mockResolvedValueOnce({
        ...mockUser,
        primaryPhone: null,
      });
      const response = await sessionRequest.post(`${continueRoute}/sms`).send();
      expect(response.statusCode).toEqual(200);
      expect(checkRequiredProfile).toHaveBeenCalled();
      expect(hasUserWithPhone).toHaveBeenCalled();
      expect(updateUserById).toHaveBeenCalledWith(mockUser.id, expect.anything());
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ login: { accountId: mockUser.id } }),
        expect.anything()
      );
    });
  });

  describe('general invalid cases', () => {
    test.each(['password', 'username', 'email', 'sms'])(
      'throws on empty continue sign in storage',
      async (route) => {
        interactionDetails.mockResolvedValueOnce({
          jti: 'jti',
          result: {},
        });
        const response = await sessionRequest.post(`${continueRoute}/${route}`).send({
          password: 'password',
          username: 'username',
        });
        expect(response.statusCode).toEqual(401);
      }
    );

    test.each(['password', 'username', 'email', 'sms'])(
      'throws on expired continue sign in storage',
      async () => {
        interactionDetails.mockResolvedValueOnce({
          jti: 'jti',
          result: {
            continueSignIn: {
              userId: mockUser.id,
              expiresAt: dayjs().subtract(1, 'second').toISOString(),
            },
          },
        });
        const response = await sessionRequest.post(`${continueRoute}/password`).send({
          password: 'password',
        });
        expect(response.statusCode).toEqual(401);
      }
    );
  });
});
