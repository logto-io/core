import { UserScope } from '@logto/core-kit';
import { LogtoProvider } from '@logto/react';
import { adminConsoleApplicationId, managementResource } from '@logto/schemas/lib/seeds';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import './scss/normalized.scss';
// eslint-disable-next-line import/no-unassigned-import
import '@fontsource/roboto-mono';
import AppBoundary from '@/components/AppBoundary';
import AppContent from '@/components/AppContent';
import ErrorBoundary from '@/components/ErrorBoundary';
import Toast from '@/components/Toast';
import useSwrOptions from '@/hooks/use-swr-options';
import initI18n from '@/i18n/init';
import ApiResourceDetails from '@/pages/ApiResourceDetails';
import ApiResources from '@/pages/ApiResources';
import ApplicationDetails from '@/pages/ApplicationDetails';
import Applications from '@/pages/Applications';
import AuditLogDetails from '@/pages/AuditLogDetails';
import AuditLogs from '@/pages/AuditLogs';
import Callback from '@/pages/Callback';
import ConnectorDetails from '@/pages/ConnectorDetails';
import Connectors from '@/pages/Connectors';
import Dashboard from '@/pages/Dashboard';
import GetStarted from '@/pages/GetStarted';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import SignInExperience from '@/pages/SignInExperience';
import UserDetails from '@/pages/UserDetails';
import Users from '@/pages/Users';
import Welcome from '@/pages/Welcome';

import { ConnectorsTabs, SignInExperienceTabs, UserTabs } from './consts/page-tabs';
import { Page } from './consts/pathnames';
import { getBasename } from './utilities/router';

void initI18n();

const Main = () => {
  const swrOptions = useSwrOptions();

  return (
    <ErrorBoundary>
      <SWRConfig value={swrOptions}>
        <AppBoundary>
          <Toast />
          <Routes>
            <Route path={Page.Callback} element={<Callback />} />
            <Route path={Page.Welcome} element={<Welcome />} />
            <Route element={<AppContent />}>
              <Route path="*" element={<NotFound />} />
              <Route path={Page.GetStarted} element={<GetStarted />} />
              <Route path={Page.Applications}>
                <Route index element={<Applications />} />
                <Route path="create" element={<Applications />} />
                <Route path=":id" element={<ApplicationDetails />} />
              </Route>
              <Route path={Page.ApiResources}>
                <Route index element={<ApiResources />} />
                <Route path="create" element={<ApiResources />} />
                <Route path=":id" element={<ApiResourceDetails />} />
              </Route>
              <Route path={Page.Connectors}>
                <Route index element={<Navigate replace to={ConnectorsTabs.Passwordless} />} />
                <Route path=":tab" element={<Connectors />} />
                <Route path=":tab/create/:createType" element={<Connectors />} />
                <Route path=":tab/:connectorId" element={<ConnectorDetails />} />
              </Route>
              <Route path={Page.Users}>
                <Route index element={<Users />} />
                <Route path=":userId" element={<Navigate replace to={UserTabs.Details} />} />
                <Route path={`:userId/${UserTabs.Details}`} element={<UserDetails />} />
                <Route path={`:userId/${UserTabs.Logs}`} element={<UserDetails />} />
                <Route path={`:userId/${UserTabs.Logs}/:logId`} element={<AuditLogDetails />} />
              </Route>
              <Route path={Page.SignInExperience}>
                <Route index element={<Navigate replace to={SignInExperienceTabs.Branding} />} />
                <Route path=":tab" element={<SignInExperience />} />
              </Route>
              <Route path={Page.Settings} element={<Settings />} />
              <Route path={Page.AuditLogs}>
                <Route index element={<AuditLogs />} />
                <Route path=":logId" element={<AuditLogDetails />} />
              </Route>
              <Route path={Page.Dashboard} element={<Dashboard />} />
            </Route>
          </Routes>
        </AppBoundary>
      </SWRConfig>
    </ErrorBoundary>
  );
};

const App = () => (
  <BrowserRouter basename={getBasename('console', '5002')}>
    <LogtoProvider
      config={{
        endpoint: window.location.origin,
        appId: adminConsoleApplicationId,
        resources: [managementResource.indicator],
        scopes: [UserScope.Identities, UserScope.CustomData],
      }}
    >
      <Main />
    </LogtoProvider>
  </BrowserRouter>
);

export default App;
