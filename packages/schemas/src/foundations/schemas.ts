import { type SchemaLike } from '@logto/shared/universal';
import type { ZodObject, ZodType, ZodOptional, ZodTypeAny } from 'zod';

export type { SchemaLike, SchemaValue, SchemaValuePrimitive } from '@logto/shared/universal';

type ParseOptional<K> = undefined extends K
  ? ZodOptional<ZodType<Exclude<K, undefined>>>
  : ZodType<K>;

export type CreateGuard<T extends Record<string, unknown>> = ZodObject<
  {
    [key in keyof T]-?: ParseOptional<T[key]>;
  },
  'strip',
  ZodTypeAny,
  T
>;

export type Guard<T extends Record<string, unknown>> = ZodObject<
  {
    [key in keyof T]: ZodType<T[key]>;
  },
  'strip',
  ZodTypeAny,
  T
>;

export type GeneratedSchema<
  Key extends string,
  CreateSchema extends Partial<SchemaLike<Key>>,
  Schema extends SchemaLike<Key>,
> = Readonly<{
  table: string;
  tableSingular: string;
  fields: {
    [key in Key]: string;
  };
  fieldKeys: readonly Key[];
  createGuard: CreateGuard<CreateSchema>;
  guard: Guard<Schema>;
}>;
