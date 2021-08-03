import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

export type Props = {
  name: string;
  autoComplete?: AutoCompleteType;
  autoCapitalize?: string;
  isDisabled?: boolean;
  className?: string;
  placeholder?: string;
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({
  name,
  autoComplete,
  autoCapitalize = 'off',
  isDisabled,
  className,
  placeholder,
  type = 'text',
  value,
  onChange,
}: Props) => {
  return (
    <input
      name={name}
      disabled={isDisabled}
      className={classNames(styles.input, className)}
      placeholder={placeholder}
      type={type}
      value={value}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
    />
  );
};

export default Input;
