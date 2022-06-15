import classNames from 'classnames';
import React, { useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { register } from '@/apis/register';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TermsOfUse from '@/containers/TermsOfUse';
import useApi, { ErrorHandlers } from '@/hooks/use-api';
import useForm from '@/hooks/use-form';
import useTerms from '@/hooks/use-terms';
import {
  usernameValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/utils/field-validations';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
};

type FieldState = {
  username: string;
  password: string;
  confirmPassword: string;
};

const defaultState: FieldState = {
  username: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = ({ className, autoFocus }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'main_flow' });
  const { termsValidation } = useTerms();
  const {
    fieldValue,
    setFieldValue,
    setFieldErrors,
    register: fieldRegister,
    validateForm,
  } = useForm(defaultState);

  const registerErrorHandlers: ErrorHandlers = useMemo(
    () => ({
      'user.username_exists_register': () => {
        setFieldErrors((state) => ({
          ...state,
          username: 'username_exists',
        }));
      },
    }),
    [setFieldErrors]
  );

  const { result, run: asyncRegister } = useApi(register, registerErrorHandlers);

  const onSubmitHandler = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    if (!(await termsValidation())) {
      return;
    }

    void asyncRegister(fieldValue.username, fieldValue.password);
  }, [validateForm, termsValidation, asyncRegister, fieldValue]);

  useEffect(() => {
    if (result?.redirectTo) {
      window.location.replace(result.redirectTo);
    }
  }, [result]);

  return (
    <form className={classNames(styles.form, className)}>
      <Input
        autoFocus={autoFocus}
        className={styles.inputField}
        name="username"
        placeholder={t('input.username')}
        {...fieldRegister('username', usernameValidation)}
        onClear={() => {
          setFieldValue((state) => ({ ...state, username: '' }));
        }}
      />
      <Input
        className={styles.inputField}
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder={t('input.password')}
        {...fieldRegister('password', passwordValidation)}
        onClear={() => {
          setFieldValue((state) => ({ ...state, password: '' }));
        }}
      />
      <Input
        className={styles.inputField}
        name="confirm_password"
        type="password"
        autoComplete="new-password"
        placeholder={t('input.confirm_password')}
        {...fieldRegister('confirmPassword', (confirmPassword) =>
          confirmPasswordValidation(fieldValue.password, confirmPassword)
        )}
        errorStyling={false}
        onClear={() => {
          setFieldValue((state) => ({ ...state, confirmPassword: '' }));
        }}
      />
      <TermsOfUse className={styles.terms} />

      <Button onClick={onSubmitHandler}>{t('action.create')}</Button>
    </form>
  );
};

export default CreateAccount;
