import { parseJson } from '@logto/connector-kit';
import { generateStandardId } from '@logto/shared';
import { tryThat } from '@silverhand/essentials';
import camelcaseKeys from 'camelcase-keys';
import { got } from 'got';
import saml from 'samlify';
import { ZodError, z } from 'zod';

import RequestError from '#src/errors/RequestError/index.js';
import { fetchOidcConfigRaw, getRawUserInfoResponse } from '#src/sso/OidcConnector/utils.js';
import { idTokenProfileStandardClaimsGuard } from '#src/sso/types/oidc.js';
import { oidcTokenResponseGuard, type IdTokenProfileStandardClaims } from '#src/sso/types/oidc.js';
import assertThat from '#src/utils/assert-that.js';

import {
  samlLogInResponseTemplate,
  samlAttributeNameFormatBasic,
  samlValueXmlnsXsi,
} from '../libraries/consts.js';

export const createSamlTemplateCallback =
  (
    idp: saml.IdentityProviderInstance,
    sp: saml.ServiceProviderInstance,
    user: IdTokenProfileStandardClaims
  ) =>
  (template: string) => {
    const assertionConsumerServiceUrl = sp.entityMeta.getAssertionConsumerService(
      saml.Constants.wording.binding.post
    );

    const { nameIDFormat } = idp.entitySetting;
    const selectedNameIDFormat = Array.isArray(nameIDFormat) ? nameIDFormat[0] : nameIDFormat;

    const id = `ID_${generateStandardId()}`;
    const now = new Date();
    const expireAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes later

    const tagValues = {
      ID: id,
      AssertionID: `ID_${generateStandardId()}`,
      Destination: assertionConsumerServiceUrl,
      Audience: sp.entityMeta.getEntityID(),
      EntityID: sp.entityMeta.getEntityID(),
      SubjectRecipient: assertionConsumerServiceUrl,
      Issuer: idp.entityMeta.getEntityID(),
      IssueInstant: now.toISOString(),
      AssertionConsumerServiceURL: assertionConsumerServiceUrl,
      StatusCode: saml.Constants.StatusCode.Success,
      ConditionsNotBefore: now.toISOString(),
      ConditionsNotOnOrAfter: expireAt.toISOString(),
      SubjectConfirmationDataNotOnOrAfter: expireAt.toISOString(),
      NameIDFormat: selectedNameIDFormat,
      NameID: user.sub,
      InResponseTo: 'null',
      /**
       * User attributes for SAML response
       *
       * @todo Support custom attribute mapping
       * @see {@link https://github.com/tngan/samlify/blob/master/src/libsaml.ts#L275-L300|samlify implementation}
       *
       * @remarks
       * By examining the code provided in the link above, we can define all the attributes supported by the attribute mapping here. Only the attributes defined in the `loginResponseTemplate.attributes` added when creating the IdP instance will appear in the SAML response.
       */
      attrEmail: user.email,
      attrName: user.name,
    };

    const context = saml.SamlLib.replaceTagsByValue(template, tagValues);

    return {
      id,
      context,
    };
  };

export const exchangeAuthorizationCode = async (
  tokenEndpoint: string,
  {
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri?: string;
  }
) => {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const tokenRequestParameters = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    ...(redirectUri ? { redirect_uri: redirectUri } : {}),
  });

  const httpResponse = await got.post(tokenEndpoint, {
    body: tokenRequestParameters.toString(),
    headers,
  });

  const result = oidcTokenResponseGuard.safeParse(parseJson(httpResponse.body));

  if (!result.success) {
    throw new RequestError({
      code: 'oidc.invalid_token',
      message: 'Invalid token response',
    });
  }

  return camelcaseKeys(result.data);
};

export const createSamlResponse = async (
  idp: saml.IdentityProviderInstance,
  sp: saml.ServiceProviderInstance,
  userInfo: IdTokenProfileStandardClaims
): Promise<{ context: string; entityEndpoint: string }> => {
  // TODO: fix binding method
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { context, entityEndpoint } = await idp.createLoginResponse(
    sp,
    // @ts-expect-error --fix request object later
    null,
    'post',
    userInfo,
    createSamlTemplateCallback(idp, sp, userInfo)
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { context, entityEndpoint };
};

export const generateAutoSubmitForm = (actionUrl: string, samlResponse: string): string => {
  return `
    <html>
      <body>
        <form id="redirectForm" action="${actionUrl}" method="POST">
          <input type="hidden" name="SAMLResponse" value="${samlResponse}" />
          <input type="submit" value="Submit" /> 
        </form>
        <script>
          document.getElementById('redirectForm').submit();
        </script>
      </body>
    </html>
  `;
};

export const getUserInfo = async (
  accessToken: string,
  userinfoEndpoint: string
): Promise<IdTokenProfileStandardClaims & Record<string, unknown>> => {
  const body = await getRawUserInfoResponse(accessToken, userinfoEndpoint);
  const result = idTokenProfileStandardClaimsGuard.catchall(z.unknown()).safeParse(parseJson(body));

  if (!result.success) {
    throw new RequestError({
      code: 'oidc.invalid_request',
      message: 'Invalid user info response',
      details: result.error.flatten(),
    });
  }

  return result.data;
};

// Helper functions for SAML callback
export const handleOidcCallbackAndGetUserInfo = async (
  code: string,
  applicationId: string,
  secret: string,
  redirectUri: string,
  issuer: string
) => {
  // Get OIDC configuration
  const { tokenEndpoint, userinfoEndpoint } = await tryThat(
    async () => fetchOidcConfigRaw(issuer),
    (error) => {
      if (error instanceof ZodError) {
        throw new RequestError({
          code: 'oidc.invalid_request',
          message: error.message,
          error: error.flatten(),
        });
      }

      throw error;
    }
  );

  // Exchange authorization code for tokens
  const { accessToken } = await exchangeAuthorizationCode(tokenEndpoint, {
    code,
    clientId: applicationId,
    clientSecret: secret,
    redirectUri,
  });

  assertThat(accessToken, new RequestError('oidc.access_denied'));

  // Get user info using access token
  return getUserInfo(accessToken, userinfoEndpoint);
};

export const setupSamlProviders = (
  metadata: string,
  privateKey: string,
  entityId: string,
  acsUrl: { binding: string; url: string }
) => {
  // eslint-disable-next-line new-cap
  const idp = saml.IdentityProvider({
    metadata,
    privateKey,
    isAssertionEncrypted: false,
    loginResponseTemplate: {
      context: samlLogInResponseTemplate,
      attributes: [
        {
          name: 'email',
          valueTag: 'email',
          nameFormat: samlAttributeNameFormatBasic,
          valueXsiType: samlValueXmlnsXsi.string,
        },
        {
          name: 'name',
          valueTag: 'name',
          nameFormat: samlAttributeNameFormatBasic,
          valueXsiType: samlValueXmlnsXsi.string,
        },
      ],
    },
  });

  // eslint-disable-next-line new-cap
  const sp = saml.ServiceProvider({
    entityID: entityId,
    assertionConsumerService: [
      {
        Binding: acsUrl.binding,
        Location: acsUrl.url,
      },
    ],
  });

  return { idp, sp };
};
