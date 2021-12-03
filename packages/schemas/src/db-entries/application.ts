// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import {
  OidcClientMetadata,
  oidcClientMetadataGuard,
  GeneratedSchema,
  Guard,
} from '../foundations';
import { ApplicationType } from './custom-types';

export type ApplicationDBEntry = {
  id: string;
  name: string;
  type: ApplicationType;
  oidcClientMetadata: OidcClientMetadata;
  createdAt?: number;
};

const guard: Guard<ApplicationDBEntry> = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(ApplicationType),
  oidcClientMetadata: oidcClientMetadataGuard,
  createdAt: z.number().optional(),
});

export const Applications: GeneratedSchema<ApplicationDBEntry> = Object.freeze({
  table: 'applications',
  tableSingular: 'application',
  fields: {
    id: 'id',
    name: 'name',
    type: 'type',
    oidcClientMetadata: 'oidc_client_metadata',
    createdAt: 'created_at',
  },
  fieldKeys: ['id', 'name', 'type', 'oidcClientMetadata', 'createdAt'],
  guard,
});
