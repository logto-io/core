import { ConnectorError, ConnectorErrorCodes } from '@logto/connector-kit';

const notImplemented = () => {
  throw new ConnectorError(ConnectorErrorCodes.NotImplemented);
};

export const defaultConnectorMethods = {
  getAuthorizationUri: notImplemented,
  getUserInfo: notImplemented,
  sendMessage: notImplemented,
  validateConfig: notImplemented,
};
