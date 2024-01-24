import { ReservedResource } from '@logto/core-kit';
import { type ConsentInfoResponse } from '@logto/schemas';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import DownArrowIcon from '@/assets/icons/arrow-down.svg';
import CheckMark from '@/assets/icons/check-mark.svg';
import IconButton from '@/components/Button/IconButton';
import TermsLinks from '@/components/TermsLinks';
import { onKeyDownHandler } from '@/utils/a11y';

import * as styles from './index.module.scss';

type ScopeGroupProps = {
  groupName: string;
  scopes: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
};

const ScopeGroup = ({ groupName, scopes }: ScopeGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((previous) => !previous);
  }, []);

  return (
    <div className={classNames(styles.scopeGroup)}>
      <div
        className={styles.scopeGroupHeader}
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={onKeyDownHandler({
          Enter: toggle,
        })}
      >
        <CheckMark className={styles.check} />
        <div className={styles.scopeGroupName}>{groupName}</div>
        <IconButton className={styles.toggleButton} data-expanded={expanded}>
          <DownArrowIcon />
        </IconButton>
      </div>
      {expanded && (
        <ul className={styles.scopesList}>
          {scopes.map(({ id, name, description }) => (
            <li key={id} className={styles.scopeItem}>
              {description ?? name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type Props = {
  userScopes: ConsentInfoResponse['missingOIDCScope'];
  resourceScopes: ConsentInfoResponse['missingResourceScopes'];
  appName: string;
  className?: string;
  termsUrl?: string;
  privacyUrl?: string;
};

const ScopesListCard = ({
  userScopes,
  resourceScopes,
  appName,
  termsUrl,
  privacyUrl,
  className,
}: Props) => {
  const { t } = useTranslation();

  // TODO: implement the userScopes description
  const userScopesData = useMemo(
    () =>
      userScopes?.map((scope) => ({
        id: scope,
        name: scope,
      })),
    [userScopes]
  );

  const showTerms = Boolean(termsUrl ?? privacyUrl);

  // If there is no user scopes and resource scopes, we don't need to show the scopes list.
  // This is a fallback for the corner case that all the scopes are already granted.
  if (!userScopesData?.length && !resourceScopes?.length) {
    return showTerms ? (
      <div className={className}>
        <Trans
          components={{
            link: <TermsLinks inline termsOfUseUrl={termsUrl} privacyPolicyUrl={privacyUrl} />,
          }}
        >
          {t('description.authorize_agreement', { name: appName })}
        </Trans>
      </div>
    ) : null;
  }

  return (
    <div className={className}>
      <div className={styles.title}>{t('description.request_permission', { name: appName })}</div>
      <div className={styles.cardWrapper}>
        {userScopesData && userScopesData.length > 0 && (
          <ScopeGroup groupName="User Scopes" scopes={userScopesData} />
        )}
        {resourceScopes?.map(({ resource, scopes }) => (
          <ScopeGroup
            key={resource.id}
            groupName={
              resource.name === ReservedResource.Organization
                ? t('description.organization_scopes')
                : resource.name
            }
            scopes={scopes}
          />
        ))}
        {showTerms && (
          <div className={styles.terms}>
            <Trans
              components={{
                link: <TermsLinks inline termsOfUseUrl={termsUrl} privacyPolicyUrl={privacyUrl} />,
              }}
            >
              {t('description.authorize_agreement', { name: appName })}
            </Trans>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScopesListCard;
