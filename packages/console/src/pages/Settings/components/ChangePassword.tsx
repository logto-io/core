import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import ModalLayout from '@/components/ModalLayout';
import TextInput from '@/components/TextInput';
import useApi from '@/hooks/use-api';
import useLogtoUserId from '@/hooks/use-logto-user-id';
import * as modalStyles from '@/scss/modal.module.scss';

import * as styles from './ChangePassword.module.scss';

type FormFields = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [isOpen, setIsOpen] = useState(false);
  const { watch, register, reset } = useForm<FormFields>();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useLogtoUserId();
  const api = useApi();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const isDisabled = !password || password !== confirmPassword;

  const onSubmit = async () => {
    if (!userId) {
      toast.error(t('errors.unexpected_error'));

      return;
    }

    setIsLoading(true);
    await api.patch(`/api/users/${userId}/password`, { json: { password } }).json();
    setIsLoading(false);
    setIsOpen(false);
    toast.success(t('settings.password_changed'));
    reset({});
  };

  return (
    <>
      <FormField title="settings.change_password">
        <div className={styles.changePassword}>
          <div className={styles.description}>{t('settings.change_password_description')}</div>
          <Button
            title="settings.change_password"
            type="default"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </FormField>
      <ReactModal
        shouldCloseOnEsc
        isOpen={isOpen}
        className={modalStyles.content}
        overlayClassName={modalStyles.overlay}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalLayout
          title="settings.change_modal_title"
          subtitle="settings.change_modal_description"
          footer={
            <Button
              type="primary"
              title="general.confirm"
              disabled={isDisabled || isLoading}
              onClick={onSubmit}
            />
          }
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div>
            <FormField title="settings.new_password">
              <TextInput {...register('password', { required: true })} type="password" />
            </FormField>
            <FormField title="settings.confirm_password">
              <TextInput {...register('confirmPassword', { required: true })} type="password" />
            </FormField>
          </div>
        </ModalLayout>
      </ReactModal>
    </>
  );
};

export default ChangePassword;
