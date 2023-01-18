import { createModel } from '@withtyped/server';

export const Tenants = createModel(/* sql */ `
  create table tenants (
    id varchar(32) not null,
    db_user_password varchar(128) not null,
    primary key (id)
  );
`);
