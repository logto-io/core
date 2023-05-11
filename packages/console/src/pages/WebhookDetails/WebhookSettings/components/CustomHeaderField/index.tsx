import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CirclePlus from '@/assets/images/circle-plus.svg';
import Minus from '@/assets/images/minus.svg';
import Button from '@/components/Button';
import FormField from '@/components/FormField';
import IconButton from '@/components/IconButton';
import TextInput from '@/components/TextInput';
import { type WebhookDetailsFormType } from '@/pages/WebhookDetails/types';

import * as styles from './index.module.scss';

function CustomHeaderField() {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    control,
    register,
    getValues,
    trigger,
    formState: {
      errors: { headers: headerErrors },
      submitCount,
    },
  } = useFormContext<WebhookDetailsFormType>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'headers',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ key: '', value: '' }, { shouldFocus: false });
    }
  }, [append, fields]);

  const keyValidator = (value: string) => {
    const headers = getValues('headers');
    if (!headers) {
      return true;
    }

    const isKeyExist = headers.filter(({ key }) => key === value).length > 1;

    if (isKeyExist) {
      return 'Key cannot be repeated.';
    }

    return true;
  };

  const revalidate = () => {
    for (const [index, _] of fields.entries()) {
      void trigger(`headers.${index}.key`);
      if (submitCount > 0) {
        void trigger(`headers.${index}.value`);
      }
    }
  };

  return (
    <FormField
      title="webhook_details.settings.custom_headers"
      tip={t('webhook_details.settings.custom_headers_tip')}
    >
      {fields.map((header, index) => {
        return (
          <div key={header.id} className={styles.field}>
            <div className={styles.input}>
              <TextInput
                className={styles.keyInput}
                placeholder="Key"
                error={Boolean(headerErrors?.[index]?.key)}
                {...register(`headers.${index}.key`, {
                  validate: keyValidator,
                  onChange: revalidate,
                })}
              />
              <TextInput
                className={styles.valueInput}
                placeholder="Value"
                error={Boolean(headerErrors?.[index]?.value)}
                {...register(`headers.${index}.value`, {
                  validate: (value) => {
                    if (getValues(`headers.${index}.key`)) {
                      if (value) {
                        return true;
                      }
                      return 'Value is required.';
                    }
                    return true;
                  },
                })}
              />
              {fields.length > 1 && (
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Minus />
                </IconButton>
              )}
            </div>
            {headerErrors?.[index]?.key?.message && (
              <div className={styles.error}>{headerErrors[index]?.key?.message}</div>
            )}
            {headerErrors?.[index]?.value?.message && (
              <div className={styles.error}>{headerErrors[index]?.value?.message}</div>
            )}
          </div>
        );
      })}
      <Button
        size="small"
        type="text"
        title="general.add_another"
        icon={<CirclePlus />}
        onClick={() => {
          append({ key: '', value: '' });
        }}
      />
    </FormField>
  );
}

export default CustomHeaderField;
