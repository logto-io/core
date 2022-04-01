import {
  Branding,
  BrandingStyle,
  SignInMethods,
  SignInMethodState,
  TermsOfUse,
} from '@logto/schemas';
import { Optional } from '@silverhand/essentials';

import { ConnectorInstance, ConnectorType } from '@/connectors/types';
import assertThat from '@/utils/assert-that';

export const validateBranding = (branding: Branding) => {
  if (branding.style === BrandingStyle.Logo_Slogan) {
    assertThat(branding.slogan?.trim(), 'sign_in_experiences.empty_slogan');
  }
};

export const validateTermsOfUse = (termsOfUse: TermsOfUse) => {
  assertThat(
    !termsOfUse.enabled || termsOfUse.contentUrl,
    'sign_in_experiences.empty_content_url_of_terms_of_use'
  );
};

const isEnabled = (state: SignInMethodState) => state !== SignInMethodState.disabled;

export const validateSignInMethods = (
  signInMethods: SignInMethods,
  socialSignInConnectorIds: Optional<string[]>,
  enabledConnectorInstances: ConnectorInstance[]
) => {
  const signInMethodStates = Object.values(signInMethods);
  assertThat(
    signInMethodStates.filter((state) => state === SignInMethodState.primary).length === 1,
    'sign_in_experiences.not_one_and_only_one_primary_sign_in_method'
  );

  if (isEnabled(signInMethods.email)) {
    assertThat(
      enabledConnectorInstances.some((item) => item.metadata.type === ConnectorType.Email),
      'sign_in_experiences.enabled_connector_not_found',
      { type: ConnectorType.Email }
    );
  }

  if (isEnabled(signInMethods.sms)) {
    assertThat(
      enabledConnectorInstances.some((item) => item.metadata.type === ConnectorType.SMS),
      'sign_in_experiences.enabled_connector_not_found',
      { type: ConnectorType.SMS }
    );
  }

  if (isEnabled(signInMethods.social)) {
    assertThat(
      enabledConnectorInstances.some((item) => item.metadata.type === ConnectorType.Social),
      'sign_in_experiences.enabled_connector_not_found',
      { type: ConnectorType.Social }
    );

    assertThat(
      socialSignInConnectorIds && socialSignInConnectorIds.length > 0,
      'sign_in_experiences.empty_social_connectors'
    );

    const enabledSocialConnectorIds = new Set(
      enabledConnectorInstances
        .filter((instance) => instance.metadata.type === ConnectorType.Social)
        .map((instance) => instance.connector.id)
    );
    assertThat(
      socialSignInConnectorIds.every((id) => enabledSocialConnectorIds.has(id)),
      'sign_in_experiences.invalid_social_connectors'
    );
  }
};
