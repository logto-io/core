import { act, waitFor, fireEvent } from '@testing-library/react';

import renderWithPageContext from '@/__mocks__/RenderWithPageContext';
import SettingsProvider from '@/__mocks__/RenderWithPageContext/SettingsProvider';
import { addProfile } from '@/apis/interaction';

import SetUsername from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('@/apis/interaction', () => ({
  addProfile: jest.fn(async () => ({ redirectTo: '/' })),
}));

describe('SetPassword', () => {
  it('render set-password page properly', () => {
    const { queryByText, container } = renderWithPageContext(
      <SettingsProvider>
        <SetUsername />
      </SettingsProvider>
    );
    expect(container.querySelector('input[name="new-username"]')).not.toBeNull();
    expect(queryByText('action.continue')).not.toBeNull();
  });

  it('should submit properly', async () => {
    const { getByText, container } = renderWithPageContext(
      <SettingsProvider>
        <SetUsername />
      </SettingsProvider>
    );
    const submitButton = getByText('action.continue');
    const usernameInput = container.querySelector('input[name="new-username"]');

    act(() => {
      if (usernameInput) {
        fireEvent.change(usernameInput, { target: { value: 'username' } });
      }

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(addProfile).toBeCalledWith({ username: 'username' }, undefined);
    });
  });
});
