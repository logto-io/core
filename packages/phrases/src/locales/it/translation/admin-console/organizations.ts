const organizations = {
  /** UNTRANSLATED */
  organization: 'Organization',
  page_title: 'Organizzazioni',
  title: 'Organizzazioni',
  /** UNTRANSLATED */
  subtitle:
    'An organization is a collection of users which includes teams, business clients, and partner firms that use your applications.',
  /** UNTRANSLATED */
  organization_template: 'Organization template',
  organization_id: 'ID organizzazione',
  members: 'Membri',
  create_organization: 'Crea organizzazione',
  setup_organization: 'Configura la tua organizzazione',
  organization_list_placeholder_title: 'Organizzazione',
  organization_list_placeholder_text:
    "L'organizzazione è di solito utilizzata in app multi-inquilino SaaS o simili a SaaS. La funzione Organizzazioni consente ai tuoi clienti B2B di gestire meglio i loro partner e clienti, e di personalizzare i modi in cui gli utenti finali accedono alle loro applicazioni.",
  organization_name_placeholder: 'La mia organizzazione',
  organization_description_placeholder: "Una breve descrizione dell'organizzazione",
  organization_permission: 'Permessi organizzazione',
  organization_permission_other: 'Permessi organizzazione',
  organization_permission_description:
    "Il permesso organizzativo si riferisce all'autorizzazione per accedere a una risorsa nel contesto dell'organizzazione. Un permesso organizzativo dovrebbe essere rappresentato come una stringa significativa, servendo anche come nome e identificatore univoco.",
  organization_permission_delete_confirm:
    "Se questo permesso viene eliminato, tutti i ruoli dell'organizzazione che includono questo permesso perderanno tale permesso, e gli utenti che avevano questo permesso perderanno l'accesso garantito da esso.",
  create_permission_placeholder: 'Leggi la cronologia degli appuntamenti',
  permission: 'Permesso',
  permission_other: 'Permessi',
  organization_role: 'Ruolo organizzazione',
  organization_role_other: 'Ruoli organizzazione',
  organization_role_description:
    'Il ruolo organizzativo è un raggruppamento di permessi che possono essere assegnati agli utenti. I permessi devono provenire dai permessi organizzativi predefiniti.',
  organization_role_delete_confirm:
    "Fare ciò rimuoverà i permessi associati a questo ruolo dagli utenti interessati ed eliminerà le relazioni tra i ruoli dell'organizzazione, i membri dell'organizzazione e i permessi dell'organizzazione.",
  role: 'Ruolo',
  create_role_placeholder: 'Utenti con solo permessi di visualizzazione',
  search_placeholder: "Cerca per nome o ID dell'organizzazione",
  search_permission_placeholder: 'Digita per cercare e selezionare i permessi',
  search_role_placeholder: 'Digita per cercare e selezionare i ruoli',
  empty_placeholder: '🤔 Non hai ancora impostato nessun {{entity}}.',
  /** UNTRANSLATED */
  organization_and_member: 'Organization and member',
  /** UNTRANSLATED */
  organization_and_member_description:
    'Organization is a group of users and can represent the teams, business customers, and partner companies, with each user being a "Member". Those can be fundamental entities to handle your multi-tenant requirements.',
  guide: {
    title: 'Inizia con le guide',
    /** UNTRANSLATED */
    subtitle: 'Jumpstart your organization settings with our guides',
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
        title: "Interagisci con l'illustrazione per vedere come tutto si collega",
        description:
          "Let's take an example. John, Sarah are in different organizations with different roles in the context of different organizations. Hover over the different modules and see what happens.",
      },
    },
    step_1: "Passo 1: Definire i permessi dell'organizzazione",
    step_2: "Passo 2: Definire i ruoli dell'organizzazione",
    step_3: 'Passo 3: Crea la tua prima organizzazione',
    /** UNTRANSLATED */
    step_3_description:
      "Let's create your first organization. It comes with a unique ID and serves as a container for handling various more business-toward identities.",
    /** UNTRANSLATED */
    more_next_steps: 'More next steps',
    /** UNTRANSLATED */
    add_members: 'Add members to your organization',
    /** UNTRANSLATED */
    add_members_action: 'Bulk add members and assign roles',
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
