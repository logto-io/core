import type { FormEvent } from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';

import type { ErrorType } from '@/components/ErrorMessage';
import type { Entries } from '@/utils';
import { entries, fromEntries } from '@/utils';

const useForm = <T extends Record<string, unknown>>(initialState: T) => {
  type ErrorState = {
    [key in keyof T]?: ErrorType;
  };

  type FieldValidations = {
    [key in keyof T]?: (value: T[key]) => ErrorType | undefined;
  };

  const [fieldValue, setFieldValue] = useState<T>(initialState);
  const [fieldErrors, setFieldErrors] = useState<ErrorState>({});

  const fieldValidationsRef = useRef<FieldValidations>({});

  const validateForm = useCallback(() => {
    const errors: Entries<ErrorState> = entries(fieldValue).map(([key, value]) => [
      key,
      fieldValidationsRef.current[key]?.(value),
    ]);

    setFieldErrors(fromEntries(errors));

    return errors.every(([, error]) => error === undefined);
  }, [fieldValidationsRef, fieldValue]);

  const register = useCallback(
    <K extends keyof T>(field: K, validation: (value: T[K]) => ErrorType | undefined) => {
      // eslint-disable-next-line @silverhand/fp/no-mutation
      fieldValidationsRef.current[field] = validation;

      return {
        value: fieldValue[field],
        error: fieldErrors[field],
        onChange: ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
          setFieldValue((previous) => ({ ...previous, [field]: value }));
        },
      };
    },
    [fieldErrors, fieldValue]
  );

  // Revalidate on Input change
  useEffect(() => {
    setFieldErrors((previous) => {
      const errors: Entries<ErrorState> = entries(fieldValue).map(([key, value]) => [
        key,
        // Only validate field with existing errors
        previous[key] && fieldValidationsRef.current[key]?.(value),
      ]);

      return fromEntries(errors);
    });
  }, [fieldValue, fieldValidationsRef]);

  return {
    fieldValue,
    fieldErrors,
    validateForm,
    setFieldValue,
    setFieldErrors,
    register,
  };
};

export default useForm;
