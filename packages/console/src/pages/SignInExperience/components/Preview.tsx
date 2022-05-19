import { Language } from '@logto/phrases';
import { AppearanceMode, ConnectorDTO, ConnectorMetadata, SignInExperience } from '@logto/schemas';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import TopInfoImage from '@/assets/images/phone-top-info.svg';
import Card from '@/components/Card';
import Select from '@/components/Select';
import TabNav, { TabNavItem } from '@/components/TabNav';
import { RequestError } from '@/hooks/use-api';

import * as styles from './Preview.module.scss';

type Props = {
  signInExperience: SignInExperience;
  className?: string;
};

const Preview = ({ signInExperience, className }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [language, setLanguage] = useState<Language>(Language.English);
  const [mode, setMode] = useState<AppearanceMode>(AppearanceMode.LightMode);
  const [platform, setPlatform] = useState<'web' | 'mobile'>('mobile');
  const { data: allConnectors } = useSWR<ConnectorDTO[], RequestError>('/api/connectors');

  const config = useMemo(() => {
    if (!allConnectors) {
      return '';
    }

    const socialConnectors = signInExperience.socialSignInConnectorTargets.reduce<
      Array<ConnectorMetadata & { id: string }>
    >(
      (previous, connectorTarget) => [
        ...previous,
        ...allConnectors
          .filter(({ metadata: { target } }) => target === connectorTarget)
          .map(({ metadata, id }) => ({ ...metadata, id })),
      ],
      []
    );

    return encodeURIComponent(
      JSON.stringify({
        signInExperience: {
          ...signInExperience,
          socialConnectors,
        },
        language,
        mode,
        platform,
      })
    );
  }, [allConnectors, language, mode, platform, signInExperience]);

  return (
    <Card className={classNames(styles.preview, className)}>
      <div className={styles.header}>
        <div className={styles.title}>{t('sign_in_exp.preview.title')}</div>
        <div className={styles.selects}>
          <Select
            value={language}
            options={[
              { value: Language.English, title: t('sign_in_exp.preview.languages.english') },
              { value: Language.Chinese, title: t('sign_in_exp.preview.languages.chinese') },
            ]}
            onChange={(value) => {
              setLanguage(value as Language);
            }}
          />
          <Select
            value={mode}
            options={[
              { value: AppearanceMode.LightMode, title: t('sign_in_exp.preview.light') },
              { value: AppearanceMode.DarkMode, title: t('sign_in_exp.preview.dark') },
            ]}
            onChange={(value) => {
              setMode(value as AppearanceMode);
            }}
          />
        </div>
      </div>
      <TabNav className={styles.nav}>
        <TabNavItem
          isActive={platform === 'web'}
          onClick={() => {
            setPlatform('web');
          }}
        >
          {t('sign_in_exp.preview.web')}
        </TabNavItem>
        <TabNavItem
          isActive={platform === 'mobile'}
          onClick={() => {
            setPlatform('mobile');
          }}
        >
          {t('sign_in_exp.preview.mobile')}
        </TabNavItem>
      </TabNav>
      <div className={classNames(styles.body, styles[platform])}>
        <div className={styles.device}>
          {platform === 'mobile' && (
            <div className={styles.topBar}>
              <div className={styles.time}>{dayjs().format('HH:mm')}</div>
              <img src={TopInfoImage} />
            </div>
          )}
          <iframe src={`/sign-in?config=${config}&preview=true`} />
        </div>
      </div>
    </Card>
  );
};

export default Preview;
