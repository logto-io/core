import { type OrganizationInvitationEntity } from '@logto/schemas';

import { authedAdminApi } from './api.js';
import { ApiFactory } from './factory.js';

export type PostOrganizationInvitationData = {
  inviterId?: string;
  invitee: string;
  organizationId: string;
  expiresAt: number;
  organizationRoleIds?: string[];
};

export class OrganizationInvitationApi extends ApiFactory<
  OrganizationInvitationEntity,
  PostOrganizationInvitationData
> {
  constructor() {
    super('organization-invitations');
  }

  override async create(data: PostOrganizationInvitationData, skipEmail = false) {
    return authedAdminApi
      .post(this.path, {
        searchParams: {
          skipEmail: skipEmail.toString(),
        },
        json: data,
      })
      .json<OrganizationInvitationEntity>();
  }
}
