import {
  MfaFactor,
  type WebAuthnRegistrationOptions,
  type WebAuthnAuthenticationOptions,
  type BindMfaPayload,
  type VerifyMfaPayload,
} from '@logto/schemas';

import api from '../api';

import { experienceRoutes } from './const';
import { submitInteraction } from './interaction';

/**
 * Mfa APIs
 */
const addMfa = async (type: MfaFactor, verificationId: string) =>
  api.post(`${experienceRoutes.mfa}`, {
    json: {
      type,
      verificationId,
    },
  });

type TotpSecretResponse = {
  verificationId: string;
  secret: string;
  secretQrCode: string;
};
export const createTotpSecret = async () =>
  api.post(`${experienceRoutes.verification}/totp/secret`).json<TotpSecretResponse>();

export const createWebAuthnRegistration = async () => {
  const { verificationId, registrationOptions } = await api
    .post(`${experienceRoutes.verification}/web-authn/registration`)
    .json<{ verificationId: string; registrationOptions: WebAuthnRegistrationOptions }>();

  return {
    verificationId,
    options: registrationOptions,
  };
};

export const createWebAuthnAuthentication = async () => {
  const { verificationId, authenticationOptions } = await api
    .post(`${experienceRoutes.verification}/web-authn/authentication`)
    .json<{ verificationId: string; authenticationOptions: WebAuthnAuthenticationOptions }>();

  return {
    verificationId,
    options: authenticationOptions,
  };
};

export const createBackupCode = async () =>
  api.post(`${experienceRoutes.verification}/backup-code/generate`).json<{
    verificationId: string;
    codes: string[];
  }>();

export const skipMfa = async () => {
  await api.post(`${experienceRoutes.mfa}/mfa-skipped`);
  return submitInteraction();
};

export const bindMfa = async (payload: BindMfaPayload, verificationId: string) => {
  switch (payload.type) {
    case MfaFactor.TOTP: {
      const { code } = payload;
      await api.post(`${experienceRoutes.verification}/totp/verify`, {
        json: {
          code,
          verificationId,
        },
      });
      break;
    }
    case MfaFactor.WebAuthn: {
      await api.post(`${experienceRoutes.verification}/web-authn/registration/verify`, {
        json: {
          verificationId,
          payload,
        },
      });
      break;
    }
    case MfaFactor.BackupCode: {
      // No need to verify backup codes
      break;
    }
  }

  await addMfa(payload.type, verificationId);
  return submitInteraction();
};

export const verifyMfa = async (payload: VerifyMfaPayload, verificationId?: string) => {
  switch (payload.type) {
    case MfaFactor.TOTP: {
      const { code } = payload;
      await api.post(`${experienceRoutes.verification}/totp/verify`, {
        json: {
          code,
        },
      });
      break;
    }
    case MfaFactor.WebAuthn: {
      await api.post(`${experienceRoutes.verification}/web-authn/authentication/verify`, {
        json: {
          verificationId,
          payload,
        },
      });
      break;
    }
    case MfaFactor.BackupCode: {
      const { code } = payload;
      await api.post(`${experienceRoutes.verification}/backup-code/verify`, {
        json: {
          code,
        },
      });
      break;
    }
  }

  return submitInteraction();
};
