const organizations = {
  /** UNTRANSLATED */
  organization: 'Organization',
  page_title: 'Organizações',
  title: 'Organizações',
  subtitle:
    'Representam as equipas, clientes empresariais e empresas parceiras que acedem às suas aplicações como organizações.',
  organization_id: 'ID da organização',
  members: 'Membros',
  create_organization: 'Criar organização',
  setup_organization: 'Configurar a sua organização',
  organization_list_placeholder_title: 'Organização',
  organization_list_placeholder_text:
    'A organização é normalmente usada em aplicações multi-inquilinos de SaaS ou semelhantes a SaaS. A funcionalidade Organizações permite que os seus clientes B2B gerenciem melhor os seus parceiros e clientes, e personalizem as formas como os utilizadores finais acedem às suas aplicações.',
  organization_name_placeholder: 'A minha organização',
  organization_description_placeholder: 'Uma breve descrição da organização',
  organization_permission: 'Permissão da organização',
  organization_permission_other: 'Permissões da organização',
  organization_permission_description:
    'A permissão da organização refere-se à autorização para aceder a um recurso no contexto da organização. Uma permissão da organização deve ser representada como uma string significativa, servindo também como nome e identificador único.',
  organization_permission_delete_confirm:
    'Se esta permissão for eliminada, todas as funções da organização que incluam esta permissão perderão esta permissão, e os utilizadores que tinham esta permissão perderão o acesso concedido por ela.',
  create_permission_placeholder: 'Ler histórico de compromissos',
  permission: 'Permissão',
  permission_other: 'Permissões',
  organization_role: 'Papel da organização',
  organization_role_other: 'Funções da organização',
  organization_role_description:
    'O papel da organização é um agrupamento de permissões que podem ser atribuídas a utilizadores. As permissões devem provir das permissões de organização predefinidas.',
  organization_role_delete_confirm:
    'Fazê-lo removerá as permissões associadas a este papel dos usuários afetados e excluirá as relações entre os papéis da organização, os membros da organização e as permissões da organização.',
  role: 'Função',
  create_role_placeholder: 'Usuários com permissões somente leitura',
  search_placeholder: 'Pesquisar por nome ou ID da organização',
  search_permission_placeholder: 'Digite para pesquisar e selecionar permissões',
  search_role_placeholder: 'Digite para pesquisar e selecionar funções',
  empty_placeholder: '🤔 Você ainda não configurou nenhum {{entity}}.',
  /** UNTRANSLATED */
  organization_and_member: 'Organization and member',
  /** UNTRANSLATED */
  organization_and_member_description:
    'Organization is a group of users and can represent the teams, business customers, and partner companies, with each user being a "Member". Those can be fundamental entities to handle your multi-tenant requirements.',
  guide: {
    title: 'Comece com guias',
    subtitle: 'Inicie o seu processo de desenvolvimento de aplicações com os nossos guias',
    introduction: {
      /** UNTRANSLATED */
      title: "Let's understand how organization works in Logto",
      section_1: {
        /** UNTRANSLATED */
        title: 'An organization is a group of users (identities)',
      },
      section_2: {
        /** UNTRANSLATED */
        title: 'Organization template is designed for multi-tenant apps access control',
        /** UNTRANSLATED */
        description:
          'In multi-tenant SaaS applications, multiple organizations often share the same access control template, which includes permissions and roles. In Logto, we call it "organization template."',
        /** UNTRANSLATED */
        permission_description:
          'Organization permission refers to the authorization to access a resource in the context of organization.',
        /** UNTRANSLATED */
        role_description:
          'Organization role is a grouping of organization permissions that can be assigned to members.',
      },
      section_3: {
        title: 'Interaja com a ilustração para ver como tudo está conectado',
        description:
          "Let's take an example. John, Sarah are in different organizations with different roles in the context of different organizations. Hover over the different modules and see what happens.",
      },
    },
    step_1: 'Passo 1: Definir as permissões da organização',
    step_2: 'Passo 2: Definir as funções da organização',
    step_2_description:
      '"Funções da organização" representam um conjunto de funções atribuídas a cada organização no início. Estas funções são determinadas pelas permissões globais que definiu no ecrã anterior. Semelhante à permissão da org, uma vez concluída esta configuração pela primeira vez, não precisará de o fazer sempre que criar uma nova organização.',
    step_3: 'Passo 3: Crie a sua primeira organização',
    step_3_description:
      "Let's create your first organization. It comes with a unique ID and serves as a container for handling various more business-toward identities, such as partners, customers, and their access control.",
    /** UNTRANSLATED */
    more_next_steps: 'More next steps',
    /** UNTRANSLATED */
    add_members: 'Add members to your organization',
    /** UNTRANSLATED */
    add_members_action: 'Bulk add members and assign roles',
    /** UNTRANSLATED */
    add_enterprise_connector: 'Add enterprise SSO',
    /** UNTRANSLATED */
    add_enterprise_connector_action: 'Set up enterprise SSO',
    /** UNTRANSLATED */
    organization_permissions: 'Organization permissions',
    /** UNTRANSLATED */
    permission_name: 'Permission name',
    /** UNTRANSLATED */
    permissions: 'Permissions',
    /** UNTRANSLATED */
    organization_roles: 'Organization roles',
    /** UNTRANSLATED */
    role_name: 'Role name',
    /** UNTRANSLATED */
    organization_name: 'Organization name',
    /** UNTRANSLATED */
    admin: 'Admin',
    /** UNTRANSLATED */
    member: 'Member',
    /** UNTRANSLATED */
    guest: 'Guest',
    /** UNTRANSLATED */
    role_description:
      'Role "{{role}}" shares the same organization template across different organizations.',
    /** UNTRANSLATED */
    john: 'John',
    /** UNTRANSLATED */
    john_tip:
      'John belongs to two organizations with the email "john@email.com" as the single identifier. He is the admin of organization A as well as the guest of organization B.',
    /** UNTRANSLATED */
    sarah: 'Sarah',
    /** UNTRANSLATED */
    sarah_tip:
      'Sarah belongs to one organization with the email "sarah@email.com" as the single identifier. She is the admin of organization B.',
  },
};

export default Object.freeze(organizations);
