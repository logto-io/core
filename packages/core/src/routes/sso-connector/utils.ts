import { type I18nPhrases } from '@logto/connector-kit';
import { type JsonObject, type SsoConnectorWithProviderConfig } from '@logto/schemas';
import { conditional, trySafe } from '@silverhand/essentials';

import RequestError from '#src/errors/RequestError/index.js';
import {
  type SingleSignOnFactory,
  ssoConnectorFactories,
  singleSignOnDomainBlackList,
} from '#src/sso/index.js';
import { type SupportedSsoConnector, type SsoProviderName } from '#src/sso/types/index.js';

const isKeyOfI18nPhrases = (key: string, phrases: I18nPhrases): key is keyof I18nPhrases =>
  key in phrases;

export const parseFactoryDetail = (
  factory: SingleSignOnFactory<SsoProviderName>,
  locale: string
) => {
  const { providerName, logo, description } = factory;

  return {
    providerName,
    logo,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- falsy value expected
    description: (isKeyOfI18nPhrases(locale, description) && description[locale]) || description.en,
  };
};

/* 
  Validate the connector config if it's provided.
  Throw error if the config is invalid.
  Partially validate the config if allowPartial is true.
*/
export const parseConnectorConfig = (
  providerName: SsoProviderName,
  config: JsonObject,
  allowPartial?: boolean
) => {
  const factory = ssoConnectorFactories[providerName];

  const result = allowPartial
    ? factory.configGuard.partial().safeParse(config)
    : factory.configGuard.safeParse(config);

  if (!result.success) {
    throw new RequestError({
      code: 'connector.invalid_config',
      status: 400,
      details: result.error.flatten(),
    });
  }

  return result.data;
};

/* 
  Safely fetch and parse the detailed connector config from provider. 
  Return undefined if failed to fetch or parse the config.
*/
export const fetchConnectorProviderDetails = async (
  connector: SupportedSsoConnector,
  tenantId: string
): Promise<SsoConnectorWithProviderConfig> => {
  const { providerName } = connector;

  const { logo, constructor } = ssoConnectorFactories[providerName];

  const providerConfig = await trySafe(async () => {
    const instance = new constructor(connector, tenantId);
    return instance.getConfig();
  });

  return {
    ...connector,
    providerLogo: logo,
    ...conditional(providerConfig && { providerConfig }),
  };
};

/**
 * Validate the connector domains using the domain blocklist.
 * - Throw error if the domains are invalid.
 * - Throw error if the domains are duplicated.
 *
 * @param domains
 * @returns
 */
export const validateConnectorDomains = (domains?: string[]) => {
  if (!domains || domains.length === 0) {
    return;
  }

  const blackListSet = new Set(singleSignOnDomainBlackList);
  const validDomainSet = new Set();
  const duplicatedDomains = new Set();
  const forbiddenDomains = new Set();

  for (const domain of domains) {
    if (blackListSet.has(domain)) {
      forbiddenDomains.add(domain);
    }

    if (validDomainSet.has(domain)) {
      duplicatedDomains.add(domain);
    } else {
      validDomainSet.add(domain);
    }
  }

  if (forbiddenDomains.size > 0) {
    throw new RequestError(
      {
        code: 'single_sign_on.forbidden_domains',
        status: 422,
      },
      {
        data: [...forbiddenDomains],
      }
    );
  }

  if (duplicatedDomains.size > 0) {
    throw new RequestError(
      {
        code: 'single_sign_on.duplicated_domains',
        status: 422,
      },
      {
        data: [...duplicatedDomains],
      }
    );
  }
};
