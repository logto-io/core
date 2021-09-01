import i18next from 'i18next';
import { MiddlewareType } from 'koa';
import { IRouterParamContext } from 'koa-router';

import detectLanguage from '@/i18n/detect-language';

interface LanguageUtils {
  formatLanguageCode(code: string): string;
  isSupportedCode(code: string): boolean;
}

export type WithI18nContext<ContextT extends IRouterParamContext = IRouterParamContext> =
  ContextT & {
    locale: string;
  };

export default function koaI18next<
  StateT,
  ContextT extends IRouterParamContext,
  ResponseBodyT
>(): MiddlewareType<StateT, WithI18nContext<ContextT>, ResponseBodyT> {
  return async (ctx, next) => {
    const languages = detectLanguage(ctx);
    // Cannot patch type def directly, see https://github.com/microsoft/TypeScript/issues/36146
    const languageUtils = i18next.services.languageUtils as LanguageUtils;
    const found = languages
      .map((code) => languageUtils.formatLanguageCode(code))
      .find((code) => languageUtils.isSupportedCode(code));

    await i18next.changeLanguage(found);
    ctx.locale = i18next.language;
    return next();
  };
}
