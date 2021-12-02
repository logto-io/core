// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import { GeneratedSchema } from '../foundations';
import { PasswordEncryptionMethod } from './custom-types';

export type UserDBEntry = {
  id: string;
  username?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  passwordEncrypted?: string;
  passwordEncryptionMethod?: PasswordEncryptionMethod;
  passwordEncryptionSalt?: string;
};

export const UserSchemaGuard = z.object({
  id: z.string(),
  username: z.string().optional(),
  primaryEmail: z.string().optional(),
  primaryPhone: z.string().optional(),
  passwordEncrypted: z.string().optional(),
  passwordEncryptionMethod: z.nativeEnum(PasswordEncryptionMethod).optional(),
  passwordEncryptionSalt: z.string().optional(),
});

export const Users: GeneratedSchema<UserDBEntry> = Object.freeze({
  table: 'users',
  tableSingular: 'user',
  fields: {
    id: 'id',
    username: 'username',
    primaryEmail: 'primary_email',
    primaryPhone: 'primary_phone',
    passwordEncrypted: 'password_encrypted',
    passwordEncryptionMethod: 'password_encryption_method',
    passwordEncryptionSalt: 'password_encryption_salt',
  },
  fieldKeys: [
    'id',
    'username',
    'primaryEmail',
    'primaryPhone',
    'passwordEncrypted',
    'passwordEncryptionMethod',
    'passwordEncryptionSalt',
  ],
});
