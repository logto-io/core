import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyImage from '@/assets/images/table-empty.svg';

import * as styles from './TableEmpty.module.scss';

type Props = {
  title?: string;
  content?: string;
  children?: ReactNode;
};

const TableEmpty = ({ title, content, children }: Props) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td colSpan={0}>
        <div className={styles.tableEmpty}>
          <div>
            <img src={EmptyImage} />
          </div>
          <div className={styles.title}>{title ?? t('admin_console.errors.empty')}</div>
          {content && <div className={styles.content}>{content}</div>}
          {children}
        </div>
      </td>
    </tr>
  );
};

export default TableEmpty;
