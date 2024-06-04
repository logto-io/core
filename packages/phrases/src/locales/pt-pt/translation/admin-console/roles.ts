const roles = {
  page_title: 'Papéis',
  title: 'Papéis',
  subtitle:
    'Os papéis incluem permissões que determinam o que um usuário pode fazer. RBAC usa papéis para conceder acesso a recursos para ações específicas.',
  create: 'Criar papel',
  role_name: 'Nome do papel',
  role_type: 'Tipo de papel',
  type_user: 'Função de usuário',
  type_machine_to_machine: 'Função de aplicação máquina-a-máquina',
  role_description: 'Descrição',
  role_name_placeholder: 'Digite o nome do papel',
  role_description_placeholder: 'Digite a descrição do papel',
  col_roles: 'Papéis',
  col_type: 'Tipo',
  col_description: 'Descrição',
  col_assigned_entities: 'Atribuído',
  user_counts: '{{count}} utilizadores',
  application_counts: '{{count}} aplicações',
  user_count: '{{count}} utilizador',
  application_count: '{{count}} aplicação',
  assign_permissions: 'Atribuir permissões',
  create_role_title: 'Criar papel',
  create_role_description:
    'Crie e gerencie papéis para as suas aplicações. Os papéis contêm coleções de permissões e podem ser atribuídos a utilizadores.',
  create_role_button: 'Criar papel',
  role_created: 'O papel {{name}} foi criado com sucesso.',
  search: 'Pesquisar por nome do papel, descrição ou ID',
  placeholder_title: 'Papéis',
  placeholder_description:
    'Os papéis são um agrupamento de permissões que podem ser atribuídas a utilizadores. Certifique-se de adicionar permissões antes de criar papéis.',
  assign_user_roles: 'Atribuir funções de utilizador',
  assign_m2m_roles: 'Atribuir funções de máquina para máquina',
  management_api_access_notification:
    'Para aceder à API de gestão do Logto, selecione funções com permissões de API de gestão <flag/>.',
  with_management_api_access_tip:
    'Esta função de máquina para máquina inclui permissões para a API de gestão do Logto',
};

export default Object.freeze(roles);
