const organization_template = {
  title: 'Template de organização',
  subtitle:
    'Em aplicações SaaS multi-tenant, é comum que várias organizações compartilhem políticas de controle de acesso idênticas, incluindo permissões e papéis. No Logto, este conceito é chamado de "template de organização". Usá-lo simplifica o processo de construção e design do seu modelo de autorização.',
  roles: {
    tab_name: 'Papéis da org',
    search_placeholder: 'Buscar por nome do papel',
    create_title: 'Criar papel da org',
    role_column: 'Papel da org',
    permissions_column: 'Permissões',
    placeholder_title: 'Papel da organização',
    placeholder_description:
      'Papel da organização é um agrupamento de permissões que podem ser atribuídas aos usuários. As permissões devem vir das permissões organizacionais predefinidas.',
  },
  permissions: {
    tab_name: 'Permissões da org',
    search_placeholder: 'Buscar por nome da permissão',
    create_org_permission: 'Criar permissão da org',
    permission_column: 'Permissão',
    description_column: 'Descrição',
    placeholder_title: 'Permissão da organização',
    placeholder_description:
      'Permissão da organização refere-se à autorização para acessar um recurso no contexto da organização.',
    delete_confirm:
      'Se esta permissão for deletada, todos os papéis da organização que incluírem esta permissão perderão a mesma, e usuários que tinham esta permissão perderão o acesso concedido por ela.',
    create_title: 'Criar permissão de organização',
    edit_title: 'Editar permissão de organização',
    permission_field_name: 'Nome da permissão',
    description_field_name: 'Descrição',
    description_field_placeholder: 'Ler histórico de compromissos',
    create_permission: 'Criar permissão',
    created: 'A permissão de organização {{name}} foi criada com sucesso.',
  },
};

export default Object.freeze(organization_template);
