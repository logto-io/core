import React from 'react';
import { TFuncKey, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { ErrorIcon } from '@/components/Icons';
import NavBar from '@/components/NavBar';

import * as styles from './index.module.scss';

type Props = {
  title?: TFuncKey<'translation', 'main_flow'>;
  message?: string;
};

const ErrorPage = ({ title = 'description.not_found', message }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'main_flow' });
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        <ErrorIcon />
        <div className={styles.title}>{t(title)}</div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
      <Button
        className={styles.backButton}
        onClick={() => {
          navigate(-1);
        }}
      >
        {t('action.back')}
      </Button>
    </div>
  );
};

export default ErrorPage;
