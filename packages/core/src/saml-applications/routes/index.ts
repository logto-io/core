import {
  ApplicationType,
  certificateFingerprintsGuard,
  samlApplicationCreateGuard,
  samlApplicationPatchGuard,
  samlApplicationResponseGuard,
  samlApplicationSecretResponseGuard,
  SamlApplicationSecrets,
} from '@logto/schemas';
import { generateStandardId } from '@logto/shared';
import { removeUndefinedKeys } from '@silverhand/essentials';
import { z } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import { buildOidcClientMetadata } from '#src/oidc/utils.js';
import { generateInternalSecret } from '#src/routes/applications/application-secret.js';
import type { ManagementApiRouter, RouterInitArgs } from '#src/routes/types.js';
import assertThat from '#src/utils/assert-that.js';
import { createContentDisposition } from '#src/utils/content-disposition.js';

import {
  calculateCertificateFingerprints,
  ensembleSamlApplication,
  validateAcsUrl,
} from '../libraries/utils.js';

export default function samlApplicationRoutes<T extends ManagementApiRouter>(
  ...[router, { queries, libraries }]: RouterInitArgs<T>
) {
  const {
    applications: { insertApplication, findApplicationById, deleteApplicationById },
    samlApplicationConfigs: { insertSamlApplicationConfig },
    samlApplicationSecrets: {
      deleteSamlApplicationSecretById,
      findSamlApplicationSecretsByApplicationId,
      findSamlApplicationSecretByApplicationIdAndId,
      updateSamlApplicationSecretStatusByApplicationIdAndSecretId,
      findActiveSamlApplicationSecretByApplicationId,
    },
  } = queries;
  const {
    samlApplications: {
      createSamlApplicationSecret,
      findSamlApplicationById,
      updateSamlApplicationById,
      getSamlApplicationMetadataByApplicationId,
    },
  } = libraries;

  router.post(
    '/saml-applications',
    koaGuard({
      body: samlApplicationCreateGuard,
      response: samlApplicationResponseGuard,
      status: [201, 400, 422],
    }),
    async (ctx, next) => {
      const { name, description, customData, config } = ctx.guard.body;

      if (config?.acsUrl) {
        validateAcsUrl(config.acsUrl);
      }

      const application = await insertApplication(
        removeUndefinedKeys({
          id: generateStandardId(),
          secret: generateInternalSecret(),
          name,
          description,
          customData,
          oidcClientMetadata: buildOidcClientMetadata(),
          isThirdParty: true,
          type: ApplicationType.SAML,
        })
      );

      try {
        const [samlConfig, _] = await Promise.all([
          insertSamlApplicationConfig({
            applicationId: application.id,
            ...config,
          }),
          createSamlApplicationSecret(application.id),
        ]);

        ctx.status = 201;
        ctx.body = ensembleSamlApplication({ application, samlConfig });
      } catch (error) {
        await deleteApplicationById(application.id);
        throw error;
      }

      return next();
    }
  );

  router.get(
    '/saml-applications/:id',
    koaGuard({
      params: z.object({
        id: z.string(),
      }),
      response: samlApplicationResponseGuard,
      status: [200, 404, 422],
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const samlApplication = await findSamlApplicationById(id);

      ctx.status = 200;
      ctx.body = samlApplication;

      return next();
    }
  );

  router.patch(
    '/saml-applications/:id',
    koaGuard({
      params: z.object({ id: z.string() }),
      body: samlApplicationPatchGuard,
      response: samlApplicationResponseGuard,
      status: [200, 404, 422],
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const updatedSamlApplication = await updateSamlApplicationById(id, ctx.guard.body);

      ctx.status = 200;
      ctx.body = updatedSamlApplication;

      return next();
    }
  );

  router.delete(
    '/saml-applications/:id',
    koaGuard({
      params: z.object({ id: z.string() }),
      status: [204, 422, 404],
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const { type } = await findApplicationById(id);
      assertThat(
        type === ApplicationType.SAML,
        new RequestError({
          code: 'application.saml.saml_application_only',
          status: 422,
        })
      );

      await deleteApplicationById(id);

      ctx.status = 204;

      return next();
    }
  );

  router.post(
    '/saml-applications/:id/secrets',
    koaGuard({
      params: z.object({ id: z.string() }),
      body: z.object({ lifeSpanInDays: z.number().optional() }),
      response: samlApplicationSecretResponseGuard,
      status: [201, 400, 404],
    }),
    async (ctx, next) => {
      const {
        body: { lifeSpanInDays },
        params: { id },
      } = ctx.guard;

      ctx.status = 201;
      ctx.body = await createSamlApplicationSecret(id, lifeSpanInDays);

      return next();
    }
  );

  router.get(
    '/saml-applications/:id/secrets',
    koaGuard({
      params: z.object({ id: z.string() }),
      response: samlApplicationSecretResponseGuard.array(),
      status: [200, 400, 404],
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      ctx.status = 200;
      ctx.body = await findSamlApplicationSecretsByApplicationId(id);

      return next();
    }
  );

  router.delete(
    '/saml-applications/:id/secrets/:secretId',
    koaGuard({
      params: z.object({ id: z.string(), secretId: z.string() }),
      status: [204, 400, 404],
    }),
    async (ctx, next) => {
      const { id, secretId } = ctx.guard.params;

      // Although we can directly find the SAML app secret by `secretId` here, to prevent deleting a secret that does not belong to the current application, we will first verify through the application ID and secret ID.
      const samlApplicationSecret = await findSamlApplicationSecretByApplicationIdAndId(
        id,
        secretId
      );

      assertThat(!samlApplicationSecret.active, 'application.saml.can_not_delete_active_secret');

      await deleteSamlApplicationSecretById(secretId);

      ctx.status = 204;

      return next();
    }
  );

  router.patch(
    '/saml-applications/:id/secrets/:secretId',
    koaGuard({
      params: z.object({ id: z.string(), secretId: z.string() }),
      body: SamlApplicationSecrets.createGuard.pick({
        active: true,
      }),
      response: samlApplicationSecretResponseGuard,
      status: [200, 400, 404],
    }),
    async (ctx, next) => {
      const { id, secretId } = ctx.guard.params;
      const { active } = ctx.guard.body;

      const originalSamlApplicationSecret = await findSamlApplicationSecretByApplicationIdAndId(
        id,
        secretId
      );

      if (originalSamlApplicationSecret.active === active) {
        ctx.status = 200;
        ctx.body = originalSamlApplicationSecret;

        return next();
      }

      const updatedSamlApplicationSecret =
        await updateSamlApplicationSecretStatusByApplicationIdAndSecretId(id, secretId, active);

      ctx.status = 200;
      ctx.body = updatedSamlApplicationSecret;

      return next();
    }
  );

  router.get(
    '/saml-applications/:id/certificate',
    koaGuard({
      params: z.object({ id: z.string() }),
      status: [200, 400, 404],
      response: z.object({
        certificate: z.string(),
        fingerprints: certificateFingerprintsGuard,
      }),
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const { certificate } = await findActiveSamlApplicationSecretByApplicationId(id);

      const fingerprints = calculateCertificateFingerprints(certificate);

      ctx.status = 200;
      ctx.body = { certificate, fingerprints };

      return next();
    }
  );

  router.get(
    '/saml-applications/:id/certificate/download',
    koaGuard({
      params: z.object({ id: z.string() }),
      status: [200, 400, 404],
      response: z.string(),
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const { id: secretId, certificate } = await findActiveSamlApplicationSecretByApplicationId(
        id
      );

      ctx.status = 200;
      ctx.body = certificate;
      ctx.type = 'application/x-pem-file';
      ctx.set(
        'Content-Disposition',
        createContentDisposition(`saml-certificate-app-${id}-secret-${secretId}.pem`)
      );

      return next();
    }
  );

  router.get(
    '/saml-applications/:id/metadata/download',
    koaGuard({
      params: z.object({ id: z.string() }),
      status: [200, 400, 404],
      response: z.string(),
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const { metadata, secretId } = await getSamlApplicationMetadataByApplicationId(id);

      ctx.status = 200;
      ctx.body = metadata;
      ctx.type = 'text/xml;charset=utf-8';
      ctx.set(
        'Content-Disposition',
        createContentDisposition(`saml-metadata-app-${id}-secret-${secretId}.xml`)
      );

      return next();
    }
  );
}
