import {
  SignInExperience,
  CreateSignInExperience,
  TermsOfUse,
  SignInMethodState,
} from '@logto/schemas';

import {
  mockFacebookConnectorInstance,
  mockGithubConnectorInstance,
  mockGoogleConnectorInstance,
  mockBranding,
  mockSignInExperience,
  mockSignInMethods,
  mockWechatConnectorInstance,
  mockColor,
} from '@/__mocks__';
import * as signInExpLib from '@/lib/sign-in-experience';
import { createRequester } from '@/utils/test-utils';

import signInExperiencesRoutes from './sign-in-experience';

const connectorInstances = [
  mockFacebookConnectorInstance,
  mockGithubConnectorInstance,
  mockGoogleConnectorInstance,
  mockWechatConnectorInstance,
];

const getConnectorInstances = jest.fn(async () => connectorInstances);

jest.mock('@/connectors', () => {
  return {
    ...jest.requireActual('@/connectors'),
    getEnabledSocialConnectorIds: jest.fn(async () => ['facebook', 'github', 'wechat']),
    getConnectorInstances: jest.fn(async () => getConnectorInstances()),
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
  it('should not update social connector targets when social sign-in is disabled', async () => {
    const signInMethods = { ...mockSignInMethods, social: SignInMethodState.Disabled };
    const response = await signInExperienceRequester.patch('/sign-in-exp').send({
      signInMethods,
      socialSignInConnectorTargets: ['facebook'],
    });
    expect(response).toMatchObject({
      status: 200,
      body: {
        ...mockSignInExperience,
        signInMethods,
      },
    });
  });

  it('should update enabled social connector targets only when social sign-in is enabled', async () => {
    const signInMethods = { ...mockSignInMethods, social: SignInMethodState.Secondary };
    const socialSignInConnectorTargets = ['facebook'];
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
    const validateSignInMethods = jest.spyOn(signInExpLib, 'validateSignInMethods');

    const response = await signInExperienceRequester.patch('/sign-in-exp').send({
      color: mockColor,
      branding: mockBranding,
      termsOfUse,
      signInMethods: mockSignInMethods,
      socialSignInConnectorTargets,
    });

    expect(validateBranding).toHaveBeenCalledWith(mockBranding);
    expect(validateTermsOfUse).toHaveBeenCalledWith(termsOfUse);
    expect(validateSignInMethods).toHaveBeenCalledWith(
      mockSignInMethods,
      socialSignInConnectorTargets,
      [mockFacebookConnectorInstance, mockGithubConnectorInstance, mockWechatConnectorInstance]
    );

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
