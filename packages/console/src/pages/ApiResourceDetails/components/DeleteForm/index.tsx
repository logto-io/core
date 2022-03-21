import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import ModalLayout from '@/components/ModalLayout';
import TextInput from '@/components/TextInput';
import useApi from '@/hooks/use-api';

import * as styles from './index.module.scss';

type Props = {
  id: string;
  name: string;
  onClose: () => void;
};

const DeleteForm = ({ id, name, onClose }: Props) => {
  const api = useApi();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const navigate = useNavigate();

  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);

  const inputMismatched = inputName !== name;

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete(`/api/resources/${id}`);
      onClose();
      navigate(`/api-resources`);
      toast.success(t('api_resource_details.api_resource_deleted', { name }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout
      title="api_resource_details.reminder"
      footer={
        <div className={styles.actions}>
          <Button
            type="outline"
            title="admin_console.api_resource_details.cancel"
            onClick={onClose}
          />
          <Button
            disabled={inputMismatched || loading}
            type="danger"
            title="admin_console.api_resource_details.delete"
            onClick={handleDelete}
          />
        </div>
      }
      onClose={onClose}
    >
      <div className={styles.content}>
        {[...Array.from({ length: 10 }).keys()].map((index) => {
          return (
            <div key={index} className={styles.description}>
              <Trans
                t={t}
                i18nKey="api_resource_details.delete_description"
                values={{ name }}
                components={{ span: <span className={styles.hightlight} /> }}
              />
            </div>
          );
        })}
        <TextInput
          value={inputName}
          placeholder={t('api_resource_details.enter_your_api_resource_name')}
          hasError={inputMismatched}
          onChange={(event) => {
            setInputName(event.currentTarget.value);
          }}
        />
      </div>
    </ModalLayout>
  );
};

export default DeleteForm;
