import { Application, ApplicationType } from '@logto/schemas';
import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import ModalLayout from '@/components/ModalLayout';
import RadioGroup, { Radio } from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import useApi from '@/hooks/use-api';
import { applicationTypeI18nKey } from '@/types/applications';
import { GetStartedForm } from '@/types/get-started';

import GetStartedModal from '../GetStartedModal';
import TypeDescription from '../TypeDescription';
import * as styles from './index.module.scss';

type FormData = {
  type: ApplicationType;
  name: string;
  description?: string;
};

type Props = {
  onClose?: (createdApp?: Application) => void;
};

const CreateForm = ({ onClose }: Props) => {
  const [createdApp, setCreatedApp] = useState<Application>();
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const {
    field: { onChange, value, name, ref },
  } = useController({ name: 'type', control, rules: { required: true } });
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const api = useApi();

  const closeModal = () => {
    setIsGetStartedModalOpen(false);
    onClose?.(createdApp);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) {
      return;
    }

    const createdApp = await api.post('/api/applications', { json: data }).json<Application>();
    setCreatedApp(createdApp);

    setIsGetStartedModalOpen(true);
  });

  const onComplete = async (data: GetStartedForm) => {
    if (!createdApp) {
      return;
    }

    const application = await api
      .patch(`/api/applications/${createdApp.id}`, {
        json: {
          oidcClientMetadata: {
            redirectUris: data.redirectUris.filter(Boolean),
            postLogoutRedirectUris: data.postLogoutRedirectUris.filter(Boolean),
          },
        },
      })
      .json<Application>();
    setCreatedApp(application);
    closeModal();
  };

  return (
    <ModalLayout
      title="applications.create"
      subtitle="applications.subtitle"
      size="large"
      footer={
        <Button
          disabled={isSubmitting}
          htmlType="submit"
          title="admin_console.applications.create"
          size="large"
          type="primary"
          onClick={onSubmit}
        />
      }
      onClose={onClose}
    >
      <form>
        <FormField title="admin_console.applications.select_application_type">
          <RadioGroup ref={ref} name={name} value={value} type="card" onChange={onChange}>
            {Object.values(ApplicationType).map((value) => (
              <Radio key={value} value={value}>
                <TypeDescription
                  title={t(`${applicationTypeI18nKey[value]}.title`)}
                  subtitle={t(`${applicationTypeI18nKey[value]}.subtitle`)}
                  description={t(`${applicationTypeI18nKey[value]}.description`)}
                />
              </Radio>
            ))}
          </RadioGroup>
          {errors.type?.type === 'required' && (
            <div className={styles.error}>{t('applications.no_application_type_selected')}</div>
          )}
        </FormField>
        <FormField isRequired title="admin_console.applications.application_name">
          <TextInput {...register('name', { required: true })} />
        </FormField>
        <FormField title="admin_console.applications.application_description">
          <TextInput {...register('description')} />
        </FormField>
      </form>
      {createdApp && (
        <GetStartedModal
          appName={createdApp.name}
          isOpen={isGetStartedModalOpen}
          onClose={closeModal}
          onComplete={onComplete}
        />
      )}
    </ModalLayout>
  );
};

export default CreateForm;
