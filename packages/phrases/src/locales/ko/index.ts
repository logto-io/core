import errors from './errors.js';
import translation from './translation/index.js';
import type { LocalPhrase } from '../../types.js';

const ko: LocalPhrase = Object.freeze({
  translation,
  errors,
});

export default ko;
