import { type PasswordRejectionCode } from '@logto/core-kit';

const password_rejected = {
  too_short: 'Minimum length is {{min}}.',
  too_long: 'Maximum length is {{max}}.',
  character_types: 'At least {{min}} types of characters are required.',
  unsupported_characters: 'Unsupported character found.',
  pwned: 'Avoid using simple passwords that are easy to guess.',
  restricted_found: 'Avoid overusing {{list, list}}.',
  restricted_repetition: 'repeated characters',
  restricted_sequence: 'sequential characters',
  restricted_userinfo: 'your personal information',
  restricted_words: 'product context',
} satisfies Record<PasswordRejectionCode, string> & {
  // Use for displaying a list of restricted issues
  restricted_found: string;
};

export default Object.freeze(password_rejected);
