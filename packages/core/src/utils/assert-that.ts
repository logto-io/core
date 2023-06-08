import type { LogtoErrorCode } from '@logto/phrases';
import { assert } from '@silverhand/essentials';

import RequestError from '#src/errors/RequestError/index.js';

type AssertThatFunction = <E extends Error>(
  value: unknown,
  error: E | LogtoErrorCode
) => asserts value;

const assertThat: AssertThatFunction = (value, error): asserts value => {
  assert(value, error instanceof Error ? error : new RequestError({ code: error }));
};

export default assertThat;
