import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Congrats from '@/assets/images/congrats.svg';
import ActionBar from '@/cloud/components/ActionBar';
import { CardSelector } from '@/cloud/components/CardSelector';
import * as pageLayout from '@/cloud/scss/layout.module.scss';
import Button from '@/components/Button';
import FormField from '@/components/FormField';
import OverlayScrollbar from '@/components/OverlayScrollbar';

import type { Questionnaire } from '../../types';
import { CloudPage } from '../../types';
import { getCloudPagePathname } from '../../utils';
import * as styles from './index.module.scss';
import { deploymentTypeOptions, projectOptions } from './options';

const Welcome = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<Questionnaire>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (formData) => {
    // TODO @xiaoyijun send data to the backend
    console.log(formData);
  });

  const onNext = async () => {
    await onSubmit();
    navigate(getCloudPagePathname(CloudPage.AboutUser));
  };

  return (
    <div className={pageLayout.page}>
      <OverlayScrollbar className={pageLayout.contentContainer}>
        <div className={classNames(pageLayout.content, styles.content)}>
          <Congrats className={styles.congrats} />
          <div className={styles.title}>{t('cloud.welcome.title')}</div>
          <div className={styles.description}>{t('cloud.welcome.description')}</div>
          <form className={styles.form}>
            <FormField
              title="cloud.welcome.project_field"
              headlineClassName={styles.cardFieldHeadline}
            >
              <Controller
                control={control}
                name="project"
                rules={{ required: true }}
                render={({ field: { onChange, value, name } }) => (
                  <CardSelector
                    name={name}
                    value={value}
                    options={projectOptions}
                    onChange={onChange}
                  />
                )}
              />
            </FormField>
            <FormField
              title="cloud.welcome.deployment_type_field"
              headlineClassName={styles.cardFieldHeadline}
            >
              <Controller
                control={control}
                name="deploymentType"
                rules={{ required: true }}
                render={({ field: { onChange, value, name } }) => (
                  <CardSelector
                    name={name}
                    value={value}
                    options={deploymentTypeOptions}
                    onChange={onChange}
                  />
                )}
              />
            </FormField>
          </form>
        </div>
      </OverlayScrollbar>
      <ActionBar step={1}>
        <Button
          title="general.next"
          type="primary"
          disabled={isSubmitting || !isValid}
          onClick={onNext}
        />
      </ActionBar>
    </div>
  );
};

export default Welcome;
