import type { LocalePhrase } from '../../types.js';

import action from './action.js';
import description from './description.js';
import error from './error/index.js';
import input from './input.js';
import list from './list.js';
import mfa from './mfa.js';
import secondary from './secondary.js';

const fr = {
  translation: {
    input,
    secondary,
    action,
    description,
    error,
    list,
    mfa,
  },
} satisfies LocalePhrase;

export default Object.freeze(fr);
