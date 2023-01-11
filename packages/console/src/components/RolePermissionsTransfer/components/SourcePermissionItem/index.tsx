import type { ScopeResponse } from '@logto/schemas';

import Checkbox from '@/components/Checkbox';
import { onKeyDownHandler } from '@/utilities/a11y';

import * as styles from './index.module.scss';

type Props = {
  scope: ScopeResponse;
  isSelected: boolean;
  onSelect: () => void;
};

const SourcePermissionItem = ({ scope: { name }, isSelected, onSelect }: Props) => (
  <div className={styles.sourcePermissionItem}>
    <Checkbox
      checked={isSelected}
      disabled={false}
      onChange={() => {
        onSelect();
      }}
    />
    <div
      className={styles.name}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDownHandler(() => {
        onSelect();
      })}
      onClick={() => {
        onSelect();
      }}
    >
      {name}
    </div>
  </div>
);

export default SourcePermissionItem;
