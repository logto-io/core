import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import type http from 'node:http';
import path from 'node:path';

import { isValidUrl } from '@logto/core-kit';
import { conditional, trySafe } from '@silverhand/essentials';
import chalk from 'chalk';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { type OnProxyEvent } from 'http-proxy-middleware/dist/types.js';
import mime from 'mime';

import { consoleLog } from '../../utils.js';

import { type ProxyResponseHandler } from './types.js';

export const createProxy = (targetUrl: string, onProxyResponse?: OnProxyEvent['proxyRes']) => {
  const hasResponseHandler = Boolean(onProxyResponse);
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    selfHandleResponse: hasResponseHandler,
    ...conditional(
      hasResponseHandler && {
        on: {
          proxyRes: onProxyResponse,
        },
      }
    ),
  });
};

export const createStaticFileProxy = (staticPath: string) => {
  const index = 'index.html';
  const indexContentType = 'text/html; charset=utf-8';
  const noCache = 'no-cache, no-store, must-revalidate';
  const maxAgeSevenDays = 'max-age=604_800_000';

  return async (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (!request.url) {
      response.writeHead(400).end();
      return;
    }

    if (request.method === 'HEAD' || request.method === 'GET') {
      const loadIndex = !isFileAssetPath(request.url);
      const requestPath = path.join(staticPath, loadIndex ? index : request.url);
      try {
        const content = await fs.readFile(requestPath, 'utf8');
        response.setHeader('cache-control', loadIndex ? noCache : maxAgeSevenDays);
        response.setHeader('content-type', loadIndex ? indexContentType : getMimeType(request.url));
        response.writeHead(200);
        response.end(content);
      } catch {
        response.setHeader('content-type', getMimeType(request.url));
        response.writeHead(404);
        response.end();
      }
    }
  };
};

/**
 * Intercept the response from Logto endpoint and replace Logto endpoint URLs in the response with the
 * proxy URL. The string replace happens in the following cases:
 * - The response is a redirect response, and the `location` property in response header may contain Logto
 *   endpoint URI.
 * - The response body is JSON, which consists of properties such as `**_endpoint` and `redirectTo`. These
 *   properties may contain Logto endpoint URI.
 * - The response is HTML content that contains a form. The form action URL may contain Logto endpoint URI.
 *
 * Note: the `issuer` and `jwks_uri` properties in the `/oidc/.well-known` response should not be replaced,
 * even they also contain the Logto endpoint URI.
 */
export const createLogtoResponseHandler = async ({
  proxyResponse,
  request,
  response,
  logtoEndpointUrl,
  proxyUrl,
  verbose,
}: ProxyResponseHandler) => {
  const { location } = proxyResponse.headers;
  if (location) {
    // eslint-disable-next-line @silverhand/fp/no-mutation
    proxyResponse.headers.location = location.replace(logtoEndpointUrl.href, proxyUrl.href);
  }

  void responseInterceptor(async (responseBuffer, proxyResponse) => {
    const responseBody = responseBuffer.toString();
    if (verbose) {
      consoleLog.info(`Response received: ${chalk.green(responseBody)}`);
    }

    if (proxyResponse.headers['content-type']?.includes('text/html')) {
      return responseBody.replace(
        `action="${logtoEndpointUrl.href}oidc/session/end/confirm"`,
        `action="${proxyUrl.href}oidc/session/end/confirm"`
      );
    }

    // eslint-disable-next-line no-restricted-syntax
    const jsonData = trySafe(() => JSON.parse(responseBody) as Record<string, unknown>);

    if (jsonData) {
      for (const [key, value] of Object.entries(jsonData)) {
        if ((key === 'redirectTo' || key.endsWith('_endpoint')) && typeof value === 'string') {
          // eslint-disable-next-line @silverhand/fp/no-mutation
          jsonData[key] = value.replace(logtoEndpointUrl.href, proxyUrl.href);
        }
      }
      return JSON.stringify(jsonData);
    }

    return responseBody;
  })(proxyResponse, request, response);
};

export const checkExperienceInput = (url?: string, staticPath?: string) => {
  if (staticPath && url) {
    consoleLog.fatal('Only one of the experience URI or path can be provided.');
  }
  if (!staticPath && !url) {
    consoleLog.fatal('Either a sign-in experience URI or local path must be provided.');
  }
  if (url && !isValidUrl(url)) {
    consoleLog.fatal(
      'A valid sign-in experience URI must be provided. E.g.: http://localhost:4000'
    );
  }
  if (staticPath && !existsSync(path.join(staticPath, 'index.html'))) {
    consoleLog.fatal('The provided path does not contain a valid index.html file.');
  }
};

/**
 * Check if the request path is a Logto request path.
 * @example isLogtoRequestPath('/oidc/.well-known/openid-configuration') // true
 * @example isLogtoRequestPath('/oidc/auth') // true
 * @example isLogtoRequestPath('/api/interaction/submit') // true
 * @example isLogtoRequestPath('/consent') // true
 */
export const isLogtoRequestPath = (requestPath?: string) =>
  ['/oidc/', '/api/'].some((path) => requestPath?.startsWith(path)) || requestPath === '/consent';

const isFileAssetPath = (url: string) => url.split('/').at(-1)?.includes('.');
const getMimeType = (filePath: string) => mime.getType(filePath) ?? 'application/octet-stream';
