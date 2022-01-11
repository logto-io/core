import { Setting, SettingDBEntry, Settings } from '@logto/schemas';
import { sql } from 'slonik';

import pool from '@/database/pool';
import { buildUpdateWhere } from '@/database/update-where';
import { convertToIdentifiers, OmitAutoSetFields } from '@/database/utils';

const { table, fields } = convertToIdentifiers(Settings);

export const getSetting = async () =>
  pool.one<Setting>(sql`
    select ${sql.join(Object.values(fields), sql`, `)}
    from ${table}
  `);

export const updateSetting = buildUpdateWhere<SettingDBEntry, Setting>(pool, Settings, true);

export const updateSettingById = async (
  id: string,
  set: Partial<OmitAutoSetFields<SettingDBEntry>>
) => updateSetting({ set, where: { id } });
