import { OneTimeTokens } from '@logto/schemas';
import type { CommonQueryMethods } from '@silverhand/slonik';

import { buildInsertIntoWithPool } from '#src/database/insert-into.js';
import { convertToIdentifiers } from '#src/utils/sql.js';

const { table, fields } = convertToIdentifiers(OneTimeTokens);

export const createOneTimeTokenQueries = (pool: CommonQueryMethods) => {
  const insertOneTimeToken = buildInsertIntoWithPool(pool)(OneTimeTokens, {
    returning: true,
  });

  return {
    insertOneTimeToken,
  };
};
