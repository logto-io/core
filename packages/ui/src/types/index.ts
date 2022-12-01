import type { SignInExperience, ConnectorMetadata, AppearanceMode } from '@logto/schemas';

export enum UserFlow {
  signIn = 'sign-in',
  register = 'register',
  forgotPassword = 'forgot-password',
  continue = 'continue',
}

export enum SearchParameters {
  bindWithSocial = 'bind_with',
  nativeCallbackLink = 'native_callback',
  redirectTo = 'redirect_to',
}

export type Platform = 'web' | 'mobile';

// TODO: @simeng, @sijie, @charles should we combine this with admin console?
export type Theme = 'dark' | 'light';

// Omit socialSignInConnectorTargets since it is being translated into socialConnectors
export type SignInExperienceResponse = Omit<SignInExperience, 'socialSignInConnectorTargets'> & {
  socialConnectors: ConnectorMetadata[];
  notification?: string;
  forgotPassword: {
    sms: boolean;
    email: boolean;
  };
};

export enum ConfirmModalMessage {
  SHOW_TERMS_DETAIL_MODAL = 'SHOW_TERMS_DETAIL_MODAL',
}

export type PreviewConfig = {
  signInExperience: SignInExperienceResponse;
  language: string;
  mode: AppearanceMode.LightMode | AppearanceMode.DarkMode;
  platform: Platform;
  isNative: boolean;
};

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;
