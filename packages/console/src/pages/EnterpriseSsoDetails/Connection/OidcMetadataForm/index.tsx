import { SsoProviderName } from '@logto/schemas';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CopyToClipboard from '@/ds-components/CopyToClipboard';
import FormField from '@/ds-components/FormField';
import InlineNotification from '@/ds-components/InlineNotification';
import TextInput from '@/ds-components/TextInput';
import {
  type ParsedSsoIdentityProviderConfig,
  type OidcGuideFormType,
  type SsoConnectorConfig,
} from '@/pages/EnterpriseSso/types.js';
import { uriValidator } from '@/utils/validator';

import ParsedConfigPreview from './ParsedConfigPreview';
import * as styles from './index.module.scss';

type Props = {
  providerConfig?: ParsedSsoIdentityProviderConfig<SsoProviderName.OIDC>;
  config?: SsoConnectorConfig<SsoProviderName.OIDC>;
  providerName: SsoProviderName;
};

// Do not show inline notification and parsed config preview if it is on guide page.
function OidcMetadataForm({ providerConfig, config, providerName }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    register,
    formState: { errors },
  } = useFormContext<OidcGuideFormType>();

  const isConfigEmpty = !config || Object.keys(config).length === 0;

  return (
    <>
      {!providerConfig && isConfigEmpty && (
        <InlineNotification severity="alert">
          {t('enterprise_sso_details.upload_oidc_idp_info_text')}
        </InlineNotification>
      )}
      <FormField isRequired title="enterprise_sso.metadata.oidc.client_id_field_name">
        <TextInput
          {...register('clientId', { required: true })}
          error={Boolean(errors.clientId)}
          placeholder="Client ID"
        />
      </FormField>
      <FormField isRequired title="enterprise_sso.metadata.oidc.client_secret_field_name">
        <TextInput
          isConfidential
          {...register('clientSecret', { required: true })}
          error={Boolean(errors.clientSecret)}
          placeholder="Client secret"
        />
      </FormField>
      <FormField
        isRequired={providerName !== SsoProviderName.GOOGLE_WORKSPACE}
        title="enterprise_sso.metadata.oidc.issuer_field_name"
      >
        {providerName === SsoProviderName.GOOGLE_WORKSPACE ? (
          <CopyToClipboard
            className={styles.copyToClipboard}
            variant="border"
            // TODO: this hard-coded value should align with the `googleIssuer` value defined in `packages/core/src/sso/GoogleWorkspaceSsoConnector/index.ts`.
            value={providerConfig?.issuer ?? 'https://accounts.google.com'}
          />
        ) : (
          <TextInput
            {...register('issuer', {
              required: true,
              validate: (value) => !value || uriValidator(value) || t('errors.invalid_uri_format'),
            })}
            error={errors.issuer?.message}
            placeholder="http(s)://"
          />
        )}
        {providerConfig &&
          (config?.issuer ?? providerName === SsoProviderName.GOOGLE_WORKSPACE) && (
            <ParsedConfigPreview
              className={styles.oidcConfigPreview}
              providerConfig={providerConfig}
            />
          )}
      </FormField>
      <FormField title="enterprise_sso.metadata.oidc.scope_field_name">
        <TextInput {...register('scope')} error={Boolean(errors.scope)} />
      </FormField>
    </>
  );
}

export default OidcMetadataForm;
