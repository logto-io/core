/* eslint-disable max-lines */
import { emailRegEx, phoneRegEx, usernameRegEx } from '@logto/core-kit';
import { z } from 'zod';

import {
  MfaFactor,
  SignInIdentifier,
  jsonObjectGuard,
  webAuthnTransportGuard,
} from '../foundations/index.js';
import { type ToZodObject } from '../utils/zod.js';

import type {
  EmailVerificationCodePayload,
  PhoneVerificationCodePayload,
} from './verification-code.js';
import {
  emailVerificationCodePayloadGuard,
  phoneVerificationCodePayloadGuard,
} from './verification-code.js';

/**
 * User interaction events defined in Logto RFC 0004.
 * @see {@link https://github.com/logto-io/rfcs | Logto RFCs} for more information.
 */
export enum InteractionEvent {
  SignIn = 'SignIn',
  Register = 'Register',
  ForgotPassword = 'ForgotPassword',
}

// ====== Experience API payload guards and type definitions start ======

/** Identifiers that can be used to uniquely identify a user. */
export type InteractionIdentifier<T extends SignInIdentifier = SignInIdentifier> = {
  type: T;
  value: string;
};

export const interactionIdentifierGuard = z.object({
  type: z.nativeEnum(SignInIdentifier),
  value: z.string(),
}) satisfies ToZodObject<InteractionIdentifier>;

export type VerificationCodeSignInIdentifier = SignInIdentifier.Email | SignInIdentifier.Phone;

/** Currently only email and phone are supported for verification code validation. */
export type VerificationCodeIdentifier<
  T extends VerificationCodeSignInIdentifier = VerificationCodeSignInIdentifier,
> = {
  type: T;
  value: string;
};
export const verificationCodeIdentifierGuard = z.object({
  type: z.enum([SignInIdentifier.Email, SignInIdentifier.Phone]),
  value: z.string(),
}) satisfies ToZodObject<VerificationCodeIdentifier>;

/** Logto supported interaction verification types. */
export enum VerificationType {
  Password = 'Password',
  EmailVerificationCode = 'EmailVerificationCode',
  PhoneVerificationCode = 'PhoneVerificationCode',
  Social = 'Social',
  EnterpriseSso = 'EnterpriseSso',
  TOTP = 'Totp',
  WebAuthn = 'WebAuthn',
  BackupCode = 'BackupCode',
  NewPasswordIdentity = 'NewPasswordIdentity',
}

// REMARK: API payload guard

/** Payload type for `POST /api/experience/verification/{social|sso}/:connectorId/authorization-uri`. */
export type SocialAuthorizationUrlPayload = {
  state: string;
  redirectUri: string;
};
export const socialAuthorizationUrlPayloadGuard = z.object({
  state: z.string(),
  redirectUri: z.string(),
}) satisfies ToZodObject<SocialAuthorizationUrlPayload>;

/** Payload type for `POST /api/experience/verification/{social|sso}/:connectorId/verify`. */
export type SocialVerificationCallbackPayload = {
  /** The callback data from the social connector. */
  connectorData: Record<string, unknown>;
  /**  The verification ID returned from the authorization URI. */
  verificationId: string;
};
export const socialVerificationCallbackPayloadGuard = z.object({
  connectorData: jsonObjectGuard,
  verificationId: z.string(),
}) satisfies ToZodObject<SocialVerificationCallbackPayload>;

/** Payload type for `POST /api/experience/verification/password`. */
export type PasswordVerificationPayload = {
  identifier: InteractionIdentifier;
  password: string;
};
export const passwordVerificationPayloadGuard = z.object({
  identifier: interactionIdentifierGuard,
  password: z.string().min(1),
}) satisfies ToZodObject<PasswordVerificationPayload>;

/** Payload type for `POST /api/experience/verification/totp/verify`. */
export type TotpVerificationVerifyPayload = {
  code: string;
  verificationId?: string;
};
export const totpVerificationVerifyPayloadGuard = z.object({
  code: z.string().min(1),
  verificationId: z.string().optional(),
}) satisfies ToZodObject<TotpVerificationVerifyPayload>;

/** Payload type for `POST /api/experience/verification/backup-code/verify */
export type BackupCodeVerificationVerifyPayload = {
  code: string;
};
export const backupCodeVerificationVerifyPayloadGuard = z.object({
  code: z.string().min(1),
}) satisfies ToZodObject<BackupCodeVerificationVerifyPayload>;

/**
 * Payload type for `POST /api/experience/verification/new-password-identity`.
 * @remarks Currently we only support username identifier for new password identity registration.
 * For email and phone new identity registration, a `CodeVerification` record is required.
 */
export type NewPasswordIdentityVerificationPayload = {
  identifier: {
    type: SignInIdentifier.Username;
    value: string;
  };
  password: string;
};
export const newPasswordIdentityVerificationPayloadGuard = z.object({
  identifier: z.object({
    type: z.literal(SignInIdentifier.Username),
    value: z.string(),
  }),
  password: z.string().min(1),
}) satisfies ToZodObject<NewPasswordIdentityVerificationPayload>;

