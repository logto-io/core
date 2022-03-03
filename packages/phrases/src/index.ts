import { NormalizeKeyPaths } from '@silverhand/essentials';

import en from './locales/en';
import zhCN from './locales/zh-cn';
import { Resource } from './types';

export type LogtoErrorCode = NormalizeKeyPaths<typeof en.errors>;
export type LogtoErrorI18nKey = `errors:${LogtoErrorCode}`;
export type Languages = keyof Resource;
export type I18nKey = NormalizeKeyPaths<typeof en.translation>;
export type AdminConsoleKey = NormalizeKeyPaths<typeof en.translation.admin_console>;

const resource: Resource = {
  en,
  'zh-CN': zhCN,
};

export default resource;
