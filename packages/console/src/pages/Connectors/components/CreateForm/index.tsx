import { ConnectorType } from '@logto/schemas';
import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';

import Button from '@/components/Button';
import ModalLayout from '@/components/ModalLayout';
import RadioGroup, { Radio } from '@/components/RadioGroup';
import UnnamedTrans from '@/components/UnnamedTrans';
import useConnectorGroups from '@/hooks/use-connector-groups';
import * as modalStyles from '@/scss/modal.module.scss';

import GuideModal from '../GuideModal';
import PlatformSelector from './PlatformSelector';
import * as styles from './index.module.scss';

type Props = {
  isOpen: boolean;
  type?: ConnectorType;
  onClose?: () => void;
};

const CreateForm = ({ onClose, isOpen: isFormOpen, type }: Props) => {
  const { data: allGroups, connectors, error } = useConnectorGroups();
  const isLoading = !allGroups && !connectors && !error;
  const [activeGroupId, setActiveGroupId] = useState<string>();
  const [activeConnectorId, setActiveConnectorId] = useState<string>();
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);

  const groups = useMemo(
    () => allGroups?.filter((group) => group.type === type),
    [allGroups, type]
  );

  const activeGroup = useMemo(
    () => groups?.find(({ id }) => id === activeGroupId),
    [activeGroupId, groups]
  );

  const activeConnector = useMemo(
    () => connectors?.find(({ id }) => id === activeConnectorId),
    [activeConnectorId, connectors]
  );

  const cardTitle = useMemo(() => {
    if (type === ConnectorType.Email) {
      return 'connectors.setup_title.email';
    }

    if (type === ConnectorType.SMS) {
      return 'connectors.setup_title.sms';
    }

    return 'connectors.setup_title.social';
  }, [type]);

  const handleGroupChange = (groupId: string) => {
    if (!groups) {
      return;
    }

    setActiveGroupId(groupId);

    const group = groups.find(({ id }) => id === groupId);

    if (!group) {
      return;
    }

    const firstAvailableConnector = group.connectors.find(({ enabled }) => !enabled);

    setActiveConnectorId(firstAvailableConnector?.id);
  };

  const closeModal = () => {
    setIsGetStartedModalOpen(false);
    onClose?.();
  };

  return (
    <Modal
      isOpen={isFormOpen}
      className={modalStyles.content}
      overlayClassName={modalStyles.overlay}
    >
      <ModalLayout
        title={cardTitle}
        footer={
          <Button
            title="admin_console.connectors.next"
            type="primary"
            disabled={!activeConnectorId}
            onClick={() => {
              setIsGetStartedModalOpen(true);
            }}
          />
        }
        className={styles.body}
        size="large"
        onClose={onClose}
      >
        {isLoading && 'Loading...'}
        {error && error}
        {groups && (
          <RadioGroup name="group" value={activeGroupId} type="card" onChange={handleGroupChange}>
            {groups.map(({ id, name, logo, description, connectors }) => (
              <Radio
                key={id}
                value={id}
                isDisabled={connectors.every(({ enabled }) => enabled)}
                className={styles.connector}
                disabledLabel="connectors.added"
              >
                <div className={styles.logo}>
                  <img src={logo} />
                </div>
                <div className={styles.name}>
                  <UnnamedTrans resource={name} />
                </div>
                {type !== ConnectorType.Social && <div className={styles.connectorId}>{id}</div>}
                <div className={styles.description}>
                  <UnnamedTrans resource={description} />
                </div>
              </Radio>
            ))}
          </RadioGroup>
        )}
        {activeGroup && (
          <PlatformSelector
            connectorGroup={activeGroup}
            connectorId={activeConnectorId}
            onConnectorIdChange={setActiveConnectorId}
          />
        )}
        {activeConnector && (
          <GuideModal
            connector={activeConnector}
            isOpen={isGetStartedModalOpen}
            onClose={closeModal}
          />
        )}
      </ModalLayout>
    </Modal>
  );
};

export default CreateForm;
