import classNames from 'classnames';
import { useState, useMemo } from 'react';

import ExpandIcon from '@/assets/icons/expand-icon.svg';
import IconButton from '@/components/Button/IconButton';
import SocialLinkButton from '@/components/Button/SocialLinkButton';
import useSocial from '@/hooks/use-social';
import { ConnectorData } from '@/types';

import * as styles from './index.module.scss';

export const defaultSize = 4;

type Props = {
  className?: string;
  socialConnectors?: ConnectorData[];
  isCollapseEnabled?: boolean;
  onSocialSignInCallback?: () => void;
};

const SocialSignInList = ({
  className,
  socialConnectors = [],
  isCollapseEnabled = true,
  onSocialSignInCallback,
}: Props) => {
  const [expand, setExpand] = useState(false);
  const { invokeSocialSignIn, theme } = useSocial();
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
      {displayConnectors.map((connector) => {
        const { id, name, logo, logoDark, target } = connector;

        return (
          <SocialLinkButton
            key={id}
            className={styles.socialLinkButton}
            name={name}
            logo={(theme === 'dark' && logoDark) || logo}
            target={target}
            onClick={() => {
              void invokeSocialSignIn(connector);
              onSocialSignInCallback?.();
            }}
          />
        );
      })}
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
