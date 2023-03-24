import errors from './errors.js';
import translation from './translation/index.js';
import type { LocalPhrase } from '../../types.js';

const trTR: LocalPhrase = Object.freeze({
  translation,
  errors,
});

export default trTR;
