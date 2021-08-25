import { ZodObject, ZodType } from 'zod';

export type Guard<T extends Record<string, unknown>> = ZodObject<
  {
    [key in keyof T]: ZodType<T[key]>;
  }
>;

export type SchemaValuePrimitive = string | number | boolean | undefined;
export type SchemaValue = SchemaValuePrimitive | Record<string, unknown>;
export type SchemaLike<Key extends string> = {
  [key in Key]: SchemaValue;
};

export type GeneratedSchema<Schema extends SchemaLike<string>> = keyof Schema extends string
  ? Readonly<{
      table: string;
      tableSingular: string;
      fields: {
        [key in keyof Schema]: string;
      };
      fieldKeys: ReadonlyArray<keyof Schema>;
      guard: Guard<Schema>;
    }>
  : never;
