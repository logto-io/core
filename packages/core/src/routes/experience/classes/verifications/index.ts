import { VerificationType } from '@logto/schemas';
import { z } from 'zod';

import type Libraries from '#src/tenants/Libraries.js';
import type Queries from '#src/tenants/Queries.js';

import {
  BackupCodeVerification,
  backupCodeVerificationRecordDataGuard,
  type BackupCodeVerificationRecordData,
} from './backup-code-verification.js';
import {
  EmailCodeVerification,
  emailCodeVerificationRecordDataGuard,
  PhoneCodeVerification,
  phoneCodeVerificationRecordDataGuard,
  type CodeVerificationRecordData,
} from './code-verification.js';
import {
  EnterpriseSsoVerification,
  enterPriseSsoVerificationRecordDataGuard,
  type EnterpriseSsoVerificationRecordData,
} from './enterprise-sso-verification.js';
import {
  NewPasswordIdentityVerification,
  newPasswordIdentityVerificationRecordDataGuard,
  type NewPasswordIdentityVerificationRecordData,
} from './new-password-identity-verification.js';
import {
  PasswordVerification,
  passwordVerificationRecordDataGuard,
  type PasswordVerificationRecordData,
} from './password-verification.js';
import {
  SocialVerification,
  socialVerificationRecordDataGuard,
  type SocialVerificationRecordData,
} from './social-verification.js';
import {
  TotpVerification,
  totpVerificationRecordDataGuard,
  type TotpVerificationRecordData,
} from './totp-verification.js';

export type VerificationRecordData =
  | PasswordVerificationRecordData
  | CodeVerificationRecordData<VerificationType.EmailVerificationCode>
  | CodeVerificationRecordData<VerificationType.PhoneVerificationCode>
  | SocialVerificationRecordData
  | EnterpriseSsoVerificationRecordData
  | TotpVerificationRecordData
  | BackupCodeVerificationRecordData
  | NewPasswordIdentityVerificationRecordData;

/**
 * Union type for all verification record types
 *
 * @remark This is a discriminated union type.
 * The VerificationRecord generic class can not narrow down the type of a verification record instance by its type property.
 * This union type is used to narrow down the type of the verification record.
 * Used in the ExperienceInteraction class to store and manage all the verification records. With a given verification type, we can narrow down the type of the verification record.
 */
export type VerificationRecordMap = {
  [VerificationType.Password]: PasswordVerification;
  [VerificationType.EmailVerificationCode]: EmailCodeVerification;
  [VerificationType.PhoneVerificationCode]: PhoneCodeVerification;
  [VerificationType.Social]: SocialVerification;
  [VerificationType.EnterpriseSso]: EnterpriseSsoVerification;
  [VerificationType.TOTP]: TotpVerification;
  [VerificationType.BackupCode]: BackupCodeVerification;
  [VerificationType.NewPasswordIdentity]: NewPasswordIdentityVerification;
};
type ValueOf<T> = T[keyof T];

export type VerificationRecord = ValueOf<VerificationRecordMap>;

export const verificationRecordDataGuard = z.discriminatedUnion('type', [
  passwordVerificationRecordDataGuard,
  emailCodeVerificationRecordDataGuard,
  phoneCodeVerificationRecordDataGuard,
  socialVerificationRecordDataGuard,
  enterPriseSsoVerificationRecordDataGuard,
  totpVerificationRecordDataGuard,
  backupCodeVerificationRecordDataGuard,
  newPasswordIdentityVerificationRecordDataGuard,
]);

/**
 * The factory method to build a new `VerificationRecord` instance based on the provided `VerificationRecordData`.
 */
export const buildVerificationRecord = (
  libraries: Libraries,
  queries: Queries,
  data: VerificationRecordData
) => {
  switch (data.type) {
    case VerificationType.Password: {
      return new PasswordVerification(libraries, queries, data);
    }
    case VerificationType.EmailVerificationCode: {
      return new EmailCodeVerification(libraries, queries, data);
    }
    case VerificationType.PhoneVerificationCode: {
      return new PhoneCodeVerification(libraries, queries, data);
    }
    case VerificationType.Social: {
      return new SocialVerification(libraries, queries, data);
    }
    case VerificationType.EnterpriseSso: {
      return new EnterpriseSsoVerification(libraries, queries, data);
    }
    case VerificationType.TOTP: {
      return new TotpVerification(libraries, queries, data);
    }
    case VerificationType.BackupCode: {
      return new BackupCodeVerification(libraries, queries, data);
    }
    case VerificationType.NewPasswordIdentity: {
      return new NewPasswordIdentityVerification(libraries, queries, data);
    }
  }
};
