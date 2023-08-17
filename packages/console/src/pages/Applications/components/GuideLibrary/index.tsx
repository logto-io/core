import { type Application } from '@logto/schemas';
import classNames from 'classnames';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@/assets/icons/search.svg';
import EmptyDataPlaceholder from '@/components/EmptyDataPlaceholder';
import ProTag from '@/components/ProTag';
import { isCloud } from '@/consts/env';
import { TenantsContext } from '@/contexts/TenantsProvider';
import { CheckboxGroup } from '@/ds-components/Checkbox';
import OverlayScrollbar from '@/ds-components/OverlayScrollbar';
import TextInput from '@/ds-components/TextInput';
import useSubscriptionPlan from '@/hooks/use-subscription-plan';
import useTenantPathname from '@/hooks/use-tenant-pathname';
import { allAppGuideCategories, type AppGuideCategory } from '@/types/applications';

import CreateForm from '../CreateForm';
import { type SelectedGuide } from '../GuideCard';
import GuideGroup from '../GuideGroup';

import useAppGuideMetadata from './hook';
import * as styles from './index.module.scss';

type Props = {
  className?: string;
  hasCardBorder?: boolean;
  hasFilters?: boolean;
};

function GuideLibrary({ className, hasCardBorder, hasFilters }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console.applications.guide' });
  const { navigate } = useTenantPathname();
  const [keyword, setKeyword] = useState<string>('');
  const [filterCategories, setFilterCategories] = useState<AppGuideCategory[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<SelectedGuide>();
  const [getFilteredMetadata, getStructuredMetadata] = useAppGuideMetadata();
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const { currentTenantId } = useContext(TenantsContext);
  const { data: currentPlan } = useSubscriptionPlan(currentTenantId);
  const isM2mDisabledForCurrentPlan = isCloud && currentPlan?.quota.machineToMachineLimit === 0;

  const structuredMetadata = useMemo(
    () => getStructuredMetadata({ categories: filterCategories }),
    [getStructuredMetadata, filterCategories]
  );

  const filteredMetadata = useMemo(
    () => getFilteredMetadata({ keyword, categories: filterCategories }),
    [getFilteredMetadata, keyword, filterCategories]
  );

  const onClickGuide = useCallback((data: SelectedGuide) => {
    setShowCreateForm(true);
    setSelectedGuide(data);
  }, []);

  const onCloseCreateForm = useCallback(
    (newApp?: Application) => {
      if (newApp && selectedGuide) {
        navigate(`/applications/${newApp.id}/guide/${selectedGuide.id}`, { replace: true });
        return;
      }
      setShowCreateForm(false);
      setSelectedGuide(undefined);
    },
    [navigate, selectedGuide]
  );

  return (
    <div className={classNames(styles.container, className)}>
      {hasFilters && (
        <div className={styles.filters}>
          <label>{t('filter.title')}</label>
          <TextInput
            className={styles.searchInput}
            icon={<SearchIcon />}
            placeholder={t('filter.placeholder')}
            value={keyword}
            onChange={(event) => {
              setKeyword(event.currentTarget.value);
            }}
          />
          <div className={styles.checkboxGroupContainer}>
            <CheckboxGroup
              className={styles.checkboxGroup}
              options={allAppGuideCategories.map((category) => ({
                title: `applications.guide.categories.${category}`,
                value: category,
              }))}
              value={filterCategories}
              onChange={(value) => {
                const sortedValue = allAppGuideCategories.filter((category) =>
                  value.includes(category)
                );
                setFilterCategories(sortedValue);
              }}
            />
            {isM2mDisabledForCurrentPlan && <ProTag className={styles.proTag} />}
          </div>
        </div>
      )}
      {keyword &&
        (filteredMetadata?.length ? (
          <GuideGroup
            className={styles.guideGroup}
            hasCardBorder={hasCardBorder}
            guides={filteredMetadata}
            onClickGuide={onClickGuide}
          />
        ) : (
          <EmptyDataPlaceholder className={styles.emptyPlaceholder} size="large" />
        ))}
      {!keyword && (
        <OverlayScrollbar className={styles.groups}>
          {(filterCategories.length > 0 ? filterCategories : allAppGuideCategories).map(
            (category) =>
              structuredMetadata[category].length > 0 && (
                <GuideGroup
                  key={category}
                  className={styles.guideGroup}
                  hasCardBorder={hasCardBorder}
                  categoryName={t(`categories.${category}`)}
                  guides={structuredMetadata[category]}
                  onClickGuide={onClickGuide}
                />
              )
          )}
        </OverlayScrollbar>
      )}
      {selectedGuide?.target !== 'API' && showCreateForm && (
        <CreateForm
          defaultCreateType={selectedGuide?.target}
          defaultCreateFrameworkName={selectedGuide?.name}
          onClose={onCloseCreateForm}
        />
      )}
    </div>
  );
}

export default GuideLibrary;
