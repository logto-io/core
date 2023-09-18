import type { User, Application } from '@logto/schemas';
import { useTranslation } from 'react-i18next';

import * as transferLayout from '@/scss/transfer.module.scss';

import TargetEntityItem from '../TargetEntityItem';

import * as styles from './index.module.scss';

type Props<T> = {
  selectedEntities: T[];
  onChange: (value: T[]) => void;
};

function TargetEntitiesBox<T extends User | Application>({ selectedEntities, onChange }: Props<T>) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  return (
    <div className={transferLayout.box}>
      <div className={transferLayout.boxTopBar}>
        <span className={styles.added}>
          {`${selectedEntities.length} `}
          {t('general.added')}
        </span>
      </div>
      <div className={transferLayout.boxContent}>
        {selectedEntities.map((entity) => (
          <TargetEntityItem
            key={entity.id}
            entity={entity}
            onDelete={() => {
              onChange(selectedEntities.filter(({ id }) => id !== entity.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TargetEntitiesBox;
