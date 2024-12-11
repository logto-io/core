import { z } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import koaGuard from '#src/middleware/koa-guard.js';
import type { AnonymousRouter, RouterInitArgs } from '#src/routes/types.js';
import assertThat from '#src/utils/assert-that.js';

import {
  generateAutoSubmitForm,
  createSamlResponse,
  handleOidcCallbackAndGetUserInfo,
  setupSamlProviders,
} from './utils.js';

const samlApplicationSignInCallbackQueryParametersGuard = z.union([
  z.object({
    code: z.string(),
  }),
  z.object({
    error: z.string(),
    error_description: z.string().optional(),
  }),
]);

export default function samlApplicationAnonymousRoutes<T extends AnonymousRouter>(
  ...[router, { libraries, queries, envSet }]: RouterInitArgs<T>
) {
  const {
    samlApplications: { getSamlIdPMetadataByApplicationId },
  } = libraries;
  const { applications, samlApplicationSecrets, samlApplicationConfigs } = queries;

  router.get(
    '/saml-applications/:id/metadata',
    koaGuard({
      params: z.object({ id: z.string() }),
      status: [200, 404],
      response: z.string(),
    }),
    async (ctx, next) => {
      const { id } = ctx.guard.params;

      const { metadata } = await getSamlIdPMetadataByApplicationId(id);

      ctx.status = 200;
      ctx.body = metadata;
      ctx.type = 'text/xml;charset=utf-8';

      return next();
    }
  );

  router.get(
    '/saml-applications/:id/callback',
    koaGuard({
      params: z.object({ id: z.string() }),
      query: samlApplicationSignInCallbackQueryParametersGuard,
      status: [200, 400],
    }),
    async (ctx, next) => {
      const {
        params: { id },
        query,
      } = ctx.guard;

      // Handle error in query parameters
      if ('error' in query) {
        throw new RequestError({
          code: 'oidc.invalid_request',
          message: query.error_description,
        });
      }

      // Get application configuration
      const {
        secret,
        oidcClientMetadata: { redirectUris },
      } = await applications.findApplicationById(id);

      assertThat(redirectUris[0], 'oidc.redirect_uri_not_set');

      // TODO: should be able to handle `state` and code verifier etc.
      const { code } = query;

      // Handle OIDC callback and get user info
      const userInfo = await handleOidcCallbackAndGetUserInfo(
        code,
        id,
        secret,
        redirectUris[0],
        envSet.oidc.issuer
      );

      // Get SAML configuration
      const { metadata } = await getSamlIdPMetadataByApplicationId(id);
      const { privateKey } =
        await samlApplicationSecrets.findActiveSamlApplicationSecretByApplicationId(id);
      const { entityId, acsUrl } =
        await samlApplicationConfigs.findSamlApplicationConfigByApplicationId(id);

      assertThat(entityId, 'application.saml.entity_id_required');
      assertThat(acsUrl, 'application.saml.acs_url_required');

      // Setup SAML providers and create response
      const { idp, sp } = setupSamlProviders(metadata, privateKey, entityId, acsUrl);
      const { context, entityEndpoint } = await createSamlResponse(idp, sp, userInfo);

      // Return auto-submit form
      ctx.body = generateAutoSubmitForm(entityEndpoint, context);
      return next();
    }
  );
}
