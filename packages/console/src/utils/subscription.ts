import { ResponseError } from '@withtyped/client';
import dayjs from 'dayjs';

import { tryReadResponseErrorBody } from '@/cloud/hooks/use-cloud-api';
import { type SubscriptionPlanResponse } from '@/cloud/types/router';
import {
  communitySupportEnabledMap,
  reservedPlanIdOrder,
  ticketSupportResponseTimeMap,
} from '@/consts/subscriptions';
import { type Invoice } from '@/types/subscriptions';

export const addSupportQuotaToPlan = (subscriptionPlanResponse: SubscriptionPlanResponse) => {
  const { name, quota } = subscriptionPlanResponse;

  return {
    ...subscriptionPlanResponse,
    quota: {
      ...quota,
      communitySupportEnabled: communitySupportEnabledMap[name] ?? false, // Fallback to not supported
      ticketSupportResponseTime: ticketSupportResponseTimeMap[name] ?? 0, // Fallback to not supported
    },
  };
};

const getSubscriptionPlanOrderById = (id: string) => {
  const index = reservedPlanIdOrder.indexOf(id);

  // Note: if the plan id is not in the reservedPlanIdOrder, it will be treated as the highest priority
  return index === -1 ? Number.POSITIVE_INFINITY : index;
};

export const isDowngradePlan = (fromPlanId: string, toPlanId: string) =>
  getSubscriptionPlanOrderById(fromPlanId) > getSubscriptionPlanOrderById(toPlanId);

type FormatPeriodOptions = {
  periodStart: Date;
  periodEnd: Date;
  displayYear?: boolean;
};

export const formatPeriod = ({ periodStart, periodEnd, displayYear }: FormatPeriodOptions) => {
  const format = displayYear ? 'MMM D, YYYY' : 'MMM D';
  const formattedStart = dayjs(periodStart).format(format);
  const formattedEnd = dayjs(periodEnd).format(format);
  return `${formattedStart} - ${formattedEnd}`;
};

export const getLatestUnpaidInvoice = (invoices: Invoice[]) =>
  invoices
    .slice()
    .sort(
      (invoiceA, invoiceB) =>
        new Date(invoiceB.createdAt).getTime() - new Date(invoiceA.createdAt).getTime()
    )
    .find(({ status }) => status === 'uncollectible');

/**
 * Note: this is a temporary solution to handle the case when the user tries to downgrade but the quota limit is exceeded.
 * Need a better solution to handle this case by sharing the error type between the console and cloud. - LOG-6608
 */
export const isExceededQuotaLimitError = async (error: unknown) => {
  if (!(error instanceof ResponseError)) {
    return false;
  }

  const { message } = (await tryReadResponseErrorBody(error)) ?? {};

  return Boolean(message?.includes('Exceeded quota limit'));
};
