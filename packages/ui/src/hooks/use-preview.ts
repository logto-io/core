import { Language } from '@logto/phrases-ui';
import { AppearanceMode, ConnectorPlatform } from '@logto/schemas';
import { conditionalString } from '@silverhand/essentials';
import i18next from 'i18next';
import { useEffect, useState } from 'react';

import * as styles from '@/App.module.scss';
import { Context } from '@/hooks/use-page-context';
import initI18n from '@/i18n/init';
import { SignInExperienceSettingsResponse, SignInExperienceSettings, Platform } from '@/types';
import { parseQueryParameters } from '@/utils';
import { getPrimarySignInMethod, getSecondarySignInMethods } from '@/utils/sign-in-experience';
import { filterPreviewSocialConnectors } from '@/utils/social-connectors';

type PreviewConfig = {
  signInExperience: SignInExperienceSettingsResponse;
  language: Language;
  mode: AppearanceMode.LightMode | AppearanceMode.DarkMode;
  platform: Platform;
  isNative: boolean;
};

const usePreview = (context: Context): [boolean, PreviewConfig?] => {
  const [previewConfig, setPreviewConfig] = useState<PreviewConfig>();
  const { setTheme, setExperienceSettings, setPlatform } = context;

  const { preview } = parseQueryParameters(window.location.search);
  const isPreview = preview === 'true';

  useEffect(() => {
    if (!isPreview) {
      return;
    }

    // Init i18n
    void initI18n(undefined, isPreview);

    // Block pointer event
    document.body.classList.add(conditionalString(styles.preview));

    const previewMessageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data.sender === 'ac_preview') {
        setPreviewConfig(event.data.config as PreviewConfig);
      }
    };

    window.addEventListener('message', previewMessageHandler);

    return () => {
      window.removeEventListener('message', previewMessageHandler);
    };
  }, [isPreview]);

  useEffect(() => {
    if (!isPreview || !previewConfig) {
      return;
    }

    const {
      signInExperience: { signInMethods, socialConnectors, color, ...rest },
      language,
      mode,
      platform,
      isNative,
    } = previewConfig;

    const experienceSettings: SignInExperienceSettings = {
      ...rest,
      color: {
        ...color,
        isDarkModeEnabled: false, // Disable theme mode auto detection on preview
      },
      primarySignInMethod: getPrimarySignInMethod(signInMethods),
      secondarySignInMethods: getSecondarySignInMethods(signInMethods),
      socialConnectors: filterPreviewSocialConnectors(
        isNative ? ConnectorPlatform.Native : ConnectorPlatform.Web,
        socialConnectors
      ),
    };

    void i18next.changeLanguage(language);

    setTheme(mode);

    setPlatform(platform);

    setExperienceSettings(experienceSettings);
  }, [isPreview, previewConfig, setExperienceSettings, setPlatform, setTheme]);

  return [isPreview, previewConfig];
};

export default usePreview;
