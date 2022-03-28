import { Resource } from '@logto/schemas';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import ModalLayout from '@/components/ModalLayout';
import TextInput from '@/components/TextInput';
import useApi from '@/hooks/use-api';

type FormData = {
  name: string;
  indicator: string;
};

type Props = {
  onClose?: (createdApiResource?: Resource) => void;
};

const CreateForm = ({ onClose }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const api = useApi();

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) {
      return;
    }

    const createdApiResource = await api.post('/api/resources', { json: data }).json<Resource>();
    onClose?.(createdApiResource);
  });

  return (
    <ModalLayout
      title="api_resources.create"
      subtitle="api_resources.subtitle"
      footer={
        <Button
          disabled={isSubmitting}
          htmlType="submit"
          title="admin_console.api_resources.create"
          size="large"
          type="primary"
          onClick={onSubmit}
        />
      }
      onClose={onClose}
    >
      <form>
        <FormField isRequired title="admin_console.api_resources.api_name">
          <TextInput {...register('name', { required: true })} />
        </FormField>
        <FormField isRequired title="admin_console.api_resources.api_identifier">
          <TextInput {...register('indicator', { required: true })} />
        </FormField>
      </form>
    </ModalLayout>
  );
};

export default CreateForm;
