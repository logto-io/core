import { AdminConsoleKey } from '@logto/phrases';
import classNames from 'classnames';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import Button, { ButtonType } from '@/components/Button';
import * as modalStyles from '@/scss/modal.module.scss';

import ModalLayout from '../ModalLayout';
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
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  children,
  className,
  title = 'general.reminder',
  confirmButtonType = 'danger',
  confirmButtonText = 'general.confirm',
  cancelButtonText = 'general.cancel',
  isOpen,
  isConfirmButtonDisabled = false,
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={modalStyles.content}
      overlayClassName={modalStyles.overlay}
    >
      <ModalLayout
        title={title}
        footer={
          <>
            <Button type="outline" title={cancelButtonText} onClick={onCancel} />
            <Button
              type={confirmButtonType}
              title={confirmButtonText}
              disabled={isConfirmButtonDisabled}
              isLoading={isLoading}
              onClick={onConfirm}
            />
          </>
        }
        className={classNames(styles.content, className)}
        onClose={onCancel}
      >
        {children}
      </ModalLayout>
    </ReactModal>
  );
};

export default ConfirmModal;
