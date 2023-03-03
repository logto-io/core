import { render, fireEvent, act, waitFor } from '@testing-library/react';

import Lite from './Lite';

describe('<Lite />', () => {
  const submit = jest.fn();
  const clearError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('default render ', () => {
    const { queryByText, container } = render(<Lite errorMessage="error" onSubmit={submit} />);
    expect(container.querySelector('input[name="newPassword"]')).not.toBeNull();
    expect(queryByText('error')).not.toBeNull();
    expect(queryByText('action.save_password')).not.toBeNull();
  });

  test('password is required', async () => {
    const { queryByText, getByText } = render(
      <Lite clearErrorMessage={clearError} onSubmit={submit} />
    );

    const submitButton = getByText('action.save_password');

    act(() => {
      fireEvent.submit(submitButton);
    });

    expect(clearError).toBeCalled();

    await waitFor(() => {
      expect(queryByText('error.password_required')).not.toBeNull();
    });

    expect(submit).not.toBeCalled();
  });

  test('password less than 6 chars should throw', async () => {
    const { queryByText, getByText, container } = render(<Lite onSubmit={submit} />);
    const submitButton = getByText('action.save_password');
    const passwordInput = container.querySelector('input[name="newPassword"]');

    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: '12345' } });
    }

    act(() => {
      fireEvent.submit(submitButton);
    });

    await waitFor(() => {
      expect(queryByText('error.password_min_length')).not.toBeNull();
    });

    expect(submit).not.toBeCalled();

    act(() => {
      // Clear error
      if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.blur(passwordInput);
      }
    });

    await waitFor(() => {
      expect(queryByText('error.password_min_length')).toBeNull();
    });
  });

  test('should submit properly', async () => {
    const { queryByText, getByText, container } = render(<Lite onSubmit={submit} />);
    const submitButton = getByText('action.save_password');
    const passwordInput = container.querySelector('input[name="newPassword"]');

    act(() => {
      if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: '123456' } });
      }

      fireEvent.submit(submitButton);
    });

    await waitFor(() => {
      expect(submit).toBeCalledWith('123456');
    });
  });
});
