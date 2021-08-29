/* eslint-disable import/first */
import 'module-alias/register.js';

import dotenv from 'dotenv';
import Koa from 'koa';

dotenv.config();

import initApp from './app/init';
import initI18n from './i18n/init';

const app = new Koa();

(async () => {
  try {
    await initI18n();
    await initApp(app);
  } catch (error: unknown) {
    console.log('Error while initializing app', error);
  }
})();
