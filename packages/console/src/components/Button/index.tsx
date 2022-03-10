import { I18nKey } from '@logto/phrases';
import classNames from 'classnames';
import React, { HTMLProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from './index.module.scss';

type Props = Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size' | 'icon' | 'title'> & {
  htmlType?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  title?: I18nKey;
  type?: 'primary' | 'danger' | 'default';
  size?: 'small' | 'medium' | 'large';
};

const Button = ({
  htmlType = 'button',
  type = 'default',
  size = 'medium',
  icon,
  title,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  return (
    <button
      className={classNames(styles.button, styles[type], styles[size])}
      type={htmlType}
      {...rest}
    >
      {icon && icon}
      {title && t(title)}
    </button>
  );
};

export default Button;
