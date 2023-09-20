import { generateStandardId } from '@logto/shared/universal';
import { deduplicate } from '@silverhand/essentials';
import { sql } from 'slonik';

import type { AlterationScript } from '../lib/types/alteration.js';

enum InternalRole {
  Admin = '#internal:admin',
}

enum RoleType {
  User = 'User',
  MachineToMachine = 'MachineToMachine',
}

enum PredefinedScope {
  All = 'all',
}

const managementApiResourceIndicatorPrefix = 'https://';
const managementApiResourceIndicatorSuffix = '.logto.app/api';
const getManagementApiResourceIndicator = (tenantId: string) =>
  `${managementApiResourceIndicatorPrefix}${tenantId}${managementApiResourceIndicatorSuffix}`;

const managementApiAccessRoleName = 'Management API Access';
const managementApiAccessRoleDescription = 'Management API Access';

const alteration: AlterationScript = {
  up: async (pool) => {
    /**
     * Step 1
     * Get all internal admin roles.
     * Notice that in our case: each internal admin role has only one scope (`PredefinedScope.All`), and each tenant has only one internal admin role.
     */
    const { rows: userAssignedInternalManagementApiRoles } = await pool.query<{
      roleId: string;
      tenantId: string;
      scopeId: string;
    }>(sql`
      select * from (select roles.id as "role_id", roles.tenant_id as "tenant_id", scopes.id as "scope_id", resources.id as "resource_id", resources.indicator as "indicator" from roles join roles_scopes on roles_scopes.role_id = roles.id and roles_scopes.tenant_id = roles.tenant_id join scopes on scopes.id = roles_scopes.scope_id and scopes.tenant_id = roles_scopes.tenant_id join resources on resources.id = scopes.resource_id and resources.tenant_id = scopes.tenant_id
      where roles.name = ${InternalRole.Admin} and roles.type = ${
        RoleType.MachineToMachine
      } and scopes.name = ${
        PredefinedScope.All
      } and resources.indicator like ${getManagementApiResourceIndicator(
        '%'
      )} and resources.name = 'Logto Management API') as subQuery where concat(${managementApiResourceIndicatorPrefix}::varchar,subQuery.tenant_id,${managementApiResourceIndicatorSuffix}::varchar) = subQuery.indicator;
    `);
    /**
     * Step 2
     * Get all applications_roles related to the internal admin roles.
     */
    const { rows: applicationRoles } = await pool.query<{
      id: string;
      applicationId: string;
      roleId: string;
      tenantId: string;
    }>(sql`
      select * from applications_roles where (role_id, tenant_id) in (values ${sql.join(
        userAssignedInternalManagementApiRoles.map(
          ({ roleId, tenantId }) => sql`( ${roleId}, ${tenantId} )`
        ),
        sql`, `
      )});
    `);
    /**
     * Step 3
     * Create new roles with only management API access for tenants (m2m apps with internal admin access should share the same role),
     * we can not directly assign internal admin roles to m2m applications since it's "internal" and invisible to Logto users.
     */
    /** A tenant can have multiple applications with internal admin role, hence need to `deduplicate()`. */
    const tenantsNeedManagementApiAccessRole = deduplicate(
      applicationRoles.map(({ tenantId }) => tenantId)
    );
    if (tenantsNeedManagementApiAccessRole.length === 0) {
      return;
    }
    const { rows: insertedRoles } = await pool.query<{
      id: string;
      tenantId: string;
      name: string;
      description: string;
      type: RoleType;
    }>(sql`
      insert into roles (tenant_id, id, name, description, type) values ${sql.join(
        tenantsNeedManagementApiAccessRole.map(
          (tenantId) =>
            sql`( ${tenantId}, ${generateStandardId()}, ${managementApiAccessRoleName}, ${managementApiAccessRoleDescription}, ${
              RoleType.MachineToMachine
            } )`
        ),
        sql`, `
      )} returning *;
    `);
    /**
     * Step 4
     * Assign internal admin access scopes to new roles.
     */
    await Promise.all(
      insertedRoles.map(async ({ tenantId, id: roleId }) => {
        const internalRoleForTenant = userAssignedInternalManagementApiRoles.find(
          ({ tenantId: roleTenantId }) => tenantId === roleTenantId
        );
        if (!internalRoleForTenant) {
          return;
        }
        await pool.query<{
          tenantId: string;
          id: string;
          roleId: string;
          scopeId: string;
        }>(sql`
          insert into roles_scopes (tenant_id, id, role_id, scope_id) values (${tenantId}, ${generateStandardId()}, ${roleId}, ${
            internalRoleForTenant.scopeId
          });
        `);
      })
    );
    /**
     * Step 5
     * Should remove internal admin access roles from m2m applications and assign new roles (created in step 3) to them.
     * These two steps can be done by simply replace the role_id in applications_roles table.
     */
    await Promise.all(
      insertedRoles.map(async ({ tenantId, id: roleId }) => {
        const applicationRolesOfTheTenant = applicationRoles.filter(
          ({ tenantId: applicationRoleTenantId }) => tenantId === applicationRoleTenantId
        );
        const previousInternalRole = userAssignedInternalManagementApiRoles.find(
          ({ tenantId: internalRoleTenantId }) => internalRoleTenantId === tenantId
        );
        if (applicationRolesOfTheTenant.length === 0 || !previousInternalRole) {
          return;
        }
        await pool.query<{
          id: string;
          applicationId: string;
          roleId: string;
          tenantId: string;
        }>(sql`
          update applications_roles set role_id = ${roleId} where tenant_id = ${tenantId} and role_id = ${
            previousInternalRole.roleId
          } and application_id in (${sql.join(
            applicationRolesOfTheTenant.map(({ applicationId }) => applicationId),
            sql`, `
          )});
        `);
      })
    );
  },
  down: async (pool) => {
    /**
     * Step 1
     * Get all auto-created management api access roles.
     * Notice that in our case: each management api access role has only one scope (`PredefinedScope.All`), and each tenant has only one management api access role.
     */
    const { rows: userAssignedManagementApiAccessRoles } = await pool.query<{
      roleId: string;
      tenantId: string;
      scopeId: string;
    }>(sql`
      select * from (select roles.id as "role_id", roles.tenant_id as "tenant_id", scopes.id as "scope_id", resources.id as "resource_id", resources.indicator as "indicator" from roles join roles_scopes on roles_scopes.role_id = roles.id and roles_scopes.tenant_id = roles.tenant_id join scopes on scopes.id = roles_scopes.scope_id and scopes.tenant_id = roles_scopes.tenant_id join resources on resources.id = scopes.resource_id and resources.tenant_id = scopes.tenant_id
      where roles.name = ${managementApiAccessRoleName} and roles.description = ${managementApiAccessRoleDescription} and roles.type = ${
        RoleType.MachineToMachine
      } and scopes.name = ${
        PredefinedScope.All
      } and resources.indicator like ${getManagementApiResourceIndicator(
        '%'
      )} and resources.name = 'Logto Management API') as subQuery where concat(${managementApiResourceIndicatorPrefix}::varchar,subQuery.tenant_id,${managementApiResourceIndicatorSuffix}::varchar) = subQuery.indicator;
    `);
    /**
     * Step 2
     * Get all applications_roles related to the management api access role.
     */
    if (userAssignedManagementApiAccessRoles.length === 0) {
      return;
    }
    const { rows: applicationRoles } = await pool.query<{
      id: string;
      applicationId: string;
      roleId: string;
      tenantId: string;
    }>(sql`
      select * from applications_roles where (role_id, tenant_id) in (values ${sql.join(
        userAssignedManagementApiAccessRoles.map(
          ({ roleId, tenantId }) => sql`( ${roleId}, ${tenantId} )`
        ),
        sql`, `
      )});
    `);
    /**
     * Step 3
     * Find all internal admin access roles.
     */
    const concernedTenantIds = deduplicate(
      userAssignedManagementApiAccessRoles.map(({ tenantId }) => tenantId)
    );
    const { rows: internalAdminAccessRoles } = await pool.query<{
      roleId: string;
      tenantId: string;
    }>(sql`
      select roles.id as "roleId", roles.tenant_id as "tenantId" from roles join roles_scopes on roles.tenant_id = roles_scopes.tenant_id and roles.id = roles_scopes.role_id join scopes on scopes.tenant_id = roles_scopes.tenant_id and scopes.id = roles_scopes.scope_id join resources on resources.id = scopes.resource_id and resources.tenant_id = scopes.tenant_id where roles.name = ${
        InternalRole.Admin
      } and ( roles.tenant_id, resources.indicator ) in (values ${sql.join(
        concernedTenantIds.map(
          (tenantId) => sql`( ${tenantId}, ${getManagementApiResourceIndicator(tenantId)} )`
        ),
        sql`, `
      )});
    `);
    /**
     * Step 4
     * Assign internal admin access roles to m2m apps with management api access roles. (Found in step 2)
     */
    await Promise.all(
      internalAdminAccessRoles.map(async ({ roleId: internalAdminAccessRoleId, tenantId }) => {
        const pendingApplicationsOfTenant = applicationRoles.filter(
          ({ tenantId: applicationTenantId }) => tenantId === applicationTenantId
        );
        const previousManagementApiAccessRole = userAssignedManagementApiAccessRoles.find(
          ({ tenantId: managementApiAccessRoleTenantId }) =>
            managementApiAccessRoleTenantId === tenantId
        );
        if (pendingApplicationsOfTenant.length === 0 || !previousManagementApiAccessRole) {
          return;
        }
        await pool.query<{
          id: string;
          applicationId: string;
          roleId: string;
          tenantId: string;
        }>(sql`
          update applications_roles set role_id = ${internalAdminAccessRoleId} where tenant_id = ${tenantId} and role_id = ${
            previousManagementApiAccessRole.roleId
          } and application_id in (${sql.join(
            pendingApplicationsOfTenant.map(({ applicationId }) => applicationId),
            sql`, `
          )});
        `);
      })
    );
    /**
     * Step 5
     * Remove management api access roles. (`roles_scopes` will automatically be removed if roles are removed)
     */
    if (userAssignedManagementApiAccessRoles.length === 0) {
      return;
    }
    await Promise.all(
      userAssignedManagementApiAccessRoles.map(async ({ roleId, tenantId }) => {
        await pool.query(sql`
          delete from roles where id = ${roleId} and tenant_id = ${tenantId};
        `);
      })
    );
  },
};

export default alteration;
