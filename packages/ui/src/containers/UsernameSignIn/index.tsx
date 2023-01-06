import { SignInIdentifier } from '@logto/schemas';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import ForgotPasswordLink from '@/components/ForgotPasswordLink';
import Input, { PasswordInput } from '@/components/Input';
import TermsOfUse from '@/containers/TermsOfUse';
import useForm from '@/hooks/use-form';
import usePasswordSignIn from '@/hooks/use-password-sign-in';
import { useForgotPasswordSettings } from '@/hooks/use-sie';
import useTerms from '@/hooks/use-terms';
import { requiredValidation } from '@/utils/field-validations';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
};

type FieldState = {
  username: string;
  password: string;
};

const defaultState: FieldState = {
  username: '',
  password: '',
};

const UsernameSignIn = ({ className, autoFocus }: Props) => {
  const { t } = useTranslation();
  const { termsValidation } = useTerms();
  const { isForgotPasswordEnabled, email } = useForgotPasswordSettings();
  const { errorMessage, clearErrorMessage, onSubmit } = usePasswordSignIn();

  const { fieldValue, setFieldValue, register, validateForm } = useForm(defaultState);

  const onSubmitHandler = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      clearErrorMessage();

      if (!validateForm()) {
        return;
      }

      if (!(await termsValidation())) {
        return;
      }

      void onSubmit(fieldValue);
    },
    [clearErrorMessage, validateForm, termsValidation, onSubmit, fieldValue]
  );

  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmitHandler}>
      <Input
        autoFocus={autoFocus}
        className={styles.inputField}
        name="username"
        autoComplete="username"
        placeholder={t('input.username')}
        {...register('username', (value) => requiredValidation('username', value))}
        onClear={() => {
          setFieldValue((state) => ({ ...state, username: '' }));
        }}
      />
      <PasswordInput
        className={styles.inputField}
        name="password"
        autoComplete="current-password"
        placeholder={t('input.password')}
        {...register('password', (value) => requiredValidation('password', value))}
      />
      {errorMessage && <ErrorMessage className={styles.formErrors}>{errorMessage}</ErrorMessage>}

      {isForgotPasswordEnabled && (
        <ForgotPasswordLink
          className={styles.link}
          method={email ? SignInIdentifier.Email : SignInIdentifier.Phone}
        />
      )}

      <TermsOfUse className={styles.terms} />

      <Button title="action.sign_in" onClick={async () => onSubmitHandler()} />

      <input hidden type="submit" />
    </form>
  );
};

export default UsernameSignIn;
