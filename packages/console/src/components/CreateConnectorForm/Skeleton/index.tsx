import classNames from 'classnames';

import * as radioStyles from '../ConnectorRadioGroup/ConnectorRadio/index.module.scss';
import * as radioGroupStyles from '../ConnectorRadioGroup/index.module.scss';

import * as styles from './index.module.scss';

function Skeleton() {
  return (
    <div className={radioGroupStyles.connectorGroup}>
      {Array.from({ length: 8 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={classNames(radioStyles.connector, styles.connector)}>
          <div className={styles.logo} />
          <div className={radioStyles.content}>
            <div className={styles.name} />
            <div>
              <div className={styles.description} />
              <div className={classNames(styles.description, styles.shortDescription)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
