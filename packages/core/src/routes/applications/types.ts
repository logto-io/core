import {
  Applications,
  applicationCreateGuard as originalApplicationCreateGuard,
  applicationPatchGuard as originalApplicationPatchGuard,
} from '@logto/schemas';
import { z } from 'zod';

import { EnvSet } from '#src/env-set/index.js';

enum OriginalApplicationType {
  Native = 'Native',
  SPA = 'SPA',
  Traditional = 'Traditional',
  MachineToMachine = 'MachineToMachine',
}

// FIXME:  @wangsijie Remove this guard once protected app is ready
// @ts-expect-error -- hide the dev feature field from the guard type, but always return the full type to make the api logic simpler
export const applicationResponseGuard: typeof Applications.guard = EnvSet.values
  .isDevFeaturesEnabled
  ? Applications.guard
  : Applications.guard
      .omit({ type: true, protectedAppMetadata: true })
      .extend({ type: z.nativeEnum(OriginalApplicationType) });

const applicationCreateGuardWithProtectedAppMetadata = originalApplicationCreateGuard
  .omit({
    protectedAppMetadata: true,
  })
  .extend({
    protectedAppMetadata: z
      .object({
        subDomain: z.string(),
        origin: z.string(),
      })
      .optional(),
  });

const applicationPatchGuardWithProtectedAppMetadata = originalApplicationPatchGuard
  .deepPartial()
  .omit({
    protectedAppMetadata: true,
  })
  .extend({
    protectedAppMetadata: z
      .object({
        origin: z.string().optional(),
        sessionDuration: z.number().optional(),
        pageRules: z
          .array(
            z.object({
              /* The path pattern (regex) to match */
              path: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
  });

// FIXME:  @wangsijie Remove this guard once protected app is ready
// @ts-expect-error -- hide the dev feature field from the guard type, but always return the full type to make the api logic simpler
export const applicationCreateGuard: typeof applicationCreateGuardWithProtectedAppMetadata = EnvSet
  .values.isDevFeaturesEnabled
  ? applicationCreateGuardWithProtectedAppMetadata
  : applicationCreateGuardWithProtectedAppMetadata
      .omit({ type: true, protectedAppMetadata: true })
      .extend({ type: z.nativeEnum(OriginalApplicationType) });

// FIXME:  @wangsijie Remove this guard once protected app is ready
// @ts-expect-error -- hide the dev feature field from the guard type, but always return the full type to make the api logic simpler
export const applicationPatchGuard: typeof applicationPatchGuardWithProtectedAppMetadata = EnvSet
  .values.isDevFeaturesEnabled
  ? applicationPatchGuardWithProtectedAppMetadata
  : applicationPatchGuardWithProtectedAppMetadata.omit({ protectedAppMetadata: true });
