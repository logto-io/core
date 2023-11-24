import { ConnectorError, ConnectorErrorCodes } from '@logto/connector-kit';
import { type SsoConnector, SsoProviderName } from '@logto/schemas';

import assertThat from '#src/utils/assert-that.js';

import SamlConnector from '../SamlConnector/index.js';
import { type SingleSignOnFactory } from '../index.js';
import { type SingleSignOn } from '../types/index.js';
import { samlConnectorConfigGuard } from '../types/saml.js';
import {
  type SingleSignOnConnectorSession,
  type CreateSingleSignOnSession,
} from '../types/session.js';

/**
 * SAML SSO connector
 *
 * This class extends the basic SAML connector class and add some business related utils methods.
 *
 * @property data The SAML connector data from the database
 *
 * @method getProperties Get the SAML service provider properties.
 * @method getConfig Get parsed SAML config along with it's metadata. Throws error if config is invalid.
 * @method getUserInfo Get social user info.
 */
export class SamlSsoConnector extends SamlConnector implements SingleSignOn {
  constructor(
    readonly data: SsoConnector,
    tenantId: string
  ) {
    const parseConfigResult = samlConnectorConfigGuard.safeParse(data.config);

    if (!parseConfigResult.success) {
      throw new ConnectorError(ConnectorErrorCodes.InvalidConfig, parseConfigResult.error);
    }

    super(parseConfigResult.data, tenantId, data.id);
  }

  async getIssuer() {
    const { entityId } = await this.getSamlIdpMetadata();

    return entityId;
  }

  /**
   * Get parsed SAML connector's config along with it's metadata. Throws error if config is invalid.
   *
   * @returns Parsed SAML connector config and it's metadata.
   */
  async getConfig() {
    return this.getSamlConfig();
  }

  /**
   * Get SAML SSO URL.
   * This URL will be used to redirect to the SAML identity provider.
   *
   * @param jti The unique identifier for the connector session.
   * @param redirectUri The redirect uri for the identity provider.
   * @param state The state generated by Logto experience client.
   * @param setSession Set the connector session data to the oidc provider session storage. @see @logto/connector-kit
   */
  async getAuthorizationUrl(
    {
      jti,
      redirectUri,
      state,
      connectorId,
    }: { jti: string; redirectUri: string; state: string; connectorId: string },
    setSession: CreateSingleSignOnSession
  ) {
    // We use jti as the value of the RelayState in the SAML request. So we can get it back from the SAML response and retrieve the connector session.
    const singleSignOnUrl = await this.getSingleSignOnUrl(jti);
    await setSession({ connectorId, redirectUri, state });

    return singleSignOnUrl;
  }

  /**
   * Get social user info.
   *
   * @param connectorSession The connector session data from interaction session storage.
   * @returns The social user info extracted from SAML assertion.
   *
   * @remarks For SAML connector, userInfo will be extracted from the SAML assertion by ACS callback endpoint.
   * This method only asserts the userInfo is not null and directly return it.
   */
  async getUserInfo({ userInfo }: SingleSignOnConnectorSession) {
    assertThat(userInfo, 'session.connector_validation_session_not_found');

    return userInfo;
  }
}

