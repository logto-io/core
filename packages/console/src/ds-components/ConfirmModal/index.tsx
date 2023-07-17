import type { AdminConsoleKey } from '@logto/phrases';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import ReactModal from 'react-modal';

import type { ButtonType } from '@/ds-components/Button';
import Button from '@/ds-components/Button';
import * as modalStyles from '@/scss/modal.module.scss';

import ModalLayout from '../ModalLayout';
import type { Props as ModalLayoutProps } from '../ModalLayout';

import * as styles from './index.module.scss';

export type ConfirmModalProps = {
  children: ReactNode;
  className?: string;
  title?: AdminConsoleKey;
  confirmButtonType?: ButtonType;
  confirmButtonText?: AdminConsoleKey;
  cancelButtonText?: AdminConsoleKey;
  isOpen: boolean;
  isConfirmButtonDisabled?: boolean;
  isLoading?: boolean;
  size?: ModalLayoutProps['size'];
  onCancel?: () => void;
  onConfirm?: () => void;
};

function ConfirmModal({
  children,
  className,
  title = 'general.reminder',
  confirmButtonType = 'danger',
  confirmButtonText = 'general.confirm',
  cancelButtonText = 'general.cancel',
  isOpen,
  isConfirmButtonDisabled = false,
  isLoading = false,
  size,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <ReactModal
      shouldCloseOnEsc
      isOpen={isOpen}
      className={modalStyles.content}
      overlayClassName={modalStyles.overlay}
      onRequestClose={onCancel}
    >
      <ModalLayout
        title={title}
        footer={
          <>
            {onCancel && <Button title={cancelButtonText} onClick={onCancel} />}
            {onConfirm && (
              <Button
                type={confirmButtonType}
                title={confirmButtonText}
                disabled={isConfirmButtonDisabled}
                isLoading={isLoading}
                onClick={onConfirm}
              />
            )}
          </>
        }
        className={classNames(styles.content, className)}
        size={size}
        onClose={onCancel}
      >
        {children}
      </ModalLayout>
    </ReactModal>
  );
}

export default ConfirmModal;
