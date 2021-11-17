import { PasswordEncryptionMethod, userInfoSelectFields } from '@logto/schemas';
import pick from 'lodash.pick';
import { nanoid } from 'nanoid';
import { Provider } from 'oidc-provider';
import { object, string } from 'zod';

import RequestError from '@/errors/RequestError';
import { generateUserId } from '@/lib/user';
import koaGuard from '@/middleware/koa-guard';
import {
  deleteUserById,
  findAllUsers,
  findUserById,
  hasUser,
  insertUser,
  updateUserById,
} from '@/queries/user';
import { encryptPassword } from '@/utils/password';

import { AnonymousRouter } from './types';

export default function userRoutes<T extends AnonymousRouter>(router: T, provider: Provider) {
  router.post(
    '/user',
    koaGuard({
      body: object({
        username: string().min(3),
        password: string().min(6),
      }),
    }),
    async (ctx, next) => {
      const { username, password } = ctx.guard.body;

      if (await hasUser(username)) {
        throw new RequestError('user.username_exists');
      }

      const id = await generateUserId();
      const passwordEncryptionSalt = nanoid();
      const passwordEncryptionMethod = PasswordEncryptionMethod.SaltAndPepper;
      const passwordEncrypted = encryptPassword(
        id,
        password,
        passwordEncryptionSalt,
        passwordEncryptionMethod
      );

      await insertUser({
        id,
        username,
        passwordEncrypted,
        passwordEncryptionMethod,
        passwordEncryptionSalt,
      });

      const redirectTo = await provider.interactionResult(
        ctx.req,
        ctx.res,
        {
          login: { accountId: id },
        },
        { mergeWithLastSubmission: false }
      );
      ctx.body = { redirectTo };

      return next();
    }
  );

  router.get('/users', async (ctx, next) => {
    const users = await findAllUsers();
    ctx.body = users.map((user) => pick(user, ...userInfoSelectFields));
    return next();
  });

  router.get(
    '/users/:userId',
    koaGuard({
      params: object({ userId: string().min(1) }),
    }),
    async (ctx, next) => {
      const {
        params: { userId },
      } = ctx.guard;
      const user = await findUserById(userId);
      ctx.body = pick(user, ...userInfoSelectFields);
      return next();
    }
  );

  router.patch(
    '/users/:userId/password',
    koaGuard({
      params: object({ userId: string().min(1) }),
      body: object({ password: string().min(6) }),
    }),
    async (ctx, next) => {
      const {
        params: { userId },
        body: { password },
      } = ctx.guard;

      await findUserById(userId);

      const passwordEncryptionSalt = nanoid();
      const passwordEncryptionMethod = PasswordEncryptionMethod.SaltAndPepper;
      const passwordEncrypted = encryptPassword(
        userId,
        password,
        passwordEncryptionSalt,
        passwordEncryptionMethod
      );

      await updateUserById(userId, {
        passwordEncryptionSalt,
        passwordEncrypted,
      });
      const user = await findUserById(userId);
      ctx.body = pick(user, ...userInfoSelectFields);
      return next();
    }
  );

  router.delete(
    '/users/:userId',
    koaGuard({
      params: object({ userId: string().min(1) }),
    }),
    async (ctx, next) => {
      const {
        params: { userId },
      } = ctx.guard;
      await deleteUserById(userId);
      ctx.status = 204;
      return next();
    }
  );
}
