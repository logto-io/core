import type { Scope } from '@logto/schemas';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

import Delete from '@/assets/images/delete.svg';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import Table from '@/components/Table';
import type { RequestError } from '@/hooks/use-api';

import type { ApiResourceDetailsOutletContext } from '../types';
import * as styles from './index.module.scss';

const ApiResourcePermissions = () => {
  const {
    resource: { id: resourceId },
  } = useOutletContext<ApiResourceDetailsOutletContext>();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    data: scopes,
    error,
    mutate,
  } = useSWR<Scope[], RequestError>(`/api/resources/${resourceId}/scopes`);

  const isLoading = !scopes && !error;

  return (
    <Table
      className={styles.permissionTable}
      rowIndexKey="id"
      rowGroups={[{ key: 'scopes', data: scopes }]}
      columns={[
        {
          title: t('api_resource_details.permission.name_column'),
          dataIndex: 'name',
          colSpan: 6,
          render: ({ name }) => <div className={styles.name}>{name}</div>,
        },
        {
          title: t('api_resource_details.permission.description_column'),
          dataIndex: 'description',
          colSpan: 9,
          render: ({ description }) => <div className={styles.description}>{description}</div>,
        },
        {
          title: null,
          dataIndex: 'delete',
          colSpan: 1,
          render: () => (
            <IconButton>
              <Delete />
            </IconButton>
          ),
        },
      ]}
      isLoading={isLoading}
      placeholder={{
        content: (
          <Button
            title="api_resource_details.permission.create_button"
            type="outline"
            onClick={() => {
              // TODO @xiaoyijun Create Permission
            }}
          />
        ),
      }}
      errorMessage={error?.body?.message ?? error?.message}
      onRetry={async () => mutate(undefined, true)}
    />
  );
};

export default ApiResourcePermissions;
