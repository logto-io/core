import type { Role, ScopeResponse } from '@logto/schemas';
import { internalRolePrefix } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import ContactUsPhraseLink from '@/components/ContactUsPhraseLink';
import PlanName from '@/components/PlanName';
import QuotaGuardFooter from '@/components/QuotaGuardFooter';
import RoleScopesTransfer from '@/components/RoleScopesTransfer';
import { TenantsContext } from '@/contexts/TenantsProvider';
import Button from '@/ds-components/Button';
import FormField from '@/ds-components/FormField';
import ModalLayout from '@/ds-components/ModalLayout';
import TextInput from '@/ds-components/TextInput';
import useApi from '@/hooks/use-api';
import useConfigs from '@/hooks/use-configs';
import useSubscriptionPlan from '@/hooks/use-subscription-plan';
import { trySubmitSafe } from '@/utils/form';
import { hasReachedQuotaLimit } from '@/utils/quota';

export type Props = {
  totalRoleCount: number;
  onClose: (createdRole?: Role) => void;
};

type CreateRoleFormData = Pick<Role, 'name' | 'description'> & {
  scopes: ScopeResponse[];
};

type CreateRolePayload = Pick<Role, 'name' | 'description'> & {
  scopeIds?: string[];
};

function CreateRoleForm({ totalRoleCount, onClose }: Props) {
  const { currentTenantId } = useContext(TenantsContext);
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { data: currentPlan } = useSubscriptionPlan(currentTenantId);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<CreateRoleFormData>();

  const api = useApi();
  const { updateConfigs } = useConfigs();
  const roleScopes = watch('scopes', []);

  const onSubmit = handleSubmit(
    trySubmitSafe(async ({ name, description, scopes }) => {
      if (isSubmitting) {
        return;
      }

      const payload: CreateRolePayload = {
        name,
        description,
        scopeIds: conditional(scopes.length > 0 && scopes.map(({ id }) => id)),
      };

      const createdRole = await api.post('api/roles', { json: payload }).json<Role>();
      await updateConfigs({ roleCreated: true });
      onClose(createdRole);
    })
  );

  const isRolesReachLimit = hasReachedQuotaLimit({
    quotaKey: 'rolesLimit',
    plan: currentPlan,
    usage: totalRoleCount,
  });

  const isScopesPerReachLimit = hasReachedQuotaLimit({
    quotaKey: 'scopesPerRoleLimit',
    plan: currentPlan,
    /**
     * If usage is equal to the limit, it means the current role has reached the maximum allowed scope.
     * Therefore, we should not assign any more scopes at this point.
     * However, the currently selected scopes haven't been assigned yet, so we subtract 1
     * to allow the assignment when the scope count is equal to the limit.
     */
    usage: roleScopes.length - 1,
  });

  return (
    <ModalLayout
      title="roles.create_role_title"
      subtitle="roles.create_role_description"
      learnMoreLink="https://docs.logto.io/docs/recipes/rbac/manage-permissions-and-roles#manage-roles"
      size="large"
      footer={
        <>
          {isRolesReachLimit && currentPlan && (
            <QuotaGuardFooter>
              <Trans
                components={{
                  a: <ContactUsPhraseLink />,
                  planName: <PlanName name={currentPlan.name} />,
                }}
              >
                {t('upsell.paywall.roles', { count: currentPlan.quota.rolesLimit })}
              </Trans>
            </QuotaGuardFooter>
          )}
          {isScopesPerReachLimit && currentPlan && !isRolesReachLimit && (
            <QuotaGuardFooter>
              <Trans
                components={{
                  a: <ContactUsPhraseLink />,
                  planName: <PlanName name={currentPlan.name} />,
                }}
              >
                {t('upsell.paywall.scopes_per_role', {
                  count: currentPlan.quota.scopesPerRoleLimit ?? 0,
                })}
              </Trans>
            </QuotaGuardFooter>
          )}
          {!isRolesReachLimit && !isScopesPerReachLimit && (
            <Button
              isLoading={isSubmitting}
              htmlType="submit"
              title="roles.create_role_button"
              size="large"
              type="primary"
              onClick={onSubmit}
            />
          )}
        </>
      }
      onClose={onClose}
    >
      <form>
        <FormField isRequired title="roles.role_name">
          <TextInput
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            {...register('name', {
              required: true,
              validate: (name) =>
                name.startsWith(internalRolePrefix)
                  ? t('errors.create_internal_role_violation')
                  : true,
            })}
            placeholder={t('roles.role_name_placeholder')}
            error={errors.name?.message}
          />
        </FormField>
        <FormField isRequired title="roles.role_description">
          <TextInput
            {...register('description', { required: true })}
            placeholder={t('roles.role_description_placeholder')}
            error={Boolean(errors.description)}
          />
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
}

export default CreateRoleForm;
