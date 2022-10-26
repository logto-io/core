import type { ConnectorMetadata } from '@logto/schemas';
import classNames from 'classnames';

import MoreSocialIcon from '@/assets/icons/more-social-icon.svg';
import IconButton from '@/components/Button/IconButton';
import SocialIconButton from '@/components/Button/SocialIconButton';
import useSocial from '@/hooks/use-social';
import { getLogoUrl } from '@/utils/logo';
import { isAppleConnector } from '@/utils/social-connectors';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
  connectors?: ConnectorMetadata[];
  hasMore?: boolean;
  moreButtonRef: React.RefObject<HTMLButtonElement>;
  onMoreButtonClick?: () => void;
};

const SocialSignInIconList = ({
  className,
  connectors = [],
  hasMore = false,
  moreButtonRef,
  onMoreButtonClick,
}: Props) => {
  const { invokeSocialSignIn, theme } = useSocial();

  return (
    <div className={classNames(styles.socialIconList, className)}>
      {connectors.map((connector) => {
        const { id, target, logo: logoUrl, logoDark: darkLogoUrl } = connector;

        return (
          <SocialIconButton
            key={id}
            className={styles.socialButton}
            logo={getLogoUrl({ theme, logoUrl, darkLogoUrl, isApple: isAppleConnector(target) })}
            target={target}
            onClick={() => {
              void invokeSocialSignIn(connector);
            }}
          />
        );
      })}
      {hasMore && (
        <IconButton ref={moreButtonRef} className={styles.moreButton} onClick={onMoreButtonClick}>
          <MoreSocialIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SocialSignInIconList;
