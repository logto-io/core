import { ConnectorType, SignInExperience, SignInMethodState } from '@logto/schemas';
import useSWR from 'swr';

import { RequestError } from './use-api';

const useConnectorInUse = (type?: ConnectorType, target?: string): boolean | undefined => {
  const { data } = useSWR<SignInExperience, RequestError>(target && type && '/api/sign-in-exp');

  if (!data) {
    return;
  }

  if (type === ConnectorType.Email) {
    return data.signInMethods.email !== SignInMethodState.Disabled;
  }

  if (type === ConnectorType.SMS) {
    return data.signInMethods.sms !== SignInMethodState.Disabled;
  }

  if (!target) {
    return;
  }

  return data.socialSignInConnectorTargets.includes(target);
};

export default useConnectorInUse;
