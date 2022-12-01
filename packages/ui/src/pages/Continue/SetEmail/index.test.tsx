import { SignInIdentifier } from '@logto/schemas';

import renderWithPageContext from '@/__mocks__/RenderWithPageContext';
import SettingsProvider from '@/__mocks__/RenderWithPageContext/SettingsProvider';
import { mockSignInExperienceSettings } from '@/__mocks__/logto';

import SetEmail from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({ pathname: '' }),
}));

describe('SetEmail', () => {
  it('render set email', () => {
    const { queryByText, container } = renderWithPageContext(
      <SettingsProvider
        settings={{
          ...mockSignInExperienceSettings,
          signUp: {
            ...mockSignInExperienceSettings.signUp,
            identifiers: [SignInIdentifier.Email],
          },
        }}
      >
        <SetEmail />
      </SettingsProvider>
    );

    expect(queryByText('description.link_email')).not.toBeNull();
    expect(queryByText('description.link_email_description')).not.toBeNull();
    expect(container.querySelector('input[name="email"]')).not.toBeNull();
    expect(queryByText('action.continue')).not.toBeNull();
  });
});
