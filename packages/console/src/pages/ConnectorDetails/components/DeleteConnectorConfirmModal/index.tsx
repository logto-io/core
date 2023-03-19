import type { ConnectorResponse } from '@logto/schemas';
import { ConnectorType } from '@logto/schemas';
import { Trans, useTranslation } from 'react-i18next';

import ConfirmModal from '@/components/ConfirmModal';
import UnnamedTrans from '@/components/UnnamedTrans';

type Props = {
  data: ConnectorResponse;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConnectorConfirmModal = ({ data, isOpen, onCancel, onConfirm }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const isSocial = data.type === ConnectorType.Social;

  return (
    <ConfirmModal
      isOpen={isOpen}
      confirmButtonText="general.delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {isSocial ? (
        <Trans
          t={t}
          i18nKey="connector_details.in_used_social_deletion_description"
          components={{ name: <UnnamedTrans resource={data.name} /> }}
        />
      ) : (
        t('connector_details.in_used_passwordless_deletion_description', {
          name: t(
            data.type === ConnectorType.Email
              ? 'connector_details.type_email'
              : 'connector_details.type_sms'
          ),
        })
      )}
    </ConfirmModal>
  );
};

export default DeleteConnectorConfirmModal;
