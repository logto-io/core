import ky from 'ky';

export const register = async (username: string, password: string) => {
  type Response = {
    redirectTo: string;
  };

  return ky
    .post('/api/session/register/username-password', {
      json: {
        username,
        password,
      },
    })
    .json<Response>();
};

export const sendSmsPasscode = async (phone: string) => {
  return ky
    .post('/api/session/register/passwordless/sms/send-passcode', {
      json: {
        phone,
      },
    })
    .json();
};

export const verifySmsPasscode = async (phone: string, passcode: string) => {
  type Response = {
    redirectTo: string;
  };

  return ky
    .post('/api/session/register/passwordless/sms/verify-passcode', {
      json: {
        phone,
        passcode,
      },
    })
    .json<Response>();
};

export const sendEmailPasscode = async (email: string) => {
  return ky
    .post('/api/session/register/passwordless/email/send-passcode', {
      json: {
        email,
      },
    })
    .json();
};

export const verifyEmailPasscode = async (email: string, passcode: string) => {
  type Response = {
    redirectTo: string;
  };

  return ky
    .post('/api/session/register/passwordless/email/verify-passcode', {
      json: {
        email,
        passcode,
      },
    })
    .json<Response>();
};
