import type { Role, ScopeResponse } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import FormField from '@/components/FormField';
import ModalLayout from '@/components/ModalLayout';
import RoleScopesTransfer from '@/components/RoleScopesTransfer';
import TextInput from '@/components/TextInput';
import useApi from '@/hooks/use-api';

export type Props = {
  onClose: (createdRole?: Role) => void;
};

type CreateRoleFormData = Pick<Role, 'name' | 'description'> & {
  scopes: ScopeResponse[];
};

type CreateRolePayload = Pick<Role, 'name' | 'description'> & {
  scopeIds?: string[];
};

const CreateRoleForm = ({ onClose }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CreateRoleFormData>();

  const api = useApi();

  const onSubmit = handleSubmit(async ({ name, description, scopes }) => {
    if (isSubmitting) {
      return;
    }

    const payload: CreateRolePayload = {
      name,
      description,
      scopeIds: conditional(scopes.length > 0 && scopes.map(({ id }) => id)),
    };

    const createdRole = await api.post('/api/roles', { json: payload }).json<Role>();
    onClose(createdRole);
  });

  return (
    <ModalLayout
      title="roles.create_role_title"
      subtitle="roles.create_role_description"
      size="large"
      footer={
        <Button
          isLoading={isSubmitting}
          htmlType="submit"
          title="roles.create_role_button"
          size="large"
          type="primary"
          onClick={onSubmit}
        />
      }
      onClose={onClose}
    >
      <form>
        <FormField isRequired title="roles.role_name">
          <TextInput
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('name', { required: true })}
          />
        </FormField>
        <FormField title="roles.role_description">
          <TextInput {...register('description')} />
        </FormField>
        <FormField title="roles.assign_permissions">
          <Controller
            control={control}
            name="scopes"
            defaultValue={[]}
            render={({ field: { value, onChange } }) => (
              <RoleScopesTransfer value={value} onChange={onChange} />
            )}
          />
        </FormField>
      </form>
    </ModalLayout>
  );
};

export default CreateRoleForm;
