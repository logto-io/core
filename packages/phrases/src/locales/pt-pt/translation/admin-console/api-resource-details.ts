const api_resource_details = {
  page_title: 'Detalhes do recurso da API',
  back_to_api_resources: 'Voltar aos recursos da API',
  settings_tab: 'Configurações',
  permissions_tab: 'Permissões',
  settings: 'Configurações',
  settings_description:
    'Recursos da API, também conhecidos como indicadores de recursos, indicam os serviços ou recursos de destino a serem solicitados, geralmente uma variável de formato URI que representa a identidade do recurso.',
  management_api_settings_description:
    'A API de Gerenciamento do Logto é uma coleção abrangente de APIs que capacitam os administradores a gerenciar uma ampla gama de tarefas relacionadas à identidade, aplicar políticas de segurança e cumprir regulamentos e padrões.',
  token_expiration_time_in_seconds: 'Tempo de expiração do token (em segundos)',
  token_expiration_time_in_seconds_placeholder: 'Insira o tempo de expiração do token',
  delete_description:
    'Esta ação não pode ser desfeita. Isso irá eliminar permanentemente o recurso de API. Insira o nome do recurso <span>{{name}}</span> para confirmar.',
  enter_your_api_resource_name: 'Digite o nome do recurso da API',
  api_resource_deleted: 'O recurso da API {{name}} foi eliminado com sucesso',
  permission: {
    create_button: 'Criar permissão',
    create_title: 'Criar permissão',
    create_subtitle: 'Define as permissões (escopos) necessárias para essa API.',
    confirm_create: 'Criar permissão',
    name: 'Nome da permissão',
    name_placeholder: 'leitura:recurso',
    forbidden_space_in_name: 'O nome da permissão não pode conter espaços.',
    description: 'Descrição',
    description_placeholder: 'Capaz de ler os recursos',
    permission_created: 'A permissão {{name}} foi criada com sucesso',
    delete_description:
      'Se esta permissão for excluída, o usuário que tinha esta permissão perderá o acesso concedido por ela.',
    deleted: 'A permissão "{{name}}" foi excluída com sucesso.',
  },
};

export default api_resource_details;
