import { Application } from '@logto/schemas';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

import ActionMenu, { ActionMenuItem } from '@/components/ActionMenu';
import BackLink from '@/components/BackLink';
import Button from '@/components/Button';
import Card from '@/components/Card';
import CopyToClipboard from '@/components/CopyToClipboard';
import Drawer from '@/components/Drawer';
import FormField from '@/components/FormField';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useMultiTextInputRhf, MultiTextInput } from '@/components/MultiTextInput';
import TabNav, { TabNavLink } from '@/components/TabNav';
import TextInput from '@/components/TextInput';
import useApi, { RequestError } from '@/hooks/use-api';
import Delete from '@/icons/Delete';
import More from '@/icons/More';
import * as modalStyles from '@/scss/modal.module.scss';
import { applicationTypeI18nKey } from '@/types/applications';
import { noSpaceRegex } from '@/utilities/regex';

import DeleteForm from './components/DeleteForm';
import * as styles from './index.module.scss';

// TODO LOG-1908: OidcConfig in Application Details
type OidcConfig = {
  authorization_endpoint: string;
  userinfo_endpoint: string;
  token_endpoint: string;
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const { data, error, mutate } = useSWR<Application, RequestError>(
    id && `/api/applications/${id}`
  );
  // TODO LOG-1908: OidcConfig in Application Details
  const { data: oidcConfig, error: fetchOidcConfigError } = useSWR<OidcConfig, RequestError>(
    '/oidc/.well-known/openid-configuration'
  );
  const isLoading = !data && !error && !oidcConfig && !fetchOidcConfigError;

  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const api = useApi();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<Application>();

  useEffect(() => {
    if (!data) {
      return;
    }

    reset(data);
  }, [data, reset]);

  const redirectUriMultiTextInput = useMultiTextInputRhf({
    control,
    name: 'oidcClientMetadata.redirectUris',
    rule: {
      required: {
        isRequred: true,
        message: t('application_details.redirect_uri_required'),
      },
      inputs: {
        pattern: noSpaceRegex,
        message: t('application_details.no_space_in_uri'),
      },
    },
  });

  const postSignOutRedirectUriMultiTextInput = useMultiTextInputRhf({
    control,
    name: 'oidcClientMetadata.postLogoutRedirectUris',
    rule: {
      inputs: {
        pattern: noSpaceRegex,
        message: t('application_details.no_space_in_uri'),
      },
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (!data || isSubmitting) {
      return;
    }

    const updatedApplication = await api
      .patch(`/api/applications/${data.id}`, {
        json: {
          ...formData,
          oidcClientMetadata: {
            ...formData.oidcClientMetadata,
            redirectUris: formData.oidcClientMetadata.redirectUris.filter(Boolean),
            postSignOutRedirectUriMultiTextInput:
              formData.oidcClientMetadata.postLogoutRedirectUris.filter(Boolean),
          },
        },
      })
      .json<Application>();
    void mutate(updatedApplication);
    toast.success(t('application_details.save_success'));
  });

  const isAdvancedSettings = location.pathname.includes('advanced-settings');

  const SettingsPage = oidcConfig && (
    <>
      <FormField isRequired title="admin_console.application_details.application_name">
        <TextInput {...register('name', { required: true })} />
      </FormField>
      <FormField title="admin_console.application_details.description">
        <TextInput {...register('description')} />
      </FormField>
      <FormField title="admin_console.application_details.authorization_endpoint">
        <CopyToClipboard className={styles.textField} value={oidcConfig.authorization_endpoint} />
      </FormField>
      <FormField isRequired title="admin_console.application_details.redirect_uri">
        <MultiTextInput {...redirectUriMultiTextInput} />
      </FormField>
      <FormField title="admin_console.application_details.post_sign_out_redirect_uri">
        <MultiTextInput {...postSignOutRedirectUriMultiTextInput} />
      </FormField>
    </>
  );

  const AdvancedSettingsPage = oidcConfig && (
    <>
      <FormField title="admin_console.application_details.token_endpoint">
        <CopyToClipboard className={styles.textField} value={oidcConfig.token_endpoint} />
      </FormField>
      <FormField title="admin_console.application_details.user_info_endpoint">
        <CopyToClipboard className={styles.textField} value={oidcConfig.userinfo_endpoint} />
      </FormField>
    </>
  );

  return (
    <div className={styles.container}>
      <BackLink to="/applications">{t('application_details.back_to_applications')}</BackLink>
      {isLoading && <div>loading</div>}
      {error && <div>{`error occurred: ${error.body.message}`}</div>}
      {data && oidcConfig && (
        <>
          <Card className={styles.header}>
            <ImagePlaceholder size={76} borderRadius={16} />
            <div className={styles.metadata}>
              <div className={styles.name}>{data.name}</div>
              <div className={styles.details}>
                <div className={styles.type}>{t(`${applicationTypeI18nKey[data.type]}.title`)}</div>
                <div className={styles.verticalBar} />
                <div className={styles.text}>App ID</div>
                <CopyToClipboard value={data.id} className={styles.copy} />
              </div>
            </div>
            <div className={styles.operations}>
              <Button
                title="admin_console.application_details.check_help_guide"
                onClick={() => {
                  setIsReadmeOpen(true);
                }}
              />
              <Drawer
                isOpen={isReadmeOpen}
                onClose={() => {
                  setIsReadmeOpen(false);
                }}
              >
                {/* TODO - Implement the content when the documentation website is ready. */}
                <div>TBD</div>
              </Drawer>
              <ActionMenu
                buttonProps={{ icon: <More /> }}
                title={t('application_details.more_options')}
              >
                <ActionMenuItem
                  icon={<Delete />}
                  type="danger"
                  onClick={() => {
                    setIsDeleteFormOpen(true);
                  }}
                >
                  {t('application_details.options_delete')}
                </ActionMenuItem>
              </ActionMenu>
              <Modal
                isOpen={isDeleteFormOpen}
                className={modalStyles.content}
                overlayClassName={modalStyles.overlay}
              >
                <DeleteForm
                  id={data.id}
                  name={data.name}
                  onClose={() => {
                    setIsDeleteFormOpen(false);
                  }}
                />
              </Modal>
            </div>
          </Card>
          <Card className={styles.body}>
            <TabNav>
              <TabNavLink href={`/applications/${data.id}/settings`}>
                {t('application_details.settings')}
              </TabNavLink>
              <TabNavLink href={`/applications/${data.id}/advanced-settings`}>
                {t('application_details.advanced_settings')}
              </TabNavLink>
            </TabNav>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.fields}>
                {isAdvancedSettings ? AdvancedSettingsPage : SettingsPage}
              </div>
              <div className={styles.submit}>
                <Button
                  disabled={isSubmitting}
                  htmlType="submit"
                  type="primary"
                  title="admin_console.application_details.save_changes"
                />
              </div>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default ApplicationDetails;
