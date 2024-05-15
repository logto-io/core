const webhooks = {
  page_title: 'Webhooks',
  title: 'Webhooks',
  subtitle:
    'Crie ganchos da web para receber atualizações em tempo real sobre eventos específicos sem esforço.',
  create: 'Criar Webhook',
  schemas: {
    /** UNTRANSLATED */
    interaction: 'User interaction',
    /** UNTRANSLATED */
    user: 'User',
    /** UNTRANSLATED */
    organization: 'Organization',
    /** UNTRANSLATED */
    role: 'Role',
    /** UNTRANSLATED */
    scope: 'Permission',
    /** UNTRANSLATED */
    organization_role: 'Organization role',
    /** UNTRANSLATED */
    organization_scope: 'Organization permission',
  },
  table: {
    name: 'Nome',
    events: 'Eventos',
    success_rate: 'Taxa de sucesso (24h)',
    requests: 'Requisições (24h)',
  },
  placeholder: {
    title: 'Webhook',
    description:
      'Crie um webhook para receber atualizações em tempo real por meio de solicitações POST para o URL do seu ponto de extremidade. Fique informado e tome medidas imediatas em eventos como "Criar conta", "Entrar" e "Redefinir senha".',
    create_webhook: 'Criar Webhook',
  },
  create_form: {
    title: 'Criar Webhook',
    subtitle:
      'Adicione o Webhook para enviar uma solicitação POST para o URL do endpoint com detalhes de quaisquer eventos de usuários.',
    events: 'Eventos',
    events_description: 'Selecione os eventos de gatilho que o Logto enviará a solicitação POST.',
    name: 'Nome',
    name_placeholder: 'Digite o nome do webhook',
    endpoint_url: 'URL de endpoint',
    endpoint_url_placeholder: 'https://seu.url.endpoint.do.webhook',
    endpoint_url_tip:
      'Insira o URL do seu ponto de extremidade para o qual a carga útil de um webhook é enviada quando o evento ocorre.',
    create_webhook: 'Criar webhook',
    missing_event_error: 'Você precisa selecionar pelo menos um evento.',
  },
  webhook_created: 'O webhook {{name}} foi criado com sucesso.',
};

export default Object.freeze(webhooks);
