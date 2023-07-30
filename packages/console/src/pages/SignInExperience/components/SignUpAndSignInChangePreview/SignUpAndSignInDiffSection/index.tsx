import type { SignInExperience } from '@logto/schemas';

import SignInDiffSection from './SignInDiffSection';
import SignUpDiffSection from './SignUpDiffSection';
import SocialTargetsDiffSection from './SocialTargetsDiffSection';

type Props = {
  before: SignInExperience;
  after: SignInExperience;
  isAfter?: boolean;
};

function SignUpAndSignInDiffSection({ before, after, isAfter = false }: Props) {
  return (
    <>
      <SignUpDiffSection before={before.signUp} after={after.signUp} isAfter={isAfter} />
      <SignInDiffSection
        before={before.signIn.methods}
        after={after.signIn.methods}
        isAfter={isAfter}
      />
      <SocialTargetsDiffSection
        before={before.signInConnectorTargets}
        after={after.signInConnectorTargets}
        isAfter={isAfter}
      />
    </>
  );
}

export default SignUpAndSignInDiffSection;
