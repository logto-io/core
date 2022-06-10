import React, { useEffect, useContext } from 'react';

import { consent } from '@/apis/consent';
import { LoadingIcon } from '@/components/LoadingLayer';
import useApi from '@/hooks/use-api';
import { PageContext } from '@/hooks/use-page-context';

import * as styles from './index.module.scss';

const Consent = () => {
  const { experienceSettings, theme } = useContext(PageContext);
  const { error, result, run: asyncConsent } = useApi(consent);

  const logoUrl =
    theme === 'light'
      ? experienceSettings?.branding.logoUrl
      : experienceSettings?.branding.darkLogoUrl;

  useEffect(() => {
    void asyncConsent();
  }, [asyncConsent]);

  useEffect(() => {
    if (result?.redirectTo) {
      window.location.replace(result.redirectTo);
    }
  }, [result]);

  return (
    <div className={styles.wrapper}>
      <img src={logoUrl} />
      {!error && <LoadingIcon />}
    </div>
  );
};

export default Consent;
