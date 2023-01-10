import type { Log } from '@logto/schemas';
import { LogResult } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import ApplicationName from '@/components/ApplicationName';
import Pagination from '@/components/Pagination';
import TableEmpty from '@/components/Table/TableEmpty';
import TableError from '@/components/Table/TableError';
import TableLoading from '@/components/Table/TableLoading';
import UserName from '@/components/UserName';
import type { RequestError } from '@/hooks/use-api';
import * as tableStyles from '@/scss/table.module.scss';
import { buildUrl } from '@/utilities/url';

import ApplicationSelector from './components/ApplicationSelector';
import EventName from './components/EventName';
import EventSelector from './components/EventSelector';
import * as styles from './index.module.scss';

const pageSize = 20;

type Props = {
  userId?: string;
  className?: string;
};

const defaultTableColumn = 4;

const AuditLogTable = ({ userId, className }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { pathname } = useLocation();
  const [query, setQuery] = useSearchParams();
  const pageIndex = Number(query.get('page') ?? '1');
  const event = query.get('event');
  const applicationId = query.get('applicationId');

  const url = buildUrl('/api/logs', {
    page: `${pageIndex}`,
    page_size: `${pageSize}`,
    ...conditional(event && { logType: event }),
    ...conditional(applicationId && { applicationId }),
    ...conditional(userId && { userId }),
  });

  const { data, error, mutate } = useSWR<[Log[], number], RequestError>(url);
  const isLoading = !data && !error;
  const navigate = useNavigate();
  const [logs, totalCount] = data ?? [];
  const showUserColumn = !userId;
  const tableColumnCount = showUserColumn ? defaultTableColumn : defaultTableColumn - 1;

  const updateQuery = (key: string, value: string) => {
    const queries: Record<string, string> = {};

    for (const [key, value] of query.entries()) {
      // eslint-disable-next-line @silverhand/fp/no-mutation
      queries[key] = value;
    }

    setQuery({
      ...queries,
      [key]: value,
    });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.tableLayout}>
        <div className={styles.filter}>
          <div className={styles.title}>{t('logs.filter_by')}</div>
          <div className={styles.eventSelector}>
            <EventSelector
              value={event ?? undefined}
              onChange={(value) => {
                updateQuery('event', value ?? '');
              }}
            />
          </div>
          <div className={styles.applicationSelector}>
            <ApplicationSelector
              value={applicationId ?? undefined}
              onChange={(value) => {
                updateQuery('applicationId', value ?? '');
              }}
            />
          </div>
        </div>
        <div className={classNames(tableStyles.scrollable, styles.tableContainer)}>
          <table className={conditional(logs?.length === 0 && tableStyles.empty)}>
            <colgroup>
              <col className={styles.eventName} />
              {showUserColumn && <col />}
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>{t('logs.event')}</th>
                {showUserColumn && <th>{t('logs.user')}</th>}
                <th>{t('logs.application')}</th>
                <th>{t('logs.time')}</th>
              </tr>
            </thead>
            <tbody>
              {!data && error && (
                <TableError
                  columns={tableColumnCount}
                  content={error.body?.message ?? error.message}
                  onRetry={async () => mutate(undefined, true)}
                />
              )}
              {isLoading && <TableLoading columns={tableColumnCount} />}
              {logs?.length === 0 && <TableEmpty columns={tableColumnCount} />}
              {logs?.map(({ key, payload, createdAt, id }) => (
                <tr
                  key={id}
                  className={tableStyles.clickable}
                  onClick={() => {
                    navigate(`${pathname}/${id}`);
                  }}
                >
                  <td>
                    <EventName eventKey={key} isSuccess={payload.result === LogResult.Success} />
                  </td>
                  {showUserColumn && (
                    <td>{payload.userId ? <UserName userId={payload.userId} /> : '-'}</td>
                  )}
                  <td>
                    {payload.applicationId ? (
                      <ApplicationName applicationId={payload.applicationId} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        pageSize={pageSize}
        className={styles.pagination}
        onChange={(page) => {
          updateQuery('page', String(page));
        }}
      />
    </div>
  );
};

export default AuditLogTable;
