import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { HorizontalAlignment } from '@/hooks/use-position';
import usePosition from '@/hooks/use-position';

import TipBubble from '../TipBubble';
import type { TipBubblePosition } from '../TipBubble';
import {
  getVerticalAlignment,
  getHorizontalAlignment,
  getVerticalOffset,
  getHorizontalOffset,
} from '../TipBubble/utils';
import * as styles from './index.module.scss';

type Props = {
  className?: string;
  isKeepOpen?: boolean;
  position?: TipBubblePosition;
  horizontalAlign?: HorizontalAlignment;
  anchorClassName?: string;
  children?: ReactNode;
  content?: ReactNode;
};

const Tooltip = ({
  className,
  isKeepOpen = false,
  position = 'top',
  horizontalAlign = 'center',
  anchorClassName,
  children,
  content,
}: Props) => {
  const [tooltipDom, setTooltipDom] = useState<HTMLDivElement>();
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    position: layoutPosition,
    positionState,
    mutate,
  } = usePosition({
    verticalAlign: getVerticalAlignment(position),
    horizontalAlign: getHorizontalAlignment(position, horizontalAlign),
    offset: {
      vertical: getVerticalOffset(position),
      horizontal: getHorizontalOffset(position, horizontalAlign),
    },
    anchorRef,
    overlayRef: tooltipRef,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const mutateAnimationFrame = requestAnimationFrame(() => {
      mutate();
    });

    return () => {
      cancelAnimationFrame(mutateAnimationFrame);
    };
  }, [isVisible, mutate]);

  useEffect(() => {
    if (!anchorRef.current) {
      return;
    }

    if (isKeepOpen) {
      setIsVisible(true);

      return;
    }

    const dom = anchorRef.current;

    const enterHandler = () => {
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const leaveHandler = () => {
      setIsVisible(false);
    };

    dom.addEventListener('mouseenter', enterHandler);
    dom.addEventListener('mouseleave', leaveHandler);

    return () => {
      dom.removeEventListener('mouseenter', enterHandler);
      dom.removeEventListener('mouseleave', leaveHandler);
    };
  }, [anchorRef, isVisible, isKeepOpen]);

  useEffect(() => {
    if (!isVisible) {
      if (tooltipDom) {
        tooltipDom.remove();
        setTooltipDom(undefined);
      }

      return;
    }

    if (!tooltipDom) {
      const dom = document.createElement('div');
      document.body.append(dom);
      setTooltipDom(dom);
    }

    return () => tooltipDom?.remove();
  }, [isVisible, tooltipDom]);

  useLayoutEffect(() => {
    mutate();
  }, [mutate, content]);

  return (
    <>
      <div ref={anchorRef} className={anchorClassName}>
        {children}
      </div>
      {tooltipDom &&
        content &&
        createPortal(
          <div className={styles.tooltip}>
            <TipBubble
              ref={tooltipRef}
              className={className}
              style={{ ...(!layoutPosition && { opacity: 0 }), ...layoutPosition }}
              position={position}
              horizontalAlignment={positionState.horizontalAlign}
            >
              <div className={styles.content}>{content}</div>
            </TipBubble>
          </div>,
          tooltipDom
        )}
    </>
  );
};

export default Tooltip;
