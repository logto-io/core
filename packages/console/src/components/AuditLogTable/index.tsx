import type { Log } from '@logto/schemas';
import { LogResult } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import ApplicationName from '@/components/ApplicationName';
import UserName from '@/components/UserName';
import { defaultPageSize } from '@/consts';
import Table from '@/ds-components/Table';
import type { Column } from '@/ds-components/Table/types';
import type { RequestError } from '@/hooks/use-api';
import useSearchParametersWatcher from '@/hooks/use-search-parameters-watcher';
import useTenantPathname from '@/hooks/use-tenant-pathname';
import { buildUrl } from '@/utils/url';

import EmptyDataPlaceholder from '../EmptyDataPlaceholder';

import ApplicationSelector from './components/ApplicationSelector';
import EventName from './components/EventName';
import EventSelector from './components/EventSelector';
import * as styles from './index.module.scss';

type Props = {
  userId?: string;
  className?: string;
};

function AuditLogTable({ userId, className }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const pageSize = defaultPageSize;
  const [{ page, event, applicationId }, updateSearchParameters] = useSearchParametersWatcher({
    page: 1,
    event: '',
    applicationId: '',
  });

  const url = buildUrl('api/logs', {
    page: String(page),
    page_size: String(pageSize),
    ...conditional(event && { logKey: event }),
    ...conditional(applicationId && { applicationId }),
    ...conditional(userId && { userId }),
  });

  const { data, error, mutate } = useSWR<[Log[], number], RequestError>(url);
  const isLoading = !data && !error;
  const { navigate } = useTenantPathname();
  const [logs, totalCount] = data ?? [];
  const isUserColumnVisible = !userId;

  const eventColumn: Column<Log> = {
    title: t('logs.event'),
    dataIndex: 'event',
    colSpan: isUserColumnVisible ? 5 : 6,
    render: ({ key, payload: { result } }) => (
      <EventName eventKey={key} isSuccess={result === LogResult.Success} />
    ),
  };

  const userColumn: Column<Log> = {
    title: t('logs.user'),
    dataIndex: 'user',
    colSpan: 5,
    render: ({ payload: { userId } }) => (userId ? <UserName userId={userId} /> : <div>-</div>),
  };

  const applicationColumn: Column<Log> = {
    title: t('logs.application'),
    dataIndex: 'application',
    colSpan: isUserColumnVisible ? 3 : 5,
    render: ({ payload: { applicationId } }) =>
      applicationId ? <ApplicationName applicationId={applicationId} /> : <div>-</div>,
  };

  const timeColumn: Column<Log> = {
    title: t('logs.time'),
    dataIndex: 'time',
    colSpan: isUserColumnVisible ? 3 : 5,
    render: ({ createdAt }) => new Date(createdAt).toLocaleString(),
  };

  const columns: Array<Column<Log>> = [
    eventColumn,
    conditional(isUserColumnVisible && userColumn),
    applicationColumn,
    timeColumn,
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  ].filter((column): column is Column<Log> => Boolean(column));

  return (
    <Table
      className={className}
      rowGroups={[{ key: 'logs', data: logs }]}
      rowIndexKey="id"
      columns={columns}
      rowClickHandler={({ id }) => {
        navigate(id);
      }}
      filter={
        <div className={styles.filter}>
          <div className={styles.title}>{t('logs.filter_by')}</div>
          <div className={styles.eventSelector}>
            <EventSelector
              value={event}
              onChange={(event) => {
                updateSearchParameters({ event, page: undefined });
              }}
            />
          </div>
          <div className={styles.applicationSelector}>
            <ApplicationSelector
              value={applicationId}
              onChange={(applicationId) => {
                updateSearchParameters({ applicationId, page: undefined });
              }}
            />
          </div>
        </div>
      }
      placeholder={<EmptyDataPlaceholder />}
      pagination={{
        page,
        totalCount,
        pageSize,
        onChange: (page) => {
          updateSearchParameters({ page });
        },
      }}
      isLoading={isLoading}
      errorMessage={error?.body?.message ?? error?.message}
      onRetry={async () => mutate(undefined, true)}
    />
  );
}

export default AuditLogTable;
