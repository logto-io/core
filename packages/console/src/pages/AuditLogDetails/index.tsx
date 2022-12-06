import type { LogDto, User } from '@logto/schemas';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

import Back from '@/assets/images/back.svg';
import ApplicationName from '@/components/ApplicationName';
import Card from '@/components/Card';
import CodeEditor from '@/components/CodeEditor';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import FormField from '@/components/FormField';
import TabNav, { TabNavItem } from '@/components/TabNav';
import TextLink from '@/components/TextLink';
import UserName from '@/components/UserName';
import { logEventTitle } from '@/consts/logs';
import type { RequestError } from '@/hooks/use-api';
import * as detailsStyles from '@/scss/details.module.scss';

import EventIcon from './components/EventIcon';
import * as styles from './index.module.scss';

const getAuditLogDetailsRelatedResourceLink = (pathname: string) =>
  `/${pathname.slice(0, pathname.lastIndexOf('/'))}`;

const getDetailsTabNavLink = (logId: string, userId?: string) =>
  userId ? `/users/${userId}/logs/${logId}` : `/audit-logs/${logId}`;

const AuditLogDetails = () => {
  const { userId, logId } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { data, error } = useSWR<LogDto, RequestError>(logId && `/api/logs/${logId}`);
  const { data: userData } = useSWR<User, RequestError>(userId && `/api/users/${userId}`);

  const isLoading = !data && !error;

  const backLink = getAuditLogDetailsRelatedResourceLink(pathname);
  const backLinkTitle = userId
    ? t('log_details.back_to_user', { name: userData?.name ?? t('users.unnamed') })
    : t('log_details.back_to_logs');

  if (!logId) {
    return null;
  }

  return (
    <div className={detailsStyles.container}>
      <TextLink to={backLink} icon={<Back />} className={styles.backLink}>
        {backLinkTitle}
      </TextLink>
      {isLoading && <DetailsSkeleton />}
      {!data && error && <div>{`error occurred: ${error.body?.message ?? error.message}`}</div>}
      {data && (
        <>
          <Card className={styles.header}>
            <EventIcon isSuccess={data.payload.result === 'Success'} />
            <div className={styles.content}>
              <div className={styles.eventName}>{logEventTitle[data.type]}</div>
              <div className={styles.basicInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.event_type')}</div>
                  <div>{data.type}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.application')}</div>
                  <div>
                    {data.payload.applicationId ? (
                      <ApplicationName isLink applicationId={data.payload.applicationId} />
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.ip_address')}</div>
                  <div>{data.payload.ip ?? '-'}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.user')}</div>
                  <div>
                    {data.payload.userId ? <UserName isLink userId={data.payload.userId} /> : '-'}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.log_id')}</div>
                  <div>{data.id}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.time')}</div>
                  <div>{new Date(data.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>{t('log_details.user_agent')}</div>
                  <div>{data.payload.userAgent}</div>
                </div>
              </div>
            </div>
          </Card>
          <TabNav>
            <TabNavItem href={getDetailsTabNavLink(logId, userId)}>
              {t('log_details.tab_details')}
            </TabNavItem>
          </TabNav>
          <Card className={classNames(styles.body, detailsStyles.body)}>
            <div className={styles.main}>
              <FormField title="log_details.raw_data">
                <CodeEditor language="json" value={JSON.stringify(data.payload, null, 2)} />
              </FormField>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default AuditLogDetails;
