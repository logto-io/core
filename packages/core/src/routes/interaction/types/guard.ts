import { emailRegEx, phoneRegEx } from '@logto/core-kit';
import { eventGuard, profileGuard, identifierGuard } from '@logto/schemas';
import { z } from 'zod';

export const interactionPayloadGuard = z.object({
  event: eventGuard.optional(),
  identifier: identifierGuard.optional(),
  profile: profileGuard.optional(),
});

export type InteractionPayload = z.infer<typeof interactionPayloadGuard>;
export type IdentifierPayload = z.infer<typeof identifierGuard>;

export const sendPasscodePayloadGuard = z.union([
  z.object({
    event: eventGuard,
    email: z.string().regex(emailRegEx),
  }),
  z.object({
    event: eventGuard,
    phone: z.string().regex(phoneRegEx),
  }),
]);

export type SendPasscodePayload = z.infer<typeof sendPasscodePayloadGuard>;
