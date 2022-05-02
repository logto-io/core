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

type FieldState = {
  username: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  className?: string;
};

const defaultState: FieldState = {
  username: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = ({ className }: Props) => {
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

  const onSubmitHandler = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    if (!termsValidation()) {
      return;
    }

    void asyncRegister(fieldValue.username, fieldValue.password);
  }, [validateForm, termsValidation, asyncRegister, fieldValue]);

  useEffect(() => {
    if (result?.redirectTo) {
      window.location.assign(result.redirectTo);
    }
  }, [result]);

  return (
    <form className={classNames(styles.form, className)}>
      <Input
        className={styles.inputField}
        name="username"
        autoComplete="username"
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
        autoComplete="current-password"
        placeholder={t('input.password')}
        {...fieldRegister('password', passwordValidation)}
        onClear={() => {
          setFieldValue((state) => ({ ...state, password: '' }));
        }}
      />
      <Input
        className={classNames(styles.inputField, styles.confirmPassword)}
        name="confirm_password"
        type="password"
        autoComplete="current-password"
        placeholder={t('input.confirm_password')}
        {...fieldRegister('confirmPassword', (confirmPassword) =>
          confirmPasswordValidation(fieldValue.password, confirmPassword)
        )}
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
