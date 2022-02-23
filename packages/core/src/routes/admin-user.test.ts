import { CreateUser, User, userInfoSelectFields } from '@logto/schemas';
import pick from 'lodash.pick';

import { hasUser, findUserById } from '@/queries/user';
import { mockUser, mockUserList, mockUserListResponse, mockUserResponse } from '@/utils/mock';
import { createRequester } from '@/utils/test-utils';

import adminUserRoutes from './admin-user';

const filterUsersWithSearch = (users: User[], search: string) =>
  users.filter((user) =>
    [user.username, user.primaryEmail, user.primaryPhone, user.name].some((value) =>
      value ? !value.includes(search) : false
    )
  );

jest.mock('@/queries/user', () => ({
  findTotalNumberOfUsers: jest.fn(async (search) => ({
    count: search ? filterUsersWithSearch(mockUserList, search).length : mockUserList.length,
  })),
  findAllUsers: jest.fn(
    async (limit, offset, search): Promise<User[]> =>
      search ? filterUsersWithSearch(mockUserList, search) : mockUserList
  ),
  findUserById: jest.fn(async (): Promise<User> => mockUser),
  hasUser: jest.fn(async () => false),
  updateUserById: jest.fn(
    async (_, data: Partial<CreateUser>): Promise<User> => ({
      ...mockUser,
      ...data,
    })
  ),
  insertUser: jest.fn(
    async (user: CreateUser): Promise<User> => ({
      ...mockUser,
      ...user,
    })
  ),
}));

jest.mock('@/lib/user', () => ({
  generateUserId: jest.fn(() => 'fooId'),
  encryptUserPassword: jest.fn(() => ({
    passwordEncryptionSalt: 'salt',
    passwordEncrypted: 'password',
    passwordEncryptionMethod: 'saltAndPepper',
  })),
}));

describe('adminUserRoutes', () => {
  const userRequest = createRequester(adminUserRoutes);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /users', async () => {
    const response = await userRequest.get('/users');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockUserListResponse);
    expect(response.header).toHaveProperty('total-number', `${mockUserList.length}`);
  });

  it('GET /users should return matched data', async () => {
    const search = 'foo';
    const response = await userRequest.get('/users').send({ search });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      filterUsersWithSearch(mockUserList, search).map((user) => pick(user, ...userInfoSelectFields))
    );
    expect(response.header).toHaveProperty(
      'total-number',
      `${filterUsersWithSearch(mockUserList, search).length}`
    );
  });

  it('GET /users/:userId', async () => {
    const response = await userRequest.get('/users/foo');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockUserResponse);
  });

  it('POST /users', async () => {
    const username = 'MJ@logto.io';
    const password = 'PASSWORD';
    const name = 'Micheal';

    const response = await userRequest.post('/users').send({ username, password, name });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...mockUserResponse,
      id: 'fooId',
      username,
      name,
    });
  });

  it('POST /users should throw with invalid input params', async () => {
    const username = 'MJ@logto.io';
    const password = 'PASSWORD';
    const name = 'Micheal';

    // Missing input
    await expect(userRequest.post('/users').send({})).resolves.toHaveProperty('status', 400);
    await expect(userRequest.post('/users').send({ username, password })).resolves.toHaveProperty(
      'status',
      400
    );
    await expect(userRequest.post('/users').send({ username, name })).resolves.toHaveProperty(
      'status',
      400
    );
    await expect(userRequest.post('/users').send({ password, name })).resolves.toHaveProperty(
      'status',
      400
    );

    // Invalid input format
    await expect(
      userRequest.post('/users').send({ username: 'xy', password, name })
    ).resolves.toHaveProperty('status', 400);
    await expect(
      userRequest.post('/users').send({ username, password: 'abc', name })
    ).resolves.toHaveProperty('status', 400);
    await expect(
      userRequest.post('/users').send({ username, password, name: 'xy' })
    ).resolves.toHaveProperty('status', 400);
  });

  it('POST /users should throw if username exist', async () => {
    const mockHasUser = hasUser as jest.Mock;
    mockHasUser.mockImplementationOnce(async () => Promise.resolve(true));

    const username = 'MJ@logto.io';
    const password = 'PASSWORD';
    const name = 'Micheal';

    await expect(
      userRequest.post('/users').send({ username, password, name })
    ).resolves.toHaveProperty('status', 422);
  });

  it('PATCH /users/:userId', async () => {
    const name = 'Micheal';
    const avatar = 'http://www.micheal.png';

    const response = await userRequest.patch('/users/foo').send({ name, avatar });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...mockUserResponse,
      name,
      avatar,
    });
  });

  it('PATCH /users/:userId throw with invalid input params', async () => {
    const name = 'Micheal';
    const avatar = 'http://www.micheal.png';

    await expect(userRequest.patch('/users/foo').send({ avatar })).resolves.toHaveProperty(
      'status',
      200
    );

    await expect(
      userRequest.patch('/users/foo').send({ name, avatar: 'non url' })
    ).resolves.toHaveProperty('status', 400);
  });

  it('PATCH /users/:userId throw if user not found', async () => {
    const name = 'Micheal';
    const avatar = 'http://www.micheal.png';

    const mockFindUserById = findUserById as jest.Mock;
    mockFindUserById.mockImplementationOnce(() => {
      throw new Error(' ');
    });

    await expect(userRequest.patch('/users/foo').send({ name, avatar })).resolves.toHaveProperty(
      'status',
      500
    );
  });
});
