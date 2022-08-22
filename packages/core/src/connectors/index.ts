import { existsSync, readFileSync } from 'fs';
import path from 'path';

import { GeneralConnector, implementGetConfig, validateConfig } from '@logto/connector-core';
import resolvePackagePath from 'resolve-package-path';

import envSet from '@/env-set';
import RequestError from '@/errors/RequestError';
import { findAllConnectors, insertConnector } from '@/queries/connector';

import { defaultConnectorMethods, defaultConnectorPackages } from './consts';
import { LogtoConnector } from './types';
import { getConnectorConfig, validateConnectorModule } from './utilities';

implementGetConfig(getConnectorConfig);

// eslint-disable-next-line @silverhand/fp/no-let
let cachedConnectors: Array<Omit<LogtoConnector, 'db'>> | undefined;

const loadConnectors = async () => {
  if (cachedConnectors) {
    return cachedConnectors;
  }

  const {
    values: { additionalConnectorPackages },
  } = envSet;

  const connectorPackages = [...defaultConnectorPackages, ...additionalConnectorPackages];

  // eslint-disable-next-line @silverhand/fp/no-mutation
  cachedConnectors = await Promise.all(
    connectorPackages.map(async (packageName) => {
      // eslint-disable-next-line no-restricted-syntax
      const { default: rawConnector } = (await import(packageName)) as {
        default: Partial<GeneralConnector>;
      };

      validateConnectorModule(rawConnector);

      const connector: Omit<LogtoConnector, 'db'> = {
        ...defaultConnectorMethods,
        ...rawConnector,
        validateConfig: (config: unknown) => {
          validateConfig(config, rawConnector.configGuard);
        },
      };
      // eslint-disable-next-line unicorn/prefer-module
      const packagePath = resolvePackagePath(packageName, __dirname);

      // For relative path logo url, try to read local asset.
      if (
        packagePath &&
        !connector.metadata.logo.startsWith('http') &&
        existsSync(path.join(packagePath, '..', connector.metadata.logo))
      ) {
        const data = readFileSync(path.join(packagePath, '..', connector.metadata.logo));
        // eslint-disable-next-line @silverhand/fp/no-mutation
        connector.metadata.logo = `data:image/svg+xml;base64,${data.toString('base64')}`;
      }

      if (
        packagePath &&
        connector.metadata.logoDark &&
        !connector.metadata.logoDark.startsWith('http') &&
        existsSync(path.join(packagePath, '..', connector.metadata.logoDark))
      ) {
        const data = readFileSync(path.join(packagePath, '..', connector.metadata.logoDark));
        // eslint-disable-next-line @silverhand/fp/no-mutation
        connector.metadata.logoDark = `data:image/svg+xml;base64,${data.toString('base64')}`;
      }

      if (
        packagePath &&
        connector.metadata.readme &&
        existsSync(path.join(packagePath, '..', connector.metadata.readme))
      ) {
        // eslint-disable-next-line @silverhand/fp/no-mutation
        connector.metadata.readme = readFileSync(
          path.join(packagePath, '..', connector.metadata.readme),
          'utf8'
        );
      }

      if (
        packagePath &&
        connector.metadata.configTemplate &&
        existsSync(path.join(packagePath, '..', connector.metadata.configTemplate))
      ) {
        // eslint-disable-next-line @silverhand/fp/no-mutation
        connector.metadata.configTemplate = readFileSync(
          path.join(packagePath, '..', connector.metadata.configTemplate),
          'utf8'
        );
      }

      return connector;
    })
  );

  return cachedConnectors;
};

export const getLogtoConnectors = async (): Promise<LogtoConnector[]> => {
  const connectors = await findAllConnectors();
  const connectorMap = new Map(connectors.map((connector) => [connector.id, connector]));

  const allConnectors = await loadConnectors();

  return allConnectors.map((element) => {
    const { id } = element.metadata;
    const connector = connectorMap.get(id);

    if (!connector) {
      throw new RequestError({ code: 'entity.not_found', id, status: 404 });
    }

    return {
      ...element,
      db: connector,
    };
  });
};

export const getLogtoConnectorById = async (id: string): Promise<LogtoConnector> => {
  const connectors = await getLogtoConnectors();
  const pickedConnector = connectors.find(({ db }) => db.id === id);

  if (!pickedConnector) {
    throw new RequestError({
      code: 'entity.not_found',
      id,
      status: 404,
    });
  }

  return pickedConnector;
};

export const initConnectors = async () => {
  const connectors = await findAllConnectors();
  const existingConnectors = new Map(connectors.map((connector) => [connector.id, connector]));
  const allConnectors = await loadConnectors();
  const newConnectors = allConnectors.filter(({ metadata: { id } }) => {
    const connector = existingConnectors.get(id);

    if (!connector) {
      return true;
    }

    return connector.config === JSON.stringify({});
  });

  await Promise.all(
    newConnectors.map(async ({ metadata: { id } }) => {
      await insertConnector({
        id,
      });
    })
  );
};
