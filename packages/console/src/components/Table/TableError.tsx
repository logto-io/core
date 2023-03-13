import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import RequestErrorDarkImage from '@/assets/images/request-error-dark.svg';
import RequestErrorImage from '@/assets/images/request-error.svg';
import { AppThemeContext } from '@/contexts/AppThemeProvider';
import { Theme } from '@/types/theme';

import Button from '../Button';
import * as styles from './TableError.module.scss';

type Props = {
  title?: string;
  content?: string;
  onRetry?: () => void;
  columns: number;
};

const TableError = ({ title, content, onRetry, columns }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { theme } = useContext(AppThemeContext);

  return (
    <tr>
      <td colSpan={columns}>
        <div className={styles.tableError}>
          {theme === Theme.LightMode ? <RequestErrorImage /> : <RequestErrorDarkImage />}
          <div className={styles.title}>{title ?? t('errors.something_went_wrong')}</div>
          <div className={styles.content}>{content ?? t('errors.unknown_server_error')}</div>
          {onRetry && <Button title="general.retry" onClick={onRetry} />}
        </div>
      </td>
    </tr>
  );
};

export default TableError;
