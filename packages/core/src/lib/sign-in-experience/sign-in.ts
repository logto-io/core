import { ConnectorType, SignIn, SignInIdentifier, SignUp, SignUpIdentifier } from '@logto/schemas';

import { LogtoConnector } from '@/connectors/types';
import RequestError from '@/errors/RequestError';
import assertThat from '@/utils/assert-that';

/* eslint-disable complexity */
export const validateSignIn = (
  signIn: SignIn,
  signUp: SignUp,
  enabledConnectors: LogtoConnector[]
) => {
  if (signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Email)) {
    assertThat(
      enabledConnectors.some((item) => item.type === ConnectorType.Email),
      new RequestError({
        code: 'sign_in_experiences.enabled_connector_not_found',
        type: ConnectorType.Email,
      })
    );
  }

  if (signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Phone)) {
    assertThat(
      enabledConnectors.some((item) => item.type === ConnectorType.Sms),
      new RequestError({
        code: 'sign_in_experiences.enabled_connector_not_found',
        type: ConnectorType.Sms,
      })
    );
  }

  switch (signUp.identifier) {
    case SignUpIdentifier.Username: {
      assertThat(
        signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Username),
        new RequestError({
          code: 'sign_in_experiences.miss_sign_up_identifier_in_sign_in',
        })
      );

      break;
    }

    case SignUpIdentifier.Email: {
      assertThat(
        signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Email),
        new RequestError({
          code: 'sign_in_experiences.miss_sign_up_identifier_in_sign_in',
        })
      );

      break;
    }

    case SignUpIdentifier.Phone: {
      assertThat(
        signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Phone),
        new RequestError({
          code: 'sign_in_experiences.miss_sign_up_identifier_in_sign_in',
        })
      );

      break;
    }

    case SignUpIdentifier.EmailOrPhone: {
      assertThat(
        signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Email) &&
          signIn.methods.some(({ identifier }) => identifier === SignInIdentifier.Phone),
        new RequestError({
          code: 'sign_in_experiences.miss_sign_up_identifier_in_sign_in',
        })
      );

      break;
    }

    case SignUpIdentifier.None: {
      // No requirement
    }
    // No default
  }

  if (signUp.password) {
    assertThat(
      signIn.methods.every(({ password }) => password),
      new RequestError({
        code: 'sign_in_experiences.password_sign_in_must_be_enabled',
      })
    );
  }

  if (signUp.verify && !signUp.password) {
    assertThat(
      signIn.methods.every(
        ({ verificationCode, identifier }) =>
          verificationCode || identifier === SignInIdentifier.Username
      ),
      new RequestError({
        code: 'sign_in_experiences.code_sign_in_must_be_enabled',
      })
    );
  }
};
/* eslint-enable complexity */
