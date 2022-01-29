import { createHmac } from 'crypto';

import { has } from '@silverhand/essentials';
import got from 'got';

import { ConnectorError } from '../types';

// Aliyun has special excape rules.
// https://help.aliyun.com/document_detail/29442.html
const escaper = (string_: string) =>
  encodeURIComponent(string_)
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/!/g, '%21')
    .replace(/"/g, '%22')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\+/, '%2B');

export const getSignature = (
  parameters: Record<string, string>,
  secret: string,
  method: string
) => {
  const canonicalizedQuery = Object.keys(parameters)
    .slice()
    .sort()
    .map((key) => {
      const value = parameters[key];

      if (typeof value !== 'string') {
        throw new ConnectorError('Invalid value');
      }

      return `${escaper(key)}=${escaper(value)}`;
    })
    .join('&');

  const stringToSign = `${method.toUpperCase()}&${escaper('/')}&${escaper(canonicalizedQuery)}`;

  return createHmac('sha1', `${secret}&`).update(stringToSign).digest('base64');
};

export interface PublicParameters {
  AccessKeyId: string;
  Format?: string; // 'json' or 'xml', default: 'json'
  RegionId?: string; // 'cn-hangzhou' | 'ap-southeast-1' | 'ap-southeast-2'
  Signature?: string;
  SignatureMethod?: string;
  SignatureNonce?: string;
  SignatureVersion?: string;
  Timestamp?: string;
  Version?: string;
}

export const request = async <T>(
  url: string,
  parameters: PublicParameters & Record<string, string>,
  accessKeySecret: string
) => {
  const finalParameters: Record<string, string> = {
    ...parameters,
    SignatureNonce: String(Math.random()),
    Timestamp: new Date().toISOString(),
  };
  const signature = getSignature(finalParameters, accessKeySecret, 'POST');

  const payload = new URLSearchParams();

  for (const key in finalParameters) {
    if (has(finalParameters, key)) {
      const value = finalParameters[key];

      if (typeof value !== 'string') {
        throw new ConnectorError('Invalid value');
      }

      payload.append(key, value);
    }
  }

  payload.append('Signature', signature);

  return got.post<T>({
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: payload,
  });
};
