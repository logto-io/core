import { MessageTypes } from '@logto/connector-kit';
import ky from 'ky';

import { consent } from './consent';
import {
  verifyForgotPasswordEmailPasscode,
  verifyForgotPasswordSmsPasscode,
  sendForgotPasswordEmailPasscode,
  sendForgotPasswordSmsPasscode,
  resetPassword,
} from './forgot-password';
import {
  registerWithSms,
  registerWithEmail,
  sendRegisterEmailPasscode,
  sendRegisterSmsPasscode,
  verifyRegisterEmailPasscode,
  verifyRegisterSmsPasscode,
} from './register';
import {
  signInWithSms,
  signInWithEmail,
  sendSignInSmsPasscode,
  sendSignInEmailPasscode,
  verifySignInEmailPasscode,
  verifySignInSmsPasscode,
} from './sign-in';
import {
  invokeSocialSignIn,
  signInWithSocial,
  bindSocialAccount,
  bindSocialRelatedUser,
  registerWithSocial,
} from './social';

jest.mock('ky', () => ({
  extend: () => ky,
  post: jest.fn(() => ({
    json: jest.fn(),
  })),
}));

describe('api', () => {
  const username = 'username';
  const password = 'password';
  const phone = '18888888';
  const code = '111111';
  const email = 'foo@logto.io';

  const mockKyPost = ky.post as jest.Mock;

  afterEach(() => {
    mockKyPost.mockClear();
  });

  it('signInWithSms', async () => {
    mockKyPost.mockReturnValueOnce({
      json: () => ({
        redirectTo: '/',
      }),
    });
    await signInWithSms();
    expect(ky.post).toBeCalledWith('/api/session/sign-in/passwordless/sms');
  });

  it('signInWithEmail', async () => {
    mockKyPost.mockReturnValueOnce({
      json: () => ({
        redirectTo: '/',
      }),
    });
    await signInWithEmail();
    expect(ky.post).toBeCalledWith('/api/session/sign-in/passwordless/email');
  });

  it('sendSignInSmsPasscode', async () => {
    await sendSignInSmsPasscode(phone);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/send', {
      json: {
        phone,
        flow: MessageTypes.SignIn,
      },
    });
  });

  it('verifySignInSmsPasscode', async () => {
    mockKyPost.mockReturnValueOnce({
      json: () => ({
        redirectTo: '/',
      }),
    });

    await verifySignInSmsPasscode(phone, code);

    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/verify', {
      json: {
        phone,
        code,
        flow: MessageTypes.SignIn,
      },
    });
  });

  it('sendSignInEmailPasscode', async () => {
    await sendSignInEmailPasscode(email);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/send', {
      json: {
        email,
        flow: MessageTypes.SignIn,
      },
    });
  });

  it('verifySignInEmailPasscode', async () => {
    mockKyPost.mockReturnValueOnce({
      json: () => ({
        redirectTo: '/',
      }),
    });

    await verifySignInEmailPasscode(email, code);

    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/verify', {
      json: {
        email,
        code,
        flow: MessageTypes.SignIn,
      },
    });
  });

  it('consent', async () => {
    await consent();
    expect(ky.post).toBeCalledWith('/api/session/consent');
  });

  it('registerWithSms', async () => {
    await registerWithSms();
    expect(ky.post).toBeCalledWith('/api/session/register/passwordless/sms');
  });

  it('registerWithEmail', async () => {
    await registerWithEmail();
    expect(ky.post).toBeCalledWith('/api/session/register/passwordless/email');
  });

  it('sendRegisterSmsPasscode', async () => {
    await sendRegisterSmsPasscode(phone);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/send', {
      json: {
        phone,
        flow: MessageTypes.Register,
      },
    });
  });

  it('verifyRegisterSmsPasscode', async () => {
    await verifyRegisterSmsPasscode(phone, code);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/verify', {
      json: {
        phone,
        code,
        flow: MessageTypes.Register,
      },
    });
  });

  it('sendRegisterEmailPasscode', async () => {
    await sendRegisterEmailPasscode(email);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/send', {
      json: {
        email,
        flow: MessageTypes.Register,
      },
    });
  });

  it('verifyRegisterEmailPasscode', async () => {
    await verifyRegisterEmailPasscode(email, code);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/verify', {
      json: {
        email,
        code,
        flow: MessageTypes.Register,
      },
    });
  });

  it('sendForgotPasswordSmsPasscode', async () => {
    await sendForgotPasswordSmsPasscode(phone);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/send', {
      json: {
        phone,
        flow: MessageTypes.ForgotPassword,
      },
    });
  });

  it('verifyForgotPasswordSmsPasscode', async () => {
    await verifyForgotPasswordSmsPasscode(phone, code);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/sms/verify', {
      json: {
        phone,
        code,
        flow: MessageTypes.ForgotPassword,
      },
    });
  });

  it('sendForgotPasswordEmailPasscode', async () => {
    await sendForgotPasswordEmailPasscode(email);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/send', {
      json: {
        email,
        flow: MessageTypes.ForgotPassword,
      },
    });
  });

  it('verifyForgotPasswordEmailPasscode', async () => {
    await verifyForgotPasswordEmailPasscode(email, code);
    expect(ky.post).toBeCalledWith('/api/session/passwordless/email/verify', {
      json: {
        email,
        code,
        flow: MessageTypes.ForgotPassword,
      },
    });
  });

  it('invokeSocialSignIn', async () => {
    await invokeSocialSignIn('connectorId', 'state', 'redirectUri');
    expect(ky.post).toBeCalledWith('/api/session/sign-in/social', {
      json: {
        connectorId: 'connectorId',
        state: 'state',
        redirectUri: 'redirectUri',
      },
    });
  });

  it('signInWithSocial', async () => {
    const parameters = {
      connectorId: 'connectorId',
      data: {
        redirectUri: 'redirectUri',
        code: 'code',
      },
    };
    await signInWithSocial(parameters);
    expect(ky.post).toBeCalledWith('/api/session/sign-in/social/auth', {
      json: parameters,
    });
  });

  it('bindSocialAccount', async () => {
    await bindSocialAccount('connectorId');
    expect(ky.post).toBeCalledWith('/api/session/bind-social', {
      json: {
        connectorId: 'connectorId',
      },
    });
  });

  it('bindSocialRelatedUser', async () => {
    await bindSocialRelatedUser('connectorId');
    expect(ky.post).toBeCalledWith('/api/session/sign-in/bind-social-related-user', {
      json: {
        connectorId: 'connectorId',
      },
    });
  });

  it('registerWithSocial', async () => {
    await registerWithSocial('connectorId');
    expect(ky.post).toBeCalledWith('/api/session/register/social', {
      json: {
        connectorId: 'connectorId',
      },
    });
  });

  it('resetPassword', async () => {
    await resetPassword('password');
    expect(ky.post).toBeCalledWith('/api/session/forgot-password/reset', {
      json: {
        password: 'password',
      },
    });
  });
});
