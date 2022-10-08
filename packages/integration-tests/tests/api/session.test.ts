import { adminConsoleApplicationId } from '@logto/schemas/lib/seeds';
import { assert } from '@silverhand/essentials';

import {
  mockEmailConnectorId,
  mockEmailConnectorConfig,
  mockSmsConnectorId,
  mockSmsConnectorConfig,
} from '@/__mocks__/connectors-mock';
import {
  sendRegisterUserWithEmailPasscode,
  verifyRegisterUserWithEmailPasscode,
  checkVerificationSessionAndRegisterWithEmail,
  sendSignInUserWithEmailPasscode,
  verifySignInUserWithEmailPasscode,
  checkVerificationSessionAndSignInWithEmail,
  sendRegisterUserWithSmsPasscode,
  verifyRegisterUserWithSmsPasscode,
  checkVerificationSessionAndRegisterWithSms,
  sendSignInUserWithSmsPasscode,
  verifySignInUserWithSmsPasscode,
  checkVerificationSessionAndSignInWithSms,
  disableConnector,
  signInWithUsernameAndPassword,
} from '@/api';
import MockClient from '@/client';
import {
  registerNewUser,
  signIn,
  setUpConnector,
  readPasscode,
  createUserByAdmin,
} from '@/helpers';
import { generateUsername, generatePassword, generateEmail, generatePhone } from '@/utils';

describe('username and password flow', () => {
  const username = generateUsername();
  const password = generatePassword();

  it('register with username & password', async () => {
    await expect(registerNewUser(username, password)).resolves.not.toThrow();
  });

  it('sign-in with username & password', async () => {
    await expect(signIn(username, password)).resolves.not.toThrow();
  });
});

describe('email passwordless flow', () => {
  beforeAll(async () => {
    await setUpConnector(mockEmailConnectorId, mockEmailConnectorConfig);
  });

  // Since we can not create a email register user throw admin. Have to run the register then sign-in concurrently.
  const email = generateEmail();

  it('register with email', async () => {
    const client = new MockClient();

    await client.initSession();
    assert(client.interactionCookie, new Error('Session not found'));

    await expect(
      sendRegisterUserWithEmailPasscode(email, client.interactionCookie)
    ).resolves.not.toThrow();

    const passcodeRecord = await readPasscode();

    expect(passcodeRecord).toMatchObject({
      address: email,
      type: 'Register',
    });

    const { code } = passcodeRecord;

    await expect(
      verifyRegisterUserWithEmailPasscode(email, code, client.interactionCookie)
    ).resolves.not.toThrow();

    const { redirectTo } = await checkVerificationSessionAndRegisterWithEmail(
      client.interactionCookie
    );

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);
  });

  it('sign-in with email', async () => {
    const client = new MockClient();

    await client.initSession();
    assert(client.interactionCookie, new Error('Session not found'));

    await expect(
      sendSignInUserWithEmailPasscode(email, client.interactionCookie)
    ).resolves.not.toThrow();

    const passcodeRecord = await readPasscode();

    expect(passcodeRecord).toMatchObject({
      address: email,
      type: 'SignIn',
    });

    const { code } = passcodeRecord;

    await expect(
      verifySignInUserWithEmailPasscode(email, code, client.interactionCookie)
    ).resolves.not.toThrow();

    const { redirectTo } = await checkVerificationSessionAndSignInWithEmail(
      client.interactionCookie
    );

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);
  });

  afterAll(async () => {
    void disableConnector(mockEmailConnectorId);
  });
});

describe('sms passwordless flow', () => {
  beforeAll(async () => {
    await setUpConnector(mockSmsConnectorId, mockSmsConnectorConfig);
  });

  // Since we can not create a sms register user throw admin. Have to run the register then sign-in concurrently.
  const phone = generatePhone();

  it('register with sms', async () => {
    const client = new MockClient();

    await client.initSession();
    assert(client.interactionCookie, new Error('Session not found'));

    await expect(
      sendRegisterUserWithSmsPasscode(phone, client.interactionCookie)
    ).resolves.not.toThrow();

    const passcodeRecord = await readPasscode();

    expect(passcodeRecord).toMatchObject({
      phone,
      type: 'Register',
    });

    const { code } = passcodeRecord;

    await expect(
      verifyRegisterUserWithSmsPasscode(phone, code, client.interactionCookie)
    ).resolves.not.toThrow();

    const { redirectTo } = await checkVerificationSessionAndRegisterWithSms(
      client.interactionCookie
    );

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);
  });

  it('sign-in with sms', async () => {
    const client = new MockClient();

    await client.initSession();
    assert(client.interactionCookie, new Error('Session not found'));

    await expect(
      sendSignInUserWithSmsPasscode(phone, client.interactionCookie)
    ).resolves.not.toThrow();

    const passcodeRecord = await readPasscode();

    expect(passcodeRecord).toMatchObject({
      phone,
      type: 'SignIn',
    });

    const { code } = passcodeRecord;

    await expect(
      verifySignInUserWithSmsPasscode(phone, code, client.interactionCookie)
    ).resolves.not.toThrow();

    const { redirectTo } = await checkVerificationSessionAndSignInWithSms(client.interactionCookie);

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);
  });

  afterAll(async () => {
    void disableConnector(mockSmsConnectorId);
  });
});

describe('sign-in and sign-out', () => {
  const username = generateUsername();
  const password = generatePassword();

  beforeAll(async () => {
    await createUserByAdmin(username, password);
  });

  it('verify sign-in and then sign-out', async () => {
    const client = new MockClient();
    await client.initSession();

    assert(client.interactionCookie, new Error('Session not found'));

    const { redirectTo } = await signInWithUsernameAndPassword(
      username,
      password,
      client.interactionCookie
    );

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);

    await client.signOut();

    await expect(client.isAuthenticated()).resolves.toBe(false);
  });
});

describe('sign-in to demo app and revisit Admin Console', () => {
  const username = generateUsername();
  const password = generatePassword();

  beforeAll(async () => {
    await createUserByAdmin(username, password);
  });

  it('should throw in Admin Console consent step if a logged in user does not have admin role', async () => {
    const client = new MockClient();
    await client.initSession();

    assert(client.interactionCookie, new Error('Session not found'));

    const { redirectTo } = await signInWithUsernameAndPassword(
      username,
      password,
      client.interactionCookie
    );

    await client.processSession(redirectTo);

    await expect(client.isAuthenticated()).resolves.toBe(true);

    const { interactionCookie } = client;
    const acClient = new MockClient({ appId: adminConsoleApplicationId });

    acClient.assignCookie(interactionCookie);

    await expect(acClient.initSession()).rejects.toThrow();
  });
});
