import type { SignInExperience, CreateSignInExperience } from '@logto/schemas';
import { SignInExperiences } from '@logto/schemas';
import type { CommonQueryMethods } from 'slonik';

import { buildFindEntityByIdWithPool } from '#src/database/find-entity-by-id.js';
import { buildUpdateWhereWithPool } from '#src/database/update-where.js';
import envSet from '#src/env-set/index.js';

const id = 'default';

export const createSignInExperienceQueries = (pool: CommonQueryMethods) => {
  const updateSignInExperience = buildUpdateWhereWithPool(pool)<
    CreateSignInExperience,
    SignInExperience
  >(SignInExperiences, true);

  const updateDefaultSignInExperience = async (set: Partial<CreateSignInExperience>) =>
    updateSignInExperience({ set, where: { id }, jsonbMode: 'replace' });

  const findDefaultSignInExperience = async () =>
    buildFindEntityByIdWithPool(pool)<CreateSignInExperience, SignInExperience>(SignInExperiences)(
      id
    );

  return { updateDefaultSignInExperience, findDefaultSignInExperience };
};

/** @deprecated Will be removed soon. Use createSignInExperienceQueries() factory instead. */
export const { updateDefaultSignInExperience, findDefaultSignInExperience } =
  createSignInExperienceQueries(envSet.pool);
