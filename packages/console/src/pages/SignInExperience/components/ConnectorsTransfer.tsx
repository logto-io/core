import { conditionalString } from '@silverhand/essentials';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Alert from '@/components/Alert';
import Transfer from '@/components/Transfer';
import UnnamedTrans from '@/components/UnnamedTrans';
import useConnectorGroups from '@/hooks/use-connector-groups';

import * as styles from './ConnectorsTransfer.module.scss';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

const ConnectorsTransfer = ({ value, onChange }: Props) => {
  const { data, error } = useConnectorGroups();
  const isLoading = !data && !error;
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data && error) {
    <div>{`error occurred: ${error.body?.message ?? error.message}`}</div>;
  }

  const datasource = data
    ? data.map(({ target, name, enabled }) => ({
        value: target,
        title: (
          <UnnamedTrans
            resource={name}
            className={conditionalString(!enabled && styles.disabled)}
          />
        ),
      }))
    : [];

  return (
    <>
      {value.length === 0 && (
        <Alert>{t('sign_in_exp.setup_warning.no_added_social_connector')}</Alert>
      )}
      <Transfer
        value={value}
        datasource={datasource}
        title={t('sign_in_exp.sign_in_methods.transfer.title')}
        footer={
          <div>
            {t('sign_in_exp.sign_in_methods.transfer.footer.not_in_list')}{' '}
            <Link to="/connectors/social" target="_blank">
              {t('sign_in_exp.sign_in_methods.transfer.footer.set_up_more')}
            </Link>{' '}
            {t('sign_in_exp.sign_in_methods.transfer.footer.go_to')}
          </div>
        }
        onChange={onChange}
      />
    </>
  );
};

export default ConnectorsTransfer;
