import {
  SignInExperience,
  CreateSignInExperience,
  TermsOfUse,
  SignInMethodState,
} from '@logto/schemas';

import {
  mockFacebookConnector,
  mockGithubConnector,
  mockGoogleConnector,
  mockBranding,
  mockSignInExperience,
  mockSignInMethods,
  mockWechatConnector,
  mockColor,
  mockSignUp,
  mockSignIn,
} from '@/__mocks__';
import * as signInExpLib from '@/lib/sign-in-experience';
import * as signInLib from '@/lib/sign-in-experience/sign-in';
import * as signInMethodsLib from '@/lib/sign-in-experience/sign-in-methods';
import * as signUpLib from '@/lib/sign-in-experience/sign-up';
import { createRequester } from '@/utils/test-utils';

import signInExperiencesRoutes from './sign-in-experience';

const logtoConnectors = [
  mockFacebookConnector,
  mockGithubConnector,
  mockGoogleConnector,
  mockWechatConnector,
];

const getLogtoConnectors = jest.fn(async () => logtoConnectors);

jest.mock('@/connectors', () => {
  return {
    ...jest.requireActual('@/connectors'),
    getLogtoConnectors: jest.fn(async () => getLogtoConnectors()),
  };
});

const findDefaultSignInExperience = jest.fn(async () => mockSignInExperience);

jest.mock('@/queries/sign-in-experience', () => ({
  findDefaultSignInExperience: jest.fn(async () => findDefaultSignInExperience()),
  updateDefaultSignInExperience: jest.fn(
    async (data: Partial<CreateSignInExperience>): Promise<SignInExperience> => ({
      ...mockSignInExperience,
      ...data,
    })
  ),
}));

const signInExperienceRequester = createRequester({ authedRoutes: signInExperiencesRoutes });

describe('GET /sign-in-exp', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call findDefaultSignInExperience', async () => {
    const response = await signInExperienceRequester.get('/sign-in-exp');
    expect(findDefaultSignInExperience).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockSignInExperience);
  });
});

describe('PATCH /sign-in-exp', () => {
  it('should update social connector targets in correct sorting order', async () => {
    const signInMethods = { ...mockSignInMethods, social: SignInMethodState.Secondary };
    const socialSignInConnectorTargets = ['github', 'facebook'];
    const signInExperience = {
      signInMethods,
      socialSignInConnectorTargets,
    };
    const response = await signInExperienceRequester.patch('/sign-in-exp').send(signInExperience);
    expect(response).toMatchObject({
      status: 200,
      body: {
        ...mockSignInExperience,
        signInMethods,
        socialSignInConnectorTargets,
      },
    });
  });

  it('should filter out unavailable social connector targets', async () => {
    const signInMethods = { ...mockSignInMethods, social: SignInMethodState.Secondary };
    const socialSignInConnectorTargets = ['github', 'facebook', 'google'];
    const signInExperience = {
      signInMethods,
      socialSignInConnectorTargets,
    };
    const response = await signInExperienceRequester.patch('/sign-in-exp').send(signInExperience);
    expect(response).toMatchObject({
      status: 200,
      body: {
        ...mockSignInExperience,
        signInMethods,
        socialSignInConnectorTargets: ['github', 'facebook'],
      },
    });
  });

  it('should succeed to update when the input is valid', async () => {
    const termsOfUse: TermsOfUse = { enabled: false };
    const socialSignInConnectorTargets = ['github', 'facebook', 'wechat'];

    const validateBranding = jest.spyOn(signInExpLib, 'validateBranding');
    const validateTermsOfUse = jest.spyOn(signInExpLib, 'validateTermsOfUse');
    const validateSignInMethods = jest.spyOn(signInMethodsLib, 'validateSignInMethods');
    const validateSignIn = jest.spyOn(signInLib, 'validateSignIn');
    const validateSignUp = jest.spyOn(signUpLib, 'validateSignUp');

    const response = await signInExperienceRequester.patch('/sign-in-exp').send({
      color: mockColor,
      branding: mockBranding,
      termsOfUse,
      signInMethods: mockSignInMethods,
      socialSignInConnectorTargets,
      signUp: mockSignUp,
      signIn: mockSignIn,
      forgotPassword: true,
    });
    const connectors = [mockFacebookConnector, mockGithubConnector, mockWechatConnector];

    expect(validateBranding).toHaveBeenCalledWith(mockBranding);
    expect(validateTermsOfUse).toHaveBeenCalledWith(termsOfUse);
    expect(validateSignInMethods).toHaveBeenCalledWith(
      mockSignInMethods,
      socialSignInConnectorTargets,
      connectors
    );
    expect(validateSignUp).toHaveBeenCalledWith(mockSignUp, connectors);
    expect(validateSignIn).toHaveBeenCalledWith(mockSignIn, mockSignUp, connectors);

    expect(response).toMatchObject({
      status: 200,
      body: {
        ...mockSignInExperience,
        color: mockColor,
        branding: mockBranding,
        termsOfUse,
        signInMethods: mockSignInMethods,
        socialSignInConnectorTargets,
      },
    });
  });
});
