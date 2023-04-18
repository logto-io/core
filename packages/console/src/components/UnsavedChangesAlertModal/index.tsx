import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { unstable_useBlocker as useBlocker, useLocation } from 'react-router-dom';

import ConfirmModal from '../ConfirmModal';

type Props = {
  hasUnsavedChanges: boolean;
  parentPath?: string;
};

function UnsavedChangesAlertModal({ hasUnsavedChanges, parentPath }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { pathname } = useLocation();
  const blocker = useBlocker(hasUnsavedChanges);

  // Reset the blocker if the conditions are met.
  useEffect(() => {
    const targetPathname = blocker.location?.pathname;
    if (
      blocker.state === 'blocked' &&
      (!hasUnsavedChanges ||
        targetPathname === pathname ||
        (parentPath && targetPathname?.startsWith(parentPath)))
    ) {
      blocker.reset();
    }
  }, [blocker, pathname, hasUnsavedChanges, parentPath]);

  return (
    <ConfirmModal
      isOpen={blocker.state === 'blocked'}
      confirmButtonText="general.leave_page"
      cancelButtonText="general.stay_on_page"
      onCancel={blocker.reset}
      onConfirm={blocker.proceed}
    >
      {t('general.unsaved_changes_warning')}
    </ConfirmModal>
  );
}

export default UnsavedChangesAlertModal;
