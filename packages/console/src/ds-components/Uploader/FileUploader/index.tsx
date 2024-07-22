import type { AllowedUploadMimeType, UserAssets } from '@logto/schemas';
import { maxUploadFileSize } from '@logto/schemas';
import classNames from 'classnames';
import { type KyInstance } from 'ky';
import { useCallback, useEffect, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import UploaderIcon from '@/assets/icons/upload.svg';
import useApi from '@/hooks/use-api';
import { convertToFileExtensionArray, formatBytes } from '@/utils/uploader';

import { Ring } from '../../Spinner';

import * as styles from './index.module.scss';

export type Props<T extends Record<string, unknown> = UserAssets> = {
  readonly maxSize: number; // In bytes
  readonly allowedMimeTypes: AllowedUploadMimeType[];
  readonly actionDescription?: string;
  readonly onCompleted: (response: T) => void;
  readonly onUploadErrorChange: (errorMessage?: string, files?: File[]) => void;
  readonly className?: string;
  /**
   * Specify which API instance to use for the upload request. For example, you can use admin tenant API instead.
   * Defaults to the return value of `useApi()`.
   */
  readonly apiInstance?: KyInstance;
  /**
   * Specify the URL to upload the file to. Defaults to `api/user-assets`.
   */
  readonly uploadUrl?: string;
};

function FileUploader<T extends Record<string, unknown> = UserAssets>({
  maxSize,
  allowedMimeTypes,
  actionDescription,
  onCompleted,
  onUploadErrorChange,
  className,
  apiInstance,
  uploadUrl = 'api/user-assets',
}: Props<T>) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();

  useEffect(() => {
    onUploadErrorChange(uploadError);

    return () => {
      onUploadErrorChange(undefined);
    };
  }, [onUploadErrorChange, uploadError]);

  const api = useApi();

  const onDrop = useCallback(
    async (acceptedFiles: File[] = [], fileRejection: FileRejection[] = []) => {
      setUploadError(undefined);

      // Do not support uploading multiple files
      if (acceptedFiles.length + fileRejection.length > 1) {
        setUploadError(t('components.uploader.error_file_count'));

        return;
      }

      const rejectedFile = fileRejection[0]?.file;

      if (rejectedFile) {
        /**
         * Note:
         * We need to display this invalid file type error, since the user can select an invalid file type by modifying the file input dialog settings.
         */
        if (!allowedMimeTypes.map(String).includes(rejectedFile.type)) {
          setUploadError(
            t('components.uploader.error_file_type', {
              extensions: convertToFileExtensionArray(allowedMimeTypes),
            })
          );
        }

        return;
      }

      const acceptedFile = acceptedFiles[0];

      if (!acceptedFile) {
        return;
      }

      const fileSizeLimit = Math.min(maxSize, maxUploadFileSize);

      if (acceptedFile.size > fileSizeLimit) {
        setUploadError(
          t('components.uploader.error_file_size', { limitWithUnit: formatBytes(fileSizeLimit) })
        );

        return;
      }

      const formData = new FormData();
      formData.append('file', acceptedFile);

      try {
        setIsUploading(true);
        const uploadApi = apiInstance ?? api;
        const response = await uploadApi.post(uploadUrl, { body: formData }).json<T>();

        onCompleted(response);
      } catch {
        setUploadError(t('components.uploader.error_upload'));
      } finally {
        setIsUploading(false);
      }
    },
    [api, apiInstance, allowedMimeTypes, maxSize, onCompleted, t, uploadUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
    multiple: false,
    accept: Object.fromEntries(allowedMimeTypes.map((mimeType) => [mimeType, []])),
  });

  return (
    <div
      {...getRootProps()}
      className={classNames(
        styles.uploader,
        Boolean(uploadError) && styles.uploaderError,
        isDragActive && styles.dragActive,
        className
      )}
    >
      <input {...getInputProps()} />
      <div className={styles.placeholder}>
        {isUploading ? (
          <>
            <Ring className={styles.uploadingIcon} />
            <div className={styles.actionDescription}>{t('components.uploader.uploading')}</div>
          </>
        ) : (
          <>
            <UploaderIcon className={styles.icon} />
            <div className={styles.actionDescription}>
              {actionDescription ?? t('components.uploader.action_description')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
