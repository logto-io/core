import { RequestErrorBody } from '@logto/schemas';
import { HTTPError } from 'ky';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BareFetcher } from 'swr';

import useApi, { RequestError } from './use-api';

type withTotalNumber<T> = Array<Awaited<T> | number>;

type useSwrFetcherHook = {
  <T>(): BareFetcher<T>;
  <T extends unknown[]>(): BareFetcher<withTotalNumber<T>>;
};

const useSwrFetcher: useSwrFetcherHook = <T>() => {
  const api = useApi({ hideErrorToast: true });
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const fetcher = useCallback<BareFetcher<T | withTotalNumber<T>>>(
    async (resource, init) => {
      try {
        const response = await api.get(resource, init);
        const data = await response.json<T>();

        if (typeof resource === 'string' && resource.includes('?')) {
          const parameters = new URLSearchParams(resource.split('?')[1]);

          if (parameters.get('page') && parameters.get('page_size')) {
            const number = response.headers.get('Total-Number');

            if (!number) {
              throw new Error(t('errors.missing_total_number'));
            }

            return [data, Number(number)];
          }
        }

        return data;
      } catch (error: unknown) {
        if (error instanceof HTTPError) {
          const { response } = error;
          const metadata = await response.json<RequestErrorBody>();
          throw new RequestError(response.status, metadata);
        }
        throw error;
      }
    },
    [api, t]
  );

  return fetcher;
};

export default useSwrFetcher;
