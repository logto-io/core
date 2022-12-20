import type { GetSession } from '@logto/connector-kit';
import type {
  Event,
  IdentifierPayload,
  SocialConnectorPayload,
  SocialIdentityPayload,
} from '@logto/schemas';
import type { Context } from 'koa';
import type { Provider } from 'oidc-provider';

import RequestError from '#src/errors/RequestError/index.js';
import { verifyUserPassword } from '#src/libraries/user.js';
import { getConnectorSessionResult } from '#src/routes/session/utils.js';
import assertThat from '#src/utils/assert-that.js';

import type {
  PasswordIdentifierPayload,
  PasscodeIdentifierPayload,
  SocialIdentifier,
  VerifiedEmailIdentifier,
  VerifiedPhoneIdentifier,
  AnonymousInteractionResult,
  Identifier,
  AccountIdIdentifier,
} from '../types/index.js';
import findUserByIdentifier from '../utils/find-user-by-identifier.js';
import { isPasscodeIdentifier, isPasswordIdentifier, isSocialIdentifier } from '../utils/index.js';
import { verifyIdentifierByPasscode } from '../utils/passcode-validation.js';
import { verifySocialIdentity } from '../utils/social-verification.js';

const verifyPasswordIdentifier = async (
  identifier: PasswordIdentifierPayload
): Promise<AccountIdIdentifier> => {
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
  ctx: Context,
  provider: Provider
): Promise<VerifiedEmailIdentifier | VerifiedPhoneIdentifier> => {
  const { jti } = await provider.interactionDetails(ctx.req, ctx.res);

  await verifyIdentifierByPasscode({ ...identifier, event }, jti, ctx.createLog);

  return 'email' in identifier
    ? { key: 'emailVerified', value: identifier.email }
    : { key: 'phoneVerified', value: identifier.phone };
};

const verifySocialIdentifier = async (
  identifier: SocialConnectorPayload,
  ctx: Context,
  getSession?: GetSession
): Promise<SocialIdentifier> => {
  const userInfo = await verifySocialIdentity(identifier, ctx.createLog, getSession);

  return { key: 'social', connectorId: identifier.connectorId, userInfo };
};

const verifySocialIdentityInInteractionRecord = async (
  { connectorId, identityType }: SocialIdentityPayload,
  interactionRecord?: AnonymousInteractionResult
): Promise<VerifiedEmailIdentifier | VerifiedPhoneIdentifier> => {
  // Sign-In with social verified email or phone requires a social identifier in the interaction result
  const socialIdentifierRecord = interactionRecord?.identifiers?.find(
    (entity): entity is SocialIdentifier =>
      entity.key === 'social' && entity.connectorId === connectorId
  );

  const verifiedSocialIdentity = socialIdentifierRecord?.userInfo[identityType];

  assertThat(verifiedSocialIdentity, new RequestError('session.connector_session_not_found'));

  return {
    key: identityType === 'email' ? 'emailVerified' : 'phoneVerified',
    value: verifiedSocialIdentity,
  };
};

export default async function identifierPayloadVerification(
  ctx: Context,
  provider: Provider,
  identifierPayload: IdentifierPayload,
  interactionStorage: AnonymousInteractionResult
): Promise<Identifier> {
  const { event } = interactionStorage;

  if (isPasswordIdentifier(identifierPayload)) {
    return verifyPasswordIdentifier(identifierPayload);
  }

  if (isPasscodeIdentifier(identifierPayload)) {
    return verifyPasscodeIdentifier(event, identifierPayload, ctx, provider);
  }

  if (isSocialIdentifier(identifierPayload)) {
    return verifySocialIdentifier(identifierPayload, ctx, async () =>
      getConnectorSessionResult(ctx, provider)
    );
  }

  // Sign-In with social verified email or phone
  return verifySocialIdentityInInteractionRecord(identifierPayload, interactionStorage);
}
