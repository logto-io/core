export const isTrue = (value?: string) =>
  // We need to leverage the native type guard
  // eslint-disable-next-line no-implicit-coercion
  !!value && ['1', 'true', 'y', 'yes', 'yep', 'yeah'].includes(value.toLowerCase());
