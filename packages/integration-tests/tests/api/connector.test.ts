import { HTTPError } from 'got';

import {
  mockEmailConnectorConfig,
  mockEmailConnectorId,
  mockSmsConnectorConfig,
  mockSmsConnectorId,
  mockSocialConnectorConfig,
  mockSocialConnectorId,
  mockStandardEmailConnectorConfig,
  mockStandardEmailConnectorId,
} from '@/__mocks__/connectors-mock';
import {
  deleteConnectorById,
  getConnector,
  listConnectors,
  postConnector,
  sendEmailTestMessage,
  sendSmsTestMessage,
  updateConnectorConfig,
} from '@/api/connector';

const connectorIdMap = new Map();

/*
 * We'd better only use mock connectors in integration tests.
 * Since we will refactor connectors soon, keep using some real connectors
 * for testing updating configs and enabling/disabling for now.
 */
test('connector set-up flow', async () => {
  const connectors = await listConnectors();
  await Promise.all(
    connectors.map(async ({ id }) => {
      await deleteConnectorById(id);
    })
  );
  connectorIdMap.clear();

  /*
   * Set up social/SMS/email connectors
   */
  await Promise.all(
    [
      { connectorId: mockSmsConnectorId, config: mockSmsConnectorConfig },
      { connectorId: mockEmailConnectorId, config: mockEmailConnectorConfig },
      { connectorId: mockSocialConnectorId, config: mockSocialConnectorConfig },
    ].map(async ({ connectorId, config }) => {
      const { id } = await postConnector(connectorId);
      connectorIdMap.set(connectorId, id);
      const updatedConnector = await updateConnectorConfig(id, config);
      expect(updatedConnector.config).toEqual(config);

      // The result of getting a connector should be same as the result of updating a connector above.
      const connector = await getConnector(id);
      expect(connector.config).toEqual(config);
    })
  );

  /*
   * It should update the connector config successfully when it is valid; otherwise, it should fail.
   * We will test updating to the invalid connector config, that is the case not covered above.
   */
  await expect(
    updateConnectorConfig(connectorIdMap.get(mockSocialConnectorId), mockSmsConnectorConfig)
  ).rejects.toThrow(HTTPError);
  // To confirm the failed updating request above did not modify the original config,
  // we check: the mock connector config should stay the same.
  const mockSocialConnector = await getConnector(connectorIdMap.get(mockSocialConnectorId));
  expect(mockSocialConnector.config).toEqual(mockSocialConnectorConfig);

  /*
   * Change to another SMS/Email connector
   */
  const { id } = await postConnector(mockStandardEmailConnectorId, {
    target: 'mock-standard-mail',
  }); // TODO [LOG-4862]: update mock connector
  await updateConnectorConfig(id, mockStandardEmailConnectorConfig, {
    target: 'mock-standard-mail',
  }); // TODO [LOG-4862]: update mock connector
  connectorIdMap.set(mockStandardEmailConnectorId, id);
  const currentConnectors = await listConnectors();
  expect(
    currentConnectors.some((connector) => connector.connectorId === mockEmailConnectorId)
  ).toBeFalsy();
  connectorIdMap.delete(mockEmailConnectorId);
  expect(
    currentConnectors.some((connector) => connector.connectorId === mockStandardEmailConnectorId)
  ).toBeTruthy();
  expect(
    currentConnectors.find((connector) => connector.connectorId === mockStandardEmailConnectorId)
      ?.config
  ).toEqual(mockStandardEmailConnectorConfig);

  /*
   * Delete (i.e. disable) a connector
   */
  await expect(
    deleteConnectorById(connectorIdMap.get(mockStandardEmailConnectorId))
  ).resolves.not.toThrow();
  connectorIdMap.delete(mockStandardEmailConnectorId);

  /**
   * List connectors after manually setting up connectors.
   * The result of listing connectors should be same as the result of updating connectors above.
   */
  expect(await listConnectors()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: connectorIdMap.get(mockSmsConnectorId),
        connectorId: mockSmsConnectorId,
        config: mockSmsConnectorConfig,
      }),
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: connectorIdMap.get(mockSocialConnectorId),
        connectorId: mockSocialConnectorId,
        config: mockSocialConnectorConfig,
      }),
    ])
  );
});

test('send SMS/email test message', async () => {
  const connectors = await listConnectors();
  await Promise.all(
    connectors.map(async ({ id }) => {
      await deleteConnectorById(id);
    })
  );
  connectorIdMap.clear();

  await Promise.all(
    [{ connectorId: mockSmsConnectorId }, { connectorId: mockEmailConnectorId }].map(
      async ({ connectorId }) => {
        const { id } = await postConnector(connectorId);
        connectorIdMap.set(connectorId, id);
      }
    )
  );

  const phone = '8612345678901';
  const email = 'test@example.com';

  await expect(
    sendSmsTestMessage(connectorIdMap.get(mockSmsConnectorId), phone, mockSmsConnectorConfig)
  ).resolves.not.toThrow();
  await expect(
    sendEmailTestMessage(connectorIdMap.get(mockEmailConnectorId), email, mockEmailConnectorConfig)
  ).resolves.not.toThrow();
  await expect(sendSmsTestMessage(mockSmsConnectorId, phone, {})).rejects.toThrow(HTTPError);
  await expect(sendEmailTestMessage(mockEmailConnectorId, email, {})).rejects.toThrow(HTTPError);

  for (const [_connectorId, id] of connectorIdMap.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await deleteConnectorById(id);
  }
});
