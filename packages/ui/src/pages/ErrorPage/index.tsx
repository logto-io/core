import { useContext } from 'react';
import type { TFuncKey } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EmptyState from '@/assets/icons/empty_state.svg';
import EmptyStateDark from '@/assets/icons/empty_state_dark.svg';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import { PageContext } from '@/hooks/use-page-context';

import * as styles from './index.module.scss';

type Props = {
  title?: TFuncKey;
  message?: TFuncKey;
  rawMessage?: string;
};

const ErrorPage = ({ title = 'description.not_found', message, rawMessage }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useContext(PageContext);

  const errorMessage = rawMessage ?? (message && t(message));

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.container}>
        {theme === 'light' ? <EmptyState /> : <EmptyStateDark />}
        <div className={styles.title}>{t(title)}</div>
        {errorMessage && <div className={styles.message}>{String(errorMessage)}</div>}
      </div>
      <Button
        className={styles.backButton}
        title="action.back"
        onClick={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};

export default ErrorPage;
