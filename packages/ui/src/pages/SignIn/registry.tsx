import { SignInMode } from '@logto/schemas';

import Divider from '@/components/Divider';
import TextLink from '@/components/TextLink';
import CreateAccount from '@/containers/CreateAccount';
import { EmailPasswordless, PhonePasswordless } from '@/containers/Passwordless';
import SignInMethodsLink from '@/containers/SignInMethodsLink';
import { PrimarySocialSignIn, SecondarySocialSignIn } from '@/containers/SocialSignIn';
import TermsOfUse from '@/containers/TermsOfUse';
import UsernameSignin from '@/containers/UsernameSignin';
import { SignInMethod, LocalSignInMethod, ConnectorData } from '@/types';

import * as styles from './index.module.scss';

export const PrimarySection = ({
  signInMethod,
  socialConnectors = [],
  signInMode,
}: {
  signInMethod?: SignInMethod;
  socialConnectors?: ConnectorData[];
  signInMode?: SignInMode;
}) => {
  switch (signInMethod) {
    case 'email':
      return (
        <EmailPasswordless
          type={signInMode === SignInMode.Register ? 'register' : 'sign-in'}
          className={styles.primarySignIn}
        />
      );
    case 'sms':
      return (
        <PhonePasswordless
          type={signInMode === SignInMode.Register ? 'register' : 'sign-in'}
          className={styles.primarySignIn}
        />
      );
    case 'username':
      return signInMode === SignInMode.Register ? (
        <CreateAccount />
      ) : (
        <UsernameSignin className={styles.primarySignIn} />
      );
    case 'social':
      return socialConnectors.length > 0 ? (
        <>
          <TermsOfUse className={styles.terms} />
          <PrimarySocialSignIn className={styles.primarySocial} />
        </>
      ) : null;
    default:
      return null;
  }
};

export const SecondarySection = ({
  primarySignInMethod,
  secondarySignInMethods,
  socialConnectors = [],
}: {
  primarySignInMethod?: SignInMethod;
  secondarySignInMethods?: SignInMethod[];
  socialConnectors?: ConnectorData[];
}) => {
  if (!primarySignInMethod || !secondarySignInMethods?.length) {
    return null;
  }

  const localMethods = secondarySignInMethods.filter(
    (method): method is LocalSignInMethod => method !== 'social'
  );

  if (primarySignInMethod === 'social' && localMethods.length > 0) {
    return (
      <>
        {socialConnectors.length > 0 && (
          <Divider label="description.continue_with" className={styles.divider} />
        )}
        <SignInMethodsLink signInMethods={localMethods} />
      </>
    );
  }

  return (
    <>
      <SignInMethodsLink
        signInMethods={localMethods}
        template="sign_in_with"
        className={styles.otherMethodsLink}
      />
      {secondarySignInMethods.includes('social') && socialConnectors.length > 0 && (
        <>
          <Divider label="description.or" className={styles.divider} />
          <SecondarySocialSignIn />
        </>
      )}
    </>
  );
};

export const CreateAccountLink = ({
  primarySignInMethod,
}: {
  primarySignInMethod?: SignInMethod;
}) => {
  switch (primarySignInMethod) {
    case 'username':
    case 'email':
    case 'sms':
      return (
        <>
          <div className={styles.placeHolder} />
          <TextLink
            className={styles.createAccount}
            to={`/register/${primarySignInMethod}`}
            text="action.create_account"
          />
        </>
      );
    default:
      return null;
  }
};
