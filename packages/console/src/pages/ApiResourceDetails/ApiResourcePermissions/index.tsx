import type { Scope } from '@logto/schemas';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import Plus from '@/assets/images/plus.svg';
import Button from '@/components/Button';
import ConfirmModal from '@/components/ConfirmModal';
import PermissionsTable from '@/components/PermissionsTable';
import useApi from '@/hooks/use-api';

import type { ApiResourceDetailsOutletContext } from '../types';
import CreatePermissionModal from './components/CreatePermissionModal';

const ApiResourcePermissions = () => {
  const {
    resource: { id: resourceId },
  } = useOutletContext<ApiResourceDetailsOutletContext>();

  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const fetchUrl = `/api/resources/${resourceId}/scopes`;

  const { mutate } = useSWRConfig();

  const api = useApi();

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [scopeToBeDeleted, setScopeToBeDeleted] = useState<Scope>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!scopeToBeDeleted || isDeleting) {
      return;
    }
    setIsDeleting(true);

    try {
      await api.delete(`/api/resources/${resourceId}/scopes/${scopeToBeDeleted.id}`);
      toast.success(t('api_resource_details.permission.deleted', { name: scopeToBeDeleted.name }));
      await mutate(fetchUrl);
      setScopeToBeDeleted(undefined);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <PermissionsTable
        fetchUrl={fetchUrl}
        createButton={
          <Button
            title="api_resource_details.permission.create_button"
            type="primary"
            size="large"
            icon={<Plus />}
            onClick={() => {
              setIsCreateFormOpen(true);
            }}
          />
        }
        deleteHandler={setScopeToBeDeleted}
        placeholderContent={
          <Button
            title="api_resource_details.permission.create_button"
            type="outline"
            onClick={() => {
              setIsCreateFormOpen(true);
            }}
          />
        }
      />
      {isCreateFormOpen && (
        <CreatePermissionModal
          resourceId={resourceId}
          onClose={(scope) => {
            if (scope) {
              toast.success(
                t('api_resource_details.permission.permission_created', { name: scope.name })
              );
              void mutate(fetchUrl);
            }
            setIsCreateFormOpen(false);
          }}
        />
      )}
      {scopeToBeDeleted && (
        <ConfirmModal
          isOpen
          isLoading={isDeleting}
          confirmButtonText="general.delete"
          onCancel={() => {
            setScopeToBeDeleted(undefined);
          }}
          onConfirm={handleDelete}
        >
          {t('api_resource_details.permission.delete_description')}
        </ConfirmModal>
      )}
    </>
  );
};

export default ApiResourcePermissions;
