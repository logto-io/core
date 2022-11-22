import Draggable from '@/assets/images/draggable.svg';
import Minus from '@/assets/images/minus.svg';
import IconButton from '@/components/IconButton';
import UnnamedTrans from '@/components/UnnamedTrans';
import ConnectorPlatformIcon from '@/icons/ConnectorPlatformIcon';
import type { ConnectorGroup } from '@/types/connector';

import * as styles from './SelectedConnectorItem.module.scss';

type Props = {
  data: ConnectorGroup;
  onDelete: (connectorTarget: string) => void;
};

const SelectedConnectorItem = ({ data: { logo, target, name, connectors }, onDelete }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <Draggable className={styles.draggableIcon} />
        <img src={logo} alt={target} className={styles.logo} />
        <UnnamedTrans resource={name} className={styles.name} />
        {connectors.length > 1 &&
          connectors
            .filter(({ enabled }) => enabled)
            .map(({ platform }) => (
              <div key={platform} className={styles.icon}>
                {platform && <ConnectorPlatformIcon platform={platform} />}
              </div>
            ))}
      </div>
      <IconButton
        onClick={() => {
          onDelete(target);
        }}
      >
        <Minus />
      </IconButton>
    </div>
  );
};

export default SelectedConnectorItem;
