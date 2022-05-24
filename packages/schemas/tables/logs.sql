create table logs
(
  id varchar(21) not null,
  type varchar(64) not null,
  payload jsonb /* @use ArbitraryObject */ not null default '{}'::jsonb,
  created_at timestamptz not null default (now()),
  primary key (id)
);

create index logs__type on logs (type);
create index logs__created_at on logs (created_at);
create index logs__user_id on logs ((payload->>'user_id') nulls last);
create index logs__application_id on logs ((payload->>'application_id') nulls last);
