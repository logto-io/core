import { I18nKey } from '@logto/phrases';
import classNames from 'classnames';
import React, { HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from './index.module.scss';

type Props = Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size' | 'title'> & {
  title: I18nKey;
  type?: 'primary' | 'danger';
  size?: 'small' | 'medium' | 'large';
};

const Button = ({ type = 'primary', size = 'medium', title, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      className={classNames(styles.button, styles[type], styles[size])}
      type="button"
      {...rest}
    >
      {t(title)}
    </button>
  );
};

export default Button;
