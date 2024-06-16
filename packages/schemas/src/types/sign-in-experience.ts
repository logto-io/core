import {
  connectorMetadataGuard,
  type ConnectorMetadata,
  type GoogleOneTapConfig,
  googleOneTapConfigGuard,
} from '@logto/connector-kit';
import { z } from 'zod';

import { type SignInExperience, SignInExperiences } from '../db-entries/index.js';
import { type ToZodObject } from '../utils/zod.js';

import { type SsoConnectorMetadata, ssoConnectorMetadataGuard } from './sso-connector.js';

type ForgotPassword = {
  phone: boolean;
  email: boolean;
};

export type FullSignInExperience = SignInExperience & {
  socialConnectors: Array<Omit<ConnectorMetadata, 'configTemplate' | 'formItems' | 'readme'>>;
  ssoConnectors: SsoConnectorMetadata[];
  forgotPassword: ForgotPassword;
  isDevelopmentTenant: boolean;
  /**
   * The Google One Tap configuration if the Google connector is enabled and configured.
   *
   * @remarks
   * We need to use a standalone property for the Google One Tap configuration because it needs
   * data from database entries that other connectors don't need. Thus we manually extract the
   * minimal data needed here.
   */
  googleOneTap?: GoogleOneTapConfig & { clientId: string; connectorId: string };
};

export const guardFullSignInExperience = SignInExperiences.guard.extend({
  socialConnectors: connectorMetadataGuard
    .omit({
      configTemplate: true,
      formItems: true,
      readme: true,
    })
    .array(),
  ssoConnectors: ssoConnectorMetadataGuard.array(),
  forgotPassword: z.object({ phone: z.boolean(), email: z.boolean() }),
  isDevelopmentTenant: z.boolean(),
  googleOneTap: googleOneTapConfigGuard
    .extend({ clientId: z.string(), connectorId: z.string() })
    .optional(),
}) satisfies ToZodObject<FullSignInExperience>;
