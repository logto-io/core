import { SignInIdentifier } from '@logto/schemas';
import { fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import renderWithPageContext from '@/__mocks__/RenderWithPageContext';
import { sendForgotPasswordEmailPasscode } from '@/apis/forgot-password';
import { UserFlow } from '@/types';

import EmailResetPassword from './EmailResetPassword';

const mockedNavigate = jest.fn();

jest.mock('@/apis/forgot-password', () => ({
  sendForgotPasswordEmailPasscode: jest.fn(() => ({ success: true })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('EmailRegister', () => {
  const email = 'foo@logto.io';

  test('register form submit', async () => {
    const { container, getByText } = renderWithPageContext(
      <MemoryRouter>
        <EmailResetPassword />
      </MemoryRouter>
    );
    const emailInput = container.querySelector('input[name="email"]');

    if (emailInput) {
      fireEvent.change(emailInput, { target: { value: email } });
    }

    const submitButton = getByText('action.continue');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(sendForgotPasswordEmailPasscode).toBeCalledWith(email);
      expect(mockedNavigate).toBeCalledWith(
        {
          pathname: `/${UserFlow.forgotPassword}/${SignInIdentifier.Email}/passcode-validation`,
          search: '',
        },
        { state: { email } }
      );
    });
  });
});
