import { type IdentifierPayload } from '@logto/schemas';

import { EnvSet } from '#src/env-set/index.js';
import RequestError from '#src/errors/RequestError/index.js';
import { type SsoConnectorLibrary } from '#src/libraries/sso-connector.js';
import assertThat from '#src/utils/assert-that.js';

// Guard the SSO only email identifier
export const verifySsoOnlyEmailIdentifier = async (
  { getAvailableSsoConnectors }: SsoConnectorLibrary,
  identifier: IdentifierPayload
) => {
  // TODO: @simeng-li remove the dev features check when the SSO feature is released
  if (!('email' in identifier) || !EnvSet.values.isDevFeaturesEnabled) {
    return;
  }

  const { email } = identifier;
  const availableSsoConnectors = await getAvailableSsoConnectors();
  const domain = email.split('@')[1];

  // Invalid email domain
  if (!domain) {
    return;
  }

  const availableConnectors = availableSsoConnectors.filter(
    ({ domains, ssoOnly }) => domains.includes(domain) && ssoOnly
  );

  assertThat(
    availableConnectors.length === 0,
    new RequestError(
      {
        code: 'session.sso_enabled',
        status: 422,
      },
      {
        ssoConnectors: availableConnectors,
      }
    )
  );
};
