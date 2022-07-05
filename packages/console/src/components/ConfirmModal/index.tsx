import { AdminConsoleKey, I18nKey } from '@logto/phrases';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
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
  confirmButtonText?: I18nKey;
  cancelButtonText?: I18nKey;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  children,
  className,
  title = 'general.reminder',
  confirmButtonType = 'danger',
  confirmButtonText = 'admin_console.general.confirm',
  cancelButtonText = 'admin_console.general.cancel',
  isOpen,
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
            <Button type={confirmButtonType} title={confirmButtonText} onClick={onConfirm} />
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
