import { useLogto } from '@logto/react';
import { RequestErrorBody } from '@logto/schemas';
import { managementResource } from '@logto/schemas/lib/seeds';
import { t } from 'i18next';
import ky from 'ky';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export class RequestError extends Error {
  status: number;
  body?: RequestErrorBody;

  constructor(status: number, body: RequestErrorBody) {
    super('Request error occurred.');
    this.status = status;
    this.body = body;
  }
}

const toastError = async (response: Response) => {
  try {
    const data = await response.json<RequestErrorBody>();
    toast.error([data.message, data.details].join('\n') || t('errors.unknown_server_error'));
  } catch {
    toast.error(t('errors.unknown_server_error'));
  }
};

type Props = {
  hideErrorToast?: boolean;
};

const useApi = ({ hideErrorToast }: Props = {}) => {
  const { isAuthenticated, getAccessToken } = useLogto();
  const { i18n } = useTranslation();

  const api = useMemo(
    () =>
      ky.create({
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
    [hideErrorToast, isAuthenticated, getAccessToken, i18n.language]
  );

  return api;
};

export default useApi;
