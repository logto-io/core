import { appendPath } from '@silverhand/essentials';
import { setDefaultOptions } from 'expect-puppeteer';

import {
  consolePassword,
  consoleUsername,
  logtoConsoleUrl as logtoConsoleUrlString,
} from '#src/constants.js';
import { appendPathname } from '#src/utils.js';

/**
 * NOTE: This test suite assumes test cases will run sequentially (which is Jest default).
 * Parallel execution will lead to errors.
 */
// Tip: See https://github.com/argos-ci/jest-puppeteer/blob/main/packages/expect-puppeteer/README.md
// for convenient expect methods
describe('smoke testing for console admin account creation and sign-in', () => {
  setDefaultOptions({ timeout: 2000 });
  const logtoConsoleUrl = new URL(logtoConsoleUrlString);

  it('can open with app element and navigate to welcome page', async () => {
    await page.goto(logtoConsoleUrl.href);
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await expect(page).toMatchElement('#app');
    expect(page.url()).toBe(new URL('console/welcome', logtoConsoleUrl).href);
  });

  it('can register a new admin account and automatically sign in', async () => {
    await expect(page).toClick('button', { text: 'Create account' });

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toBe(new URL('register', logtoConsoleUrl).href);

    await expect(page).toFill('input[name=identifier]', consoleUsername);
    await expect(page).toClick('button[name=submit]');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toBe(appendPathname('/register/password', logtoConsoleUrl).href);

    await expect(page).toFillForm('form', {
      newPassword: consolePassword,
      confirmPassword: consolePassword,
    });

    await expect(page).toClick('button[name=submit]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    expect(page.url()).toBe(new URL('console/get-started', logtoConsoleUrl).href);
  });

  it('can sign out of admin console', async () => {
    await expect(page).toClick('div[class$=topbar] > div[class$=container]');

    // Try awaiting for 500ms before clicking sign-out button
    await page.waitForTimeout(500);

    await expect(page).toClick(
      '.ReactModalPortal div[class$=dropdownContainer] div[class$=dropdownItem]:last-child'
    );
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    expect(page.url()).toBe(new URL('sign-in', logtoConsoleUrl).href);
  });

  it('can sign in to admin console again', async () => {
    const initialHref = appendPath(logtoConsoleUrl, 'console', 'applications').href;
    // Should be able to redirect back after sign-in
    await page.goto(initialHref);
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await expect(page).toFillForm('form', {
      identifier: consoleUsername,
      password: consolePassword,
    });
    await expect(page).toClick('button[name=submit]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    expect(page.url()).toBe(initialHref);

    await expect(page).toClick('div[class$=topbar] > div:last-child');

    const userMenu = await page.waitForSelector('.ReactModalPortal div[class$=dropdownContainer]');
    await expect(userMenu).toMatchElement('div[class$=nameWrapper] > div[class$=name]', {
      text: consoleUsername,
    });

    await expect(page).toClick('div[class^=ReactModal__Overlay]');
  });

  it('renders SVG correctly with viewbox property', async () => {
    await page.waitForSelector('div[class$=topbar] > svg[viewbox][class$=logo]');
  });
});
