import type { SocialUserInfo } from '#src/connectors/types.js';
import RequestError from '#src/errors/RequestError/index.js';
import { verifyUserPassword } from '#src/lib/user.js';
import assertThat from '#src/utils/assert-that.js';

import type { PasswordIdentifierPayload } from '../types/guard.js';
import type { UserIdentity } from '../types/index.js';
import findUserByIdentity from './find-user-by-identity.js';

export const verifyUserByVerifiedPasscodeIdentity = async (identifier: UserIdentity) => {
  const user = await findUserByIdentity(identifier);
  assertThat(user, new RequestError({ code: 'user.user_not_exist', status: 404 }));

  const { id, isSuspended } = user;
  assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));

  return id;
};

export const verifyUserByIdentityAndPassword = async ({
  password,
  ...identity
}: PasswordIdentifierPayload) => {
  const user = await findUserByIdentity(identity);
  const verifiedUser = await verifyUserPassword(user, password);

  const { isSuspended, id } = verifiedUser;
  assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));

  return id;
};

export const verifyUserBySocialIdentity = async (connectorId: string, userInfo: SocialUserInfo) => {
  const user = await findUserByIdentity({ connectorId, userInfo });
  assertThat(user, new RequestError({ code: 'user.user_not_exist', status: 404 }));

  const { id, isSuspended } = user;
  assertThat(!isSuspended, new RequestError({ code: 'user.suspended', status: 401 }));

  return id;
};
