import { type TFuncKey } from 'i18next';
import { useTranslation } from 'react-i18next';

import { ReservedSkuId } from '@/types/subscriptions';

const registeredSkuIdNamePhraseMap: Record<
  string,
  TFuncKey<'translation', 'admin_console.subscription'> | undefined
> = {
  quotaKey: undefined,
  [ReservedSkuId.Free]: 'free_plan',
  [ReservedSkuId.Pro]: 'pro_plan',
  [ReservedSkuId.Enterprise]: 'enterprise',
};

type Props = {
  readonly skuId: string;
};

function SkuName({ skuId }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console.subscription' });
  const skuNamePhrase = registeredSkuIdNamePhraseMap[skuId];

  /**
   * Note: fallback to the plan name if the phrase is not registered.
   */
  const skuName = skuNamePhrase ? String(t(skuNamePhrase)) : skuId;

  return <span>{skuName}</span>;
}

export default SkuName;
