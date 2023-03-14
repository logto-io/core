import classNames from 'classnames';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ImageUploader, {
  allowedImageMimeTypes,
  maxImageSizeLimit,
} from '@/components/ImageUploader';
import type { SignInExperienceForm } from '@/pages/SignInExperience/types';
import { convertToFileExtensionArray } from '@/utils/uploader';

import * as styles from './index.module.scss';

const LogoAndFaviconUploader = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [logoError, setLogoError] = useState<string>();
  const [faviconError, setFaviconError] = useState<string>();

  const { control } = useFormContext<SignInExperienceForm>();

  return (
    <div className={styles.container}>
      <div className={styles.uploader}>
        <div className={styles.logoUploader}>
          <Controller
            control={control}
            name="branding.logoUrl"
            render={({ field: { onChange, value, name } }) => (
              <ImageUploader
                isHideStateInfo
                name={name}
                value={value ?? ''}
                actionDescription="App Logo to display in UI interface"
                onChange={onChange}
                onError={setLogoError}
              />
            )}
          />
        </div>
        <div className={styles.faviconUploader}>
          <Controller
            control={control}
            name="branding.favicon"
            render={({ field: { onChange, value, name } }) => (
              <ImageUploader
                isHideStateInfo
                name={name}
                value={value ?? ''}
                actionDescription="Browser Favicon"
                onChange={onChange}
                onError={setFaviconError}
              />
            )}
          />
        </div>
      </div>
      {logoError && (
        <div className={classNames(styles.description, styles.error)}>
          {t('sign_in_exp.branding.logo_image_error', { error: logoError })}
        </div>
      )}
      {faviconError && (
        <div className={classNames(styles.description, styles.error)}>
          {t('sign_in_exp.branding.favicon_error', { error: faviconError })}
        </div>
      )}
      <div className={styles.description}>
        {t('components.uploader.image_limit', {
          size: maxImageSizeLimit / 1024,
          extensions: convertToFileExtensionArray(allowedImageMimeTypes),
        })}
      </div>
    </div>
  );
};

export default LogoAndFaviconUploader;
