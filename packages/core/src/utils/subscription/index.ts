import { trySafe } from '@silverhand/essentials';

import { type CloudConnectionLibrary } from '#src/libraries/cloud-connection.js';

import assertThat from '../assert-that.js';

import {
  type SubscriptionQuota,
  type SubscriptionUsage,
  type SubscriptionPlan,
  type Subscription,
  type ReportSubscriptionUpdatesUsageKey,
  allReportSubscriptionUpdatesUsageKeys,
} from './types.js';

export const getTenantSubscription = async (
  cloudConnection: CloudConnectionLibrary
): Promise<Subscription> => {
  const client = await cloudConnection.getClient();
  const subscription = await client.get('/api/tenants/my/subscription');

  return subscription;
};

export const getTenantSubscriptionPlan = async (
  cloudConnection: CloudConnectionLibrary
): Promise<SubscriptionPlan> => {
  const client = await cloudConnection.getClient();
  const [subscription, plans] = await Promise.all([
    getTenantSubscription(cloudConnection),
    client.get('/api/subscription-plans'),
  ]);
  const plan = plans.find(({ id }) => id === subscription.planId);

  assertThat(plan, 'subscription.get_plan_failed');

  return plan;
};

export const getTenantSubscriptionData = async (
  cloudConnection: CloudConnectionLibrary
): Promise<{
  planId: string;
  quota: SubscriptionQuota;
  usage: SubscriptionUsage;
}> => {
  const client = await cloudConnection.getClient();
  const [{ planId }, quota, usage] = await Promise.all([
    client.get('/api/tenants/my/subscription'),
    client.get('/api/tenants/my/subscription/quota'),
    client.get('/api/tenants/my/subscription/usage'),
  ]);

  return { planId, quota, usage };
};

export const getTenantSubscriptionScopeUsage = async (
  cloudConnection: CloudConnectionLibrary,
  entityName: 'resources' | 'roles'
): Promise<Record<string, number>> => {
  const client = await cloudConnection.getClient();
  const scopeUsages = await client.get('/api/tenants/my/subscription/usage/:entityName/scopes', {
    params: { entityName },
    search: {},
  });

  return scopeUsages;
};

export const reportSubscriptionUpdates = async (
  cloudConnection: CloudConnectionLibrary,
  usageKey: keyof SubscriptionQuota
): Promise<void> => {
  if (!isReportSubscriptionUpdatesUsageKey(usageKey)) {
    return;
  }

  const client = await cloudConnection.getClient();
  // We only report to the Cloud to notify the resource usage updates, and do not care the response. We will see error logs on the Cloud side if there is any issue.
  await trySafe(
    client.post('/api/tenants/my/subscription/item-updates', {
      body: {
        usageKey,
      },
    })
  );
};

export const isReportSubscriptionUpdatesUsageKey = (
  value: string
): value is ReportSubscriptionUpdatesUsageKey => {
  // eslint-disable-next-line no-restricted-syntax
  return allReportSubscriptionUpdatesUsageKeys.includes(value as ReportSubscriptionUpdatesUsageKey);
};
