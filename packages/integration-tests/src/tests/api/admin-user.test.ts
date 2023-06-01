import { HTTPError } from 'got';

import {
  mockSocialConnectorConfig,
  mockSocialConnectorId,
  mockSocialConnectorTarget,
} from '#src/__mocks__/connectors-mock.js';
import {
  getUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  deleteUserIdentity,
  postConnector,
  getConnectorAuthorizationUri,
  deleteConnectorById,
  postUserIdentity,
  verifyUserPassword,
} from '#src/api/index.js';
import { createResponseWithCode } from '#src/helpers/admin-tenant.js';
import { createUserByAdmin } from '#src/helpers/index.js';
import { createNewSocialUserWithUsernameAndPassword } from '#src/helpers/interactions.js';
import { generateUsername, generateEmail, generatePhone, generatePassword } from '#src/utils.js';

describe('admin console user management', () => {
  it('should create and get user successfully', async () => {
    const user = await createUserByAdmin();

    const userDetails = await getUser(user.id);
    expect(userDetails.id).toBe(user.id);
  });

  it('should fail when create user with conflict identifiers', async () => {
    const [username, password, email, phone] = [
      generateUsername(),
      generatePassword(),
      generateEmail(),
      generatePhone(),
    ];
    await createUserByAdmin(username, password, email, phone);
    await expect(createUserByAdmin(username, password)).rejects.toMatchObject(
      createResponseWithCode(422)
    );
    await expect(createUserByAdmin(undefined, undefined, email)).rejects.toMatchObject(
      createResponseWithCode(422)
    );
    await expect(createUserByAdmin(undefined, undefined, undefined, phone)).rejects.toMatchObject(
      createResponseWithCode(422)
    );
  });

  it('should fail when get user by invalid id', async () => {
    await expect(getUser('invalid-user-id')).rejects.toMatchObject(createResponseWithCode(404));
  });

  it('should update userinfo successfully', async () => {
    const user = await createUserByAdmin();

    const newUserData = {
      name: 'new name',
      primaryEmail: generateEmail(),
      primaryPhone: generatePhone(),
      username: generateUsername(),
      avatar: 'https://new.avatar.com/avatar.png',
      customData: {
        level: 1,
      },
    };

    const updatedUser = await updateUser(user.id, newUserData);

    expect(updatedUser).toMatchObject(newUserData);
  });

  it('should fail when update userinfo with conflict identifiers', async () => {
    const [username, email, phone] = [generateUsername(), generateEmail(), generatePhone()];
    await createUserByAdmin(username, undefined, email, phone);
    const anotherUser = await createUserByAdmin();

    await expect(updateUser(anotherUser.id, { username })).rejects.toMatchObject(
      createResponseWithCode(422)
    );
    await expect(updateUser(anotherUser.id, { primaryEmail: email })).rejects.toMatchObject(
      createResponseWithCode(422)
    );
    await expect(updateUser(anotherUser.id, { primaryPhone: phone })).rejects.toMatchObject(
      createResponseWithCode(422)
    );
  });

  it('should delete user successfully', async () => {
    const user = await createUserByAdmin();

    const userEntity = await getUser(user.id);
    expect(userEntity).toMatchObject(user);

    await deleteUser(user.id);

    const response = await getUser(user.id).catch((error: unknown) => error);
    expect(response instanceof HTTPError && response.response.statusCode === 404).toBe(true);
  });

  it('should update user password successfully', async () => {
    const user = await createUserByAdmin();
    const userEntity = await updateUserPassword(user.id, 'new_password');
    expect(userEntity).toMatchObject(user);
  });

  it('should link social identity successfully', async () => {
    const { id: connectorId } = await postConnector({
      connectorId: mockSocialConnectorId,
      config: mockSocialConnectorConfig,
    });

    const state = 'random_state';
    const redirectUri = 'http://mock.social.com/callback/random_string';
    const code = 'random_code_from_social';
    const socialUserId = 'social_platform_user_id';
    const socialUserEmail = 'johndoe@gmail.com';

    const { id: userId } = await createUserByAdmin();
    const { redirectTo } = await getConnectorAuthorizationUri(connectorId, state, redirectUri);

    expect(redirectTo).toBe(`http://mock.social.com/?state=${state}&redirect_uri=${redirectUri}`);

    const identities = await postUserIdentity(userId, connectorId, {
      code,
      state,
      redirectUri,
      userId: socialUserId,
      email: socialUserEmail,
    });

    expect(identities).toHaveProperty(mockSocialConnectorTarget);
    expect(identities[mockSocialConnectorTarget]).toMatchObject({
      userId: socialUserId,
      details: {
        id: socialUserId,
        email: socialUserEmail,
      },
    });

    await deleteConnectorById(connectorId);
  });

  it('should delete user identities successfully', async () => {
    const { id: connectorId } = await postConnector({
      connectorId: mockSocialConnectorId,
      config: mockSocialConnectorConfig,
    });

    const createdUserId = await createNewSocialUserWithUsernameAndPassword(connectorId);

    const userInfo = await getUser(createdUserId);
    expect(userInfo.identities).toHaveProperty(mockSocialConnectorTarget);

    await deleteUserIdentity(createdUserId, mockSocialConnectorTarget);

    const updatedUser = await getUser(createdUserId);

    expect(updatedUser.identities).not.toHaveProperty(mockSocialConnectorTarget);

    await deleteConnectorById(connectorId);
  });

  it('should return 204 if password is correct', async () => {
    const user = await createUserByAdmin(undefined, 'new_password');
    expect(await verifyUserPassword(user.id, 'new_password')).toHaveProperty('statusCode', 204);
    void deleteUser(user.id);
  });

  it('should return 422 if password is incorrect', async () => {
    const user = await createUserByAdmin(undefined, 'new_password');
    await expect(verifyUserPassword(user.id, 'wrong_password')).rejects.toMatchObject(
      createResponseWithCode(422)
    );
    void deleteUser(user.id);
  });

  it('should return 400 if password is empty', async () => {
    const user = await createUserByAdmin();
    await expect(verifyUserPassword(user.id, '')).rejects.toMatchObject(
      createResponseWithCode(400)
    );
    void deleteUser(user.id);
  });
});
