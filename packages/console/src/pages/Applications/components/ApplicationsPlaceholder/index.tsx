import type { Application } from '@logto/schemas';
import { ApplicationType } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import useApi from '@/hooks/use-api';
import useConfigs from '@/hooks/use-configs';
import * as modalStyles from '@/scss/modal.module.scss';
import { applicationTypeI18nKey } from '@/types/applications';

import Guide from '../Guide';
import TypeDescription from '../TypeDescription';
import * as styles from './index.module.scss';

const defaultAppName = 'My App';

const ApplicationsPlaceholder = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [createdApplication, setCreatedApplication] = useState<Application>();
  const isGetStartedModalOpen = Boolean(createdApplication);
  const api = useApi();
  const { updateConfigs } = useConfigs();

  const handleCreate = async (type: ApplicationType) => {
    if (isCreating) {
      return;
    }

    setIsCreating(true);
    const payload = {
      type,
      name: defaultAppName,
    };

    try {
      const createdApp = await api.post('api/applications', { json: payload }).json<Application>();

      setCreatedApplication(createdApp);

      void updateConfigs({
        applicationCreated: true,
        ...conditional(
          createdApp.type === ApplicationType.MachineToMachine && { m2mApplicationCreated: true }
        ),
      });
    } finally {
      setIsCreating(false);
    }
  };

  const closeGuideModal = () => {
    if (!createdApplication) {
      return;
    }

    navigate(`/applications/${createdApplication.id}`);
    setCreatedApplication(undefined);
  };

  return (
    <div className={styles.placeholder}>
      <div className={styles.title}>{t('applications.placeholder_title')}</div>
      <div className={styles.description}>{t('applications.placeholder_description')}</div>
      <div className={styles.options}>
        {Object.values(ApplicationType).map((type) => (
          <div key={type} className={styles.option}>
            <TypeDescription
              size="small"
              type={type}
              title={t(`${applicationTypeI18nKey[type]}.title`)}
              subtitle={t(`${applicationTypeI18nKey[type]}.subtitle`)}
              description={t(`${applicationTypeI18nKey[type]}.description`)}
            />
            <Button
              className={styles.createButton}
              disabled={isCreating}
              title="general.create"
              onClick={async () => {
                await handleCreate(type);
              }}
            />
          </div>
        ))}
      </div>
      {createdApplication && (
        <Modal
          shouldCloseOnEsc
          isOpen={isGetStartedModalOpen}
          className={modalStyles.fullScreen}
          onRequestClose={closeGuideModal}
        >
          <Guide app={createdApplication} onClose={closeGuideModal} />
        </Modal>
      )}
    </div>
  );
};

export default ApplicationsPlaceholder;
