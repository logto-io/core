import IllustrationDark from '@/assets/images/loading-illustration-dark.svg';
import Illustration from '@/assets/images/loading-illustration.svg';
import { Daisy as Spinner } from '@/components/Spinner';
import { useTheme } from '@/hooks/use-theme';

import * as styles from './index.module.scss';

const AppLoading = () => {
  const theme = useTheme();

  return (
    <div className={styles.container}>
      {theme === 'light' ? <Illustration /> : <IllustrationDark />}
      <Spinner />
    </div>
  );
};

export default AppLoading;
