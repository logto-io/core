import { z } from 'zod';

export const oidcModelInstancePayloadGuard = z
  .object({
    userCode: z.string().optional(),
    uid: z.string().optional(),
    grantId: z.string().optional(),
  })
  /**
   * Try to use `.passthrough()` if type has been fixed.
   * https://github.com/colinhacks/zod/issues/452
   */
  .catchall(z.unknown());

export type OidcModelInstancePayload = z.infer<typeof oidcModelInstancePayloadGuard>;

export const oidcClientMetadataGuard = z.object({
  applicationType: z.enum(['web', 'native']),
  redirectUris: z.string().array(),
  postLogoutRedirectUris: z.string().array(),
});

export type OidcClientMetadata = z.infer<typeof oidcClientMetadataGuard>;
