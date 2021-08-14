import pick from 'lodash.pick';
import i18next from 'i18next';
import { LogtoErrorCode, LogtoErrorI18nKey } from '@logto/phrases';
import { RequestErrorBody, RequestErrorMetadata } from '@logto/schemas';

export default class RequestError extends Error {
  code: LogtoErrorCode;
  status: number;
  expose: boolean;
  data: unknown;

  constructor(input: RequestErrorMetadata | LogtoErrorCode, data?: unknown) {
    const { code, status = 400 } = typeof input === 'string' ? { code: input } : input;
    const message = i18next.t<string, LogtoErrorI18nKey>(`errors:${code}`);

    super(message);

    this.expose = true;
    this.code = code;
    this.status = status;
    this.data = data;
  }

  get body(): RequestErrorBody {
    return pick(this, 'message', 'code', 'data');
  }
}
