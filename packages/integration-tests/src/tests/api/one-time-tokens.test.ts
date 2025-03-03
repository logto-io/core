import { OneTimeTokenStatus } from '@logto/schemas';
import { generateStandardId } from '@logto/shared';

import { createOneTimeToken } from '#src/api/one-time-token.js';
import { devFeatureTest } from '#src/utils.js';

devFeatureTest.it('should create one time token with default 2 days expiration time', async () => {
  const email = `foo${generateStandardId()}@bar.com`;
  const oneTimeToken = await createOneTimeToken({
    email,
  });

  expect(oneTimeToken.expiresAt).toBeGreaterThan(Date.now());
  expect(oneTimeToken.expiresAt).toBeLessThanOrEqual(Date.now() + 2 * 24 * 60 * 60 * 1000);
  expect(oneTimeToken.status).toBe(OneTimeTokenStatus.Active);
  expect(oneTimeToken.context).toBe({});
  expect(oneTimeToken.email).toBe(email);
  expect(oneTimeToken.token.length).toBe(32);
});

devFeatureTest.it('should create one time token with custom expiration time', async () => {
  const email = `foo${generateStandardId()}@bar.com`;
  const oneTimeToken = await createOneTimeToken({
    email,
    expiresIn: 30,
  });

  expect(oneTimeToken.expiresAt).toBeGreaterThan(Date.now());
  expect(oneTimeToken.expiresAt).toBeLessThanOrEqual(Date.now() + 30 * 1000);
  expect(oneTimeToken.status).toBe(OneTimeTokenStatus.Active);
  expect(oneTimeToken.email).toBe(email);
  expect(oneTimeToken.token.length).toBe(32);
});

devFeatureTest.it(
  'should create one time token with `applicationIds` and `jitOrganizationIds` configured',
  async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      applicationIds: ['app-1'],
      jitOrganizationIds: ['org-1'],
    });

    expect(oneTimeToken.status).toBe(OneTimeTokenStatus.Active);
    expect(oneTimeToken.email).toBe(email);
    expect(oneTimeToken.context).toEqual({
      applicationIds: ['app-1'],
      jitOrganizationIds: ['org-1'],
    });
    expect(oneTimeToken.token.length).toBe(32);
  }
);
