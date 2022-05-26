import classNames from 'classnames';
import React, { useState, useMemo } from 'react';

import ExpandIcon from '@/assets/icons/expand-icon.svg';
import IconButton from '@/components/Button/IconButton';
import SocialLinkButton from '@/components/Button/SocialLinkButton';
import useSocial from '@/hooks/use-social';

import * as styles from './index.module.scss';

export const defaultSize = 4;

type Props = {
  className?: string;
  isCollapseEnabled?: boolean;
  onSocialSignInCallback?: () => void;
};

const SocialSignInList = ({
  className,
  isCollapseEnabled = true,
  onSocialSignInCallback,
}: Props) => {
  const [expand, setExpand] = useState(false);
  const { invokeSocialSignIn, socialConnectors } = useSocial();
  const isOverSize = socialConnectors.length > defaultSize;
  const displayAll = !isOverSize || !isCollapseEnabled;

  const displayConnectors = useMemo(() => {
    if (displayAll || expand) {
      return socialConnectors;
    }

    return socialConnectors.slice(0, defaultSize);
  }, [displayAll, expand, socialConnectors]);

  return (
    <div className={classNames(styles.socialLinkList, className)}>
      {displayConnectors.map((connector) => (
        <SocialLinkButton
          key={connector.id}
          className={styles.socialLinkButton}
          connector={connector}
          onClick={() => {
            void invokeSocialSignIn(connector.id, onSocialSignInCallback);
          }}
        />
      ))}
      {!displayAll && (
        <IconButton
          className={classNames(styles.expandIcon, expand && styles.expanded)}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <ExpandIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SocialSignInList;