export const samlSsoConnectorFactory: SingleSignOnFactory<SsoProviderName.SAML> = {
  providerName: SsoProviderName.SAML,
  logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMjAuMDk4OEMwIDE3LjQ2MzIgMi41MTQzNCA3LjYzMDE1IDcuNzEyOTEgMS4wNDEwMkM0LjA0MzMzIDcuOTY4MDYgMS45MDg3MSAxMi42NTgzIDMuNDY1NzEgMTYuMzE0M0M0LjY4ODkxIDE5LjE4NjUgMTAuOTc0OCAxOC4yNzQxIDE0LjM3MjUgMTcuMTI1M0M4LjMyNDUxIDE5Ljg2MjMgMi4xMTc5NCAyMC4yMzQgMCAyMC4wOTg4WiIgZmlsbD0iI0MxMjcyRCIvPgo8cGF0aCBkPSJNMTEuMjYwNSAwLjc1QzEzLjU1NTcgMi4wNjc4MyAyMC44NjEzIDkuMTQ5ODMgMjQgMTYuOTIxN0MxOS44MDI2IDEwLjI5NzcgMTYuNzg1NSA2LjExNDE2IDEyLjgyMzMgNS42MjcxM0M5LjcxMDU1IDUuMjQ0NTIgNy4zNjIxMSAxMS4xMTQ0IDYuNjYzNyAxNC42MTUyQzcuMzA0MjQgOC4wMzc4IDEwLjA4MzggMi41MDY1IDExLjI2MDUgMC43NVoiIGZpbGw9IiNDMTI3MkQiLz4KPHBhdGggZD0iTTIyLjUzMiAyMC4wNzUyQzIwLjIzNjggMjEuMzkzMSAxMC40MTY4IDI0LjE0NDEgMi4wNzk1OSAyMi45NjE0QzkuOTQ2NiAyMi42NTgzIDE1LjA5ODMgMjIuMTUxNiAxNy41MDM1IDE4Ljk4MjZDMTkuMzkzMSAxNi40OTMxIDE1LjQ1NTYgMTEuNTM1NSAxMi43NTYzIDkuMTgzNTlDMTguMTYzOCAxMy4wMjQgMjEuNTkwNyAxOC4xODM2IDIyLjUzMiAyMC4wNzUyWiIgZmlsbD0iI0MxMjcyRCIvPgo8L3N2Zz4K',
  logoDark:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMjAuMDk4OEMwIDE3LjQ2MzIgMi41MTQzNCA3LjYzMDE1IDcuNzEyOTEgMS4wNDEwMkM0LjA0MzMzIDcuOTY4MDYgMS45MDg3MSAxMi42NTgzIDMuNDY1NzEgMTYuMzE0M0M0LjY4ODkxIDE5LjE4NjUgMTAuOTc0OCAxOC4yNzQxIDE0LjM3MjUgMTcuMTI1M0M4LjMyNDUxIDE5Ljg2MjMgMi4xMTc5NCAyMC4yMzQgMCAyMC4wOTg4WiIgZmlsbD0iI0MxMjcyRCIvPgo8cGF0aCBkPSJNMTEuMjYwNSAwLjc1QzEzLjU1NTcgMi4wNjc4MyAyMC44NjEzIDkuMTQ5ODMgMjQgMTYuOTIxN0MxOS44MDI2IDEwLjI5NzcgMTYuNzg1NSA2LjExNDE2IDEyLjgyMzMgNS42MjcxM0M5LjcxMDU1IDUuMjQ0NTIgNy4zNjIxMSAxMS4xMTQ0IDYuNjYzNyAxNC42MTUyQzcuMzA0MjQgOC4wMzc4IDEwLjA4MzggMi41MDY1IDExLjI2MDUgMC43NVoiIGZpbGw9IiNDMTI3MkQiLz4KPHBhdGggZD0iTTIyLjUzMTkgMjAuMDc1MkMyMC4yMzY3IDIxLjM5MzEgMTAuNDE2NyAyNC4xNDQxIDIuMDc5NDcgMjIuOTYxNEM5Ljk0NjQ4IDIyLjY1ODMgMTUuMDk4MSAyMi4xNTE2IDE3LjUwMzQgMTguOTgyNkMxOS4zOTI5IDE2LjQ5MzEgMTUuNDU1NSAxMS41MzU1IDEyLjc1NjIgOS4xODM1OUMxOC4xNjM2IDEzLjAyNCAyMS41OTA2IDE4LjE4MzYgMjIuNTMxOSAyMC4wNzUyWiIgZmlsbD0iI0MxMjcyRCIvPgo8L3N2Zz4K',
  description: {
    en: 'This connector is used to connect to SAML single sign-on identity provider.',
  },
  configGuard: samlConnectorConfigGuard,
  constructor: SamlSsoConnector,
};
