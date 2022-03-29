import { ConnectorDTO, ConnectorType } from '@logto/schemas';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';

import Button from '@/components/Button';
import Card from '@/components/Card';
import CardTitle from '@/components/CardTitle';
import TabNav, { TabNavLink } from '@/components/TabNav';
import TableEmpty from '@/components/Table/TableEmpty';
import TableError from '@/components/Table/TableError';
import TableLoading from '@/components/Table/TableLoading';
import { RequestError } from '@/hooks/use-api';

import ConnectorRow from './components/ConnectorRow';
import SetupModal from './components/SetupModal';
import * as styles from './index.module.scss';

const Connectors = () => {
  const location = useLocation();
  const isSocial = location.pathname === '/connectors/social';
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [createType, setCreateType] = useState<ConnectorType>();
  const { data, error, mutate } = useSWR<ConnectorDTO[], RequestError>('/api/connectors');
  const isLoading = !data && !error;

  const emailConnector = useMemo(
    () =>
      data?.find(
        (connector) => connector.enabled && connector.metadata.type === ConnectorType.Email
      ),
    [data]
  );

  const smsConnector = useMemo(
    () =>
      data?.find((connector) => connector.enabled && connector.metadata.type === ConnectorType.SMS),
    [data]
  );

  const socialConnectors = useMemo(() => {
    if (!isSocial) {
      return;
    }

    return data?.filter((connector) => connector.metadata.type === ConnectorType.Social);
  }, [data, isSocial]);

  return (
    <>
      <Card>
        <div className={styles.headline}>
          <CardTitle title="connectors.title" subtitle="connectors.subtitle" />
          {isSocial && (
            <Button
              title="admin_console.connectors.create"
              type="primary"
              onClick={() => {
                setCreateType(ConnectorType.Social);
              }}
            />
          )}
        </div>
        <TabNav className={styles.tabs}>
          <TabNavLink href="/connectors">{t('connectors.tab_email_sms')}</TabNavLink>
          <TabNavLink href="/connectors/social">{t('connectors.tab_social')}</TabNavLink>
        </TabNav>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.connectorName} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>{t('connectors.connector_name')}</th>
              <th>{t('connectors.connector_type')}</th>
              <th>{t('connectors.connector_status')}</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <TableError
                columns={3}
                content={error.body.message}
                onRetry={async () => mutate(undefined, true)}
              />
            )}
            {isLoading && <TableLoading columns={3} />}
            {socialConnectors?.length === 0 && (
              <TableEmpty
                columns={3}
                title={t('connectors.type.social')}
                content={t('connectors.social_connector_eg')}
              >
                <Button title="admin_console.connectors.create" type="outline" />
              </TableEmpty>
            )}
            {!isLoading && !isSocial && (
              <ConnectorRow
                connector={emailConnector}
                type={ConnectorType.Email}
                onClickSetup={() => {
                  setCreateType(ConnectorType.Email);
                }}
              />
            )}
            {!isLoading && !isSocial && (
              <ConnectorRow connector={smsConnector} type={ConnectorType.SMS} />
            )}
            {socialConnectors?.map((connector) => (
              <ConnectorRow key={connector.id} connector={connector} type={ConnectorType.Social} />
            ))}
          </tbody>
        </table>
      </Card>
      {data && (
        <SetupModal
          isOpen={Boolean(createType)}
          type={createType}
          onClose={() => {
            setCreateType(undefined);
          }}
        />
      )}
    </>
  );
};

export default Connectors;
