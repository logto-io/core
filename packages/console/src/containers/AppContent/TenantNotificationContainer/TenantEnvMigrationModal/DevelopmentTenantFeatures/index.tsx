import PlanQuotaList from '@/components/PlanQuotaList';
import { comingSoonQuotaKeys } from '@/consts/plan-quotas';
import { ReservedPlanId } from '@/consts/subscriptions';
import useSubscriptionPlans from '@/hooks/use-subscription-plans';
import { type SubscriptionPlanQuota } from '@/types/subscriptions';

const featuredQuotaKeys: Array<keyof SubscriptionPlanQuota> = [
  'mauLimit',
  'machineToMachineLimit',
  'mfaEnabled',
  'omniSignInEnabled',
  'organizationEnabled',
  'rolesLimit',
  'scopesPerRoleLimit',
  'auditLogsRetentionDays',
];

function DevelopmentTenantFeatures() {
  const { data: plans } = useSubscriptionPlans();
  const proPlan = plans?.find(({ id }) => id === ReservedPlanId.pro);

  if (!proPlan) {
    return null;
  }

  return (
    <PlanQuotaList
      hasIcon
      quota={proPlan.quota}
      featuredQuotaKeys={featuredQuotaKeys}
      comingSoonQuotaKeys={comingSoonQuotaKeys}
    />
  );
}

export default DevelopmentTenantFeatures;
