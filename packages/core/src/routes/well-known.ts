import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorType } from '@logto/connector-kit';
import { adminTenantId } from '@logto/schemas';
import etag from 'etag';

import { EnvSet, getTenantEndpoint } from '#src/env-set/index.js';
import RequestError from '#src/errors/RequestError/index.js';

import type { AnonymousRouter, RouterInitArgs } from './types.js';

export default function wellKnownRoutes<T extends AnonymousRouter>(
  ...[router, { libraries, id }]: RouterInitArgs<T>
) {
  const {
    signInExperiences: { getSignInExperience },
    connectors: { getLogtoConnectors },
  } = libraries;

  if (id === adminTenantId) {
    router.get('/.well-known/endpoints/:tenantId', async (ctx, next) => {
      if (!ctx.params.tenantId) {
        throw new RequestError('request.invalid_input');
      }

      ctx.body = {
        user: getTenantEndpoint(ctx.params.tenantId, EnvSet.values),
      };

      return next();
    });
  }

  router.get(
    '/.well-known/sign-in-exp',
    async (ctx, next) => {
      const [signInExperience, logtoConnectors] = await Promise.all([
        getSignInExperience(),
        getLogtoConnectors(),
      ]);

      const forgotPassword = {
        phone: logtoConnectors.some(({ type }) => type === ConnectorType.Sms),
        email: logtoConnectors.some(({ type }) => type === ConnectorType.Email),
      };

      const socialConnectors = signInExperience.socialSignInConnectorTargets.reduce<
        Array<ConnectorMetadata & { id: string }>
      >((previous, connectorTarget) => {
        const connectors = logtoConnectors.filter(
          ({ metadata: { target } }) => target === connectorTarget
        );

        return [
          ...previous,
          ...connectors.map(({ metadata, dbEntry: { id } }) => ({ ...metadata, id })),
        ];
      }, []);

      ctx.body = {
        ...signInExperience,
        socialConnectors,
        forgotPassword,
      };

      return next();
    },
    async (ctx, next) => {
      await next();

      ctx.response.etag = etag(JSON.stringify(ctx.body));

      if (ctx.fresh) {
        ctx.status = 304;
        ctx.body = null;
      }
    }
  );
}
