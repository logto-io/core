import { type AdminConsoleKey } from '@logto/phrases';
import { conditional, type Nullable } from '@silverhand/essentials';
import classNames from 'classnames';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Tip from '@/assets/icons/tip.svg?react';
import { addOnPricingExplanationLink } from '@/consts/external-links';
import { SubscriptionDataContext } from '@/contexts/SubscriptionDataProvider';
import DynamicT from '@/ds-components/DynamicT';
import IconButton from '@/ds-components/IconButton';
import Tag from '@/ds-components/Tag';
import TextLink from '@/ds-components/TextLink';
import { ToggleTip } from '@/ds-components/Tip';
import { isPaidPlan } from '@/utils/subscription';

import { formatNumber } from '../utils';

import styles from './index.module.scss';

const formatQuotaNumber = (number: number): string => {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M';
  }

  if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + 'K';
  }

  if (Number.isInteger(number)) {
    return number.toString();
  }

  return number.toFixed(2);
};

const formatNumberTypedUsageDescription = ({
  usage,
  quota,
  unlimitedString,
}: {
  usage: number;
  quota?: Props['quota'];
  unlimitedString: string;
}) => {
  const usagePercent = conditional(typeof quota === 'number' && usage / quota);
  return quota === undefined || typeof quota === 'boolean'
    ? formatNumber(usage)
    : typeof quota === 'number'
    ? `${formatNumber(usage)} / ${formatQuotaNumber(quota)}${
        usagePercent === undefined ? '' : ` (${(usagePercent * 100).toFixed(0)}%)`
      }`
    : `${formatNumber(usage)} / ${unlimitedString}`;
};

export type Props = {
  readonly usage: number | boolean;
  readonly quota?: Nullable<number> | boolean;
  readonly basicQuota?: Nullable<number> | boolean;
  readonly usageKey: AdminConsoleKey;
  readonly titleKey: AdminConsoleKey;
  readonly tooltipKey?: AdminConsoleKey;
  readonly unitPrice: number;
  readonly className?: string;
};

function PlanUsageCard({
  usage,
  quota,
  basicQuota,
  unitPrice,
  usageKey,
  titleKey,
  tooltipKey,
  className,
}: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const {
    currentSubscription: { planId, isEnterprisePlan },
  } = useContext(SubscriptionDataContext);

  const isPaidTenant = isPaidPlan(planId, isEnterprisePlan);

  const usagePercent = conditional(
    typeof quota === 'number' && typeof usage === 'number' && usage / quota
  );

  return (
    <div className={classNames(styles.card, className)}>
      <div className={styles.title}>
        <span>
          <DynamicT forKey={titleKey} />
        </span>
        {tooltipKey && (
          <ToggleTip
            content={
              <Trans
                components={{
                  a: <TextLink to={addOnPricingExplanationLink} />,
                }}
              >
                {t(tooltipKey, {
                  price: unitPrice,
                  ...conditional(
                    typeof basicQuota === 'number' && {
                      basicQuota: formatQuotaNumber(basicQuota),
                    }
                  ),
                })}
              </Trans>
            }
          >
            <IconButton size="small">
              <Tip />
            </IconButton>
          </ToggleTip>
        )}
      </div>
      {typeof usage === 'number' ? (
        <div
          className={classNames(
            styles.description,
            typeof usagePercent === 'number' && usagePercent >= 1 && styles.quotaExceeded
          )}
        >
          <Trans
            components={{
              span: (
                <span
                  className={classNames(
                    styles.usageTip,
                    // Hide usage tip for free plan users.
                    (!isPaidTenant || basicQuota === undefined) && styles.hidden
                  )}
                />
              ),
            }}
          >
            {t(
              (() => {
                switch (true) {
                  case basicQuota === null || basicQuota === true: {
                    return 'subscription.usage.usage_description_with_unlimited_quota';
                  }
                  case basicQuota === false || basicQuota === 0: {
                    return 'subscription.usage.usage_description_without_quota';
                  }
                  case typeof basicQuota === 'number': {
                    return 'subscription.usage.usage_description_with_limited_quota';
                  }
                  default: {
                    return usageKey;
                  }
                }
              })(),
              isPaidTenant
                ? {
                    usage: formatNumber(usage),
                    ...conditional(
                      typeof basicQuota === 'number' && {
                        basicQuota: formatQuotaNumber(basicQuota),
                      }
                    ),
                  }
                : {
                    usage: formatNumberTypedUsageDescription({
                      usage,
                      quota,
                      unlimitedString: String(t('subscription.quota_table.unlimited')),
                    }),
                  }
            )}
          </Trans>
        </div>
      ) : (
        <div className={styles.tagContainer}>
          <Tag className={styles.tag} type="state" status={usage ? 'success' : 'info'}>
            <DynamicT
              forKey={`subscription.usage.${usage ? 'status_active' : 'status_inactive'}`}
            />
          </Tag>
          {quota !== undefined && (
            <div className={styles.usageTip}>
              {/* Consider the type of quota is number, null or boolean, the following switch statement covers all cases. */}
              {(() => {
                switch (true) {
                  case quota === null || quota === true: {
                    return (
                      <DynamicT forKey="subscription.usage.unlimited_status_quota_description" />
                    );
                  }
                  case quota === false || quota === 0: {
                    return (
                      <DynamicT forKey="subscription.usage.disabled_status_quota_description" />
                    );
                  }
                  case typeof quota === 'number': {
                    return t('subscription.usage.limited_status_quota_description', {
                      quota: formatQuotaNumber(quota),
                    });
                  }
                  default: {
                    return null;
                  }
                }
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlanUsageCard;
