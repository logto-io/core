import type { User } from '@logto/schemas';
import { MfaFactor, userInfoSelectFields, UsersPasswordEncryptionMethod } from '@logto/schemas';
import { pick } from '@silverhand/essentials';

export const mockUser: User = {
  tenantId: 'fake_tenant',
  id: 'foo',
  username: 'foo',
  primaryEmail: 'foo@logto.io',
  primaryPhone: '111111',
  passwordEncrypted: 'password',
  passwordEncryptionMethod: UsersPasswordEncryptionMethod.Argon2i,
  name: null,
  avatar: null,
  identities: {
    connector1: { userId: 'connector1', details: {} },
  },
  logtoConfig: {},
  mfaVerifications: [],
  customData: {},
  applicationId: 'bar',
  lastSignInAt: 1_650_969_465_789,
  createdAt: 1_650_969_000_000,
  isSuspended: false,
};

export const mockUserTotpMfaVerification = {
  id: 'fake_totp_id',
  type: MfaFactor.TOTP,
  createdAt: new Date().toISOString(),
  key: 'key',
} satisfies User['mfaVerifications'][number];

export const mockUserWebAuthnMfaVerification = {
  id: 'fake_webauthn_id',
  type: MfaFactor.WebAuthn,
  createdAt: new Date().toISOString(),
  credentialId: 'credentialId',
  publicKey: 'publickKey',
  counter: 0,
  agent: 'agent',
} satisfies User['mfaVerifications'][number];

export const mockUserBackupCodeMfaVerification = {
  id: 'fake_backup_code_id',
  type: MfaFactor.BackupCode,
  createdAt: new Date().toISOString(),
  codes: [{ code: 'code' }],
} satisfies User['mfaVerifications'][number];

export const mockUserWithMfaVerifications: User = {
  ...mockUser,
  mfaVerifications: [mockUserTotpMfaVerification],
};

export const mockUserResponse = pick(mockUser, ...userInfoSelectFields);

export const mockPasswordEncrypted = 'a1b2c3';
export const mockUserWithPassword: User = {
  tenantId: 'fake_tenant',
  id: 'id',
  username: 'username',
  primaryEmail: 'foo@logto.io',
  primaryPhone: '111111',
  passwordEncrypted: mockPasswordEncrypted,
  passwordEncryptionMethod: UsersPasswordEncryptionMethod.Argon2i,
  name: null,
  avatar: null,
  identities: {
    connector1: { userId: 'connector1', details: {} },
  },
  customData: {},
  logtoConfig: {},
  mfaVerifications: [],
  applicationId: 'bar',
  lastSignInAt: 1_650_969_465_789,
  createdAt: 1_650_969_000_000,
  isSuspended: false,
};

export const mockUserList: User[] = [
  {
    tenantId: 'fake_tenant',
    id: '1',
    username: 'foo1',
    primaryEmail: 'foo1@logto.io',
    primaryPhone: '111111',
    passwordEncrypted: null,
    passwordEncryptionMethod: null,
    name: null,
    avatar: null,
    identities: {},
    customData: {},
    logtoConfig: {},
    mfaVerifications: [],
    applicationId: 'bar',
    lastSignInAt: 1_650_969_465_000,
    createdAt: 1_650_969_000_000,
    isSuspended: false,
  },
  {
    tenantId: 'fake_tenant',
    id: '2',
    username: 'foo2',
    primaryEmail: 'foo2@logto.io',
    primaryPhone: '111111',
    passwordEncrypted: null,
    passwordEncryptionMethod: null,
    name: null,
    avatar: null,
    identities: {},
    customData: {},
    logtoConfig: {},
    mfaVerifications: [],
    applicationId: 'bar',
    lastSignInAt: 1_650_969_465_000,
    createdAt: 1_650_969_000_000,
    isSuspended: false,
  },
  {
    tenantId: 'fake_tenant',
    id: '3',
    username: 'foo3',
    primaryEmail: 'foo3@logto.io',
    primaryPhone: '111111',
    passwordEncrypted: null,
    passwordEncryptionMethod: null,
    name: null,
    avatar: null,
    identities: {},
    customData: {},
    logtoConfig: {},
    mfaVerifications: [],
    applicationId: 'bar',
    lastSignInAt: 1_650_969_465_000,
    createdAt: 1_650_969_000_000,
    isSuspended: false,
  },
  {
    tenantId: 'fake_tenant',
    id: '4',
    username: 'bar1',
    primaryEmail: 'bar1@logto.io',
    primaryPhone: '111111',
    passwordEncrypted: null,
    passwordEncryptionMethod: null,
    name: null,
    avatar: null,
    identities: {},
    customData: {},
    logtoConfig: {},
    mfaVerifications: [],
    applicationId: 'bar',
    lastSignInAt: 1_650_969_465_000,
    createdAt: 1_650_969_000_000,
    isSuspended: false,
  },
  {
    tenantId: 'fake_tenant',
    id: '5',
    username: 'bar2',
    primaryEmail: 'bar2@logto.io',
    primaryPhone: '111111',
    passwordEncrypted: null,
    passwordEncryptionMethod: null,
    name: null,
    avatar: null,
    identities: {},
    customData: {},
    logtoConfig: {},
    mfaVerifications: [],
    applicationId: 'bar',
    lastSignInAt: 1_650_969_465_000,
    createdAt: 1_650_969_000_000,
    isSuspended: false,
  },
];

export const mockUserListResponse = mockUserList.map((user) => pick(user, ...userInfoSelectFields));
