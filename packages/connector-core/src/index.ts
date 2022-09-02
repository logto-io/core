import { ZodType } from 'zod';

import { ConnectorError, ConnectorErrorCodes } from './types';

export * from './types';

export function validateConfig<T>(config: unknown, guard: ZodType): asserts config is T {
  const result = guard.safeParse(config);

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.InvalidConfig, result.error);
  }
}

export const jsonSafeParse = (
  jsonString: string,
  errorCode: ConnectorErrorCodes = ConnectorErrorCodes.InvalidResponse,
  payload?: unknown
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(jsonString);
  } catch {
    throw new ConnectorError(errorCode, payload ?? jsonString);
  }
};
