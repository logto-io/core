import { type ConnectorMetadata, type RequestErrorBody, SignInMode } from '@logto/schemas';
import { BrowserProvider } from 'ethers';
import { useCallback, useContext, useMemo } from 'react';

import PageContext from '@/Providers/PageContextProvider/PageContext';
import {
  getBlockchainNonce,
  postBlockchainSignature,
  signInWithBlockchain,
} from '@/apis/interaction';
import { generateState, storeState } from '@/utils/social-connectors';

import useApi from './use-api';
import useErrorHandler, { type ErrorHandlers } from './use-error-handler';
import useRequiredProfileErrorHandler from './use-required-profile-error-handler';
import { useSieMethods } from './use-sie';
import useSocialRegister from './use-social-register';
import useTerms from './use-terms';
import useToast from './use-toast';

const useBlockchain = (connectorId?: string) => {
  const { experienceSettings, theme } = useContext(PageContext);

  const handleError = useErrorHandler();
  const getNonce = useApi(getBlockchainNonce);
  const postSignature = useApi(postBlockchainSignature);

  // Const nativeSignInHandler = useCallback((redirectTo: string, connector: ConnectorMetadata) => {
  //   const { id: connectorId, platform } = connector;

  //   const redirectUri =
  //     platform === 'Universal'
  //       ? buildSocialLandingUri(`/social/landing/${connectorId}`, redirectTo).toString()
  //       : redirectTo;

  //   getLogtoNativeSdk()?.getPostMessage()({
  //     callbackUri: `${window.location.origin}/sign-in/social/${connectorId}`,
  //     redirectTo: redirectUri,
  //   });
  // }, []);

  // TODO: @lbennett share most of this with use-social-sign-in-listener
  const { setToast } = useToast();
  const { termsValidation } = useTerms();
  const { signInMode } = useSieMethods();

  const registerWithSocial = useSocialRegister(connectorId, true);

  const asyncSignInWithBlockchain = useApi(signInWithBlockchain);

  const accountNotExistErrorHandler = useCallback(
    async (_error: RequestErrorBody) => {
      if (!connectorId) {
        return;
      }

      await registerWithSocial(connectorId);
    },
    [connectorId, registerWithSocial]
  );
  const requiredProfileErrorHandlers = useRequiredProfileErrorHandler({
    replace: true,
  });

  const signInWithSocialErrorHandlers: ErrorHandlers = useMemo(
    () => ({
      'user.identity_not_exist': async (error) => {
        // Should not let user register new social account under sign-in only mode
        if (signInMode === SignInMode.SignIn) {
          setToast(error.message);

          return;
        }

        // Agree to terms and conditions first before proceeding
        if (!(await termsValidation())) {
          return;
        }

        await accountNotExistErrorHandler(error);
      },
      ...requiredProfileErrorHandlers,
    }),
    [
      requiredProfileErrorHandlers,
      signInMode,
      termsValidation,
      accountNotExistErrorHandler,
      setToast,
    ]
  );

  const invokeBlockchainSignInHandler = useCallback(
    async (connector: ConnectorMetadata) => {
      const { id: connectorId } = connector;

      const state = generateState();
      storeState(state, connectorId);

      const [nonceError, nonceResult] = await getNonce(connectorId, state);

      if (nonceError) {
        await handleError(nonceError);

        return;
      }

      if (!nonceResult?.nonce) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-restricted-syntax, @typescript-eslint/no-explicit-any
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const signature = await signer.signMessage(nonceResult.nonce);

      await postSignature(
        {
          address,
          signature,
        },
        connectorId,
        state
      );

      const [error, result] = await asyncSignInWithBlockchain({
        connectorId,
        address,
        signature,
      });

      if (error) {
        await handleError(error, signInWithSocialErrorHandlers);
      }

      if (!result?.redirectTo) {
        return;
      }

      // Invoke Web Social Sign In flow
      window.location.assign(result.redirectTo);
    },
    [
      getNonce,
      postSignature,
      asyncSignInWithBlockchain,
      signInWithSocialErrorHandlers,
      handleError /* nativeSignInHandler */,
    ]
  );

  return {
    theme,
    blockchainConnectors: experienceSettings?.blockchainConnectors ?? [],
    invokeBlockchainSignIn: invokeBlockchainSignInHandler,
  };
};

export default useBlockchain;
