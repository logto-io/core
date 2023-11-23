// MARK: Social connector
import { z } from 'zod';

import { type BaseConnector, type ConnectorType } from './foundation.js';

// This type definition is for SAML connector
export type ValidateSamlAssertion = (
  assertion: Record<string, unknown>,
  getSession: GetSession,
  setSession: SetSession
) => Promise<string>;

export type GetAuthorizationUri = (
  payload: {
    state: string;
    redirectUri: string;
    connectorId: string;
    connectorFactoryId: string;
    jti: string;
    headers: { userAgent?: string };
  },
  setSession: SetSession
) => Promise<string>;

export const socialUserInfoGuard = z.object({
  id: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export type SocialUserInfo = z.infer<typeof socialUserInfoGuard>;

export const customizableAttributeMappingGuard = socialUserInfoGuard.partial();

export type CustomizableAttributeMapping = z.infer<typeof customizableAttributeMappingGuard>;

export const attributeMappingGuard = socialUserInfoGuard.required();

export type AttributeMapping = z.infer<typeof attributeMappingGuard>;

export type GetUserInfo = (
  data: unknown,
  getSession: GetSession
) => Promise<SocialUserInfo & Record<string, string | boolean | number | undefined>>;

export const connectorSessionGuard = z
  .object({
    nonce: z.string(),
    redirectUri: z.string(),
    connectorId: z.string(),
    connectorFactoryId: z.string(),
    jti: z.string(),
    state: z.string(),
  })
  .partial()
  // Accept arbitrary unspecified keys so developers who can not publish @logto/connector-kit can more flexibly utilize connector session.
  .catchall(z.unknown());

export type ConnectorSession = z.infer<typeof connectorSessionGuard>;

export type GetSession = () => Promise<ConnectorSession>;

export type SetSession = (storage: ConnectorSession) => Promise<void>;

export type SocialConnector = BaseConnector<ConnectorType.Social> & {
  getAuthorizationUri: GetAuthorizationUri;
  getUserInfo: GetUserInfo;
  validateSamlAssertion?: ValidateSamlAssertion;
};
