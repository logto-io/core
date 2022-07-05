import { Application, SnakeCaseOidcConfig } from '@logto/schemas';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import CopyToClipboard from '@/components/CopyToClipboard';
import FormField from '@/components/FormField';
import UnsavedChangesAlertModal from '@/components/UnsavedChangesAlertModal';

import * as styles from '../index.module.scss';

type Props = {
  oidcConfig: SnakeCaseOidcConfig;
  defaultData: Application;
};

const AdvancedSettings = ({ oidcConfig, defaultData }: Props) => {
  const {
    reset,
    formState: { isDirty },
  } = useFormContext<Application>();

  useEffect(() => {
    reset(defaultData);

    return () => {
      reset(defaultData);
    };
  }, [reset, defaultData]);

  return (
    <>
      <FormField title="admin_console.application_details.token_endpoint">
        <CopyToClipboard
          className={styles.textField}
          value={oidcConfig.token_endpoint}
          variant="border"
        />
      </FormField>
      <UnsavedChangesAlertModal hasUnsavedChanges={isDirty} />
    </>
  );
};

export default AdvancedSettings;
