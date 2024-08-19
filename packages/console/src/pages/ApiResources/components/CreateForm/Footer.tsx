import { ReservedPlanId } from '@logto/schemas';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import AddOnNoticeFooter from '@/components/AddOnNoticeFooter';
import ContactUsPhraseLink from '@/components/ContactUsPhraseLink';
import PlanName from '@/components/PlanName';
import QuotaGuardFooter from '@/components/QuotaGuardFooter';
import { resourceAddOnUnitPrice } from '@/consts/subscriptions';
import { SubscriptionDataContext } from '@/contexts/SubscriptionDataProvider';
import Button from '@/ds-components/Button';
import TextLink from '@/ds-components/TextLink';
import useApiResourcesUsage from '@/hooks/use-api-resources-usage';
import useUserPreferences from '@/hooks/use-user-preferences';

import styles from './index.module.scss';

type Props = {
  readonly isCreationLoading: boolean;
  readonly onClickCreate: () => void;
};

function Footer({ isCreationLoading, onClickCreate }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    currentPlan,
    currentSubscription: { planId, isAddOnAvailable },
    currentSubscriptionUsage: { resourcesLimit },
    currentSku,
  } = useContext(SubscriptionDataContext);
  const { hasReachedLimit } = useApiResourcesUsage();
  const {
    data: { apiResourceUpsellNoticeAcknowledged },
    update,
  } = useUserPreferences();

  if (
    hasReachedLimit &&
    /**
     * We don't guard API resources quota limit for paid plan, since it's an add-on feature
     */
    currentSku.id === ReservedPlanId.Free
  ) {
    return (
      <QuotaGuardFooter>
        <Trans
          components={{
            a: <ContactUsPhraseLink />,
            planName: <PlanName skuId={currentSku.id} name={currentPlan.name} />,
          }}
        >
          {t('upsell.paywall.resources', {
            count: resourcesLimit,
          })}
        </Trans>
      </QuotaGuardFooter>
    );
  }

  if (
    Boolean(isAddOnAvailable) &&
    hasReachedLimit &&
    planId === ReservedPlanId.Pro &&
    !apiResourceUpsellNoticeAcknowledged
  ) {
    return (
      <AddOnNoticeFooter
        isLoading={isCreationLoading}
        buttonTitle="api_resources.create"
        onClick={() => {
          void update({ apiResourceUpsellNoticeAcknowledged: true });
          onClickCreate();
        }}
      >
        <Trans
          components={{
            span: <span className={styles.strong} />,
            a: <TextLink to="https://blog.logto.io/pricing-add-ons/" />,
          }}
        >
          {t('upsell.add_on.footer.api_resource', {
            price: resourceAddOnUnitPrice,
          })}
        </Trans>
      </AddOnNoticeFooter>
    );
  }

  return (
    <Button
      isLoading={isCreationLoading}
      htmlType="submit"
      title="api_resources.create"
      size="large"
      type="primary"
      onClick={onClickCreate}
    />
  );
}

export default Footer;
