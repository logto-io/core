import { ConnectorType } from '@logto/schemas';
import { Trans, useTranslation } from 'react-i18next';

import Alert from '@/components/Alert';
import TextLink from '@/components/TextLink';
import useEnabledConnectorTypes from '@/hooks/use-enabled-connector-types';

type Props = {
  requiredConnectors: ConnectorType[];
};

const ConnectorSetupWarning = ({ requiredConnectors }: Props) => {
  const { isConnectorTypeEnabled } = useEnabledConnectorTypes();
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const missingConnectors = requiredConnectors.filter(
    (connectorType) => !isConnectorTypeEnabled(connectorType)
  );

  if (missingConnectors.length === 0) {
    return null;
  }

  return (
    <>
      {missingConnectors.map((connectorType) => (
        <Alert key={connectorType}>
          <Trans
            components={{
              a: (
                <TextLink
                  to={connectorType === ConnectorType.Social ? '/connectors/social' : '/connectors'}
                  target="_blank"
                />
              ),
            }}
          >
            {t('sign_in_exp.setup_warning.no_connector', {
              context: connectorType.toLowerCase(),
              link: t('sign_in_exp.setup_warning.setup_link'),
            })}
          </Trans>
        </Alert>
      ))}
    </>
  );
};

export default ConnectorSetupWarning;
