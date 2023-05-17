import { deduplicate } from '@silverhand/essentials';
import { boolean, object, string } from 'zod';

import { type Application, type User } from '../db-entries/index.js';
import {
  hookEventsGuard,
  type HookEvent,
  hookConfigGuard,
  hookEventGuard,
} from '../foundations/index.js';

import type { userInfoSelectFields } from './user.js';

export type HookEventPayload = {
  hookId: string;
  event: HookEvent;
  createdAt: string;
  sessionId?: string;
  userAgent?: string;
  userId?: string;
  user?: Pick<User, (typeof userInfoSelectFields)[number]>;
  application?: Pick<Application, 'id' | 'type' | 'name' | 'description'>;
} & Record<string, unknown>;

const nonemptyUniqueHookEventsGuard = hookEventsGuard
  .nonempty()
  .transform((events) => deduplicate(events));

export const createHookGuard = object({
  // Note: ensure the user will not create a hook with an empty name.
  name: string().min(1).optional(),
  event: hookEventGuard.optional(),
  events: nonemptyUniqueHookEventsGuard.optional(),
  config: hookConfigGuard,
  enabled: boolean().optional(),
});

export const updateHookGuard = createHookGuard
  .omit({ events: true })
  .deepPartial()
  .extend({ events: nonemptyUniqueHookEventsGuard.optional() });
