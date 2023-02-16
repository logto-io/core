import { logtoConsoleUrl } from '#src/constants.js';
import { generatePassword } from '#src/utils.js';

describe('smoke testing', () => {
  const consoleUsername = 'admin';
  const consolePassword = generatePassword();

  it('opens with app element and navigates to welcome page', async () => {
    const navigation = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.goto(logtoConsoleUrl);
    await navigation;

    await expect(page.waitForSelector('#app')).resolves.not.toBeNull();
    expect(page.url()).toBe(new URL('console/welcome', logtoConsoleUrl).href);
  });

  it('registers a new admin account and automatically signs in', async () => {
    const createAccountButton = await page.waitForSelector('button');
    expect(createAccountButton).not.toBeNull();

    const navigateToRegister = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await createAccountButton.click();
    await navigateToRegister;

    expect(page.url()).toBe(new URL('register', logtoConsoleUrl).href);

    const usernameField = await page.waitForSelector('input[name=identifier]');
    const submitButton = await page.waitForSelector('button[name=submit]');

    await usernameField.type(consoleUsername);

    const navigateToSignIn = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await submitButton.click();
    await navigateToSignIn;

    expect(page.url()).toBe(new URL('register/password', logtoConsoleUrl).href);

    const passwordField = await page.waitForSelector('input[name=newPassword]');
    const confirmPasswordField = await page.waitForSelector('input[name=confirmPassword]');
    const saveButton = await page.waitForSelector('button[name=submit]');
    await passwordField.type(consolePassword);
    await confirmPasswordField.type(consolePassword);

    const navigateToGetStarted = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await saveButton.click();
    await navigateToGetStarted;

    expect(page.url()).toBe(new URL('console/get-started', logtoConsoleUrl).href);
  });

  it('signs out of admin console', async () => {
    const userElement = await page.waitForSelector('div[class$=topbar] > div[class$=container]');
    await userElement.click();

    // Try awaiting for 500ms before clicking sign-out button
    await page.waitForTimeout(500);

    const signOutButton = await page.waitForSelector(
      '.ReactModalPortal div[class$=dropdownContainer] div[class$=dropdownItem]:last-child'
    );
    const navigation = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await signOutButton.click();
    await navigation;

    expect(page.url()).toBe(new URL('sign-in', logtoConsoleUrl).href);
  });

  it('signs in to admin console', async () => {
    const usernameField = await page.waitForSelector('input[name=identifier]');
    const passwordField = await page.waitForSelector('input[name=password]');
    const submitButton = await page.waitForSelector('button[name=submit]');

    await usernameField.type(consoleUsername);
    await passwordField.type(consolePassword);

    const navigation = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await submitButton.click();
    await navigation;

    expect(page.url()).toBe(new URL('console/get-started', logtoConsoleUrl).href);

    const userElement = await page.waitForSelector('div[class$=topbar] > div:last-child');
    await userElement.click();

    const userMenu = await page.waitForSelector('.ReactModalPortal div[class$=dropdownContainer]');
    const usernameString = await userMenu.$eval(
      'div[class$=nameWrapper] > div[class$=name]',
      (element) => element.textContent
    );
    expect(usernameString).toBe(consoleUsername);
  });

  it('renders SVG correctly with viewbox property', async () => {
    const logoSvg = await page.waitForSelector('div[class$=topbar] > svg[viewbox]');

    expect(logoSvg).not.toBeNull();
  });
});
