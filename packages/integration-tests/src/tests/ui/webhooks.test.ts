import { logtoConsoleUrl as logtoConsoleUrlString } from '#src/constants.js';
import {
  goToAdminConsole,
  expectToSaveChanges,
  waitForToast,
  expectToClickModalAction,
  expectToClickDetailsPageOption,
  expectModalWithTitle,
  expectConfirmModalAndAct,
} from '#src/ui-helpers/index.js';
import { appendPathname, expectNavigation } from '#src/utils.js';

await page.setViewport({ width: 1280, height: 720 });

const createWebhookFromWebhooksPage = async () => {
  await expect(page).toClick('div[class$=main] div[class$=headline] > button');
  await expect(page).toClick('span[class$=label]', { text: 'Create new account' });
  await expect(page).toClick('span[class$=label]', { text: 'Sign in' });
  await expect(page).toFill('input[name=name]', 'hook_name');
  await expect(page).toFill('input[name=url]', 'https://example.com/webhook');
  await expect(page).toClick('button[type=submit]');
  await page.waitForSelector('div[class$=header] div[class$=metadata] div[class$=title]');
};

describe('webhooks', () => {
  const logtoConsoleUrl = new URL(logtoConsoleUrlString);

  beforeAll(async () => {
    await goToAdminConsole();
  });

  it('navigates to webhooks page on clicking sidebar menu', async () => {
    await expectNavigation(page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href));

    await expect(page).toMatchElement(
      'div[class$=main] div[class$=headline] div[class$=titleEllipsis]',
      {
        text: 'Webhooks',
      }
    );
  });

  it('can create a new webhook', async () => {
    await page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href);

    await createWebhookFromWebhooksPage();

    // Go to webhook details page
    await expect(page).toMatchElement('div[class$=main] div[class$=metadata] div[class$=title]', {
      text: 'hook_name',
    });
    const hookId = await page.$eval(
      'div[class$=main] div[class$=metadata] div[class$=row] div:first-of-type',
      (element) => element.textContent
    );
    if (hookId) {
      expect(page.url()).toBe(new URL(`console/webhooks/${hookId}/settings`, logtoConsoleUrl).href);
    }
  });

  it('fails to create webhook if no event is provided', async () => {
    await expectNavigation(page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href));

    await expect(page).toClick('div[class$=main] div[class$=headline] > button');
    await expect(page).toFill('input[name=name]', 'hook_name');
    await expect(page).toFill('input[name=url]', 'https://example.com/webhook');
    await expect(page).toClick('button[type=submit]');
    await expect(page).toMatchElement('.ReactModalPortal div[class$=errorMessage]', {
      text: 'You have to select at least one event.',
    });
  });

  it('fails to create webhook if endpoint url is not an HTTPS url', async () => {
    await expectNavigation(page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href));

    await expect(page).toClick('div[class$=main] div[class$=headline] > button');
    await expect(page).toClick('span[class$=label]', { text: 'Create new account' });
    await expect(page).toClick('span[class$=label]', { text: 'Sign in' });
    await expect(page).toFill('input[name=name]', 'hook_name');
    await expect(page).toFill('input[name=url]', 'http://example.com/webhook');
    await expect(page).toClick('button[type=submit]');
    await expect(page).toMatchElement('.ReactModalPortal div[class$=errorMessage]', {
      text: 'HTTPS format required for security reasons.',
    });
  });

  it('can update webhook details', async () => {
    await page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href);

    await createWebhookFromWebhooksPage();

    await expect(page).toFill('input[name=name]', 'hook_name_updated');
    await expect(page).toFill('input[name=url]', 'https://example.com/new-webhook');

    await expectToSaveChanges(page);
    await waitForToast(page, { text: 'Saved' });
  });

  it('can disable or enable a webhook', async () => {
    await page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href);
    await createWebhookFromWebhooksPage();

    // Disable webhook
    await expectToClickDetailsPageOption(page, 'Disable webhook');
    await expectModalWithTitle(page, 'Reminder');
    await expect(page).toMatchElement('.ReactModalPortal div[class$=content] div[class$=content]', {
      text: 'Are you sure you want to reactivate this webhook? Doing so will not send HTTP request to endpoint URL.',
    });
    await expectToClickModalAction(page, 'Disable webhook');

    await expect(page).toMatchElement(
      'div[class$=header] div[class$=metadata] div:nth-of-type(2) div[class$=outlined] div:nth-of-type(2)',
      {
        text: 'Not in use',
        timeout: 1000,
      }
    );

    // Reactivate webhook
    await expectToClickDetailsPageOption(page, 'Reactivate webhook');

    // Wait for the active webhook state info to appear
    await page.waitForSelector(
      'div[class$=header] div[class$=metadata] div:nth-of-type(2) div[class$=state]'
    );
  });

  it('can regenerate signing key for a webhook', async () => {
    await page.goto(appendPathname('/console/webhooks', logtoConsoleUrl).href);
    await createWebhookFromWebhooksPage();
    await expect(page).toClick('button[class$=regenerateButton]');

    await expectConfirmModalAndAct(page, {
      title: 'Regenerate signing key',
      actionText: 'Regenerate',
    });

    await waitForToast(page, { text: 'Signing key has been regenerated.' });
  });
});
