import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { InputHTMLAttributes, ReactNode, useState } from 'react';

import * as styles from './index.module.scss';

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#5D34F2" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.31476 13.858L5.13295 10.441C4.95568 10.253 4.95568 9.947 5.13295 9.757L5.77568 9.074C5.95295 8.886 6.24113 8.886 6.4184 9.074L8.63657 11.466L13.5811 6.141C13.7584 5.953 14.0465 5.953 14.2238 6.141L14.8665 6.825C15.0438 7.013 15.0438 7.32 14.8665 7.507L8.95748 13.858C8.78021 14.046 8.49203 14.046 8.31476 13.858Z"
      fill="white"
    />
  </svg>
);

const CheckDisabled = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#C4C7C7" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.31476 13.858L5.13295 10.441C4.95568 10.253 4.95568 9.947 5.13295 9.757L5.77568 9.074C5.95295 8.886 6.24113 8.886 6.4184 9.074L8.63657 11.466L13.5811 6.141C13.7584 5.953 14.0465 5.953 14.2238 6.141L14.8665 6.825C15.0438 7.013 15.0438 7.32 14.8665 7.507L8.95748 13.858C8.78021 14.046 8.49203 14.046 8.31476 13.858Z"
      fill="white"
    />
  </svg>
);

const Uncheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="16" height="16" rx="3" stroke="#8E9192" strokeWidth="2" />
  </svg>
);

const UncheckDisabled = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      y="2"
      width="16"
      height="16"
      rx="3"
      fill="#EFF1F1"
      stroke="#C4C7C7"
      strokeWidth="2"
    />
  </svg>
);

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode;
};

const Checkbox = ({ label, disabled, ...rest }: Props) => {
  const [id] = useState(nanoid());

  return (
    <div className={styles.checkbox}>
      <input id={id} type="checkbox" disabled={disabled} {...rest} />
      <span className={classNames(styles.icon, styles.check)}>
        <Check />
      </span>
      <span className={classNames(styles.icon, styles.uncheck)}>
        <Uncheck />
      </span>
      <span className={classNames(styles.icon, styles.uncheckDisabled)}>
        <UncheckDisabled />
      </span>
      <span className={classNames(styles.icon, styles.checkDisabled)}>
        <CheckDisabled />
      </span>
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Checkbox;
