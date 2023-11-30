import { yes } from '@silverhand/essentials';

// eslint-disable-next-line import/no-unused-modules
export const isProduction = process.env.NODE_ENV === 'production';
export const isCloud = yes(process.env.IS_CLOUD);
export const adminEndpoint = process.env.ADMIN_ENDPOINT;
// eslint-disable-next-line unicorn/prevent-abbreviations, import/no-unused-modules -- we love dev
export const isDevFeaturesEnabled =
  !isProduction || yes(process.env.DEV_FEATURES_ENABLED) || yes(process.env.INTEGRATION_TEST);
