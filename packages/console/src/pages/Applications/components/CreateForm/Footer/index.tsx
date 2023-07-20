import { type Application, ApplicationType } from '@logto/schemas';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useSWR from 'swr';

import ContactUsPhraseLink from '@/components/ContactUsPhraseLink';
import PlanName from '@/components/PlanName';
import QuotaGuardFooter from '@/components/QuotaGuardFooter';
import { isProduction } from '@/consts/env';
import { ReservedPlanId } from '@/consts/subscriptions';
import Button from '@/ds-components/Button';
import useCurrentSubscriptionPlan from '@/hooks/use-current-subscription-plan';
import { isOverQuota } from '@/utils/quota';

type Props = {
  selectedType?: ApplicationType;
  isLoading: boolean;
  onClickCreate: () => void;
};

function Footer({ selectedType, isLoading, onClickCreate }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console.upsell.paywall' });
  const { data: currentPlan } = useCurrentSubscriptionPlan();
  /**
   * Todo: @xiaoyijun remove this condition on subscription features ready.
   */
  const { data: allApplications } = useSWR<Application[]>(!isProduction && 'api/applications');

  const m2mAppCount = useMemo(
    () =>
      allApplications?.filter(({ type }) => type === ApplicationType.MachineToMachine).length ?? 0,
    [allApplications]
  );

  const nonM2mApplicationCount = allApplications ? allApplications.length - m2mAppCount : 0;
  console.log(nonM2mApplicationCount);

  const isM2mAppsOverQuota = isOverQuota({
    quotaKey: 'machineToMachineLimit',
    plan: currentPlan,
    usage: m2mAppCount,
  });

  const isNonM2mAppsOverQuota = isOverQuota({
    quotaKey: 'applicationsLimit',
    plan: currentPlan,
    usage: nonM2mApplicationCount,
  });

  if (currentPlan && selectedType) {
    const { id: planId, name: planName, quota } = currentPlan;

    if (selectedType === ApplicationType.MachineToMachine && isM2mAppsOverQuota) {
      return (
        <QuotaGuardFooter>
          {quota.machineToMachineLimit === 0 && planId === ReservedPlanId.free ? (
            <Trans
              components={{
                a: <ContactUsPhraseLink />,
              }}
            >
              {t('machine_to_machine_feature')}
            </Trans>
          ) : (
            <Trans
              components={{
                a: <ContactUsPhraseLink />,
                planName: <PlanName name={planName} />,
              }}
            >
              {t('machine_to_machine', { count: quota.machineToMachineLimit })}
            </Trans>
          )}
        </QuotaGuardFooter>
      );
    }

    if (selectedType !== ApplicationType.MachineToMachine && isNonM2mAppsOverQuota) {
      return (
        <QuotaGuardFooter>
          <Trans
            components={{
              a: <ContactUsPhraseLink />,
              planName: <PlanName name={planName} />,
            }}
          >
            {t('applications', { count: quota.applicationsLimit })}
          </Trans>
        </QuotaGuardFooter>
      );
    }
  }

  return (
    <Button
      isLoading={isLoading}
      htmlType="submit"
      title="applications.create"
      size="large"
      type="primary"
      onClick={onClickCreate}
    />
  );
}

export default Footer;
