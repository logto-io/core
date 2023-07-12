import { Trans, useTranslation } from 'react-i18next';

import PlanName from '@/components/PlanName';
import { type SubscriptionPlanQuota } from '@/types/subscriptions';

import QuotaDiffItem from './QuotaDiffItem';
import * as styles from './index.module.scss';

type Props = {
  planName: string;
  quotaDiff: Partial<SubscriptionPlanQuota>;
  isTarget?: boolean;
};

function PlanQuotaDiffList({ planName, quotaDiff, isTarget = false }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  // Todo: @xiaoyijun LOG-6540 order keys
  // eslint-disable-next-line no-restricted-syntax
  const entries = Object.entries(quotaDiff) as Array<
    [keyof SubscriptionPlanQuota, SubscriptionPlanQuota[keyof SubscriptionPlanQuota]]
  >;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Trans
          components={{
            name: <PlanName name={planName} />,
          }}
        >
          {t(
            isTarget ? 'subscription.downgrade_modal.after' : 'subscription.downgrade_modal.before'
          )}
        </Trans>
      </div>
      <ul className={styles.list}>
        {entries.map(([quotaKey, quotaValue]) => (
          <QuotaDiffItem
            key={quotaKey}
            quotaKey={quotaKey}
            quotaValue={quotaValue}
            isChangeStateVisible={isTarget}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlanQuotaDiffList;
