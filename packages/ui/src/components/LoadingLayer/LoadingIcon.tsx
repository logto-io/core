import classNames from 'classnames';
import React from 'react';

import LoadingSvg from '@/assets/icons/loading-icon.svg';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
};

const LoadingIcon = ({ className }: Props) => (
  <LoadingSvg className={classNames(styles.loadingIcon, className)} />
);

export default LoadingIcon;
