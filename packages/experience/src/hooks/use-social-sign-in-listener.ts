import type { RequestErrorBody } from '@logto/schemas';
import { SignInMode } from '@logto/schemas';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validate } from 'superstruct';

import { signInWithSocial } from '@/apis/interaction';
import { socialAccountNotExistErrorDataGuard } from '@/types/guard';
import { parseQueryParameters } from '@/utils';
import { stateValidation } from '@/utils/social-connectors';

import useApi from './use-api';
import useErrorHandler from './use-error-handler';
import type { ErrorHandlers } from './use-error-handler';
import usePreSignInErrorHandler from './use-pre-sign-in-error-handler';
import { useSieMethods } from './use-sie';
import useSocialRegister from './use-social-register';
import useTerms from './use-terms';
import useToast from './use-toast';

const useSocialSignInListener = (connectorId: string) => {
  const { setToast } = useToast();
  const { signInMode } = useSieMethods();
  const { t } = useTranslation();
  const { termsValidation } = useTerms();
  const [isConsumed, setIsConsumed] = useState(false);
  const [searchParameters, setSearchParameters] = useSearchParams();

  const navigate = useNavigate();

  const handleError = useErrorHandler();

  const registerWithSocial = useSocialRegister(connectorId, true);

  const asyncSignInWithSocial = useApi(signInWithSocial);

  const accountNotExistErrorHandler = useCallback(
    async (error: RequestErrorBody) => {
      const [, data] = validate(error.data, socialAccountNotExistErrorDataGuard);
      const { relatedUser } = data ?? {};

      if (relatedUser) {
        navigate(`/social/link/${connectorId}`, {
          replace: true,
          state: { relatedUser },
        });

        return;
      }

      // Register with social
      await registerWithSocial(connectorId);
    },
    [connectorId, navigate, registerWithSocial]
  );

  const preSignInErrorHandler = usePreSignInErrorHandler({ replace: true });

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
      ...preSignInErrorHandler,
    }),
    [preSignInErrorHandler, signInMode, termsValidation, accountNotExistErrorHandler, setToast]
  );

  const signInWithSocialHandler = useCallback(
    async (connectorId: string, data: Record<string, unknown>) => {
      const [error, result] = await asyncSignInWithSocial({
        connectorId,
        connectorData: {
          // For validation use only
          redirectUri: `${window.location.origin}/callback/${connectorId}`,
          ...data,
        },
      });

      if (error) {
        await handleError(error, signInWithSocialErrorHandlers);

        return;
      }

      if (result?.redirectTo) {
        window.location.replace(result.redirectTo);
      }
    },
    [asyncSignInWithSocial, handleError, signInWithSocialErrorHandlers]
  );

  // Social Sign-in Callback Handler
  useEffect(() => {
    if (isConsumed) {
      return;
    }

    setIsConsumed(true);

    const { state, ...rest } = parseQueryParameters(searchParameters);

    // Cleanup the search parameters once it's consumed
    setSearchParameters({}, { replace: true });

    if (!state || !stateValidation(state, connectorId)) {
      setToast(t('error.invalid_connector_auth'));
      return;
    }

    void signInWithSocialHandler(connectorId, rest);
  }, [
    connectorId,
    isConsumed,
    searchParameters,
    setSearchParameters,
    setToast,
    signInWithSocialHandler,
    t,
  ]);
};

export default useSocialSignInListener;
