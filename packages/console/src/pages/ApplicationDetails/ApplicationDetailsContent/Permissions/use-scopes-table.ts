import {
  type ApplicationUserConsentScopesResponse,
  ApplicationUserConsentScopeType,
} from '@logto/schemas';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useApi from '@/hooks/use-api';

import * as styles from './index.module.scss';

export type UserScopeTableRowDataType = {
  type: ApplicationUserConsentScopeType.UserScopes;
  id: string;
  name: string;
  description?: string;
};

type OrganizationScopeTableRowDataType = {
  type: ApplicationUserConsentScopeType.OrganizationScopes;
} & ApplicationUserConsentScopesResponse['organizationScopes'][number];

type ResourceScopeTableRowDataType = {
  type: ApplicationUserConsentScopeType.ResourceScopes;
  // Resource ID is required for resource scope patch request
  resourceId: string;
  resourceName: string;
} & ApplicationUserConsentScopesResponse['resourceScopes'][number]['scopes'][number];

export type ScopesTableRowDataType =
  | UserScopeTableRowDataType
  | OrganizationScopeTableRowDataType
  | ResourceScopeTableRowDataType;

type ScopesTableRowGroupType = {
  key: string;
  label: string;
  labelRowClassName?: string;
  data: ScopesTableRowDataType[];
};

/**
 * - parseRowGroup: parse the application user consent scopes response data to table field group data
 */
const useScopesTable = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const api = useApi();

  const parseRowGroup = useCallback(
    (data?: ApplicationUserConsentScopesResponse): ScopesTableRowGroupType[] => {
      if (!data) {
        return [];
      }

      const { organizationScopes, userScopes, resourceScopes } = data;

      const userScopesGroup: ScopesTableRowGroupType = {
        key: ApplicationUserConsentScopeType.UserScopes,
        label: t('application_details.permissions.user_permissions'),
        labelRowClassName: styles.sectionTitleRow,
        data: userScopes.map((scope) => ({
          type: ApplicationUserConsentScopeType.UserScopes,
          id: scope,
          name: scope,
          // TODO: @simeng-li add user profile scopes description
        })),
      };

      const organizationScopesGroup: ScopesTableRowGroupType = {
        key: ApplicationUserConsentScopeType.OrganizationScopes,
        label: t('application_details.permissions.organization_permissions'),
        labelRowClassName: styles.sectionTitleRow,
        data: organizationScopes.map((scope) => ({
          type: ApplicationUserConsentScopeType.OrganizationScopes,
          ...scope,
        })),
      };

      const resourceScopesGroups = resourceScopes.map<ScopesTableRowGroupType>(
        ({ resource, scopes }) => ({
          key: resource.indicator,
          label: resource.name,
          labelRowClassName: styles.sectionTitleRow,
          data: scopes.map((scope) => ({
            type: ApplicationUserConsentScopeType.ResourceScopes,
            ...scope,
            resourceId: resource.id,
            resourceName: resource.name,
          })),
        })
      );

      return [userScopesGroup, ...resourceScopesGroups, organizationScopesGroup];
    },
    [t]
  );

  const deleteScope = useCallback(
    async (scope: ScopesTableRowDataType, applicationId: string) =>
      api.delete(`api/applications/${applicationId}/user-consent-scopes/${scope.type}/${scope.id}`),
    [api]
  );

  // Only description is editable
  const editScope = useCallback(
    async (scope: ScopesTableRowDataType) => {
      const { type, id, description } = scope;

      if (type === ApplicationUserConsentScopeType.ResourceScopes) {
        const { resourceId } = scope;

        await api.patch(`api/resources/${resourceId}/scopes/${id}`, {
          json: {
            description,
          },
        });

        return;
      }

      if (type === ApplicationUserConsentScopeType.OrganizationScopes) {
        await api.patch(`api/organization-scopes/${id}`, {
          json: {
            description,
          },
        });
      }
    },
    [api]
  );

  return {
    parseRowGroup,
    deleteScope,
    editScope,
  };
};

export default useScopesTable;
