import { conditionalString } from '@silverhand/essentials';
import { ReactNode, useEffect, useCallback, useContext } from 'react';

import Toast from '@/components/Toast';
import useColorTheme from '@/hooks/use-color-theme';
import { PageContext } from '@/hooks/use-page-context';
import useTheme from '@/hooks/use-theme';

import * as styles from './index.module.scss';

export type Props = {
  children: ReactNode;
};

const AppContent = ({ children }: Props) => {
  const theme = useTheme();
  const { toast, platform, setToast, experienceSettings } = useContext(PageContext);

  // Prevent internal eventListener rebind
  const hideToast = useCallback(() => {
    setToast('');
  }, [setToast]);

  // Set Primary Color
  useColorTheme(experienceSettings?.color.primaryColor, experienceSettings?.color.darkPrimaryColor);

  // Set Theme Mode
  useEffect(() => {
    document.body.classList.remove(conditionalString(styles.light), conditionalString(styles.dark));
    document.body.classList.add(conditionalString(styles[theme]));
  }, [theme]);

  // Apply Platform Style
  useEffect(() => {
    document.body.classList.remove('desktop', 'mobile');
    document.body.classList.add(platform === 'mobile' ? 'mobile' : 'desktop');
  }, [platform]);

  return (
    <div className={styles.container}>
      {platform === 'web' && <div className={styles.placeHolder} />}
      <main className={styles.content}>{children}</main>
      {platform === 'web' && <div className={styles.placeHolder} />}
      <Toast message={toast} isVisible={Boolean(toast)} callback={hideToast} />
    </div>
  );
};

export default AppContent;
