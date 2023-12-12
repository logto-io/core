/* init_order = 2 */

/** The user scopes (permissions) assigned to an application */
create table application_user_scope_relations (
  tenant_id varchar(21) not null
    references tenants (id) on update cascade on delete cascade,
  /** The globally unique identifier of the application. */
  application_id varchar(21) not null
    references applications (id) on update cascade on delete cascade,
  user_scopes jsonb /* @use UserScopes */ not null default '[]',
  primary key (application_id)
);
