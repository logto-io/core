import { withAppInsights } from '@logto/app-insights/react';
import { ConnectorType } from '@logto/schemas';
import type { ConnectorFactoryResponse, ConnectorResponse } from '@logto/schemas';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';

import Delete from '@/assets/icons/delete.svg';
import More from '@/assets/icons/more.svg';
import Reset from '@/assets/icons/reset.svg';
import ConnectorLogo from '@/components/ConnectorLogo';
import DetailsPage from '@/components/DetailsPage';
import Drawer from '@/components/Drawer';
import Markdown from '@/components/Markdown';
import PageMeta from '@/components/PageMeta';
import UnnamedTrans from '@/components/UnnamedTrans';
import { ConnectorsTabs } from '@/consts/page-tabs';
import ActionMenu, { ActionMenuItem } from '@/ds-components/ActionMenu';
import Button from '@/ds-components/Button';
import Card from '@/ds-components/Card';
import CopyToClipboard from '@/ds-components/CopyToClipboard';
import TabNav, { TabNavItem } from '@/ds-components/TabNav';
import Tag from '@/ds-components/Tag';
import type { RequestError } from '@/hooks/use-api';
import useApi from '@/hooks/use-api';
import useConnectorInUse from '@/hooks/use-connector-in-use';

import CreateForm from '../Connectors/components/CreateForm';

import ConnectorContent from './components/ConnectorContent';
import ConnectorTabs from './components/ConnectorTabs';
import ConnectorTypeName from './components/ConnectorTypeName';
import DeleteConnectorConfirmModal from './components/DeleteConnectorConfirmModal';
import * as styles from './index.module.scss';

// TODO: refactor path-related operation utils in both Connectors and ConnectorDetails page
const getConnectorsPathname = (isSocial: boolean) =>
  `/connectors/${isSocial ? ConnectorsTabs.Social : ConnectorsTabs.Passwordless}`;

function ConnectorDetails() {
  const { pathname } = useLocation();
  const { connectorId } = useParams();
  const { mutate: mutateGlobal } = useSWRConfig();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isReadMeOpen, setIsReadMeOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { data, error, mutate } = useSWR<ConnectorResponse, RequestError>(
    connectorId && `api/connectors/${connectorId}`
  );
  const {
    data: connectorFactory,
    error: fetchConnectorFactoryError,
    mutate: mutateConnectorFactory,
  } = useSWR<ConnectorFactoryResponse, RequestError>(
    data?.isStandard && `api/connector-factories/${data.connectorId}`
  );

  const requestError = error ?? fetchConnectorFactoryError;

  const { isConnectorInUse } = useConnectorInUse();
  const inUse = isConnectorInUse(data);
  const isLoading =
    (!data && !error) || (data?.isStandard && !connectorFactory && !fetchConnectorFactoryError);

  const api = useApi();
  const navigate = useNavigate();
  const isSocial = data?.type === ConnectorType.Social;
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsDeleteAlertOpen(false);
  }, [pathname]);

  const handleDelete = async () => {
    if (!connectorId || isDeleting) {
      return;
    }
    setIsDeleting(true);

    try {
      await api.delete(`api/connectors/${connectorId}`).json<ConnectorResponse>();

      setIsDeleted(true);

      toast.success(t('connector_details.connector_deleted'));
      await mutateGlobal('api/connectors');

      navigate(getConnectorsPathname(isSocial), {
        replace: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!connectorId) {
    return null;
  }

  return (
    <DetailsPage
      backLink={getConnectorsPathname(isSocial)}
      backLinkTitle="connector_details.back_to_connectors"
      isLoading={isLoading}
      error={requestError}
      onRetry={() => {
        void mutate();
        void mutateConnectorFactory();
      }}
    >
      <PageMeta titleKey="connector_details.page_title" />
      {isSocial && <ConnectorTabs target={data.target} connectorId={data.id} />}
      {data && (
        <>
          <Card className={styles.header}>
            <ConnectorLogo data={data} size="large" />
            <div className={styles.metadata}>
              <div>
                <div className={styles.name}>
                  <UnnamedTrans resource={data.name} />
                </div>
              </div>
              <div>
                <ConnectorTypeName type={data.type} />
                <div className={styles.verticalBar} />
                {connectorFactory && (
                  <>
                    <Tag>
                      <UnnamedTrans resource={connectorFactory.name} />
                    </Tag>
                    <div className={styles.verticalBar} />
                  </>
                )}
                <Tag type="state" status={inUse ? 'success' : 'info'}>
                  {t(
                    inUse
                      ? 'connectors.connector_status_in_use'
                      : 'connectors.connector_status_not_in_use'
                  )}
                </Tag>
                <div className={styles.verticalBar} />
                <div className={styles.text}>ID</div>
                <CopyToClipboard size="small" value={data.id} />
              </div>
            </div>
            <div className={styles.operations}>
              <Button
                title="connector_details.check_readme"
                size="large"
                onClick={() => {
                  setIsReadMeOpen(true);
                }}
              />
              <Drawer
                title="connectors.title"
                subtitle="connectors.subtitle"
                isOpen={isReadMeOpen}
                onClose={() => {
                  setIsReadMeOpen(false);
                }}
              >
                <Markdown className={styles.readme}>{data.readme}</Markdown>
              </Drawer>
              <ActionMenu
                buttonProps={{ icon: <More className={styles.moreIcon} />, size: 'large' }}
                title={t('general.more_options')}
              >
                {!isSocial && (
                  <ActionMenuItem
                    icon={<Reset />}
                    iconClassName={styles.resetIcon}
                    onClick={() => {
                      setIsSetupOpen(true);
                    }}
                  >
                    {t(
                      data.type === ConnectorType.Sms
                        ? 'connector_details.options_change_sms'
                        : 'connector_details.options_change_email'
                    )}
                  </ActionMenuItem>
                )}
                <ActionMenuItem
                  icon={<Delete />}
                  type="danger"
                  onClick={() => {
                    setIsDeleteAlertOpen(true);
                  }}
                >
                  {t('general.delete')}
                </ActionMenuItem>
              </ActionMenu>
              <CreateForm
                isOpen={isSetupOpen}
                type={data.type}
                onClose={(connectorId?: string) => {
                  setIsSetupOpen(false);

                  if (connectorId) {
                    navigate(`${getConnectorsPathname(isSocial)}/guide/${connectorId}`);
                  }
                }}
              />
            </div>
          </Card>
          <TabNav>
            <TabNavItem href={`${getConnectorsPathname(isSocial)}/${connectorId}`}>
              {t('general.settings_nav')}
            </TabNavItem>
          </TabNav>
          <ConnectorContent
            isDeleted={isDeleted}
            connectorData={data}
            onConnectorUpdated={(connector) => {
              void mutate(connector);
            }}
          />
          <DeleteConnectorConfirmModal
            data={data}
            isInUse={inUse}
            isOpen={isDeleteAlertOpen}
            isLoading={isDeleting}
            onCancel={() => {
              setIsDeleteAlertOpen(false);
            }}
            onConfirm={handleDelete}
          />
        </>
      )}
    </DetailsPage>
  );
}

export default withAppInsights(ConnectorDetails);
