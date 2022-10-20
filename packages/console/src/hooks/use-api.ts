import { useLogto } from '@logto/react';
import { RequestErrorBody } from '@logto/schemas';
import { managementResource } from '@logto/schemas/lib/seeds';
import ky from 'ky';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { requestTimeout } from '@/consts';

export class RequestError extends Error {
  status: number;
  body?: RequestErrorBody;

  constructor(status: number, body: RequestErrorBody) {
    super('Request error occurred.');
    this.status = status;
    this.body = body;
  }
}

const useToastError = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const toastError = async (response: Response) => {
    const fallbackErrorMessage = t('errors.unknown_server_error');

    try {
      const data = await response.json<RequestErrorBody>();
      toast.error([data.message, data.details].join('\n') || fallbackErrorMessage);
    } catch {
      toast.error(fallbackErrorMessage);
    }
  };

  return toastError;
};

type Props = {
  hideErrorToast?: boolean;
};

const useApi = ({ hideErrorToast }: Props = {}) => {
  const { isAuthenticated, getAccessToken } = useLogto();
  const { i18n } = useTranslation();
  const toastError = useToastError();

  const api = useMemo(
    () =>
      ky.create({
        timeout: requestTimeout,
        hooks: {
          beforeError: hideErrorToast
            ? []
            : [
                (error) => {
                  void toastError(error.response);

                  return error;
                },
              ],
          beforeRequest: [
            async (request) => {
              if (isAuthenticated) {
                const accessToken = await getAccessToken(managementResource.indicator);
                request.headers.set('Authorization', `Bearer ${accessToken ?? ''}`);
                request.headers.set('Accept-Language', i18n.language);
              }
            },
          ],
        },
      }),
    [hideErrorToast, toastError, isAuthenticated, getAccessToken, i18n.language]
  );

  return api;
};

export default useApi;
