import { User } from '@logto/schemas';
import dayjs from 'dayjs';
import { Provider } from 'oidc-provider';

import { mockPasswordEncrypted, mockUserWithPassword } from '@/__mocks__';
import RequestError from '@/errors/RequestError';
import { createRequester } from '@/utils/test-utils';

import forgotPasswordRoutes, { forgotPasswordRoute } from './forgot-password';

const encryptUserPassword = jest.fn(async (password: string) => ({
  passwordEncrypted: password + '_user1',
  passwordEncryptionMethod: 'Argon2i',
}));
const findUserById = jest.fn(async (): Promise<User> => mockUserWithPassword);
const updateUserById = jest.fn(async (..._args: unknown[]) => ({ id: 'id' }));
const updateLastSignInAt = jest.fn(async (..._args: unknown[]) => ({}));

jest.mock('@/lib/user', () => ({
  ...jest.requireActual('@/lib/user'),
  updateLastSignInAt: async (...args: unknown[]) => updateLastSignInAt(...args),
  encryptUserPassword: async (password: string) => encryptUserPassword(password),
}));

jest.mock('@/queries/user', () => ({
  ...jest.requireActual('@/queries/user'),
  hasUserWithPhone: async (phone: string) => phone === '13000000000',
  findUserByPhone: async () => ({ id: 'id' }),
  hasUserWithEmail: async (email: string) => email === 'a@a.com',
  findUserByEmail: async () => ({ id: 'id' }),
  findUserById: async () => findUserById(),
  updateUserById: async (...args: unknown[]) => updateUserById(...args),
}));

const sendPasscode = jest.fn(async () => ({ dbEntry: { id: 'connectorIdValue' } }));
jest.mock('@/lib/passcode', () => ({
  createPasscode: async () => ({ id: 'id' }),
  sendPasscode: async () => sendPasscode(),
  verifyPasscode: async (_a: unknown, _b: unknown, code: string) => {
    if (code !== '1234') {
      throw new RequestError('passcode.code_mismatch');
    }
  },
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

  describe('POST /session/forgot-password/sms/send-passcode', () => {
    beforeAll(() => {
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
      });
    });
    it('should call sendPasscode', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/sms/send-passcode`)
        .send({ phone: '13000000000' });
      expect(response.statusCode).toEqual(204);
      expect(sendPasscode).toHaveBeenCalled();
    });
  });

  describe('POST /session/forgot-password/sms/verify-passcode', () => {
    it('assign result and redirect', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/sms/verify-passcode`)
        .send({ phone: '13000000000', code: '1234' });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          login: { accountId: 'id' },
          forgotPassword: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            expiresAt: expect.any(String),
          },
        }),
        expect.anything()
      );
    });
    it('throw error if phone number does not exist', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/sms/verify-passcode`)
        .send({ phone: '13000000001', code: '1234' });
      expect(response.statusCode).toEqual(422);
    });
    it('throw error if verifyPasscode failed', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/sms/verify-passcode`)
        .send({ phone: '13000000000', code: '1231' });
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('POST /session/forgot-password/email/send-passcode', () => {
    beforeAll(() => {
      interactionDetails.mockResolvedValueOnce({
        jti: 'jti',
      });
    });
    it('should call sendPasscode', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/email/send-passcode`)
        .send({ email: 'a@a.com' });
      expect(response.statusCode).toEqual(204);
      expect(sendPasscode).toHaveBeenCalled();
    });
  });

  describe('POST /session/forgot-password/email/verify-passcode', () => {
    it('assign result and redirect', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/email/verify-passcode`)
        .send({ email: 'a@a.com', code: '1234' });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('redirectTo');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          login: { accountId: 'id' },
          forgotPassword: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            expiresAt: expect.any(String),
          },
        }),
        expect.anything()
      );
    });
    it('throw error if email does not exist', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/email/verify-passcode`)
        .send({ email: 'b@a.com', code: '1234' });
      expect(response.statusCode).toEqual(422);
    });
    it('throw error if verifyPasscode failed', async () => {
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/sms/verify-passcode`)
        .send({ email: 'a@a.com', code: '1231' });
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('POST /session/forgot-password/reset', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('assign result and redirect', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          login: { accountId: 'id' },
          forgotPassword: { expiresAt: dayjs().add(1, 'day').toISOString() },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response.statusCode).toEqual(200);
      expect(updateUserById).toBeCalledWith(
        'id',
        expect.objectContaining({
          passwordEncrypted: 'a1b2c3_user1',
          passwordEncryptionMethod: 'Argon2i',
        })
      );
      expect(updateLastSignInAt).toBeCalledWith('id');
      expect(interactionResult).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ login: { accountId: 'id' } }),
        expect.anything()
      );
    });
    it('should throw when `accountId` is missing', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          forgotPassword: { expiresAt: dayjs().add(1, 'day').toISOString() },
        },
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 404);
      expect(updateUserById).toBeCalledTimes(0);
    });
    it('should throw when `forgotPassword.expiresAt` is not string', async () => {
      interactionDetails.mockResolvedValueOnce({
        result: {
          login: { accountId: 'id' },
          forgotPassword: { expiresAt: 0 },
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
          login: { accountId: 'id' },
          forgotPassword: { expiresAt: 'invalid date string' },
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
          login: { accountId: 'id' },
          forgotPassword: { expiresAt: dayjs().subtract(1, 'day').toISOString() },
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
          login: { accountId: 'id' },
          forgotPassword: { expiresAt: dayjs().add(1, 'day').toISOString() },
        },
      });
      const mockEncryptUserPassword = encryptUserPassword as jest.Mock;
      mockEncryptUserPassword.mockResolvedValueOnce({
        passwordEncrypted: mockPasswordEncrypted,
        passwordEncryptionMethod: 'Argon2i',
      });
      const response = await sessionRequest
        .post(`${forgotPasswordRoute}/reset`)
        .send({ password: mockPasswordEncrypted });
      expect(response).toHaveProperty('status', 400);
      expect(updateUserById).toBeCalledTimes(0);
    });
  });
});
