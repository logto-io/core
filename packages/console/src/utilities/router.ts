import { ConnectorType } from '@logto/schemas';
import kebabCase from 'lodash.kebabcase';

import { ConnectorsTabs, UserTabs } from '@/consts/page-tabs';
import { PagePath } from '@/consts/pathnames';

export const getBasename = (prefix: string, developmentPort: string): string => {
  const isBasenameNeeded =
    process.env.NODE_ENV !== 'development' || process.env.PORT === developmentPort;

  return isBasenameNeeded ? `/${prefix}` : '';
};

/**
 * Application routes
 */

export const getApplicationsPathname = () => `/${PagePath.Applications}`;

export const getApplicationDetailsPathname = (appId: string) =>
  `/${PagePath.Applications}/${appId}`;

export const getCreateApplicationPathname = () => `/${PagePath.Applications}/create`;

/**
 * API Resource routes
 */

export const getApiResourcesPathname = () => `/${PagePath.ApiResources}`;

export const getApiResourceDetailsPathname = (resourceId: string) =>
  `/${PagePath.ApiResources}/${resourceId}`;

export const getCreateApiResourcePathname = () => `/${PagePath.ApiResources}/create`;

/**
 * Connector routes
 */

export const getConnectorsPathname = (tab: ConnectorsTabs) => `/${PagePath.Connectors}/${tab}`;

export const getConnectorDetailsPathname = (connectorType: ConnectorType, connectorId: string) => {
  const tab =
    connectorType === ConnectorType.Social ? ConnectorsTabs.Social : ConnectorsTabs.Passwordless;

  return `/${PagePath.Connectors}/${tab}/${connectorId}`;
};

export const getCreateConnectorPathname = (connectorType: ConnectorType) => {
  const tab =
    connectorType === ConnectorType.Social ? ConnectorsTabs.Social : ConnectorsTabs.Passwordless;

  return `/${PagePath.Connectors}/${tab}/create/${kebabCase(connectorType)}`;
};

/**
 * User routes
 */

export const getUsersPathname = () => `/${PagePath.Users}`;

export const getUserDetailsPathname = (userId: string) =>
  `/${PagePath.Users}/${userId}/${UserTabs.Details}`;

export const getUserLogsPathname = (userId: string) =>
  `/${PagePath.Users}/${userId}/${UserTabs.Logs}`;

export const getUserLogDetailsPathname = (userId: string, logId: string) =>
  `/${PagePath.Users}/${userId}/${UserTabs.Logs}/${logId}`;

/**
 * Audit Log routes
 */

export const getAuditLogsPathname = () => `/${PagePath.AuditLogs}`;

export const getAuditLogDetailsPathname = (logId: string) => `/${PagePath.AuditLogs}/${logId}`;
