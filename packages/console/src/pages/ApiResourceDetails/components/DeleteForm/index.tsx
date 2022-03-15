import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import Card from '@/components/Card';
import CardTitle from '@/components/CardTitle';
import TextInput from '@/components/TextInput';
import Close from '@/icons/Close';
import api from '@/utilities/api';

import * as styles from './index.module.scss';

type Props = {
  id: string;
  name: string;
  onClose: () => void;
};

const DeleteForm = ({ id, name, onClose }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const [inputName, setInputName] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  const inputMismatched = inputName !== name;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/api/resources/${id}`);
      onClose();
      toast.success(t('api_resource_details.api_resource_deleted', { name }));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.headline}>
        <CardTitle title="api_resource_details.reminder" />
        <Close className={styles.close} onClick={onClose} />
      </div>
      <div className={styles.description}>
        {t('api_resource_details.delete_description', { name })}
      </div>
      <TextInput
        value={inputName}
        placeholder={t('api_resource_details.enter_your_api_resource_name')}
        hasError={inputMismatched}
        onChange={(event) => {
          setInputName(event.currentTarget.value);
        }}
      />
      <div className={styles.line} />
      <div className={styles.actions}>
        <Button
          type="outline"
          title="admin_console.api_resource_details.cancel"
          onClick={() => {
            onClose();
          }}
        />
        <Button
          disabled={inputMismatched || isDeleting}
          type="outline"
          title="admin_console.api_resource_details.delete"
          onClick={() => {
            void handleDelete();
          }}
        />
      </div>
    </Card>
  );
};

export default DeleteForm;
