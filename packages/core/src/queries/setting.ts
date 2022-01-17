import { Setting, SettingUpdate, Settings } from '@logto/schemas';
import { sql } from 'slonik';

import pool from '@/database/pool';
import { buildUpdateWhere } from '@/database/update-where';
import { convertToIdentifiers, OmitAutoSetFields } from '@/database/utils';

export const defaultSettingId = 'default';

const { table, fields } = convertToIdentifiers(Settings);

export const getSetting = async () =>
  pool.one<Setting>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
    where ${fields.id}=${defaultSettingId}
  `);

export const updateSetting = async (setting: Partial<OmitAutoSetFields<SettingUpdate>>) => {
  return buildUpdateWhere<SettingUpdate, Setting>(
    pool,
    Settings,
    true
  )({ set: setting, where: { id: defaultSettingId } });
};
