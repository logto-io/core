// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import {
  CompanyInfo,
  companyInfoGuard,
  Branding,
  brandingGuard,
  TermsOfUse,
  termsOfUseGuard,
  Localization,
  localizationGuard,
  SignInMethodSettings,
  signInMethodSettingsGuard,
  GeneratedSchema,
  Guard,
} from '../foundations';

export type CreateSignInExperienceSetting = {
  id: string;
  companyInfo: CompanyInfo;
  branding: Branding;
  termsOfUse: TermsOfUse;
  forgetPasswordEnabled?: boolean;
  localization: Localization;
  signInMethods: SignInMethodSettings;
};

export type SignInExperienceSetting = {
  id: string;
  companyInfo: CompanyInfo;
  branding: Branding;
  termsOfUse: TermsOfUse;
  forgetPasswordEnabled: boolean;
  localization: Localization;
  signInMethods: SignInMethodSettings;
};

const createGuard: Guard<CreateSignInExperienceSetting> = z.object({
  id: z.string(),
  companyInfo: companyInfoGuard,
  branding: brandingGuard,
  termsOfUse: termsOfUseGuard,
  forgetPasswordEnabled: z.boolean().optional(),
  localization: localizationGuard,
  signInMethods: signInMethodSettingsGuard,
});

export const SignInExperienceSettings: GeneratedSchema<CreateSignInExperienceSetting> =
  Object.freeze({
    table: 'sign_in_experience_settings',
    tableSingular: 'sign_in_experience_setting',
    fields: {
      id: 'id',
      companyInfo: 'company_info',
      branding: 'branding',
      termsOfUse: 'terms_of_use',
      forgetPasswordEnabled: 'forget_password_enabled',
      localization: 'localization',
      signInMethods: 'sign_in_methods',
    },
    fieldKeys: [
      'id',
      'companyInfo',
      'branding',
      'termsOfUse',
      'forgetPasswordEnabled',
      'localization',
      'signInMethods',
    ],
    createGuard,
  });
