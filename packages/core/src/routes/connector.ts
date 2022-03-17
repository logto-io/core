import { ConnectorDTO, Connectors, ConnectorType } from '@logto/schemas';
import { object, string } from 'zod';

import {
  getConnectorInstances,
  getConnectorInstanceById,
  getEnabledConnectorInstanceByType,
} from '@/connectors';
import {
  ConnectorInstance,
  EmailConnectorInstance,
  SmsConnectorInstance,
} from '@/connectors/types';
import koaGuard from '@/middleware/koa-guard';
import { updateConnector } from '@/queries/connector';
import assertThat from '@/utils/assert-that';
import { emailRegEx, phoneRegEx } from '@/utils/regex';

import { AuthedRouter } from './types';

const transpileConnectorInstance = ({ connector, metadata }: ConnectorInstance): ConnectorDTO => ({
  ...connector,
  metadata,
});

export default function connectorRoutes<T extends AuthedRouter>(router: T) {
  router.get('/connectors', async (ctx, next) => {
    const connectorInstances = await getConnectorInstances();

    assertThat(
      connectorInstances.filter(
        (connector) =>
          connector.connector.enabled && connector.metadata.type === ConnectorType.Email
      ).length <= 1,
      'connector.more_than_one_email'
    );
    assertThat(
      connectorInstances.filter(
        (connector) => connector.connector.enabled && connector.metadata.type === ConnectorType.SMS
      ).length <= 1,
      'connector.more_than_one_sms'
    );

    ctx.body = connectorInstances.map((connectorInstance) => {
      return transpileConnectorInstance(connectorInstance);
    });

    return next();
  });

  router.get(
    '/connectors/:id',
    koaGuard({ params: object({ id: string().min(1) }) }),
    async (ctx, next) => {
      const {
        params: { id },
      } = ctx.guard;
      const connectorInstance = await getConnectorInstanceById(id);
      ctx.body = transpileConnectorInstance(connectorInstance);

      return next();
    }
  );

  router.patch(
    '/connectors/:id/enabled',
    koaGuard({
      params: object({ id: string().min(1) }),
      body: Connectors.createGuard.pick({ enabled: true }),
    }),
    async (ctx, next) => {
      const {
        params: { id },
        body: { enabled },
      } = ctx.guard;
      const { metadata } = await getConnectorInstanceById(id);

      // Only allow one enabled connector for SMS and Email.
      // disable other connectors before enable this one.
      if (
        enabled &&
        (metadata.type === ConnectorType.SMS || metadata.type === ConnectorType.Email)
      ) {
        const connectors = await getConnectorInstances();
        await Promise.all(
          connectors
            .filter(
              (connector) =>
                connector.metadata.type === metadata.type && connector.connector.enabled
            )
            .map(async ({ connector: { id } }) =>
              updateConnector({ set: { enabled: false }, where: { id } })
            )
        );
      }

      const connector = await updateConnector({ set: { enabled }, where: { id } });
      ctx.body = { ...connector, metadata };

      return next();
    }
  );

  router.patch(
    '/connectors/:id',
    koaGuard({
      params: object({ id: string().min(1) }),
      body: Connectors.createGuard
        .omit({ id: true, type: true, enabled: true, createdAt: true })
        .partial(),
    }),
    async (ctx, next) => {
      const {
        params: { id },
        body,
      } = ctx.guard;
      const { metadata, validateConfig } = await getConnectorInstanceById(id);

      if (body.config) {
        await validateConfig(body.config);
      }

      const connector = await updateConnector({ set: body, where: { id } });
      ctx.body = { ...connector, metadata };

      return next();
    }
  );

  router.post(
    '/connectors/test/email',
    koaGuard({
      body: object({
        email: string().regex(emailRegEx),
      }),
    }),
    async (ctx, next) => {
      const { email } = ctx.guard.body;

      const connector = await getEnabledConnectorInstanceByType<EmailConnectorInstance>(
        ConnectorType.Email
      );

      // TODO - LOG-1875: SMS & Email Template for Test
      await connector.sendMessage(email, 'Test', {
        code: 'email-test',
      });

      ctx.status = 204;

      return next();
    }
  );

  router.post(
    '/connectors/test/sms',
    koaGuard({
      body: object({
        phone: string().regex(phoneRegEx),
      }),
    }),
    async (ctx, next) => {
      const { phone } = ctx.guard.body;

      const connector = await getEnabledConnectorInstanceByType<SmsConnectorInstance>(
        ConnectorType.SMS
      );

      // TODO - LOG-1875: SMS & Email Template for Test
      await connector.sendMessage(phone, 'Test', {
        code: '123456',
      });

      ctx.status = 204;

      return next();
    }
  );
}
