import { ApplicationType, BindingType } from '@logto/schemas';

import { createApplication, deleteApplication } from '#src/api/application.js';
import {
  createSamlApplication,
  deleteSamlApplication,
  updateSamlApplication,
  getSamlApplication,
  deleteSamlApplicationSecret,
  createSamlApplicationSecret,
  updateSamlApplicationSecret,
  getSamlApplicationSecrets,
  getSamlApplicationMetadata,
  getSamlApplicationCertificate,
} from '#src/api/saml-application.js';
import { expectRejects } from '#src/helpers/index.js';
import { devFeatureTest } from '#src/utils.js';

const { it, describe } = devFeatureTest;

describe('SAML application', () => {
  it('should create and delete a SAML application successfully', async () => {
    const createdSamlApplication = await createSamlApplication({
      name: 'test',
      description: 'test',
    });

    await deleteSamlApplication(createdSamlApplication.id);
  });

  it('should not support HTTP-Redirect binding', async () => {
    await expectRejects(
      createSamlApplication({
        name: 'test',
        description: 'test',
        config: {
          acsUrl: {
            binding: BindingType.Redirect,
            url: 'https://example.com',
          },
        },
      }),
      {
        code: 'application.saml.acs_url_binding_not_supported',
        status: 422,
      }
    );
  });

  it('should be able to create SAML application with `config` field', async () => {
    const config = {
      entityId: 'https://example.logto.io',
      acsUrl: {
        binding: BindingType.Post,
        url: 'https://example.logto.io/sso/saml',
      },
    };
    const createdSamlApplication = await createSamlApplication({
      name: 'test',
      description: 'test',
      config,
    });
    expect(createdSamlApplication.entityId).toEqual(config.entityId);
    expect(createdSamlApplication.acsUrl).toEqual(config.acsUrl);
    await deleteSamlApplication(createdSamlApplication.id);
  });

  it('should be able to update SAML application and get the updated one', async () => {
    const createdSamlApplication = await createSamlApplication({
      name: 'test',
      description: 'test',
    });

    const newConfig = {
      acsUrl: {
        binding: BindingType.Post,
        url: 'https://example.logto.io/sso/saml',
      },
    };
    const updatedSamlApplication = await updateSamlApplication(createdSamlApplication.id, {
      name: 'updated',
      config: newConfig,
    });
    const upToDateSamlApplication = await getSamlApplication(createdSamlApplication.id);

    expect(updatedSamlApplication).toEqual(upToDateSamlApplication);
    expect(updatedSamlApplication.name).toEqual('updated');
    expect(updatedSamlApplication.acsUrl).toEqual(newConfig.acsUrl);

    await deleteSamlApplication(updatedSamlApplication.id);
  });

  it('can not delete/update/get non-SAML applications with `DEL /saml-applications/:id` API', async () => {
    const application = await createApplication('test-non-saml-app', ApplicationType.Traditional, {
      isThirdParty: true,
    });

    await expectRejects(deleteSamlApplication(application.id), {
      code: 'application.saml.saml_application_only',
      status: 422,
    });
    await expectRejects(updateSamlApplication(application.id, { name: 'updated' }), {
      code: 'application.saml.saml_application_only',
      status: 422,
    });
    await expectRejects(getSamlApplication(application.id), {
      code: 'application.saml.saml_application_only',
      status: 422,
    });
    await deleteApplication(application.id);
  });

  it('should be able to create and delete SAML application secrets', async () => {
    const { id } = await createSamlApplication({
      name: 'test',
      description: 'test',
    });

    const createdSecret = await createSamlApplicationSecret(id, 30);

    // @ts-expect-error - Make sure the `privateKey` is not exposed in the response.
    expect(createdSecret.privateKey).toBeUndefined();

    const samlApplicationSecrets = await getSamlApplicationSecrets(id);
    expect(samlApplicationSecrets.length).toBe(2);
    expect(
      samlApplicationSecrets.find((secret) => secret.id === createdSecret.id)
    ).not.toBeUndefined();
    // @ts-expect-error - Make sure the `privateKey` is not exposed in the response.
    expect(samlApplicationSecrets.every((secret) => secret.privateKey === undefined)).toBe(true);

    await deleteSamlApplicationSecret(id, createdSecret.id);

    await deleteSamlApplication(id);
  });

  it('should be able to update SAML application secret status and can not delete active secret', async () => {
    const { id } = await createSamlApplication({
      name: 'test',
      description: 'test',
    });

    const createdSecret = await createSamlApplicationSecret(id, 30);

    // @ts-expect-error - Make sure the `privateKey` is not exposed in the response.
    expect(createdSecret.privateKey).toBeUndefined();

    const samlApplicationSecrets = await getSamlApplicationSecrets(id);
    expect(samlApplicationSecrets.length).toBe(2);
    expect(
      samlApplicationSecrets.find((secret) => secret.id === createdSecret.id)
    ).not.toBeUndefined();

    // @ts-expect-error - Make sure the `privateKey` is not exposed in the response.
    expect(samlApplicationSecrets.every((secret) => secret.privateKey === undefined)).toBe(true);

    const updatedSecret = await updateSamlApplicationSecret(id, createdSecret.id, true);
    expect(updatedSecret.active).toBe(true);
    // @ts-expect-error - Make sure the `privateKey` is not exposed in the response.
    expect(updatedSecret.privateKey).toBeUndefined();

    const { certificate } = await getSamlApplicationCertificate(id);
    expect(typeof certificate).toBe('string');

    await expect(getSamlApplicationMetadata(id)).resolves.not.toThrow();

    await expectRejects(deleteSamlApplicationSecret(id, createdSecret.id), {
      code: 'application.saml.can_not_delete_active_secret',
      status: 400,
    });

    await updateSamlApplicationSecret(id, createdSecret.id, false);
    await deleteSamlApplicationSecret(id, createdSecret.id);
    await deleteSamlApplication(id);
  });
});
