import { AppInsightsBoundary } from '@logto/app-insights/react';
import { UserScope } from '@logto/core-kit';
import { LogtoProvider } from '@logto/react';
import { adminConsoleApplicationId, PredefinedScope } from '@logto/schemas';
import { conditionalArray, deduplicate } from '@silverhand/essentials';
import { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import 'overlayscrollbars/overlayscrollbars.css';
import './scss/normalized.scss';
import './scss/overlayscrollbars.scss';

// eslint-disable-next-line import/no-unassigned-import
import '@fontsource/roboto-mono';

import CloudApp from '@/cloud/App';
import { cloudApi, getManagementApi, meApi } from '@/consts/resources';

import { adminTenantEndpoint, mainTitle } from './consts';
import { isCloud } from './consts/env';
import ErrorBoundary from './containers/ErrorBoundary';
import LogtoErrorBoundary from './containers/LogtoErrorBoundary';
import TenantAppContainer from './containers/TenantAppContainer';
import AppConfirmModalProvider from './contexts/AppConfirmModalProvider';
import AppDataProvider from './contexts/AppDataProvider';
import { AppThemeProvider } from './contexts/AppThemeProvider';
import TenantsProvider, { TenantsContext } from './contexts/TenantsProvider';
import initI18n from './i18n/init';

void initI18n();

function Content() {
  const { tenants, currentTenantId } = useContext(TenantsContext);

  const resources = useMemo(
    () =>
      deduplicate(
        conditionalArray(
          // Explicitly add `currentTenantId` and deduplicate since the user may directly
          // access a URL with Tenant ID, adding the ID from the URL here can possibly remove one
          // additional redirect.
          currentTenantId && getManagementApi(currentTenantId).indicator,
          ...tenants.map(({ id }) => getManagementApi(id).indicator),
          isCloud && cloudApi.indicator,
          meApi.indicator
        )
      ),
    [currentTenantId, tenants]
  );

  const scopes = useMemo(
    () => [
      UserScope.Email,
      UserScope.Identities,
      UserScope.CustomData,
      PredefinedScope.All,
      ...conditionalArray(
        isCloud && cloudApi.scopes.CreateTenant,
        isCloud && cloudApi.scopes.ManageTenant,
        isCloud && cloudApi.scopes.ManageTenantSelf
      ),
    ],
    []
  );

  return (
    <LogtoProvider
      unstable_enableCache
      config={{
        endpoint: adminTenantEndpoint.href,
        appId: adminConsoleApplicationId,
        resources,
        scopes,
      }}
    >
      <AppThemeProvider>
        <AppInsightsBoundary cloudRole="console">
          <Helmet titleTemplate={`%s - ${mainTitle}`} defaultTitle={mainTitle} />
          <ErrorBoundary>
            <LogtoErrorBoundary>
              {/**
               * If it's not Cloud (OSS), render the tenant app container directly since only default tenant is available;
               * if it's Cloud, render the tenant app container only when a tenant ID is available (in a tenant context).
               */}
              {!isCloud || currentTenantId ? (
                <AppDataProvider>
                  <AppConfirmModalProvider>
                    <TenantAppContainer />
                  </AppConfirmModalProvider>
                </AppDataProvider>
              ) : (
                <CloudApp />
              )}
            </LogtoErrorBoundary>
          </ErrorBoundary>
        </AppInsightsBoundary>
      </AppThemeProvider>
    </LogtoProvider>
  );
}

function App() {
  return (
    <TenantsProvider>
      <Content />
    </TenantsProvider>
  );
}

export default App;
