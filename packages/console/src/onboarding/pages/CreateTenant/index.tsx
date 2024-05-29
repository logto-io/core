import { Theme } from '@logto/schemas';
import { joinPath } from '@silverhand/essentials';
import { useContext } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CreateTenantHeaderIconDark from '@/assets/icons/create-tenant-header-dark.svg';
import CreateTenantHeaderIcon from '@/assets/icons/create-tenant-header.svg';
import { useCloudApi } from '@/cloud/hooks/use-cloud-api';
import ActionBar from '@/components/ActionBar';
import { type CreateTenantData } from '@/components/CreateTenantModal/types';
import PageMeta from '@/components/PageMeta';
import Region, { RegionName } from '@/components/Region';
import { isDevFeaturesEnabled } from '@/consts/env';
import { TenantsContext } from '@/contexts/TenantsProvider';
import Button from '@/ds-components/Button';
import DangerousRaw from '@/ds-components/DangerousRaw';
import FormField from '@/ds-components/FormField';
import OverlayScrollbar from '@/ds-components/OverlayScrollbar';
import RadioGroup, { Radio } from '@/ds-components/RadioGroup';
import TextInput from '@/ds-components/TextInput';
import useTenantPathname from '@/hooks/use-tenant-pathname';
import useTheme from '@/hooks/use-theme';
import * as pageLayout from '@/onboarding/scss/layout.module.scss';
import { OnboardingPage, OnboardingRoute } from '@/onboarding/types';
import { trySubmitSafe } from '@/utils/form';

type CreateTenantForm = Omit<CreateTenantData, 'tag'>;

function CreateTenant() {
  const methods = useForm<CreateTenantForm>({ defaultValues: { regionName: RegionName.EU } });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = methods;
  const { navigate } = useTenantPathname();
  const { prependTenant } = useContext(TenantsContext);
  const theme = useTheme();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const cloudApi = useCloudApi();

  const onCreateClick = handleSubmit(
    trySubmitSafe(async ({ name, regionName }: CreateTenantForm) => {
      const newTenant = await cloudApi.post('/api/tenants', { body: { name, regionName } });
      prependTenant(newTenant);
      navigate(joinPath(OnboardingRoute.Onboarding, newTenant.id, OnboardingPage.SignInExperience));
    })
  );

  return (
    <div className={pageLayout.page}>
      <PageMeta titleKey={['cloud.create_tenant.page_title', 'cloud.general.onboarding']} />
      <OverlayScrollbar className={pageLayout.contentContainer}>
        <div className={pageLayout.content}>
          {theme === Theme.Light ? <CreateTenantHeaderIcon /> : <CreateTenantHeaderIconDark />}
          <div className={pageLayout.title}>{t('cloud.create_tenant.title')}</div>
          <div className={pageLayout.description}>{t('cloud.create_tenant.description')}</div>
          <FormProvider {...methods}>
            <FormField isRequired title="tenants.settings.tenant_name">
              <TextInput
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                placeholder="My project"
                {...register('name', { required: true })}
                error={Boolean(errors.name)}
              />
            </FormField>
            <FormField
              title="tenants.settings.tenant_region"
              description="tenants.settings.tenant_region_description"
            >
              <Controller
                control={control}
                name="regionName"
                rules={{ required: true }}
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup type="small" name={name} value={value} onChange={onChange}>
                    {/* Manually maintaining the list of regions to avoid unexpected changes. We may consider using an API in the future. */}
                    {[RegionName.EU, RegionName.US].map((region) => (
                      <Radio
                        key={region}
                        title={
                          <DangerousRaw>
                            <Region
                              regionName={region}
                              isComingSoon={!isDevFeaturesEnabled && region !== RegionName.EU}
                            />
                          </DangerousRaw>
                        }
                        value={region}
                        isDisabled={!isDevFeaturesEnabled && region !== RegionName.EU}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormField>
          </FormProvider>
        </div>
      </OverlayScrollbar>
      <ActionBar step={2} totalSteps={3}>
        <Button
          title="general.create"
          type="primary"
          disabled={isSubmitting}
          onClick={onCreateClick}
        />
      </ActionBar>
    </div>
  );
}

export default CreateTenant;
