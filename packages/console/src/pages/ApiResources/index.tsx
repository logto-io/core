import type { Resource } from '@logto/schemas';
import { AppearanceMode } from '@logto/schemas';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';

import ApiResourceDark from '@/assets/images/api-resource-dark.svg';
import ApiResource from '@/assets/images/api-resource.svg';
import Plus from '@/assets/images/plus.svg';
import Button from '@/components/Button';
import CardTitle from '@/components/CardTitle';
import CopyToClipboard from '@/components/CopyToClipboard';
import ItemPreview from '@/components/ItemPreview';
import Pagination from '@/components/Pagination';
import TableEmpty from '@/components/Table/TableEmpty';
import TableError from '@/components/Table/TableError';
import TableLoading from '@/components/Table/TableLoading';
import type { RequestError } from '@/hooks/use-api';
import { useTheme } from '@/hooks/use-theme';
import * as modalStyles from '@/scss/modal.module.scss';
import * as resourcesStyles from '@/scss/resources.module.scss';
import * as tableStyles from '@/scss/table.module.scss';
import {
  getApiResourceDetailsPathname,
  getApiResourcesPathname,
  getCreateApiResourcePathname,
} from '@/utilities/router';

import CreateForm from './components/CreateForm';
import * as styles from './index.module.scss';

const pageSize = 20;

const ApiResources = () => {
  const { pathname } = useLocation();
  const isCreateNew = pathname.endsWith('/create');
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [query, setQuery] = useSearchParams();
  const pageIndex = Number(query.get('page') ?? '1');
  const { data, error, mutate } = useSWR<[Resource[], number], RequestError>(
    `/api/resources?page=${pageIndex}&page_size=${pageSize}`
  );
  const isLoading = !data && !error;
  const navigate = useNavigate();
  const theme = useTheme();
  const [apiResources, totalCount] = data ?? [];

  return (
    <div className={resourcesStyles.container}>
      <div className={resourcesStyles.headline}>
        <CardTitle title="api_resources.title" subtitle="api_resources.subtitle" />
        <Button
          title="api_resources.create"
          type="primary"
          size="large"
          icon={<Plus />}
          onClick={() => {
            navigate(getCreateApiResourcePathname());
          }}
        />
        <Modal
          shouldCloseOnEsc
          isOpen={isCreateNew}
          className={modalStyles.content}
          overlayClassName={modalStyles.overlay}
          onRequestClose={() => {
            navigate(getApiResourcesPathname());
          }}
        >
          <CreateForm
            onClose={(createdApiResource) => {
              if (createdApiResource) {
                toast.success(
                  t('api_resources.api_resource_created', { name: createdApiResource.name })
                );
                navigate(getApiResourceDetailsPathname(createdApiResource.id), { replace: true });

                return;
              }
              navigate(getApiResourcesPathname());
            }}
          />
        </Modal>
      </div>
      <div className={resourcesStyles.table}>
        <div className={tableStyles.scrollable}>
          <table className={classNames(!data && tableStyles.empty)}>
            <colgroup>
              <col className={styles.apiResourceName} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>{t('api_resources.api_name')}</th>
                <th>{t('api_resources.api_identifier')}</th>
              </tr>
            </thead>
            <tbody>
              {!data && error && (
                <TableError
                  columns={2}
                  content={error.body?.message ?? error.message}
                  onRetry={async () => mutate(undefined, true)}
                />
              )}
              {isLoading && <TableLoading columns={2} />}
              {apiResources?.length === 0 && (
                <TableEmpty columns={2}>
                  <Button
                    title="api_resources.create"
                    type="outline"
                    onClick={() => {
                      navigate(getCreateApiResourcePathname());
                    }}
                  />
                </TableEmpty>
              )}
              {apiResources?.map(({ id, name, indicator }) => {
                const ResourceIcon =
                  theme === AppearanceMode.LightMode ? ApiResource : ApiResourceDark;

                return (
                  <tr
                    key={id}
                    className={tableStyles.clickable}
                    onClick={() => {
                      navigate(getApiResourceDetailsPathname(id));
                    }}
                  >
                    <td>
                      <ItemPreview
                        title={name}
                        icon={<ResourceIcon className={styles.icon} />}
                        to={getApiResourceDetailsPathname(id)}
                      />
                    </td>
                    <td>
                      <CopyToClipboard value={indicator} variant="text" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        pageSize={pageSize}
        className={styles.pagination}
        onChange={(page) => {
          setQuery({ page: String(page) });
        }}
      />
    </div>
  );
};

export default ApiResources;
