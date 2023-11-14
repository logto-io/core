import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StaticPageLayout from '@/Layout/StaticPageLayout';
import SocialLanding from '@/containers/SocialLanding';
import useSocialCallbackHandler from '@/hooks/use-social-callback-handler';

import * as styles from './index.module.scss';

type Parameters = {
  connectorId: string;
};

/**
 * Callback page for SocialSignIn and SingleSignOn
 */
const Callback = () => {
  const { connectorId } = useParams<Parameters>();

  const { socialCallbackHandler } = useSocialCallbackHandler();

  // SocialSignIn Callback Handler
  useEffect(() => {
    if (!connectorId) {
      return;
    }
    socialCallbackHandler(connectorId);
  }, [socialCallbackHandler, connectorId]);

  if (!connectorId) {
    return null;
  }

  return (
    <StaticPageLayout>
      <SocialLanding isLoading className={styles.connectorContainer} connectorId={connectorId} />
    </StaticPageLayout>
  );
};

export default Callback;
