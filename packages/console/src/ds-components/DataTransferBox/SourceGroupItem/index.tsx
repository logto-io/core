import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CaretExpanded from '@/assets/icons/caret-expanded.svg';
import CaretFolded from '@/assets/icons/caret-folded.svg';
import Checkbox from '@/ds-components/Checkbox';
import IconButton from '@/ds-components/IconButton';
import { onKeyDownHandler } from '@/utils/a11y';

import SourceDataItem from '../SourceDataItem';
import { type DataEntry, type DataGroup, type SelectedDataEntry } from '../type';

import * as styles from './index.module.scss';

type Props<TEntry extends DataEntry> = {
  dataGroup: DataGroup<TEntry>;
  selectedGroupDataList: Array<SelectedDataEntry<TEntry>>;
  onSelectDataGroup: (group: DataGroup<TEntry>) => void;
  onSelectData: (data: TEntry) => void;
};

function SourceGroupItem<TEntry extends DataEntry>({
  dataGroup,
  selectedGroupDataList,
  onSelectDataGroup,
  onSelectData,
}: Props<TEntry>) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { groupName, groupId, dataList } = dataGroup;
  const selectedDataIdSet = new Set(selectedGroupDataList.map(({ id }) => id));
  const selectedCount = selectedDataIdSet.size;
  const totalCount = dataList.length;

  const [isDataListHidden, setIsDataListHidden] = useState(true);

  return (
    <div className={styles.groupItem}>
      <div className={styles.title}>
        <Checkbox
          checked={selectedCount === totalCount}
          indeterminate={selectedCount > 0 && selectedCount < totalCount}
          onChange={() => {
            onSelectDataGroup(dataGroup);
          }}
        />
        <div
          role="button"
          tabIndex={0}
          className={styles.group}
          onKeyDown={onKeyDownHandler(() => {
            setIsDataListHidden(!isDataListHidden);
          })}
          onClick={() => {
            setIsDataListHidden(!isDataListHidden);
          }}
        >
          <IconButton size="medium" className={styles.caret}>
            {isDataListHidden ? <CaretFolded /> : <CaretExpanded />}
          </IconButton>
          <div className={styles.name}>{groupName}</div>
          <div className={styles.dataInfo}>
            ({t('role_details.permission.api_permission_count', { count: dataList.length })})
          </div>
        </div>
      </div>
      <div className={classNames(isDataListHidden && styles.invisible, styles.dataList)}>
        {dataList.map((data) => (
          <SourceDataItem
            key={data.id}
            data={data}
            isSelected={selectedDataIdSet.has(data.id)}
            onSelect={() => {
              onSelectData({
                ...data,
                groupName,
                groupId,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SourceGroupItem;
