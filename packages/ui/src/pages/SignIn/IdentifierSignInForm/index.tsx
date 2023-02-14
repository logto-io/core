import { SignInIdentifier } from '@logto/schemas';
import type { SignIn } from '@logto/schemas';
import classNames from 'classnames';
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import type { IdentifierInputType } from '@/components/InputFields';
import { SmartInputField } from '@/components/InputFields';
import TermsOfUse from '@/containers/TermsOfUse';
import useTerms from '@/hooks/use-terms';
import { getGeneralIdentifierErrorMessage, validateIdentifierField } from '@/utils/form';

import * as styles from './index.module.scss';
import useOnSubmit from './use-on-submit';

type Props = {
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
  signInMethods: SignIn['methods'];
};

type FormState = {
  identifier: string;
};

const IdentifierSignInForm = ({ className, autoFocus, signInMethods }: Props) => {
  const { t } = useTranslation();
  const { termsValidation } = useTerms();
  const { errorMessage, clearErrorMessage, onSubmit } = useOnSubmit(signInMethods);

  const enabledSignInMethods = useMemo(
    () => signInMethods.map(({ identifier }) => identifier),
    [signInMethods]
  );

  const [inputType, setInputType] = useState<IdentifierInputType>(
    enabledSignInMethods[0] ?? SignInIdentifier.Username
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormState>({
    reValidateMode: 'onChange',
    defaultValues: { identifier: '' },
  });

  const onSubmitHandler = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(async ({ identifier }, event) => {
        event?.preventDefault();

        clearErrorMessage();

        if (!(await termsValidation())) {
          return;
        }

        await onSubmit(inputType, identifier);
      })(event);
    },
    [clearErrorMessage, handleSubmit, inputType, onSubmit, termsValidation]
  );

  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmitHandler}>
      <SmartInputField
        autoComplete="identifier"
        autoFocus={autoFocus}
        className={styles.inputField}
        currentType={inputType}
        isDanger={!!errors.identifier || !!errorMessage}
        errorMessage={errors.identifier?.message}
        enabledTypes={enabledSignInMethods}
        onTypeChange={setInputType}
        {...register('identifier', {
          required: getGeneralIdentifierErrorMessage(enabledSignInMethods, 'required'),
          validate: (value) => {
            const errorMessage = validateIdentifierField(inputType, value);

            return errorMessage
              ? getGeneralIdentifierErrorMessage(enabledSignInMethods, 'invalid')
              : true;
          },
        })}
        /* Overwrite default input onChange handler  */
        onChange={(value) => {
          setValue('identifier', value, { shouldValidate: isSubmitted, shouldDirty: true });
        }}
      />

      {errorMessage && <ErrorMessage className={styles.formErrors}>{errorMessage}</ErrorMessage>}

      <TermsOfUse className={styles.terms} />

      <Button title="action.sign_in" htmlType="submit" />

      <input hidden type="submit" />
    </form>
  );
};

export default IdentifierSignInForm;