/** Payload type for `POST /api/experience/identification`. */
export type IdentificationApiPayload = {
  /** The ID of the verification record that is used to identify the user. */
  verificationId: string;
  /**
   * Link social identity to a related user account with the same email or phone.
   * Only applicable for social verification records and a related user account is found.
   */
  linkSocialIdentity?: boolean;
};
export const identificationApiPayloadGuard = z.object({
  verificationId: z.string(),
  linkSocialIdentity: z.boolean().optional(),
}) satisfies ToZodObject<IdentificationApiPayload>;

/** Payload type for `POST /api/experience`. */
export type CreateExperienceApiPayload = {
  interactionEvent: InteractionEvent;
};
export const CreateExperienceApiPayloadGuard = z.object({
  interactionEvent: z.nativeEnum(InteractionEvent),
}) satisfies ToZodObject<CreateExperienceApiPayload>;

/** Payload type for `PATCH /api/experience/profile */
export type UpdateProfileApiPayload = {
  [SignInIdentifier.Username]?: string;
  [SignInIdentifier.Email]?: {
    verificationId: string;
  };
  [SignInIdentifier.Phone]?: {
    verificationId: string;
  };
  password?: string;
};
export const updateProfileApiPayloadGuard = z.object({
  [SignInIdentifier.Username]: z.string().optional(),
  [SignInIdentifier.Email]: z
    .object({
      verificationId: z.string(),
    })
    .optional(),
  [SignInIdentifier.Phone]: z
    .object({
      verificationId: z.string(),
    })
    .optional(),
  password: z.string().optional(),
}) satisfies ToZodObject<UpdateProfileApiPayload>;

// ====== Experience API payload guard and types definitions end ======

/**
 * Legacy interaction identifier payload guard
 *
 * @remark
 * Following are the types for legacy interaction APIs. They are all treated as deprecated, and can be removed
 * once the new Experience API are fully implemented and migrated.
 * =================================================================================================================
 */

/**
 * Detailed interaction identifier payload guard
 */
const usernamePasswordPayloadGuard = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type UsernamePasswordPayload = z.infer<typeof usernamePasswordPayloadGuard>;

export const emailPasswordPayloadGuard = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
export type EmailPasswordPayload = z.infer<typeof emailPasswordPayloadGuard>;

export const phonePasswordPayloadGuard = z.object({
  phone: z.string().min(1),
  password: z.string().min(1),
});
export type PhonePasswordPayload = z.infer<typeof phonePasswordPayloadGuard>;

export const socialConnectorPayloadGuard = z.object({
  connectorId: z.string(),
  connectorData: jsonObjectGuard,
});
export type SocialConnectorPayload = z.infer<typeof socialConnectorPayloadGuard>;

export const socialEmailPayloadGuard = z.object({
  connectorId: z.string(),
  email: z.string(),
});

export type SocialEmailPayload = z.infer<typeof socialEmailPayloadGuard>;

export const socialPhonePayloadGuard = z.object({
  connectorId: z.string(),
  phone: z.string(),
});

export type SocialPhonePayload = z.infer<typeof socialPhonePayloadGuard>;

export const eventGuard = z.nativeEnum(InteractionEvent);

export const identifierPayloadGuard = z.union([
  usernamePasswordPayloadGuard,
  emailPasswordPayloadGuard,
  phonePasswordPayloadGuard,
  emailVerificationCodePayloadGuard,
  phoneVerificationCodePayloadGuard,
  socialConnectorPayloadGuard,
  socialEmailPayloadGuard,
  socialPhonePayloadGuard,
]);

export type IdentifierPayload =
  | UsernamePasswordPayload
  | EmailPasswordPayload
  | PhonePasswordPayload
  | EmailVerificationCodePayload
  | PhoneVerificationCodePayload
  | SocialConnectorPayload
  | SocialPhonePayload
  | SocialEmailPayload;

export const profileGuard = z.object({
  username: z.string().regex(usernameRegEx).optional(),
  email: z.string().regex(emailRegEx).optional(),
  phone: z.string().regex(phoneRegEx).optional(),
  connectorId: z.string().optional(),
  password: z.string().optional(),
});

export type Profile = z.infer<typeof profileGuard>;

export enum MissingProfile {
  username = 'username',
  email = 'email',
  phone = 'phone',
  password = 'password',
  emailOrPhone = 'emailOrPhone',
}

export const bindTotpPayloadGuard = z.object({
  // Unlike identifier payload which has indicator like "email",
  // mfa payload must have an additional type field to indicate type
  type: z.literal(MfaFactor.TOTP),
  code: z.string(),
});

export type BindTotpPayload = z.infer<typeof bindTotpPayloadGuard>;

