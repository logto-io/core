import classNames from 'classnames';
import { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getSendPasscodeApi } from '@/apis/utils';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TermsOfUse from '@/containers/TermsOfUse';
import useApi, { ErrorHandlers } from '@/hooks/use-api';
import useForm from '@/hooks/use-form';
import { PageContext } from '@/hooks/use-page-context';
import useTerms from '@/hooks/use-terms';
import { UserFlow, SearchParameters } from '@/types';
import { getSearchParameters } from '@/utils';
import { emailValidation } from '@/utils/field-validations';

import PasswordlessConfirmModal from './PasswordlessConfirmModal';
import * as styles from './index.module.scss';

type Props = {
  type: UserFlow;
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
};

type FieldState = {
  email: string;
};

const defaultState: FieldState = { email: '' };

const EmailPasswordless = ({ type, autoFocus, className }: Props) => {
  const { setToast } = useContext(PageContext);
  const [showPasswordlessConfirmModal, setShowPasswordlessConfirmModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { termsValidation } = useTerms();
  const { fieldValue, setFieldValue, setFieldErrors, register, validateForm } =
    useForm(defaultState);

  const errorHandlers: ErrorHandlers = useMemo(
    () => ({
      'user.email_not_exists': (error) => {
        const socialToBind = getSearchParameters(location.search, SearchParameters.bindWithSocial);

        // Directly display the  error if user is trying to bind with social
        if (socialToBind) {
          setToast(error.message);

          return;
        }

        setShowPasswordlessConfirmModal(true);
      },
      'user.email_exists_register': () => {
        setShowPasswordlessConfirmModal(true);
      },
      'guard.invalid_input': () => {
        setFieldErrors({ email: 'invalid_email' });
      },
    }),
    [setFieldErrors, setToast]
  );

  const sendPasscode = getSendPasscodeApi(type, 'email');
  const { result, run: asyncSendPasscode } = useApi(sendPasscode, errorHandlers);

  const onSubmitHandler = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (!(await termsValidation())) {
        return;
      }

      void asyncSendPasscode(fieldValue.email);
    },
    [validateForm, termsValidation, asyncSendPasscode, fieldValue.email]
  );

  const onModalCloseHandler = useCallback(() => {
    setShowPasswordlessConfirmModal(false);
  }, []);

  useEffect(() => {
    if (result) {
      navigate(
        {
          pathname: `/${type}/email/passcode-validation`,
          search: location.search,
        },
        { state: { email: fieldValue.email } }
      );
    }
  }, [fieldValue.email, navigate, result, type]);

  return (
    <>
      <form className={classNames(styles.form, className)} onSubmit={onSubmitHandler}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t('input.email')}
          autoFocus={autoFocus}
          className={styles.inputField}
          {...register('email', emailValidation)}
          onClear={() => {
            setFieldValue((state) => ({ ...state, email: '' }));
          }}
        />

        <TermsOfUse className={styles.terms} />

        <Button onClick={async () => onSubmitHandler()}>{t('action.continue')}</Button>
      </form>
      <PasswordlessConfirmModal
        isOpen={showPasswordlessConfirmModal}
        type={type === 'sign-in' ? 'register' : 'sign-in'}
        method="email"
        value={fieldValue.email}
        onClose={onModalCloseHandler}
      />
    </>
  );
};

export default EmailPasswordless;
