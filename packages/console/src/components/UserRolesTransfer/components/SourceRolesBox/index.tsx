import type { RoleResponse } from '@logto/schemas';
import { conditional } from '@silverhand/essentials';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import Search from '@/assets/images/search.svg';
import Pagination from '@/components/Pagination';
import TextInput from '@/components/TextInput';
import useDebounce from '@/hooks/use-debounce';
import * as transferLayout from '@/scss/transfer.module.scss';
import { buildUrl } from '@/utilities/url';

import SourceRoleItem from '../SourceRoleItem';
import * as styles from './index.module.scss';

type Props = {
  userId: string;
  selectedRoles: RoleResponse[];
  onChange: (value: RoleResponse[]) => void;
};

const pageSize = 20;
const searchDelay = 500;

const SourceRolesBox = ({ userId, selectedRoles, onChange }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const [pageIndex, setPageIndex] = useState(1);
  const [keyword, setKeyword] = useState('');

  const debounce = useDebounce();

  const url = buildUrl('/api/roles', {
    excludeUserId: userId,
    page: String(pageIndex),
    page_size: String(pageSize),
    ...conditional(keyword && { search: `%${keyword}%` }),
  });

  const { data } = useSWR<[RoleResponse[], number]>(url);

  const [dataSource = [], totalCount] = data ?? [];

  const isRoleSelected = (role: RoleResponse) =>
    selectedRoles.findIndex(({ id }) => role.id === id) >= 0;

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setPageIndex(1);
      setKeyword(event.target.value);
    }, searchDelay);
  };

  return (
    <div className={transferLayout.box}>
      <div className={transferLayout.boxTopBar}>
        <TextInput
          className={styles.search}
          icon={<Search className={styles.icon} />}
          placeholder={t('general.search_placeholder')}
          onChange={handleSearchInput}
        />
      </div>
      <div className={transferLayout.boxContent}>
        {dataSource.map((role) => {
          const isSelected = isRoleSelected(role);

          return (
            <SourceRoleItem
              key={role.id}
              role={role}
              isSelected={isSelected}
              onSelect={() => {
                onChange(
                  isSelected
                    ? selectedRoles.filter(({ id }) => id !== role.id)
                    : [role, ...selectedRoles]
                );
              }}
            />
          );
        })}
      </div>
      <Pagination
        mode="pico"
        pageIndex={pageIndex}
        totalCount={totalCount}
        pageSize={pageSize}
        className={transferLayout.boxPagination}
        onChange={(page) => {
          setPageIndex(page);
        }}
      />
    </div>
  );
};

export default SourceRolesBox;
