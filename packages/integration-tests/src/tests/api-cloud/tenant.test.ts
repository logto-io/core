import {
  cloudApiIndicator,
  CloudScope,
  AdminTenantRole,
  type Resource,
  type Scope,
  type Role,
  TenantTag,
  type TenantInfo,
  type CreateTenant,
} from '@logto/schemas';

import { authedAdminTenantApi } from '#src/api/api.js';
import { updateTenant, createTenant, getTenants } from '#src/api/tenant.js';
import { createUserAndSignInToCloudClient } from '#src/helpers/admin-tenant.js';

describe('Tenant APIs', () => {
  it('should be able to create multiple tenants for `admin` role', async () => {
    const { client } = await createUserAndSignInToCloudClient(AdminTenantRole.Admin);
    const accessToken = await client.getAccessToken(cloudApiIndicator);
    const payload1 = {
      name: 'tenant1',
      tag: TenantTag.Staging,
    };
    const tenant1 = await createTenant(accessToken, payload1);
    const payload2 = {
      name: 'tenant2',
      tag: TenantTag.Production,
    };
    const tenant2 = await createTenant(accessToken, payload2);
    for (const [payload, tenant] of [
      [payload1, tenant1],
      [payload2, tenant2],
    ] as Array<[Required<Pick<CreateTenant, 'name' | 'tag'>>, TenantInfo]>) {
      expect(tenant).toHaveProperty('id');
      expect(tenant).toHaveProperty('tag', payload.tag);
      expect(tenant).toHaveProperty('name', payload.name);
    }
    const tenant2Updated = await updateTenant(accessToken, tenant2.id, {
      tag: TenantTag.Staging,
      name: 'tenant2-updated',
    });
    expect(tenant2Updated.id).toEqual(tenant2.id);
    expect(tenant2Updated).toHaveProperty('tag', TenantTag.Staging);
    expect(tenant2Updated).toHaveProperty('name', 'tenant2-updated');
    const tenants = await getTenants(accessToken);
    expect(tenants.length).toBeGreaterThan(2);
    expect(tenants.find((tenant) => tenant.id === tenant1.id)).toStrictEqual(tenant1);
    expect(tenants.find((tenant) => tenant.id === tenant2Updated.id)).toStrictEqual(tenant2Updated);
  });

  it('should be able to create multiple tenants for `user` role', async () => {
    const { client } = await createUserAndSignInToCloudClient(AdminTenantRole.User);
    const accessToken = await client.getAccessToken(cloudApiIndicator);
    const payload1 = {
      name: 'tenant1',
      tag: TenantTag.Staging,
    };
    const tenant1 = await createTenant(accessToken, payload1);
    const payload2 = {
      name: 'tenant2',
      tag: TenantTag.Development,
    };
    const tenant2 = await createTenant(accessToken, payload2);
    for (const [payload, tenant] of [
      [payload1, tenant1],
      [payload2, tenant2],
    ] as Array<[Required<Pick<CreateTenant, 'name' | 'tag'>>, TenantInfo]>) {
      expect(tenant).toHaveProperty('id');
      expect(tenant).toHaveProperty('tag', payload.tag);
      expect(tenant).toHaveProperty('name', payload.name);
    }
    const tenants = await getTenants(accessToken);
    expect(tenants.length).toEqual(2);
    expect(tenants.find((tenant) => tenant.id === tenant1.id)).toStrictEqual(tenant1);
    expect(tenants.find((tenant) => tenant.id === tenant2.id)).toStrictEqual(tenant2);
    const { client: anotherClient } = await createUserAndSignInToCloudClient(AdminTenantRole.User);
    const anotherAccessToken = await anotherClient.getAccessToken(cloudApiIndicator);
    const anotherTenant = await createTenant(anotherAccessToken, {
      name: 'another-tenant',
      tag: TenantTag.Development,
    });
    await expect(
      updateTenant(accessToken, anotherTenant.id, { name: 'another-tenant-updated' })
    ).rejects.toThrow();
  });

  it('`user` role should have `CloudScope.ManageTenantSelf` scope', async () => {
    const resources = await authedAdminTenantApi.get('resources').json<Resource[]>();
    const cloudApiResource = resources.find(({ indicator }) => indicator === cloudApiIndicator);
    expect(cloudApiResource).toBeDefined();
    const scopes = await authedAdminTenantApi
      .get(`resources/${cloudApiResource!.id}/scopes`)
      .json<Scope[]>();
    const manageTenantSelfScope = scopes.find(
      (scope) => scope.name === CloudScope.ManageTenantSelf
    );
    expect(manageTenantSelfScope).toBeDefined();
    const roles = await authedAdminTenantApi.get('roles').json<Role[]>();
    const userRole = roles.find(({ name }) => name === 'user');
    expect(userRole).toBeDefined();
    const roleScopes = await authedAdminTenantApi
      .get(`roles/${userRole!.id}/scopes`)
      .json<Scope[]>();
    expect(roleScopes.find(({ id }) => id === manageTenantSelfScope!.id)).toBeDefined();
  });
});
