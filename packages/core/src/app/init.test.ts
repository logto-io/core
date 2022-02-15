import Koa from 'koa';

/**
 * Need to mock env variables ahead
 */

// eslint-disable-next-line import/order
import { envVariablesSetUp } from '@/utils/test-utils';

envVariablesSetUp();

/* eslint-disable import/first */
import * as koaErrorHandler from '@/middleware/koa-error-handler';
import * as koaI18next from '@/middleware/koa-i18next';
import * as koaOIDCErrorHandler from '@/middleware/koa-oidc-error-handler';
import * as koaSlonikErrorHandler from '@/middleware/koa-slonik-error-handler';
import * as koaUIProxy from '@/middleware/koa-ui-proxy';
import * as koaUserLog from '@/middleware/koa-user-log';
import * as initOidc from '@/oidc/init';
import * as initRouter from '@/routes/init';

import initI18n from '../i18n/init';
import initApp from './init';
/* eslint-enable import/first */

describe('App Init', () => {
  const listenMock = jest.spyOn(Koa.prototype, 'listen').mockImplementation(jest.fn());

  const middleWares = [
    koaErrorHandler,
    koaI18next,
    koaOIDCErrorHandler,
    koaSlonikErrorHandler,
    koaUIProxy,
    koaUserLog,
  ];
  const initMethods = [initRouter, initOidc];

  const middleWareSpys = middleWares.map((module) => jest.spyOn(module, 'default'));
  const initMethodSpys = initMethods.map((module) => jest.spyOn(module, 'default'));

  it('app init properly with 404 not found route', async () => {
    const app = new Koa();
    await initI18n();
    await initApp(app);

    for (const middleware of middleWareSpys) {
      expect(middleware).toBeCalled();
    }

    for (const inits of initMethodSpys) {
      expect(inits).toBeCalled();
    }

    expect(listenMock).toBeCalled();
  });
});
