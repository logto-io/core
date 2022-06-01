/* istanbul ignore file */

import { CustomClientMetadataKey } from '@logto/schemas';
import { exportJWK } from 'jose';
import Koa from 'koa';
import mount from 'koa-mount';
import { Provider, errors } from 'oidc-provider';
import snakecaseKeys from 'snakecase-keys';

import envSet from '@/env-set';
import postgresAdapter from '@/oidc/adapter';
import { isOriginAllowed, validateCustomClientMetadata } from '@/oidc/utils';
import { findResourceByIndicator } from '@/queries/resource';
import { findUserById } from '@/queries/user';
import { routes } from '@/routes/consts';
import { addOidcEventListeners } from '@/utils/oidc-provider-event-listener';

export default async function initOidc(app: Koa): Promise<Provider> {
  const { issuer, cookieKeys, privateKey, defaultIdTokenTtl, defaultRefreshTokenTtl } =
    envSet.values.oidc;

  const keys = [await exportJWK(privateKey)];
  const cookieConfig = Object.freeze({
    sameSite: 'lax',
    path: '/',
    signed: true,
  } as const);
  const oidc = new Provider(issuer, {
    adapter: postgresAdapter,
    renderError: (_ctx, _out, error) => {
      console.log('OIDC error', error);
      throw error;
    },
    cookies: {
      keys: cookieKeys,
      long: cookieConfig,
      short: cookieConfig,
    },
    jwks: {
      keys,
    },
    features: {
      userinfo: { enabled: true },
      revocation: { enabled: true },
      devInteractions: { enabled: false },
      resourceIndicators: {
        enabled: true,
        // Disable the auto use of authorization_code granted resource feature
        // https://github.com/panva/node-oidc-provider/blob/main/docs/README.md#usegrantedresource
        useGrantedResource: () => false,
        getResourceServerInfo: async (_, indicator) => {
          const resourceServer = await findResourceByIndicator(indicator);

          if (!resourceServer) {
            throw new errors.InvalidTarget();
          }

          const { accessTokenTtl: accessTokenTTL } = resourceServer;

          return {
            accessTokenFormat: 'jwt',
            scope: '',
            accessTokenTTL,
          };
        },
      },
    },
    interactions: {
      url: (_, interaction) => {
        switch (interaction.prompt.name) {
          case 'login':
            return routes.signIn.credentials;
          case 'consent':
            return routes.signIn.consent;
          default:
            throw new Error(`Prompt not supported: ${interaction.prompt.name}`);
        }
      },
    },
    extraClientMetadata: {
      properties: Object.values(CustomClientMetadataKey),
      validator: (_, key, value) => {
        validateCustomClientMetadata(key, value);
      },
    },
    // https://github.com/panva/node-oidc-provider/blob/main/recipes/client_based_origins.md
    clientBasedCORS: (ctx, origin, client) =>
      ctx.request.origin === origin || isOriginAllowed(origin, client.metadata()),
    // https://github.com/panva/node-oidc-provider/blob/main/recipes/claim_configuration.md
    claims: {
      profile: ['username', 'name', 'avatar', 'role_names', 'custom_data'],
    },
    // https://github.com/panva/node-oidc-provider/tree/main/docs#findaccount
    findAccount: async (_ctx, sub) => {
      const { username, name, avatar, roleNames, customData } = await findUserById(sub);

      return {
        accountId: sub,
        claims: async (use) => {
          return snakecaseKeys({
            sub,
            username,
            name,
            avatar,
            roleNames,
            ...(use === 'userinfo' && { customData }),
          });
        },
      };
    },
    ttl: {
      /**
       * [OIDC Provider Default Settings](https://github.com/panva/node-oidc-provider/blob/main/docs/README.md#ttl)
       */
      IdToken: (_ctx, _token, client) => {
        const { idTokenTtl } = client.metadata();

        return idTokenTtl ?? defaultIdTokenTtl;
      },
      RefreshToken: (_ctx, _token, client) => {
        const { refreshTokenTtl } = client.metadata();

        return refreshTokenTtl ?? defaultRefreshTokenTtl;
      },
    },
    extraTokenClaims: async (_ctx, token) => {
      // AccessToken type is not exported by default, need to asset token is AccessToken
      if (token.kind === 'AccessToken') {
        const { accountId } = token;
        const { roleNames } = await findUserById(accountId);

        // Add User Roles to the AccessToken claims. Should be removed once we have RBAC implemented.
        // User Roles should be hidden and  determined by the AccessToken scope only.
        return {
          roleNames,
        };
      }
    },
  });

  addOidcEventListeners(oidc);

  app.use(mount('/oidc', oidc.app));

  return oidc;
}
