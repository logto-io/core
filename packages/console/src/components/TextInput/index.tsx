import classNames from 'classnames';
import React, { forwardRef, HTMLProps, ReactNode, ForwardedRef } from 'react';

import * as styles from './index.module.scss';

type Props = HTMLProps<HTMLInputElement> & {
  hasError?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
};

const TextInput = (
  { hasError = false, errorMessage, icon, disabled, className, readOnly, ...rest }: Props,
  reference: ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      <div
        className={classNames(
          styles.container,
          hasError && styles.error,
          icon && styles.withIcon,
          disabled && styles.disabled,
          readOnly && styles.readOnly,
          className
        )}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <input type="text" {...rest} ref={reference} disabled={disabled} readOnly={readOnly} />
      </div>
      {hasError && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </>
  );
};

export default forwardRef(TextInput);
