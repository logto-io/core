import { BrandingStyle } from '@logto/schemas';
import classNames from 'classnames';
import React, { useContext } from 'react';

import BrandingHeader from '@/components/BrandingHeader';
import TextLink from '@/components/TextLink';
import { PageContext } from '@/hooks/use-page-context';

import * as styles from './index.module.scss';
import { PrimarySection, SecondarySection } from './registry';

const SignIn = () => {
  const { experienceSettings } = useContext(PageContext);
  const { slogan, logoUrl = '', style } = experienceSettings?.branding ?? {};

  return (
    <div className={classNames(styles.wrapper)}>
      <BrandingHeader
        className={styles.header}
        headline={style === BrandingStyle.Logo_Slogan ? slogan : undefined}
        logo={logoUrl}
      />
      <PrimarySection signInMethod={experienceSettings?.primarySignInMethod} />
      <SecondarySection
        primarySignInMethod={experienceSettings?.primarySignInMethod}
        secondarySignInMethods={experienceSettings?.secondarySignInMethods}
      />
      <TextLink
        className={styles.createAccount}
        type="secondary"
        href="/register"
        text="action.create_account"
      />
    </div>
  );
};

export default SignIn;
