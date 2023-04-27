import { type ReactNode, useContext, useEffect } from 'react';

import { AppInsightsContext, AppInsightsProvider } from './context.js';
import { getPrimaryDomain } from './utils.js';

const AppInsights = () => {
  const { needsSetup, setup } = useContext(AppInsightsContext);

  useEffect(() => {
    if (needsSetup) {
      void setup('console', { cookieDomain: getPrimaryDomain() });
    }
  }, [needsSetup, setup]);

  return null;
};

type Props = {
  children: ReactNode;
};

/**
 * **CAUTION:** Make sure to put this component inside `<LogtoProvider />` or any other
 * context providers that are render-sensitive, since we are lazy loading ApplicationInsights SDKs
 * for better user experience.
 *
 * This component will trigger a render after the ApplicationInsights SDK is loaded which may
 * cause issues for some context providers. For example, `useHandleSignInCallback` will be
 * called twice if you use this component to wrap a `<LogtoProvider />`.
 */
const AppInsightsBoundary = ({ children }: Props) => {
  return (
    <AppInsightsProvider>
      <AppInsights />
      {children}
    </AppInsightsProvider>
  );
};

export default AppInsightsBoundary;
