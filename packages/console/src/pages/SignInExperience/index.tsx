import type { SignInExperience as SignInExperienceType } from '@logto/schemas';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import Button from '@/components/Button';
import Card from '@/components/Card';
import CardTitle from '@/components/CardTitle';
import ConfirmModal from '@/components/ConfirmModal';
import TabNav, { TabNavItem } from '@/components/TabNav';
import UnsavedChangesAlertModal from '@/components/UnsavedChangesAlertModal';
import type { RequestError } from '@/hooks/use-api';
import useApi from '@/hooks/use-api';
import useSettings from '@/hooks/use-settings';
import useUiLanguages from '@/hooks/use-ui-languages';
import * as detailsStyles from '@/scss/details.module.scss';

import Preview from './components/Preview';
import SignUpAndSignInChangePreview from './components/SignUpAndSignInChangePreview';
import Skeleton from './components/Skeleton';
import Welcome from './components/Welcome';
import usePreviewConfigs from './hooks/use-preview-configs';
import * as styles from './index.module.scss';
import Branding from './tabs/Branding';
import Others from './tabs/Others';
import SignUpAndSignIn from './tabs/SignUpAndSignIn';
import type { SignInExperienceForm } from './types';
import { compareSignUpAndSignInConfigs, signInExperienceParser } from './utilities';

const SignInExperience = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { tab } = useParams();
  const { data, error, mutate } = useSWR<SignInExperienceType, RequestError>('/api/sign-in-exp');
  const { settings, error: settingsError, updateSettings, mutate: mutateSettings } = useSettings();
  const { error: languageError, isLoading: isLoadingLanguages } = useUiLanguages();
  const [dataToCompare, setDataToCompare] = useState<SignInExperienceType>();

  const methods = useForm<SignInExperienceForm>();
  const {
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { isSubmitting, isDirty },
  } = methods;
  const api = useApi();
  const formData = watch();

  const previewConfigs = usePreviewConfigs(formData, isDirty, data);

  const defaultFormData = useMemo(() => {
    if (!data) {
      return;
    }

    return signInExperienceParser.toLocalForm(data);
  }, [data]);

  useEffect(() => {
    if (defaultFormData) {
      reset(defaultFormData);
    }
  }, [reset, defaultFormData, tab]);

  const saveData = async () => {
    const updatedData = await api
      .patch('/api/sign-in-exp', {
        json: signInExperienceParser.toRemoteModel(getValues()),
      })
      .json<SignInExperienceType>();
    void mutate(updatedData);
    setDataToCompare(undefined);
    await updateSettings({ signInExperienceCustomized: true });
    toast.success(t('general.saved'));
  };

  const onSubmit = handleSubmit(async (formData) => {
    if (!data || isSubmitting) {
      return;
    }

    const formatted = signInExperienceParser.toRemoteModel(formData);

    // Sign-in methods changed, need to show confirm modal first.
    if (!compareSignUpAndSignInConfigs(data, formatted)) {
      setDataToCompare(formatted);

      return;
    }

    await saveData();
  });

  if ((!settings && !settingsError) || (!data && !error) || isLoadingLanguages) {
    return <Skeleton />;
  }

  if (!settings && settingsError) {
    return <div>{settingsError.body?.message ?? settingsError.message}</div>;
  }

  if (languageError) {
    return <div>{languageError.body?.message ?? languageError.message}</div>;
  }

  if (!settings?.signInExperienceCustomized) {
    return (
      <Welcome
        mutate={() => {
          void mutateSettings();
          void mutate();
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.setup, detailsStyles.container)}>
        <Card className={styles.card}>
          <CardTitle title="sign_in_exp.title" subtitle="sign_in_exp.description" />
          <TabNav className={styles.tabs}>
            <TabNavItem href="/sign-in-experience/branding">
              {t('sign_in_exp.tabs.branding')}
            </TabNavItem>
            <TabNavItem href="/sign-in-experience/sign-up-and-sign-in">
              {t('sign_in_exp.tabs.sign_up_and_sign_in')}
            </TabNavItem>
            <TabNavItem href="/sign-in-experience/others">
              {t('sign_in_exp.tabs.others')}
            </TabNavItem>
          </TabNav>
          {!data && error && <div>{`error occurred: ${error.body?.message ?? error.message}`}</div>}
          {data && defaultFormData && (
            <FormProvider {...methods}>
              <form className={styles.formWrapper} onSubmit={onSubmit}>
                <div className={classNames(detailsStyles.body, styles.form)}>
                  {tab === 'branding' && <Branding />}
                  {tab === 'sign-up-and-sign-in' && <SignUpAndSignIn />}
                  {tab === 'others' && <Others />}
                </div>
                <div className={detailsStyles.footer}>
                  <div className={detailsStyles.footerMain}>
                    <Button
                      isLoading={isSubmitting}
                      type="primary"
                      size="large"
                      htmlType="submit"
                      title="general.save_changes"
                    />
                  </div>
                </div>
              </form>
            </FormProvider>
          )}
        </Card>
      </div>
      {formData.id && <Preview signInExperience={previewConfigs} />}
      {data && (
        <ConfirmModal
          isOpen={Boolean(dataToCompare)}
          onCancel={() => {
            setDataToCompare(undefined);
          }}
          onConfirm={async () => {
            await saveData();
          }}
        >
          {dataToCompare && <SignUpAndSignInChangePreview before={data} after={dataToCompare} />}
        </ConfirmModal>
      )}
      <UnsavedChangesAlertModal hasUnsavedChanges={isDirty} />
    </div>
  );
};

export default SignInExperience;
