import { render, fireEvent, act, waitFor } from '@testing-library/react';

import SetPassword from '.';

describe('<SetPassword />', () => {
  const submit = jest.fn();
  const clearError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('default render ', () => {
    const { queryByText, container } = render(
      <SetPassword errorMessage="error" onSubmit={submit} />
    );
    expect(container.querySelector('input[name="new-password"]')).not.toBeNull();
    expect(container.querySelector('input[name="confirm-new-password"]')).not.toBeNull();
    expect(queryByText('error')).not.toBeNull();
    expect(queryByText('action.save_password')).not.toBeNull();
  });

  test('password are required', () => {
    const { queryByText, getByText } = render(
      <SetPassword clearErrorMessage={clearError} onSubmit={submit} />
    );
    const submitButton = getByText('action.save_password');
    fireEvent.click(submitButton);

    expect(clearError).toBeCalled();
    expect(queryByText('password_required')).not.toBeNull();
    expect(submit).not.toBeCalled();
  });

  test('password less than 6 chars should throw', () => {
    const { queryByText, getByText, container } = render(<SetPassword onSubmit={submit} />);
    const submitButton = getByText('action.save_password');
    const passwordInput = container.querySelector('input[name="new-password"]');

    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: '12345' } });
    }

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(queryByText('password_min_length')).not.toBeNull();

    expect(submit).not.toBeCalled();

    act(() => {
      // Clear error
      if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
      }
    });

    expect(queryByText('password_min_length')).toBeNull();
  });

  test('password mismatch with confirmPassword should throw', () => {
    const { queryByText, getByText, container } = render(<SetPassword onSubmit={submit} />);
    const submitButton = getByText('action.save_password');
    const passwordInput = container.querySelector('input[name="new-password"]');
    const confirmPasswordInput = container.querySelector('input[name="confirm-new-password"]');

    act(() => {
      if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
      }

      if (confirmPasswordInput) {
        fireEvent.change(confirmPasswordInput, { target: { value: '012345' } });
      }

      fireEvent.click(submitButton);
    });

    expect(queryByText('passwords_do_not_match')).not.toBeNull();

    expect(submit).not.toBeCalled();

    act(() => {
      // Clear Error
      if (confirmPasswordInput) {
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
      }
    });

    expect(queryByText('passwords_do_not_match')).toBeNull();
  });

  test('should submit properly', async () => {
    const { queryByText, getByText, container } = render(<SetPassword onSubmit={submit} />);
    const submitButton = getByText('action.save_password');
    const passwordInput = container.querySelector('input[name="new-password"]');
    const confirmPasswordInput = container.querySelector('input[name="confirm-new-password"]');

    act(() => {
      if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
      }

      if (confirmPasswordInput) {
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });
      }

      fireEvent.click(submitButton);
    });

    expect(queryByText('passwords_do_not_match')).toBeNull();

    await waitFor(() => {
      expect(submit).toBeCalledWith('123456');
    });
  });
});
