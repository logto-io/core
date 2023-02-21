import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useContext } from 'react';
import type { TFuncKey } from 'react-i18next';

import BrandingHeader from '@/components/BrandingHeader';
import { PageContext } from '@/hooks/use-page-context';
import { getLogoUrl } from '@/utils/logo';

import AppNotification from '../AppNotification';
import * as styles from './index.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  title?: TFuncKey;
};

const LandingPageContainer = ({ children, className, title }: Props) => {
  const { experienceSettings, theme, platform } = useContext(PageContext);

  if (!experienceSettings) {
    return null;
  }

  const { logoUrl, darkLogoUrl } = experienceSettings.branding;

  return (
    <>
      {platform === 'web' && <div className={styles.placeholderTop} />}
      <div className={classNames(styles.wrapper, className)}>
        <BrandingHeader
          className={styles.header}
          headline={title}
          logo={getLogoUrl({ theme, logoUrl, darkLogoUrl })}
        />
        {children}
      </div>
      {platform === 'web' && <div className={styles.placeholderBottom} />}
      <AppNotification />
    </>
  );
};

export default LandingPageContainer;
