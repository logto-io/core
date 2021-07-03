create type password_encryption_method as enum ('SaltAndPepper');

create table users (
  id varchar(24) not null,
  user_name varchar(128) unique,
  primary_email varchar(128) unique,
  primary_phone varchar(128) unique,
  password_encrypted varchar(128),
  password_encryption_method password_encryption_method,
  password_encryption_salt varchar(128),
  primary key (id)
);
