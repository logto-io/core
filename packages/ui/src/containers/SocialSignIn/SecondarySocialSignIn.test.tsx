import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import renderWithContext from '@/__mocks__/RenderWithContext';
import { socialConnectors } from '@/__mocks__/logto';
import * as socialSignInApi from '@/apis/social';
import { generateState, storeState } from '@/hooks/use-social';

import SecondarySocialSignIn from './SecondarySocialSignIn';

describe('SecondarySocialSignIn', () => {
  const mockOrigin = 'https://logto.dev';

  const invokeSocialSignInSpy = jest
    .spyOn(socialSignInApi, 'invokeSocialSignIn')
    .mockResolvedValue({ redirectTo: `${mockOrigin}/callback` });

  const signInWithSocialSpy = jest
    .spyOn(socialSignInApi, 'signInWithSocial')
    .mockResolvedValue({ redirectTo: `${mockOrigin}/callback` });

  beforeEach(() => {
    /* eslint-disable @silverhand/fp/no-mutation */
    // @ts-expect-error mock global object
    globalThis.logtoNativeSdk = {
      platform: 'web',
      getPostMessage: jest.fn(() => jest.fn()),
      callbackUriScheme: '/logto:',
    };
    /* eslint-enable @silverhand/fp/no-mutation */
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('less than four connectors', () => {
    const { container } = render(
      <MemoryRouter>
        <SecondarySocialSignIn connectors={socialConnectors.slice(0, 3)} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('button')).toHaveLength(3);
  });

  it('more than four connectors', () => {
    const { container } = render(
      <MemoryRouter>
        <SecondarySocialSignIn connectors={socialConnectors} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('button')).toHaveLength(3);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('invoke web social signIn', async () => {
    const connectors = socialConnectors.slice(0, 1);

    const { container } = renderWithContext(
      <MemoryRouter>
        <SecondarySocialSignIn connectors={connectors} />
      </MemoryRouter>
    );
    const socialButton = container.querySelector('button');

    if (socialButton) {
      await waitFor(() => {
        fireEvent.click(socialButton);
      });

      expect(invokeSocialSignInSpy).toBeCalled();
    }
  });

  it('invoke native social signIn', async () => {
    /* eslint-disable @silverhand/fp/no-mutation */
    // @ts-expect-error mock global object
    logtoNativeSdk.platform = 'ios';
    /* eslint-enable @silverhand/fp/no-mutation */

    const connectors = socialConnectors.slice(0, 1);
    const { container } = renderWithContext(
      <MemoryRouter>
        <SecondarySocialSignIn connectors={connectors} />
      </MemoryRouter>
    );
    const socialButton = container.querySelector('button');

    if (socialButton) {
      await waitFor(() => {
        fireEvent.click(socialButton);
      });

      expect(invokeSocialSignInSpy).toBeCalled();
      expect(logtoNativeSdk?.getPostMessage).toBeCalled();
    }
  });

  it('callback validation and signIn with social', async () => {
    const connectors = socialConnectors.slice(0, 1);

    const state = generateState();
    storeState(state, 'github');

    /* eslint-disable @silverhand/fp/no-mutating-methods */
    Object.defineProperty(window, 'location', {
      value: {
        href: `/sign-in/callback?state=${state}&code=foo`,
        search: `?state=${state}&code=foo`,
        pathname: '/sign-in/callback',
        assign: jest.fn(),
      },
    });
    /* eslint-enable @silverhand/fp/no-mutating-methods */

    renderWithContext(
      <MemoryRouter initialEntries={['/sign-in/callback/github']}>
        <Routes>
          <Route
            path="/sign-in/callback/:connector"
            element={<SecondarySocialSignIn connectors={connectors} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(signInWithSocialSpy).toBeCalled();
    });
  });
});
