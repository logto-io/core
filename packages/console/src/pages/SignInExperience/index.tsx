import type { SignInExperience as SignInExperienceType } from '@logto/schemas';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import CardTitle from '@/components/CardTitle';
import ConfirmModal from '@/components/ConfirmModal';
import SubmitFormChangesActionBar from '@/components/SubmitFormChangesActionBar';
import TabNav, { TabNavItem } from '@/components/TabNav';
import UnsavedChangesAlertModal from '@/components/UnsavedChangesAlertModal';
import { isCloud } from '@/consts/cloud';
import { SignInExperiencePage } from '@/consts/page-tabs';
import type { RequestError } from '@/hooks/use-api';
import useApi from '@/hooks/use-api';
import useConfigs from '@/hooks/use-configs';
import useUiLanguages from '@/hooks/use-ui-languages';

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
import {
  hasSignUpAndSignInConfigChanged,
  getBrandingErrorCount,
  getOthersErrorCount,
  getSignUpAndSignInErrorCount,
  signInExperienceParser,
} from './utils/form';

const SignInExperience = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { tab } = useParams();
  const { data, error, mutate } = useSWR<SignInExperienceType, RequestError>('api/sign-in-exp');
  const isLoadingSignInExperience = !data && !error;

  const {
    configs,
    error: configsError,
    updateConfigs,
    isLoading: isLoadingConfig,
    mutate: mutateConfigs,
  } = useConfigs();

  const shouldDisplayWelcome = !isCloud && !configs?.signInExperienceCustomized;

  const { error: languageError, isLoading: isLoadingLanguages } = useUiLanguages();
  const [dataToCompare, setDataToCompare] = useState<SignInExperienceType>();

  const methods = useForm<SignInExperienceForm>();
  const {
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { isSubmitting, isDirty, errors },
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
  }, [reset, defaultFormData]);

  const saveData = async () => {
    const updatedData = await api
      .patch('api/sign-in-exp', {
        json: signInExperienceParser.toRemoteModel(getValues()),
      })
      .json<SignInExperienceType>();
    void mutate(updatedData);
    setDataToCompare(undefined);
    await updateConfigs({ signInExperienceCustomized: true });
    toast.success(t('general.saved'));
  };

  const onSubmit = handleSubmit(async (formData: SignInExperienceForm) => {
    if (!data || isSubmitting) {
      return;
    }

    const formatted = signInExperienceParser.toRemoteModel(formData);

    // Sign-in methods changed, need to show confirm modal first.
    if (!hasSignUpAndSignInConfigChanged(data, formatted)) {
      setDataToCompare(formatted);

      return;
    }

    await saveData();
  });

  if (isLoadingSignInExperience || isLoadingConfig || isLoadingLanguages) {
    return <Skeleton />;
  }

  if (configsError) {
    return <div>{configsError.body?.message ?? configsError.message}</div>;
  }

  if (languageError) {
    return <div>{languageError.body?.message ?? languageError.message}</div>;
  }

  return (
    <div className={styles.container}>
      <CardTitle
        title="sign_in_exp.title"
        subtitle="sign_in_exp.description"
        className={styles.cardTitle}
      />
      {shouldDisplayWelcome ? (
        <Welcome
          mutate={() => {
            void mutateConfigs();
            void mutate();
          }}
        />
      ) : (
        <>
          <TabNav className={styles.tabs}>
            <TabNavItem
              href={`/sign-in-experience/${SignInExperiencePage.BrandingTab}`}
              errorCount={getBrandingErrorCount(errors)}
            >
              {t('sign_in_exp.tabs.branding')}
            </TabNavItem>
            <TabNavItem
              href={`/sign-in-experience/${SignInExperiencePage.SignUpAndSignInTab}`}
              errorCount={getSignUpAndSignInErrorCount(errors, formData)}
            >
              {t('sign_in_exp.tabs.sign_up_and_sign_in')}
            </TabNavItem>
            <TabNavItem
              href={`/sign-in-experience/${SignInExperiencePage.OthersTab}`}
              errorCount={getOthersErrorCount(errors)}
            >
              {t('sign_in_exp.tabs.others')}
            </TabNavItem>
          </TabNav>
          {!data && error && <div>{`error occurred: ${error.body?.message ?? error.message}`}</div>}
          {data && defaultFormData && (
            <div className={styles.content}>
              <div className={classNames(styles.contentTop, isDirty && styles.withSubmitActionBar)}>
                <FormProvider {...methods}>
                  <form className={styles.form}>
                    <Branding isActive={tab === SignInExperiencePage.BrandingTab} />
                    <SignUpAndSignIn isActive={tab === SignInExperiencePage.SignUpAndSignInTab} />
                    <Others isActive={tab === SignInExperiencePage.OthersTab} />
                  </form>
                </FormProvider>
                {formData.id && (
                  <Preview signInExperience={previewConfigs} className={styles.preview} />
                )}
              </div>
              <SubmitFormChangesActionBar
                isOpen={isDirty}
                isSubmitting={isSubmitting}
                onDiscard={reset}
                onSubmit={onSubmit}
              />
            </div>
          )}
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
              {dataToCompare && (
                <SignUpAndSignInChangePreview before={data} after={dataToCompare} />
              )}
            </ConfirmModal>
          )}
          <UnsavedChangesAlertModal
            hasUnsavedChanges={isDirty}
            parentPath="/console/sign-in-experience"
          />
        </>
      )}
    </div>
  );
};

export default SignInExperience;
