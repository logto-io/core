import classNames from 'classnames';
import { ReactNode, useState, useCallback } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';

import ArrowRight from '@/assets/images/triangle-right.svg';
import { onKeyDownHandler } from '@/utilities/a11y';

import * as styles from './index.module.scss';

type Props = {
  children?: ReactNode[] | ReactNode;
};

const DetailsSummary = ({ children }: Props) => {
  const [summary, details] = Array.isArray(children) ? children : [children];
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<Height>(0);

  const onClickHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    setHeight(height === 0 ? 'auto' : 0);
  }, [height, isExpanded]);

  return (
    <div className={classNames(styles.container, isExpanded && styles.expanded)}>
      <div
        role="button"
        tabIndex={0}
        className={styles.summary}
        onKeyDown={onKeyDownHandler({
          Esc: () => {
            setIsExpanded(false);
            setHeight(0);
          },
          Enter: onClickHandler,
          ' ': onClickHandler,
        })}
        onClick={onClickHandler}
      >
        <ArrowRight className={styles.arrow} />
        {summary}
      </div>
      <AnimateHeight animateOpacity duration={300} height={height}>
        <div className={styles.details}>{details}</div>
      </AnimateHeight>
    </div>
  );
};

export default DetailsSummary;
