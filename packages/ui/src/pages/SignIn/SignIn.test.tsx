import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '@/pages/SignIn';
import { signInBasic } from '@/apis/sign-in';

jest.mock('@/apis/sign-in', () => ({ signInBasic: jest.fn(async () => Promise.resolve()) }));

describe('<SignIn />', () => {
  test('renders without exploding', async () => {
    const { queryByText, getByText } = render(<SignIn />);
    expect(queryByText('Sign in to Logto')).not.toBeNull();

    const submit = getByText('sign_in.title');
    fireEvent.click(submit);

    await waitFor(() => {
      expect(signInBasic).toBeCalled();
      expect(queryByText('sign_in.loading')).not.toBeNull();
    });
  });
});
