import { AdminConsoleKey, I18nKey } from '@logto/phrases';
import { useNavigate } from 'react-router-dom';

import checkDemoIcon from '@/assets/images/check-demo.svg';
import createAppIcon from '@/assets/images/create-app.svg';
import customizeIcon from '@/assets/images/customize.svg';
import furtherReadingsIcon from '@/assets/images/further-readings.svg';
import oneClickIcon from '@/assets/images/one-click.svg';
import passwordlessIcon from '@/assets/images/passwordless.svg';
import useSettings from '@/hooks/use-settings';

type GetStartedMetadata = {
  id: string;
  title: AdminConsoleKey;
  subtitle: AdminConsoleKey;
  icon: string;
  buttonText: I18nKey;
  isComplete?: boolean;
  onClick: () => void;
};

const useGetStartedMetadata = () => {
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();

  const data: GetStartedMetadata[] = [
    {
      id: 'checkDemo',
      title: 'get_started.card1_title',
      subtitle: 'get_started.card1_subtitle',
      icon: checkDemoIcon,
      buttonText: 'general.check_out',
      isComplete: settings?.checkDemo,
      onClick: async () => {
        void updateSettings({ checkDemo: true });
        window.open('/demo-app', '_blank');
      },
    },
    {
      id: 'createApplication',
      title: 'get_started.card2_title',
      subtitle: 'get_started.card2_subtitle',
      icon: createAppIcon,
      buttonText: 'general.create',
      isComplete: settings?.createApplication,
      onClick: () => {
        navigate('/applications');
      },
    },
    {
      id: 'configurePasswordless',
      title: 'get_started.card3_title',
      subtitle: 'get_started.card3_subtitle',
      icon: passwordlessIcon,
      buttonText: 'general.create',
      isComplete: settings?.configurePasswordless,
      onClick: () => {
        navigate('/connectors');
      },
    },
    {
      id: 'configureSocialSignIn',
      title: 'get_started.card4_title',
      subtitle: 'get_started.card4_subtitle',
      icon: oneClickIcon,
      buttonText: 'general.set_up',
      onClick: () => {
        navigate('/connectors/social');
      },
    },
    {
      id: 'customizeSignInExperience',
      title: 'get_started.card5_title',
      subtitle: 'get_started.card5_subtitle',
      icon: customizeIcon,
      buttonText: 'general.customize',
      isComplete: settings?.customizeSignInExperience,
      onClick: () => {
        navigate('/sign-in-experience');
      },
    },
    {
      id: 'checkFurtherReadings',
      title: 'get_started.card6_title',
      subtitle: 'get_started.card6_subtitle',
      icon: furtherReadingsIcon,
      buttonText: 'general.check_out',
      isComplete: settings?.checkFurtherReadings,
      onClick: () => {
        void updateSettings({ checkFurtherReadings: true });
        window.open('https://docs.logto.io/', '_blank');
      },
    },
  ];

  return {
    data,
    completedCount: data.filter(({ isComplete }) => isComplete).length,
    totalCount: data.length,
  };
};

export default useGetStartedMetadata;
