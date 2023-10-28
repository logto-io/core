import { MfaFactor, UsersPasswordEncryptionMethod } from '@logto/schemas';

import { mockResource, mockAdminUserRole, mockScope } from '#src/__mocks__/index.js';
import { mockUser } from '#src/__mocks__/user.js';
import { MockQueries } from '#src/test-utils/tenant.js';

const { jest } = import.meta;

const { encryptUserPassword, createUserLibrary } = await import('./user.js');

const hasUserWithId = jest.fn();
const updateUserById = jest.fn();
const queries = new MockQueries({
  users: { hasUserWithId, findUserById: async () => mockUser, updateUserById },
  roles: { findRolesByRoleIds: async () => [mockAdminUserRole] },
  scopes: { findScopesByIdsAndResourceIndicator: async () => [mockScope] },
  usersRoles: { findUsersRolesByUserId: async () => [] },
  rolesScopes: { findRolesScopesByRoleIds: async () => [] },
});

describe('generateUserId()', () => {
  const { generateUserId } = createUserLibrary(queries);

  afterEach(() => {
    hasUserWithId.mockClear();
  });

  it('generates user ID with correct length when no conflict found', async () => {
    const mockedHasUserWithId = hasUserWithId.mockImplementationOnce(async () => false);

    await expect(generateUserId()).resolves.toHaveLength(12);
    expect(mockedHasUserWithId).toBeCalledTimes(1);
  });

  it('generates user ID with correct length when retry limit is not reached', async () => {
    // eslint-disable-next-line @silverhand/fp/no-let
    let tried = 0;
    const mockedHasUserWithId = hasUserWithId.mockImplementation(async () => {
      if (tried) {
        return false;
      }

      // eslint-disable-next-line @silverhand/fp/no-mutation
      tried++;

      return true;
    });

    await expect(generateUserId(2)).resolves.toHaveLength(12);
    expect(mockedHasUserWithId).toBeCalledTimes(2);
  });

  it('rejects with correct error message when retry limit is reached', async () => {
    const mockedHasUserWithId = hasUserWithId.mockImplementation(async () => true);

    await expect(generateUserId(10)).rejects.toThrow(
      'Cannot generate user ID in reasonable retries'
    );
    expect(mockedHasUserWithId).toBeCalledTimes(11);
  });
});

describe('encryptUserPassword()', () => {
  it('generates salt, encrypted and method', async () => {
    const { passwordEncryptionMethod, passwordEncrypted } = await encryptUserPassword('password');
    expect(passwordEncryptionMethod).toEqual(UsersPasswordEncryptionMethod.Argon2i);
    expect(passwordEncrypted).toContain('argon2');
  });
});

describe('findUserScopesForResourceId()', () => {
  const { findUserScopesForResourceIndicator } = createUserLibrary(queries);

  it('returns scopes that the user has access', async () => {
    await expect(
      findUserScopesForResourceIndicator(mockUser.id, mockResource.indicator)
    ).resolves.toEqual([mockScope]);
  });
});

describe('findUserRoles()', () => {
  const { findUserRoles } = createUserLibrary(queries);

  it('returns user roles', async () => {
    await expect(findUserRoles(mockUser.id)).resolves.toEqual([mockAdminUserRole]);
  });
});

describe('addUserMfaVerification()', () => {
  const createdAt = new Date().toISOString();
  const { addUserMfaVerification } = createUserLibrary(queries);

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(createdAt));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('update user with new mfa verification', async () => {
    await addUserMfaVerification(mockUser.id, { type: MfaFactor.TOTP, secret: 'secret' });
    expect(updateUserById).toHaveBeenCalledWith(mockUser.id, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      mfaVerifications: [{ type: MfaFactor.TOTP, key: 'secret', id: expect.anything(), createdAt }],
    });
  });
});
