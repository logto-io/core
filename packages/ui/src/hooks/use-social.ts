import { useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { invokeSocialSignIn, signInWithSocial } from '@/apis/social';
import { generateRandomString, parseQueryParameters } from '@/utils';

import useApi, { ErrorHandlers } from './use-api';
import { PageContext } from './use-page-context';
import useTerms from './use-terms';

/**
 * Social Connector State Utility Methods
 * @param state
 * @param state.uuid - unique id
 * @param state.platform - platform
 * @param state.callbackLink - callback uri scheme
 */

type State = {
  uuid: string;
  platform: 'web' | 'ios' | 'android';
  callbackLink?: string;
};

type Options = {
  onSocialSignInCallback?: () => void;
};

const storageKeyPrefix = 'social_auth_state';

const getLogtoNativeSdk = () => {
  if (typeof logtoNativeSdk !== 'undefined') {
    return logtoNativeSdk;
  }
};

export const generateState = () => {
  const uuid = generateRandomString();
  const platform = getLogtoNativeSdk()?.platform ?? 'web';
  const callbackLink = getLogtoNativeSdk()?.callbackLink;

  const state: State = { uuid, platform, callbackLink };

  return btoa(JSON.stringify(state));
};

export const decodeState = (state: string) => {
  try {
    return JSON.parse(atob(state)) as State;
  } catch {}
};

export const stateValidation = (state: string, connectorId: string) => {
  const stateStorage = sessionStorage.getItem(`${storageKeyPrefix}:${connectorId}`);

  return stateStorage === state;
};

export const storeState = (state: string, connectorId: string) => {
  sessionStorage.setItem(`${storageKeyPrefix}:${connectorId}`, state);
};

/* ============================================================================ */

const isNativeWebview = () => {
  const platform = getLogtoNativeSdk()?.platform ?? '';

  return ['ios', 'android'].includes(platform);
};

const useSocial = (options?: Options) => {
  const { setToast, experienceSettings } = useContext(PageContext);
  const { termsValidation } = useTerms();
  const parameters = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(undefined, { keyPrefix: 'main_flow' });

  const signInWithSocialErrorHandlers: ErrorHandlers = useMemo(
    () => ({
      'user.identity_not_exists': (error) => {
        if (parameters.connector) {
          navigate(`/social-register/${parameters.connector}`, {
            state: {
              ...(error.data as Record<string, unknown> | undefined),
            },
          });
        }
        setToast(error.message);
      },
    }),
    [navigate, parameters.connector, setToast]
  );

  // Filter native supported social connectors
  const socialConnectors = useMemo(
    () =>
      (experienceSettings?.socialConnectors ?? []).filter(({ id }) => {
        return !isNativeWebview() || getLogtoNativeSdk()?.supportedSocialConnectorIds.includes(id);
      }),
    [experienceSettings?.socialConnectors]
  );

  const { result: invokeSocialSignInResult, run: asyncInvokeSocialSignIn } =
    useApi(invokeSocialSignIn);

  const { result: signInWithSocialResult, run: asyncSignInWithSocial } = useApi(
    signInWithSocial,
    signInWithSocialErrorHandlers
  );

  /* 
    This is needed because the callback useEffect handlers can not get the request parameters
    Hacky solution. Need to be refactored. This is OK only because our requests are running synchronously
  */
  const invokedConnectorIdRef = useRef<string>();

  const invokeSocialSignInHandler = useCallback(
    async (connectorId: string) => {
      if (!termsValidation()) {
        return;
      }

      const state = generateState();
      storeState(state, connectorId);

      const { origin } = window.location;

      // eslint-disable-next-line @silverhand/fp/no-mutation
      invokedConnectorIdRef.current = connectorId;

      return asyncInvokeSocialSignIn(connectorId, state, `${origin}/callback/${connectorId}`);
    },
    [asyncInvokeSocialSignIn, termsValidation]
  );

  const signInWithSocialHandler = useCallback(
    (connectorId: string, state: string, code: string) => {
      if (!stateValidation(state, connectorId)) {
        setToast(t('error.invalid_connector_auth'));

        return;
      }
      void asyncSignInWithSocial({
        connectorId,
        code,
        redirectUri: `${origin}/callback/${connectorId}`,
      });
    },
    [asyncSignInWithSocial, setToast, t]
  );

  const socialCallbackHandler = useCallback(() => {
    const { state, code, error, error_description } = parseQueryParameters(window.location.search);
    const connectorId = parameters.connector;

    if (error) {
      setToast(`${error}${error_description ? `: ${error_description}` : ''}`);
    }

    if (!state || !code || !connectorId) {
      setToast(t('error.missing_auth_data'));

      return;
    }

    const decodedState = decodeState(state);

    if (!decodedState) {
      setToast(t('error.missing_auth_data'));

      return;
    }

    const { platform, callbackLink } = decodedState;

    if (platform === 'web') {
      window.location.assign(
        new URL(`${location.origin}/sign-in/callback/${connectorId}/${window.location.search}`)
      );

      return;
    }

    if (!callbackLink) {
      // CallbackLink should not empty for native webview
      throw new Error('CallbackLink is empty');
    }

    window.location.assign(new URL(`${callbackLink}${window.location.search}`));
  }, [parameters.connector, setToast, t]);

  // InvokeSocialSignIn Callback
  useEffect(() => {
    const { redirectTo } = invokeSocialSignInResult ?? {};

    if (!redirectTo) {
      return;
    }

    // Callback hook to close the social sign in modal
    options?.onSocialSignInCallback?.();

    // Invoke Native Social Sign In flow
    if (isNativeWebview()) {
      getLogtoNativeSdk()?.getPostMessage()({
        callbackUri: `${origin}/callback/${invokedConnectorIdRef.current ?? ''}`,
        redirectTo,
      });

      return;
    }

    // Invoke Web Social Sign In flow
    window.location.assign(redirectTo);
  }, [invokeSocialSignInResult, options]);

  // SignInWithSocial Callback
  useEffect(() => {
    if (signInWithSocialResult?.redirectTo) {
      window.location.assign(signInWithSocialResult.redirectTo);
    }
  }, [signInWithSocialResult]);

  // Social Sign-In Callback Handler
  useEffect(() => {
    if (!location.pathname.includes('/sign-in/callback') || !parameters.connector) {
      return;
    }

    const { state, code } = parseQueryParameters(window.location.search);

    if (!state || !code) {
      return;
    }

    signInWithSocialHandler(parameters.connector, state, code);
  }, [parameters.connector, signInWithSocialHandler]);

  // Monitor Native Error Message
  useEffect(() => {
    if (!isNativeWebview()) {
      return;
    }

    const nativeMessageHandler = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        try {
          setToast(JSON.stringify(event.data));
        } catch {}
      }
    };

    window.addEventListener('message', nativeMessageHandler);

    return () => {
      window.removeEventListener('message', nativeMessageHandler);
    };
  }, [setToast]);

  return {
    socialConnectors,
    invokeSocialSignIn: invokeSocialSignInHandler,
    socialCallbackHandler,
  };
};

export default useSocial;
