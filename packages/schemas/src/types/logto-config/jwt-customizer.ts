import { LogtoJwtTokenKeyType, jwtCustomizerGuard } from '@logto/core-kit';
import { z } from 'zod';

import { Organizations, Roles, UserSsoIdentities } from '../../db-entries/index.js';
import { mfaFactorsGuard } from '../../foundations/index.js';
import { scopeResponseGuard } from '../scope.js';
import { userInfoGuard } from '../user.js';

import { accessTokenPayloadGuard, clientCredentialsPayloadGuard } from './oidc-provider.js';

export { LogtoJwtTokenKeyType, jwtCustomizerGuard, type CustomJwtFetcher } from '@logto/core-kit';

export const jwtCustomizerUserContextGuard = userInfoGuard.extend({
  ssoIdentities: UserSsoIdentities.guard
    .pick({ issuer: true, identityId: true, detail: true })
    .array(),
  mfaVerificationFactors: mfaFactorsGuard,
  roles: Roles.guard
    .pick({ id: true, name: true, description: true })
    .extend({
      scopes: scopeResponseGuard
        .pick({ id: true, name: true, description: true, resourceId: true, resource: true })
        .array(),
    })
    .array(),
  organizations: Organizations.guard.pick({ id: true, name: true, description: true }).array(),
  organizationRoles: z
    .object({
      organizationId: z.string(),
      roleId: z.string(),
      roleName: z.string(),
    })
    .array(),
});

export type JwtCustomizerUserContext = z.infer<typeof jwtCustomizerUserContextGuard>;

export const accessTokenJwtCustomizerGuard = jwtCustomizerGuard
  .extend({
    // Use partial token guard since users customization may not rely on all fields.
    tokenSample: accessTokenPayloadGuard.partial().optional(),
    contextSample: z.object({ user: jwtCustomizerUserContextGuard.partial() }).optional(),
  })
  .strict();

export type AccessTokenJwtCustomizer = z.infer<typeof accessTokenJwtCustomizerGuard>;

export const clientCredentialsJwtCustomizerGuard = jwtCustomizerGuard
  .extend({
    // Use partial token guard since users customization may not rely on all fields.
    tokenSample: clientCredentialsPayloadGuard.partial().optional(),
  })
  .strict();

export type ClientCredentialsJwtCustomizer = z.infer<typeof clientCredentialsJwtCustomizerGuard>;

/**
 * This guard is for the core JWT customizer testing API request body guard.
 * Unlike the DB guard
 *
 * - rename the `tokenSample` to `token` and is required for testing.
 * - rename the `contextSample` to `context` and is required for AccessToken testing.
 */
export const jwtCustomizerTestRequestBodyGuard = z.discriminatedUnion('tokenType', [
  z.object({
    tokenType: z.literal(LogtoJwtTokenKeyType.AccessToken),
    ...accessTokenJwtCustomizerGuard.pick({ environmentVariables: true, script: true }).shape,
    token: accessTokenJwtCustomizerGuard.required().shape.tokenSample,
    context: accessTokenJwtCustomizerGuard.required().shape.contextSample,
  }),
  z.object({
    tokenType: z.literal(LogtoJwtTokenKeyType.ClientCredentials),
    ...clientCredentialsJwtCustomizerGuard.pick({ environmentVariables: true, script: true }).shape,
    token: clientCredentialsJwtCustomizerGuard.required().shape.tokenSample,
  }),
]);

export type JwtCustomizerTestRequestBody = z.infer<typeof jwtCustomizerTestRequestBodyGuard>;
