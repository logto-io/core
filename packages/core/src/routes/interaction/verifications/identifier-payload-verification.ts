import type { Event, SocialConnectorPayload } from '@logto/schemas';
import type { Provider } from 'oidc-provider';

import RequestError from '#src/errors/RequestError/index.js';
import { verifyUserPassword } from '#src/lib/user.js';
import assertThat from '#src/utils/assert-that.js';

import type {
  PasswordIdentifierPayload,
  PasscodeIdentifierPayload,
  InteractionContext,
  SocialIdentifier,
  VerifiedEmailIdentifier,
  VerifiedPhoneIdentifier,
  AnonymousInteractionResult,
  PayloadVerifiedInteractionResult,
  Identifier,
  AccountIdIdentifier,
} from '../types/index.js';
import findUserByIdentifier from '../utils/find-user-by-identifier.js';
import { isPasscodeIdentifier, isPasswordIdentifier } from '../utils/index.js';
import { mergeIdentifiers, storeInteractionResult } from '../utils/interaction.js';
import { verifyIdentifierByPasscode } from '../utils/passcode-validation.js';
import { verifySocialIdentity } from '../utils/social-verification.js';

const verifyPasswordIdentifier = async (
  identifier: PasswordIdentifierPayload
): Promise<AccountIdIdentifier> => {
  // TODO: Log
  const { password, ...identity } = identifier;
  const user = await findUserByIdentifier(identity);
  const verifiedUser = await verifyUserPassword(user, password);

  const { isSuspended, id } = verifiedUser;

  assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));

  return { key: 'accountId', value: id };
};

const verifyPasscodeIdentifier = async (
  event: Event,
  identifier: PasscodeIdentifierPayload,
  ctx: InteractionContext,
  provider: Provider
): Promise<VerifiedEmailIdentifier | VerifiedPhoneIdentifier> => {
  const { jti } = await provider.interactionDetails(ctx.req, ctx.res);

  await verifyIdentifierByPasscode({ ...identifier, event }, jti, ctx.log);

  return 'email' in identifier
    ? { key: 'emailVerified', value: identifier.email }
    : { key: 'phoneVerified', value: identifier.phone };
};

const verifySocialIdentifier = async (
  identifier: SocialConnectorPayload,
  ctx: InteractionContext
): Promise<SocialIdentifier> => {
  const userInfo = await verifySocialIdentity(identifier, ctx.log);

  return { key: 'social', connectorId: identifier.connectorId, userInfo };
};

const verifyIdentifierPayload = async (
  ctx: InteractionContext,
  provider: Provider
): Promise<Identifier | undefined> => {
  const { identifier, event } = ctx.interactionPayload;

  if (!identifier) {
    return;
  }

  if (isPasswordIdentifier(identifier)) {
    return verifyPasswordIdentifier(identifier);
  }

  if (isPasscodeIdentifier(identifier)) {
    return verifyPasscodeIdentifier(event, identifier, ctx, provider);
  }

  return verifySocialIdentifier(identifier, ctx);
};

export default async function identifierPayloadVerification(
  ctx: InteractionContext,
  provider: Provider,
  interactionRecord?: AnonymousInteractionResult
): Promise<PayloadVerifiedInteractionResult> {
  const { event } = ctx.interactionPayload;

  const identifier = await verifyIdentifierPayload(ctx, provider);

  const interaction: PayloadVerifiedInteractionResult = {
    ...interactionRecord,
    event,
    identifiers: mergeIdentifiers({
      oldIdentifiers: interactionRecord?.identifiers,
      newIdentifiers: identifier && [identifier],
    }),
  };

  await storeInteractionResult(interaction, ctx, provider);

  return interaction;
}
