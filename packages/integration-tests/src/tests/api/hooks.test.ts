import type { Hook, HookConfig, LogKey } from '@logto/schemas';
import { HookEvent, SignInIdentifier, LogResult, InteractionEvent } from '@logto/schemas';

import { authedAdminApi, deleteUser, getLogs, putInteraction } from '#src/api/index.js';
import { createResponseWithCode } from '#src/helpers/admin-tenant.js';
import { initClient, processSession } from '#src/helpers/client.js';
import { createMockServer } from '#src/helpers/index.js';
import { enableAllPasswordSignInMethods } from '#src/helpers/sign-in-experience.js';
import { generateNewUser, generateNewUserProfile } from '#src/helpers/user.js';
import { waitFor } from '#src/utils.js';

type CreateHookPayload = Pick<Hook, 'name' | 'events'> & {
  config: HookConfig;
};

const createPayload = (event: HookEvent, url = 'not_work_url'): CreateHookPayload => ({
  name: 'hook_name',
  events: [event],
  config: {
    url,
    headers: { foo: 'bar' },
  },
});

describe('hooks', () => {
  const { listen, close } = createMockServer(9999);

  beforeAll(async () => {
    await enableAllPasswordSignInMethods({
      identifiers: [SignInIdentifier.Username],
      password: true,
      verify: false,
    });
    await listen();
  });

  afterAll(async () => {
    await close();
  });

  it('should be able to create, query, update, and delete a hook', async () => {
    const payload = createPayload(HookEvent.PostRegister);
    const created = await authedAdminApi.post('hooks', { json: payload }).json<Hook>();

    expect(created).toMatchObject(payload);

    expect(await authedAdminApi.get('hooks').json<Hook[]>()).toContainEqual(created);
    expect(await authedAdminApi.get(`hooks/${created.id}`).json<Hook>()).toEqual(created);
    expect(
      await authedAdminApi
        .patch(`hooks/${created.id}`, { json: { events: [HookEvent.PostSignIn] } })
        .json<Hook>()
    ).toMatchObject({ ...created, events: [HookEvent.PostSignIn] });
    expect(await authedAdminApi.delete(`hooks/${created.id}`)).toHaveProperty('statusCode', 204);
    await expect(authedAdminApi.get(`hooks/${created.id}`)).rejects.toHaveProperty(
      'response.statusCode',
      404
    );
  });

  it('should be able to create, query, update, and delete a hook by the original API', async () => {
    const payload = {
      event: HookEvent.PostRegister,
      config: {
        url: 'not_work_url',
        retries: 2,
      },
    };
    const created = await authedAdminApi.post('hooks', { json: payload }).json<Hook>();

    expect(created).toMatchObject(payload);

    expect(await authedAdminApi.get('hooks').json<Hook[]>()).toContainEqual(created);
    expect(await authedAdminApi.get(`hooks/${created.id}`).json<Hook>()).toEqual(created);
    expect(
      await authedAdminApi
        .patch(`hooks/${created.id}`, { json: { event: HookEvent.PostSignIn } })
        .json<Hook>()
    ).toMatchObject({
      ...created,
      event: HookEvent.PostSignIn,
    });
    expect(await authedAdminApi.delete(`hooks/${created.id}`)).toHaveProperty('statusCode', 204);
    await expect(authedAdminApi.get(`hooks/${created.id}`)).rejects.toHaveProperty(
      'response.statusCode',
      404
    );
  });

  it('should throw error when creating a hook with an empty hook name', async () => {
    const payload = {
      name: '',
      events: [HookEvent.PostRegister],
      config: {
        url: 'not_work_url',
      },
    };
    await expect(authedAdminApi.post('hooks', { json: payload })).rejects.toMatchObject(
      createResponseWithCode(400)
    );
  });

  it('should throw error when no event is provided when creating a hook', async () => {
    const payload = {
      name: 'hook_name',
      config: {
        url: 'not_work_url',
      },
    };
    await expect(authedAdminApi.post('hooks', { json: payload })).rejects.toMatchObject(
      createResponseWithCode(400)
    );
  });

  it('should throw error if update a hook with a invalid hook id', async () => {
    const payload = {
      name: 'new_hook_name',
    };

    await expect(authedAdminApi.patch('hooks/invalid_id', { json: payload })).rejects.toMatchObject(
      createResponseWithCode(404)
    );
  });

  it('should throw error if regenerate a hook signing key with a invalid hook id', async () => {
    await expect(authedAdminApi.patch('hooks/invalid_id/signing-key')).rejects.toMatchObject(
      createResponseWithCode(404)
    );
  });

  it('should trigger sign-in hook and record error when interaction finished', async () => {
    const createdHook = await authedAdminApi
      .post('hooks', { json: createPayload(HookEvent.PostSignIn) })
      .json<Hook>();
    const logKey: LogKey = 'TriggerHook.PostSignIn';

    // Init session and submit
    const {
      userProfile: { username, password },
      user,
    } = await generateNewUser({ username: true, password: true });
    const client = await initClient();
    await client.successSend(putInteraction, {
      event: InteractionEvent.SignIn,
      identifier: {
        username,
        password,
      },
    });
    await client.submitInteraction();
    await waitFor(500); // Wait for hooks execution

    // Check hook trigger log
    const logs = await getLogs(new URLSearchParams({ logKey, page_size: '100' }));
    expect(
      logs.some(
        ({ payload: { hookId, result, error } }) =>
          hookId === createdHook.id &&
          result === LogResult.Error &&
          error === 'RequestError: Invalid URL'
      )
    ).toBeTruthy();

    // Clean up
    await authedAdminApi.delete(`hooks/${createdHook.id}`);
    await deleteUser(user.id);
  });

  it('should trigger multiple register hooks and record properly when interaction finished', async () => {
    const [hook1, hook2, hook3] = await Promise.all([
      authedAdminApi.post('hooks', { json: createPayload(HookEvent.PostRegister) }).json<Hook>(),
      authedAdminApi
        .post('hooks', { json: createPayload(HookEvent.PostRegister, 'http://localhost:9999') })
        .json<Hook>(),
      // Using the old API to create a hook
      authedAdminApi
        .post('hooks', {
          json: {
            event: HookEvent.PostRegister,
            config: { url: 'http://localhost:9999', retries: 2 },
          },
        })
        .json<Hook>(),
    ]);
    const logKey: LogKey = 'TriggerHook.PostRegister';

    // Init session and submit
    const { username, password } = generateNewUserProfile({ username: true, password: true });
    const client = await initClient();
    await client.send(putInteraction, {
      event: InteractionEvent.Register,
      profile: {
        username,
        password,
      },
    });
    const { redirectTo } = await client.submitInteraction();
    const id = await processSession(client, redirectTo);
    await waitFor(500); // Wait for hooks execution

    // Check hook trigger log
    const logs = await getLogs(new URLSearchParams({ logKey, page_size: '100' }));
    expect(
      logs.some(
        ({ payload: { hookId, result, error } }) =>
          hookId === hook1.id && result === LogResult.Error && error === 'RequestError: Invalid URL'
      )
    ).toBeTruthy();
    expect(
      logs.some(
        ({ payload: { hookId, result } }) => hookId === hook2.id && result === LogResult.Success
      )
    ).toBeTruthy();
    expect(
      logs.some(
        ({ payload: { hookId, result } }) => hookId === hook3.id && result === LogResult.Success
      )
    ).toBeTruthy();

    // Clean up
    await Promise.all([
      authedAdminApi.delete(`hooks/${hook1.id}`),
      authedAdminApi.delete(`hooks/${hook2.id}`),
      authedAdminApi.delete(`hooks/${hook3.id}`),
    ]);
    await deleteUser(id);
  });
});
