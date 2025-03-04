import { OneTimeTokenStatus } from '@logto/schemas';
import { generateStandardId } from '@logto/shared';

import { createOneTimeToken, verifyOneTimeToken } from '#src/api/one-time-token.js';
import { devFeatureTest } from '#src/utils.js';

const { it, describe } = devFeatureTest;

describe('one time tokens API', () => {
  it('should create one time token with default 2 days expiration time', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
    });

    expect(oneTimeToken.expiresAt).toBeGreaterThan(Date.now());
    expect(oneTimeToken.expiresAt).toBeLessThanOrEqual(Date.now() + 2 * 24 * 60 * 60 * 1000);
    expect(oneTimeToken.status).toBe(OneTimeTokenStatus.Active);
    expect(oneTimeToken.context).toEqual({});
    expect(oneTimeToken.email).toBe(email);
    expect(oneTimeToken.token.length).toBe(32);
  });

  it('should create one time token with custom expiration time', async () => {
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

  it('should create one time token with `applicationIds` and `jitOrganizationIds` configured', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      jitOrganizationIds: ['org-1'],
    });

    expect(oneTimeToken.status).toBe(OneTimeTokenStatus.Active);
    expect(oneTimeToken.email).toBe(email);
    expect(oneTimeToken.context).toEqual({
      jitOrganizationIds: ['org-1'],
    });
    expect(oneTimeToken.token.length).toBe(32);
  });

  it('should verify one time token', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      jitOrganizationIds: ['org-1'],
    });

    const { isValid } = await verifyOneTimeToken({
      email,
      token: oneTimeToken.token,
    });

    expect(isValid).toBe(true);
  });

  it('should not succeed to verify one time token with expired token', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      jitOrganizationIds: ['org-1'],
      expiresIn: 1,
    });

    // Wait for the token to be expired
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await expect(
      verifyOneTimeToken({
        email,
        token: oneTimeToken.token,
      })
    ).rejects.toThrow('one_time_token.token_expired');
  });

  it('should not succeed to verify one time token wrong email', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      jitOrganizationIds: ['org-1'],
    });

    await expect(
      verifyOneTimeToken({
        email: 'wrong-email@bar.com',
        token: oneTimeToken.token,
      })
    ).rejects.toThrow('one_time_token.active_token_not_found');
  });

  it('should not succeed to verify one time token wrong token', async () => {
    const email = `foo${generateStandardId()}@bar.com`;
    const oneTimeToken = await createOneTimeToken({
      email,
      jitOrganizationIds: ['org-1'],
    });

    await expect(
      verifyOneTimeToken({
        email,
        token: 'wrong-token',
      })
    ).rejects.toThrow('one_time_token.active_token_not_found');
  });
});
