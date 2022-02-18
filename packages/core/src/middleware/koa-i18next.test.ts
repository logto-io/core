import i18next from 'i18next';

import initI18n from '@/i18n/init';
import { createContextWithRouteParameters } from '@/utils/test-utils';

import koaI18next from './koa-i18next';

// Can not access outter scope function in jest mock
// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('@/i18n/detect-language', () => () => ['zh-cn']);
const changLanguageSpy = jest.spyOn(i18next, 'changeLanguage');

describe('koaI18next', () => {
  const next = jest.fn();

  it('deteact language', async () => {
    const ctx = {
      ...createContextWithRouteParameters(),
      query: {},
      locale: 'en',
    };
    await initI18n();
    await koaI18next()(ctx, next);
    expect(ctx.locale).toEqual('zh-CN');
    expect(changLanguageSpy).toBeCalled();
  });
});
