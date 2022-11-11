import { SignInIdentifier } from '@logto/schemas';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import { is } from 'superstruct';

import SecondaryPageWrapper from '@/components/SecondaryPageWrapper';
import PasswordSignInForm from '@/containers/PasswordSignInForm';
import { useSieMethods } from '@/hooks/use-sie';
import ErrorPage from '@/pages/ErrorPage';
import { passcodeStateGuard } from '@/types/guard';
import { formatPhoneNumberWithCountryCallingCode } from '@/utils/country-code';
import { isEmailOrSmsMethod } from '@/utils/sign-in-experience';

type Parameters = {
  method?: string;
};

const SignInPassword = () => {
  const { t } = useTranslation();
  const { method } = useParams<Parameters>();
  const { state } = useLocation();
  const { signInMethods } = useSieMethods();
  const methodSetting = signInMethods.find(({ identifier }) => identifier === method);

  // Only Email and Sms method should use this page
  if (!methodSetting || !isEmailOrSmsMethod(methodSetting.identifier) || !methodSetting.password) {
    return <ErrorPage />;
  }

  const invalidState = !is(state, passcodeStateGuard);
  const value =
    !invalidState && state[methodSetting.identifier === SignInIdentifier.Email ? 'email' : 'phone'];

  if (!value) {
    return (
      <ErrorPage
        title={method === SignInIdentifier.Email ? 'error.invalid_email' : 'error.invalid_phone'}
      />
    );
  }

  return (
    <SecondaryPageWrapper
      title="description.enter_password"
      description="description.enter_password_for"
      descriptionProps={{
        method: t(`description.${method === SignInIdentifier.Email ? 'email' : 'phone_number'}`),
        value:
          method === SignInIdentifier.Email
            ? value
            : formatPhoneNumberWithCountryCallingCode(value),
      }}
    >
      <PasswordSignInForm
        autoFocus
        method={methodSetting.identifier}
        value={value}
        hasPasswordlessButton={methodSetting.verificationCode}
      />
    </SecondaryPageWrapper>
  );
};

export default SignInPassword;
