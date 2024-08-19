import { type ConnectorFactoryResponse } from '@logto/schemas';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ContactUsPhraseLink from '@/components/ContactUsPhraseLink';
import PlanName from '@/components/PlanName';
import QuotaGuardFooter from '@/components/QuotaGuardFooter';
import { SubscriptionDataContext } from '@/contexts/SubscriptionDataProvider';
import Button from '@/ds-components/Button';
import { type ConnectorGroup } from '@/types/connector';
import { hasReachedSubscriptionQuotaLimit } from '@/utils/quota';

type Props = {
  readonly isCreatingSocialConnector: boolean;
  readonly selectedConnectorGroup?: ConnectorGroup<ConnectorFactoryResponse>;
  readonly isCreateButtonDisabled: boolean;
  readonly onClickCreateButton: () => void;
};

function Footer({
  isCreatingSocialConnector,
  selectedConnectorGroup,
  isCreateButtonDisabled,
  onClickCreateButton,
}: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console.upsell.paywall' });
  const { currentPlan, currentSku, currentSubscriptionUsage, currentSubscriptionQuota } =
    useContext(SubscriptionDataContext);

  const isSocialConnectorsReachLimit = hasReachedSubscriptionQuotaLimit({
    quotaKey: 'socialConnectorsLimit',
    usage: currentSubscriptionUsage.socialConnectorsLimit,
    quota: currentSubscriptionQuota,
  });

  if (isCreatingSocialConnector && selectedConnectorGroup) {
    const { name: planName } = currentPlan;

    if (isSocialConnectorsReachLimit && !selectedConnectorGroup.isStandard) {
      return (
        <QuotaGuardFooter>
          <Trans
            components={{
              a: <ContactUsPhraseLink />,
              planName: <PlanName skuId={currentSku.id} name={planName} />,
            }}
          >
            {t('social_connectors', {
              count: currentSubscriptionQuota.socialConnectorsLimit ?? 0,
            })}
          </Trans>
        </QuotaGuardFooter>
      );
    }
  }

  return (
    <Button
      title="general.next"
      type="primary"
      disabled={isCreateButtonDisabled}
      onClick={onClickCreateButton}
    />
  );
}

export default Footer;
