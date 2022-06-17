create type users_password_encryption_method as enum ('Argon2i');

create table users (
  id varchar(12) not null,
  username varchar(128) unique,
  primary_email varchar(128) unique,
  primary_phone varchar(128) unique,
  password_encrypted varchar(128),
  password_encryption_method users_password_encryption_method,
  name varchar(128),
  avatar varchar(2048),
  application_id varchar(21),
  role_names jsonb /* @use RoleNames */ not null default '[]'::jsonb,
  identities jsonb /* @use Identities */ not null default '{}'::jsonb,
  custom_data jsonb /* @use ArbitraryObject */ not null default '{}'::jsonb,
  last_sign_in_at timestamptz,
  primary key (id)
);
