import { ArbitraryObject, RequestErrorBody } from '@logto/schemas';
import { HTTPError } from 'ky';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BareFetcher } from 'swr';

import useApi, { RequestError } from './use-api';

const useSwrFetcher = () => {
  const api = useApi({ hideErrorToast: true });
  const { t } = useTranslation();
  const fetcher = useCallback<BareFetcher>(
    async (resource, init) => {
      try {
        const response = await api.get(resource, init);
        const data = await response.json<ArbitraryObject>();

        if (typeof resource === 'string' && resource.includes('?')) {
          const parameters = new URLSearchParams(resource.split('?')[1]);

          if (parameters.get('page') && parameters.get('page_size')) {
            const number = response.headers.get('Total-Number');

            if (!number) {
              throw new Error(t('admin_console.errors.missing_total_number'));
            }

            return [data, Number(number)];
          }
        }

        return data;
      } catch (error: unknown) {
        if (error instanceof HTTPError) {
          const { response } = error;
          const metadata = await response.json<RequestErrorBody>();
          throw new RequestError(metadata);
        }
        throw error;
      }
    },
    [api, t]
  );

  return fetcher;
};

export default useSwrFetcher;
