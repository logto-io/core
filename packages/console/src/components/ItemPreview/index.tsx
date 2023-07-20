import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useTenantPathname from '@/hooks/use-tenant-pathname';

import * as styles from './index.module.scss';

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  to?: To;
  size?: 'default' | 'compact';
  suffix?: ReactNode;
};

function ItemPreview({ title, subtitle, icon, to, size = 'default', suffix }: Props) {
  const { getTo } = useTenantPathname();

  return (
    <div className={classNames(styles.item, styles[size])}>
      {icon}
      <div className={styles.content}>
        <div className={styles.meta}>
          {to && (
            <Link
              className={styles.title}
              to={getTo(to)}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {title}
            </Link>
          )}
          {!to && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        {suffix}
      </div>
    </div>
  );
}

export default ItemPreview;
