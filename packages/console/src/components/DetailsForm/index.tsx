import classNames from 'classnames';
import type { ReactNode } from 'react';

import SubmitFormChangesActionBar from '../SubmitFormChangesActionBar';
import * as styles from './index.module.scss';

type Props = {
  isDirty: boolean;
  isSubmitting: boolean;
  children: ReactNode;
  onSubmit: () => Promise<void>;
  onDiscard: () => void;
};

const DetailsForm = ({ isDirty, isSubmitting, onSubmit, onDiscard, children }: Props) => {
  return (
    <form className={classNames(styles.container, isDirty && styles.withSubmitActionBar)}>
      <div className={styles.fields}>{children}</div>
      <SubmitFormChangesActionBar
        isOpen={isDirty}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onDiscard={onDiscard}
      />
    </form>
  );
};

export default DetailsForm;
