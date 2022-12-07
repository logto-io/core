import { PasscodeType, SignInIdentifier } from '@logto/schemas';
import type { MiddlewareType } from 'koa';
import type { Provider } from 'oidc-provider';

import RequestError from '#src/errors/RequestError/index.js';
import { assignInteractionResults, getApplicationIdFromInteraction } from '#src/lib/session.js';
import { getSignInExperienceForApplication } from '#src/lib/sign-in-experience/index.js';
import { generateUserId, insertUser } from '#src/lib/user.js';
import type { WithLogContext } from '#src/middleware/koa-log.js';
import {
  hasUserWithPhone,
  hasUserWithEmail,
  findUserByPhone,
  findUserByEmail,
  updateUserById,
} from '#src/queries/user.js';
import assertThat from '#src/utils/assert-that.js';

import { smsSessionResultGuard, emailSessionResultGuard } from '../types.js';
import {
  getVerificationStorageFromInteraction,
  getPasswordlessRelatedLogType,
  checkValidateExpiration,
  checkRequiredProfile,
} from '../utils.js';

export const smsSignInAction = <StateT, ContextT extends WithLogContext, ResponseBodyT>(
  provider: Provider
): MiddlewareType<StateT, ContextT, ResponseBodyT> => {
  return async (ctx, next) => {
    const signInExperience = await getSignInExperienceForApplication(
      await getApplicationIdFromInteraction(ctx, provider)
    );
    assertThat(
      signInExperience.signIn.methods.some(
        ({ identifier, verificationCode }) =>
          identifier === SignInIdentifier.Sms && verificationCode
      ),
      new RequestError({
        code: 'user.sign_in_method_not_enabled',
        status: 422,
      })
    );

    const verificationStorage = await getVerificationStorageFromInteraction(
      ctx,
      provider,
      smsSessionResultGuard
    );

    const type = getPasswordlessRelatedLogType(PasscodeType.SignIn, 'sms');
    ctx.log(type, verificationStorage);

    const { phone, expiresAt } = verificationStorage;

    checkValidateExpiration(expiresAt);

    const user = await findUserByPhone(phone);
    assertThat(user, new RequestError({ code: 'user.phone_not_exist', status: 404 }));
    const { id, isSuspended } = user;
    assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));
    ctx.log(type, { userId: id });

    await checkRequiredProfile(ctx, provider, user, signInExperience);
    await updateUserById(id, { lastSignInAt: Date.now() });
    await assignInteractionResults(ctx, provider, { login: { accountId: id } });

    return next();
  };
};

export const emailSignInAction = <StateT, ContextT extends WithLogContext, ResponseBodyT>(
  provider: Provider
): MiddlewareType<StateT, ContextT, ResponseBodyT> => {
  return async (ctx, next) => {
    const signInExperience = await getSignInExperienceForApplication(
      await getApplicationIdFromInteraction(ctx, provider)
    );
    assertThat(
      signInExperience.signIn.methods.some(
        ({ identifier, verificationCode }) =>
          identifier === SignInIdentifier.Email && verificationCode
      ),
      new RequestError({
        code: 'user.sign_in_method_not_enabled',
        status: 422,
      })
    );

    const verificationStorage = await getVerificationStorageFromInteraction(
      ctx,
      provider,
      emailSessionResultGuard
    );

    const type = getPasswordlessRelatedLogType(PasscodeType.SignIn, 'email');
    ctx.log(type, verificationStorage);

    const { email, expiresAt } = verificationStorage;

    checkValidateExpiration(expiresAt);

    const user = await findUserByEmail(email);
    assertThat(user, new RequestError({ code: 'user.email_not_exist', status: 404 }));
    const { id, isSuspended } = user;
    assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));
    ctx.log(type, { userId: id });

    await checkRequiredProfile(ctx, provider, user, signInExperience);
    await updateUserById(id, { lastSignInAt: Date.now() });
    await assignInteractionResults(ctx, provider, { login: { accountId: id } });

    return next();
  };
};

export const smsRegisterAction = <StateT, ContextT extends WithLogContext, ResponseBodyT>(
  provider: Provider
): MiddlewareType<StateT, ContextT, ResponseBodyT> => {
  return async (ctx, next) => {
    const signInExperience = await getSignInExperienceForApplication(
      await getApplicationIdFromInteraction(ctx, provider)
    );

    assertThat(
      signInExperience.signUp.identifiers.includes(SignInIdentifier.Sms),
      new RequestError({
        code: 'user.sign_up_method_not_enabled',
        status: 422,
      })
    );

    const verificationStorage = await getVerificationStorageFromInteraction(
      ctx,
      provider,
      smsSessionResultGuard
    );

    const type = getPasswordlessRelatedLogType(PasscodeType.Register, 'sms');
    ctx.log(type, verificationStorage);

    const { phone, expiresAt } = verificationStorage;

    checkValidateExpiration(expiresAt);

    assertThat(
      !(await hasUserWithPhone(phone)),
      new RequestError({ code: 'user.phone_already_in_use', status: 422 })
    );
    const id = await generateUserId();
    ctx.log(type, { userId: id });

    const user = await insertUser({ id, primaryPhone: phone, lastSignInAt: Date.now() });
    await checkRequiredProfile(ctx, provider, user, signInExperience);
    await assignInteractionResults(ctx, provider, { login: { accountId: id } });

    return next();
  };
};

export const emailRegisterAction = <StateT, ContextT extends WithLogContext, ResponseBodyT>(
  provider: Provider
): MiddlewareType<StateT, ContextT, ResponseBodyT> => {
  return async (ctx, next) => {
    const signInExperience = await getSignInExperienceForApplication(
      await getApplicationIdFromInteraction(ctx, provider)
    );

    assertThat(
      signInExperience.signUp.identifiers.includes(SignInIdentifier.Email),
      new RequestError({
        code: 'user.sign_up_method_not_enabled',
        status: 422,
      })
    );

    const verificationStorage = await getVerificationStorageFromInteraction(
      ctx,
      provider,
      emailSessionResultGuard
    );

    const type = getPasswordlessRelatedLogType(PasscodeType.Register, 'email');
    ctx.log(type, verificationStorage);

    const { email, expiresAt } = verificationStorage;

    checkValidateExpiration(expiresAt);

    assertThat(
      !(await hasUserWithEmail(email)),
      new RequestError({ code: 'user.email_already_in_use', status: 422 })
    );
    const id = await generateUserId();
    ctx.log(type, { userId: id });

    const user = await insertUser({ id, primaryEmail: email, lastSignInAt: Date.now() });
    await checkRequiredProfile(ctx, provider, user, signInExperience);
    await assignInteractionResults(ctx, provider, { login: { accountId: id } });

    return next();
  };
};
