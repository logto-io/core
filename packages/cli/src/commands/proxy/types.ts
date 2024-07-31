import type * as http from 'node:http';

export type ProxyCommandArgs = {
  'experience-uri'?: string;
  'tenant-id'?: string;
  endpoint?: string;
  port: number;
};

export type ProxyResponseHandler = {
  proxyResponse: http.IncomingMessage;
  request: http.IncomingMessage;
  response: http.ServerResponse;
  logtoEndpointUrl: URL;
  proxyUrl: URL;
};
