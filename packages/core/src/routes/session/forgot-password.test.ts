import { VerificationCodeType } from '@logto/connector-kit';
import type { User } from '@logto/schemas';
import { addDays, subDays } from 'date-fns';
import { Provider } from 'oidc-provider';

import {
  mockPasswordEncrypted,
  mockSignInExperience,
  mockUserWithPassword,
} from '#src/__mocks__/index.js';
import RequestError from '#src/errors/RequestError/index.js';
import { createRequester } from '#src/utils/test-utils.js';

import forgotPasswordRoutes, { forgotPasswordRoute } from './forgot-password.js';

const encryptUserPassword = jest.fn(async (password: string) => ({
  passwordEncrypted: password + '_user1',
  passwordEncryptionMethod: 'Argon2i',
}));
const findUserById = jest.fn(async (): Promise<User> => mockUserWithPassword);
const updateUserById = jest.fn(async (..._args: unknown[]) => ({ userId: 'id' }));
const findDefaultSignInExperience = jest.fn(async () => mockSignInExperience);
const getYesterdayDate = () => subDays(Date.now(), 1);
const getTomorrowDate = () => addDays(Date.now(), 1);

jest.mock('#src/libraries/user.js', () => ({
  ...jest.requireActual('#src/libraries/user.js'),
  encryptUserPassword: async (password: string) => encryptUserPassword(password),
}));

jest.mock('#src/queries/user.js', () => ({
  ...jest.requireActual('#src/queries/user.js'),
  hasUserWithPhone: async (phone: string) => phone === '13000000000',
  findUserByPhone: async () => ({ userId: 'id' }),
  hasUserWithEmail: async (email: string) => email === 'a@a.com',
  findUserByEmail: async () => ({ userId: 'id' }),
  findUserById: async () => findUserById(),
  updateUserById: async (...args: unknown[]) => updateUserById(...args),
}));

jest.mock('#src/queries/sign-in-experience.js', () => ({
  findDefaultSignInExperience: async () => findDefaultSignInExperience(),
}));

const sendPasscode = jest.fn(async () => ({ dbEntry: { id: 'connectorIdValue' } }));
jest.mock('#src/libraries/passcode.js', () => ({
  createPasscode: async () => ({ userId: 'id' }),
  sendPasscode: async () => sendPasscode(),
  verifyPasscode: async (_a: unknown, _b: unknown, code: string) => {
    if (code !== '1234') {
      throw new RequestError('verification_code.code_mismatch');
    }
  },
}));

const mockArgon2Verify = jest.fn(async (password: string) => password === mockPasswordEncrypted);
jest.mock('hash-wasm', () => ({
  argon2Verify: async (password: string) => mockArgon2Verify(password),
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

describe('session -> forgotPasswordRoutes', () => {
  const sessionRequest = createRequester({
    // @ts-expect-error will remove once interaction refactor finished
    anonymousRoutes: forgotPasswordRoutes,
    provider: new Provider(''),
    middlewares: [
      async (ctx, next) => {
        ctx.addLogContext = jest.fn();
        ctx.log = jest.fn();

        return next();
      },
    ],
  });

  describe('POST /session/forgot-password/reset', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('assign result and redirect', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: getTomorrowDate().toISOString(),
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(updateUserById).toBeCalledWith(
        'id',
        expect.objectContaining({
          passwordEncrypted: 'a1b2c3_user1',
          passwordEncryptionMethod: 'Argon2i',
        })
      );
      expect(response.statusCode).toEqual(204);
    });
    it('should throw when `id` is missing', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            expiresAt: getTomorrowDate().toISOString(),
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 404);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when flow is not `forgot-password`', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: getTomorrowDate().toISOString(),
            flow: VerificationCodeType.SignIn,
          },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 404);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when `verification.expiresAt` is not string', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: { userId: 'id', expiresAt: 0, flow: VerificationCodeType.ForgotPassword },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 404);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when `expiresAt` is not a valid date string', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: 'invalid date string',
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 401);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when verification expires', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: getYesterdayDate().toISOString(),
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 401);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when new password is the same as old one', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: getTomorrowDate().toISOString(),
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      mockArgon2Verify.mockResolvedValueOnce(true);
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 422);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should redirect when there was no old password', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          verification: {
            userId: 'id',
            expiresAt: getTomorrowDate().toISOString(),
            flow: VerificationCodeType.ForgotPassword,
          },
        },
      });
      findUserById.mockResolvedValueOnce({
        ...mockUserWithPassword,
        passwordEncrypted: null,
        passwordEncryptionMethod: null,
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(updateUserById).toBeCalledWith(
        'id',
        expect.objectContaining({
          passwordEncrypted: 'a1b2c3_user1',
          passwordEncryptionMethod: 'Argon2i',
        })
      );
      expect(response.statusCode).toEqual(204);
    });
  });
});
