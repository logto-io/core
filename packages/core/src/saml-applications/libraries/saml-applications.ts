import {
  ApplicationType,
  type SamlApplicationResponse,
  type PatchSamlApplication,
  type SamlApplicationSecret,
  BindingType,
} from '@logto/schemas';
import { generateStandardId } from '@logto/shared';
import { removeUndefinedKeys } from '@silverhand/essentials';
import * as saml from 'samlify';

import { EnvSet, getTenantEndpoint } from '#src/env-set/index.js';
import RequestError from '#src/errors/RequestError/index.js';
import type Queries from '#src/tenants/Queries.js';
import assertThat from '#src/utils/assert-that.js';

import {
  ensembleSamlApplication,
  generateKeyPairAndCertificate,
  buildSingleSignOnUrl,
  buildSamlIdentityProviderEntityId,
} from './utils.js';

export const createSamlApplicationsLibrary = (queries: Queries) => {
  const {
    applications: { findApplicationById, updateApplicationById },
    samlApplicationSecrets: {
      insertSamlApplicationSecret,
      findActiveSamlApplicationSecretByApplicationId,
    },
    samlApplicationConfigs: {
      findSamlApplicationConfigByApplicationId,
      updateSamlApplicationConfig,
    },
  } = queries;

  const createSamlApplicationSecret = async ({
    applicationId,
    lifeSpanInDays = 365 * 3,
    active = false,
  }: {
    applicationId: string;
    lifeSpanInDays?: number;
    active?: boolean;
  }): Promise<SamlApplicationSecret> => {
    const { privateKey, certificate, notAfter } = await generateKeyPairAndCertificate(
      lifeSpanInDays
    );

    return insertSamlApplicationSecret({
      id: generateStandardId(),
      applicationId,
      privateKey,
      certificate,
      expiresAt: notAfter.getTime(),
      active,
    });
  };

  const findSamlApplicationById = async (id: string): Promise<SamlApplicationResponse> => {
    const application = await findApplicationById(id);
    assertThat(
      application.type === ApplicationType.SAML,
      new RequestError({
        code: 'application.saml.saml_application_only',
        status: 422,
      })
    );

    const samlConfig = await findSamlApplicationConfigByApplicationId(application.id);

    return ensembleSamlApplication({ application, samlConfig });
  };

  const updateSamlApplicationById = async (
    id: string,
    patchApplicationObject: PatchSamlApplication
  ): Promise<SamlApplicationResponse> => {
    const { name, description, customData, ...config } = patchApplicationObject;
    const originalApplication = await findApplicationById(id);
    const applicationData = { name, description, customData };

    assertThat(
      originalApplication.type === ApplicationType.SAML,
      new RequestError({
        code: 'application.saml.saml_application_only',
        status: 422,
      })
    );

    const [updatedApplication, upToDateSamlConfig] = await Promise.all([
      Object.keys(applicationData).length > 0
        ? updateApplicationById(id, removeUndefinedKeys(applicationData))
        : originalApplication,
      Object.keys(config).length > 0
        ? updateSamlApplicationConfig({
            set: config,
            where: { applicationId: id },
            jsonbMode: 'replace',
          })
        : findSamlApplicationConfigByApplicationId(id),
    ]);

    return ensembleSamlApplication({
      application: updatedApplication,
      samlConfig: upToDateSamlConfig,
    });
  };

  const getSamlIdPMetadataByApplicationId = async (id: string): Promise<{ metadata: string }> => {
    const [{ tenantId }, { certificate }] = await Promise.all([
      findSamlApplicationConfigByApplicationId(id),
      findActiveSamlApplicationSecretByApplicationId(id),
    ]);

    const tenantEndpoint = getTenantEndpoint(tenantId, EnvSet.values);

    // eslint-disable-next-line new-cap
    const idp = saml.IdentityProvider({
      entityID: buildSamlIdentityProviderEntityId(tenantEndpoint, id),
      signingCert: certificate,
      singleSignOnService: [
        {
          Location: buildSingleSignOnUrl(tenantEndpoint, id),
          Binding: BindingType.Redirect,
        },
      ],
    });

    return {
      metadata: idp.getMetadata(),
    };
  };

  return {
    createSamlApplicationSecret,
    findSamlApplicationById,
    updateSamlApplicationById,
    getSamlIdPMetadataByApplicationId,
  };
};
