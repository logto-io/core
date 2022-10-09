import type { LanguageKey } from '@logto/core-kit';
import { SignInExperience, ConnectorMetadata, AppearanceMode } from '@logto/schemas';

export type UserFlow = 'sign-in' | 'register' | 'forgot-password';
export type SignInMethod = 'username' | 'email' | 'sms' | 'social';
export type LocalSignInMethod = Exclude<SignInMethod, 'social'>;

export enum SearchParameters {
  bindWithSocial = 'bind_with',
  nativeCallbackLink = 'native_callback',
  redirectTo = 'redirect_to',
}

export type Platform = 'web' | 'mobile';

export type Theme = 'dark' | 'light';

export type SignInExperienceSettingsResponse = SignInExperience & {
  socialConnectors: ConnectorMetadata[];
  notification?: string;
};

// FIXME @simeng
export type SignInExperienceSettings = Omit<
  SignInExperienceSettingsResponse,
  'id' | 'signInMethods' | 'socialSignInConnectorTargets' | 'signIn' | 'signUp'
> & {
  primarySignInMethod: SignInMethod;
  secondarySignInMethods: SignInMethod[];
};

export enum ConfirmModalMessage {
  SHOW_TERMS_DETAIL_MODAL = 'SHOW_TERMS_DETAIL_MODAL',
}

export type PreviewConfig = {
  signInExperience: SignInExperienceSettingsResponse;
  language: LanguageKey;
  mode: AppearanceMode.LightMode | AppearanceMode.DarkMode;
  platform: Platform;
  isNative: boolean;
};
