import { MfaFactor, type User, type UserMfaVerificationResponse } from '@logto/schemas';
import { parseE164PhoneNumberWithError, ParseError } from '@logto/shared/universal';
import { tryThat } from '@silverhand/essentials';

import RequestError from '#src/errors/RequestError/index.js';

export const transpileUserMfaVerifications = (
  mfaVerifications: User['mfaVerifications']
): UserMfaVerificationResponse => {
  return mfaVerifications.map((verification) => {
    const { id, createdAt, type } = verification;

    if (type === MfaFactor.BackupCode) {
      const { codes } = verification;

      return { id, createdAt, type, remainCodes: codes.filter((code) => !code.usedAt).length };
    }

    if (type === MfaFactor.WebAuthn) {
      const { agent } = verification;

      return { id, createdAt, type, agent };
    }

    return { id, createdAt, type };
  });
};

export const getValidPhoneNumber = (phone: string) =>
  tryThat(
    () => {
      if (!phone) {
        return phone;
      }

      const phoneNumber = parseE164PhoneNumberWithError(phone);
      if (!phoneNumber.isValid()) {
        throw new RequestError({ code: 'user.invalid_phone', status: 422 });
      }

      return phoneNumber.number.slice(1);
    },
    (error: unknown) => {
      if (error instanceof ParseError) {
        throw new RequestError({ code: 'user.invalid_phone', status: 422 }, error);
      }
      throw error;
    }
  );
