import { z } from 'zod';

import { Hooks, type Application, type User } from '../db-entries/index.js';
import { type DataHookEvent, type InteractionHookEvent } from '../foundations/index.js';

import type { userInfoSelectFields } from './user.js';

export type InteractionHookEventPayload = {
  event: InteractionHookEvent;
  createdAt: string;
  hookId: string;
  sessionId?: string;
  userAgent?: string;
  userId?: string;
  userIp?: string;
  user?: Pick<User, (typeof userInfoSelectFields)[number]>;
  application?: Pick<Application, 'id' | 'type' | 'name' | 'description'>;
} & Record<string, unknown>;

export type DataHookEventPayload = {
  event: DataHookEvent;
  createdAt: string;
  hookId: string;
  ip?: string;
  userAgent?: string;
  /** An object that contains response data. */
  response?: {
    body?: Record<string, unknown>;
  };
  /** Request route params. */
  params?: Record<string, string>;
  /** Request route path. */
  path?: string;
  /** Matched route used as the identifier to trigger the hook. */
  matchedRoute?: string;
  /** Response status code. */
  status?: number;
  /** Request method. */
  method?: string;
} & Record<string, unknown>;

export type HookEventPayload = InteractionHookEventPayload | DataHookEventPayload;

const hookExecutionStatsGuard = z.object({
  successCount: z.number(),
  requestCount: z.number(),
});

export type HookExecutionStats = z.infer<typeof hookExecutionStatsGuard>;

export const hookResponseGuard = Hooks.guard.extend({
  executionStats: hookExecutionStatsGuard,
});

export type HookResponse = z.infer<typeof hookResponseGuard>;

export const hookTestErrorResponseDataGuard = z.object({
  responseStatus: z.number(),
  responseBody: z.string(),
});

export type HookTestErrorResponseData = z.infer<typeof hookTestErrorResponseDataGuard>;
