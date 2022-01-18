// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import { GeneratedSchema, Guard } from '../foundations';

export type ResourceScopeCreate = {
  id: string;
  name: string;
  description: string;
  resourceId: string;
};

export type ResourceScope = {
  id: string;
  name: string;
  description: string;
  resourceId: string;
};

const createGuard: Guard<ResourceScopeCreate> = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  resourceId: z.string(),
});

export const ResourceScopes: GeneratedSchema<ResourceScopeCreate> = Object.freeze({
  table: 'resource_scopes',
  tableSingular: 'resource_scope',
  fields: {
    id: 'id',
    name: 'name',
    description: 'description',
    resourceId: 'resource_id',
  },
  fieldKeys: ['id', 'name', 'description', 'resourceId'],
  createGuard,
});
