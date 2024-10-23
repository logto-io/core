import { createComponent } from '@lit/react';

import { LogtoUsername } from './elements/logto-username.js';
import { LogtoAccountProvider } from './index.js';

export * from './api/index.js';

export const createReactComponents = (react: Parameters<typeof createComponent>[0]['react']) => {
  return {
    LogtoAccountProvider: createComponent({
      tagName: LogtoAccountProvider.tagName,
      elementClass: LogtoAccountProvider,
      react,
    }),
    LogtoUsername: createComponent({
      tagName: LogtoUsername.tagName,
      elementClass: LogtoUsername,
      react,
    }),
  };
};
