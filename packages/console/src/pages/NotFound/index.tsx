import { AppearanceMode } from '@logto/schemas';
import { useTranslation } from 'react-i18next';

import NotFoundDarkImage from '@/assets/images/not-found-dark.svg';
import NotFoundImage from '@/assets/images/not-found.svg';
import Card from '@/components/Card';
import { useTheme } from '@/hooks/use-theme';

import * as styles from './index.module.scss';

const NotFound = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const theme = useTheme();

  return (
    <Card className={styles.container}>
      {theme === AppearanceMode.LightMode ? <NotFoundImage /> : <NotFoundDarkImage />}
      <div className={styles.message}>{t('errors.page_not_found')}</div>
    </Card>
  );
};

export default NotFound;
