import type { Profile, SignInExperience, User } from '@logto/schemas';
import { MissingProfile, SignInIdentifier } from '@logto/schemas';
import type { Nullable } from '@silverhand/essentials';
import type { Context } from 'koa';

import RequestError from '#src/errors/RequestError/index.js';
import { findUserById } from '#src/queries/user.js';
import assertThat from '#src/utils/assert-that.js';

import type { WithSignInExperienceContext } from '../middleware/koa-session-sign-in-experience-guard.js';
import type { Identifier, AccountIdIdentifier } from '../types/index.js';
import { isUserPasswordSet } from '../utils/index.js';

const findUserByIdentifiers = async (identifiers: Identifier[]) => {
  const accountIdentifier = identifiers.find(
    (identifier): identifier is AccountIdIdentifier => identifier.key === 'accountId'
  );

  if (!accountIdentifier) {
    return null;
  }

  return findUserById(accountIdentifier.value);
};

// eslint-disable-next-line complexity
const getMissingProfileBySignUpIdentifiers = ({
  signUp,
  user,
  profile,
}: {
  signUp: SignInExperience['signUp'];
  user: Nullable<User>;
  profile?: Profile;
}) => {
  const missingProfile = new Set<MissingProfile>();

  if (signUp.password && !(user && isUserPasswordSet(user)) && !profile?.password) {
    missingProfile.add(MissingProfile.password);
  }

  const signUpIdentifiersSet = new Set(signUp.identifiers);

  // Username
  if (
    signUpIdentifiersSet.has(SignInIdentifier.Username) &&
    !user?.username &&
    !profile?.username
  ) {
    missingProfile.add(MissingProfile.username);

    return missingProfile;
  }

  // Email or phone
  if (
    signUpIdentifiersSet.has(SignInIdentifier.Email) &&
    signUpIdentifiersSet.has(SignInIdentifier.Sms)
  ) {
    if (!user?.primaryPhone && !user?.primaryEmail && !profile?.phone && !profile?.email) {
      missingProfile.add(MissingProfile.emailOrPhone);
    }

    return missingProfile;
  }

  // Email only
  if (signUpIdentifiersSet.has(SignInIdentifier.Email) && !user?.primaryEmail && !profile?.email) {
    missingProfile.add(MissingProfile.email);

    return missingProfile;
  }

  // Phone only
  if (signUpIdentifiersSet.has(SignInIdentifier.Sms) && !user?.primaryPhone && !profile?.phone) {
    missingProfile.add(MissingProfile.phone);

    return missingProfile;
  }

  return missingProfile;
};

export default async function mandatoryUserProfileValidation(
  ctx: WithSignInExperienceContext<Context>,
  identifiers: Identifier[],
  profile?: Profile
) {
  const {
    signInExperience: { signUp },
  } = ctx;
  const user = await findUserByIdentifiers(identifiers);
  const missingProfileSet = getMissingProfileBySignUpIdentifiers({ signUp, user, profile });

  assertThat(
    missingProfileSet.size === 0,
    new RequestError(
      { code: 'user.missing_profile', status: 422 },
      { missingProfile: Array.from(missingProfileSet) }
    )
  );
}
