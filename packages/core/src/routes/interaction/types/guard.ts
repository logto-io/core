import { emailRegEx, phoneRegEx, validateRedirectUrl } from '@logto/core-kit';
import type {
  UsernamePasswordPayload,
  EmailPasswordPayload,
  EmailPasscodePayload,
  PhonePasswordPayload,
  PhonePasscodePayload,
} from '@logto/schemas';
import {
  socialConnectorPayloadGuard,
  emailPasscodePayloadGuard,
  phonePasscodePayloadGuard,
  eventGuard,
  profileGuard,
  identifierGuard,
} from '@logto/schemas';
import { z } from 'zod';

// Interaction Route Guard
const forgotPasswordInteractionPayloadGuard = z.object({
  event: z.literal('forgot-password'),
  identifier: z.union([emailPasscodePayloadGuard, phonePasscodePayloadGuard]).optional(),
  profile: profileGuard.pick({ password: true }).optional(),
});

const registerInteractionPayloadGuard = z.object({
  event: z.literal('register'),
  identifier: z
    .union([emailPasscodePayloadGuard, phonePasscodePayloadGuard, socialConnectorPayloadGuard])
    .optional(),
  profile: profileGuard.optional(),
});

const signInInteractionPayloadGuard = z.object({
  event: z.literal('sign-in'),
  identifier: identifierGuard.optional(),
  profile: profileGuard.optional(),
});

export const interactionPayloadGuard = z.discriminatedUnion('event', [
  signInInteractionPayloadGuard,
  registerInteractionPayloadGuard,
  forgotPasswordInteractionPayloadGuard,
]);

export type InteractionPayload = z.infer<typeof interactionPayloadGuard>;
export type IdentifierPayload = z.infer<typeof identifierGuard>;

export type PasswordIdentifierPayload =
  | UsernamePasswordPayload
  | EmailPasswordPayload
  | PhonePasswordPayload;

export type PasscodeIdentifierPayload = EmailPasscodePayload | PhonePasscodePayload;

// Passcode Send Route Guard
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

// Social Authorization Uri Route Guard
export const getSocialAuthorizationUrlPayloadGuard = z.object({
  connectorId: z.string(),
  state: z.string(),
  redirectUri: z.string().refine((url) => validateRedirectUrl(url, 'web')),
});

export type SocialAuthorizationUrlPayload = z.infer<typeof getSocialAuthorizationUrlPayloadGuard>;