export const bindWebAuthnPayloadGuard = z.object({
  type: z.literal(MfaFactor.WebAuthn),
  id: z.string(),
  rawId: z.string(),
  /**
   * The response from WebAuthn API
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential}
   */
  response: z.object({
    clientDataJSON: z.string(),
    attestationObject: z.string(),
    authenticatorData: z.string().optional(),
    transports: webAuthnTransportGuard.array().optional(),
    publicKeyAlgorithm: z.number().optional(),
    publicKey: z.string().optional(),
  }),
  authenticatorAttachment: z.enum(['cross-platform', 'platform']).optional(),
  clientExtensionResults: z.object({
    appid: z.boolean().optional(),
    crepProps: z
      .object({
        rk: z.boolean().optional(),
      })
      .optional(),
    hmacCreateSecret: z.boolean().optional(),
  }),
});

export type BindWebAuthnPayload = z.infer<typeof bindWebAuthnPayloadGuard>;

export const bindBackupCodePayloadGuard = z.object({
  type: z.literal(MfaFactor.BackupCode),
});

export type BindBackupCodePayload = z.infer<typeof bindBackupCodePayloadGuard>;

export const bindMfaPayloadGuard = z.discriminatedUnion('type', [
  bindTotpPayloadGuard,
  bindWebAuthnPayloadGuard,
  bindBackupCodePayloadGuard,
]);

export type BindMfaPayload = z.infer<typeof bindMfaPayloadGuard>;

/** @deprecated  Legacy interaction API use only */
export const totpVerificationPayloadGuard = bindTotpPayloadGuard;

/** @deprecated Legacy interaction API use only */
export type TotpVerificationPayload = z.infer<typeof totpVerificationPayloadGuard>;

export const webAuthnVerificationPayloadGuard = bindWebAuthnPayloadGuard
  .omit({ response: true })
  .extend({
    response: z.object({
      clientDataJSON: z.string(),
      authenticatorData: z.string(),
      signature: z.string(),
      userHandle: z.string().optional(),
    }),
  });

export type WebAuthnVerificationPayload = z.infer<typeof webAuthnVerificationPayloadGuard>;

export const backupCodeVerificationPayloadGuard = z.object({
  type: z.literal(MfaFactor.BackupCode),
  code: z.string(),
});

export type BackupCodeVerificationPayload = z.infer<typeof backupCodeVerificationPayloadGuard>;

export const verifyMfaPayloadGuard = z.discriminatedUnion('type', [
  totpVerificationPayloadGuard,
  webAuthnVerificationPayloadGuard,
  backupCodeVerificationPayloadGuard,
]);

export type VerifyMfaPayload = z.infer<typeof verifyMfaPayloadGuard>;

export const pendingTotpGuard = z.object({
  type: z.literal(MfaFactor.TOTP),
  secret: z.string(),
});

export type PendingTotp = z.infer<typeof pendingTotpGuard>;

export const pendingWebAuthnGuard = z.object({
  type: z.literal(MfaFactor.WebAuthn),
  challenge: z.string(),
});

export type PendingWebAuthn = z.infer<typeof pendingWebAuthnGuard>;

export const pendingBackupCodeGuard = z.object({
  type: z.literal(MfaFactor.BackupCode),
  codes: z.array(z.string()),
});

export type PendingBackupCode = z.infer<typeof pendingBackupCodeGuard>;

// Some information like TOTP secret should be generated in the backend
// and stored in the interaction temporarily.
export const pendingMfaGuard = z.discriminatedUnion('type', [
  pendingTotpGuard,
  pendingWebAuthnGuard,
  pendingBackupCodeGuard,
]);

export type PendingMfa = z.infer<typeof pendingMfaGuard>;

export const bindTotpGuard = pendingTotpGuard;

export type BindTotp = z.infer<typeof bindTotpGuard>;

export const bindWebAuthnGuard = z.object({
  type: z.literal(MfaFactor.WebAuthn),
  credentialId: z.string(),
  publicKey: z.string(),
  transports: webAuthnTransportGuard.array(),
  counter: z.number(),
  agent: z.string(),
});

export type BindWebAuthn = z.infer<typeof bindWebAuthnGuard>;

export const bindBackupCodeGuard = pendingBackupCodeGuard;

export type BindBackupCode = z.infer<typeof bindBackupCodeGuard>;

// The type for binding new mfa verification to a user, not always equals to the pending type.
export const bindMfaGuard = z.discriminatedUnion('type', [
  bindTotpGuard,
  bindWebAuthnGuard,
  bindBackupCodeGuard,
]);

export type BindMfa = z.infer<typeof bindMfaGuard>;

export const verifyMfaResultGuard = z.object({
  type: z.nativeEnum(MfaFactor),
  id: z.string(),
});

export type VerifyMfaResult = z.infer<typeof verifyMfaResultGuard>;
/* eslint-enable max-lines */
