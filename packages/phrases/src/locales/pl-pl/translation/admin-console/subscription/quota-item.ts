const quota_item = {
  tenant_limit: {
    name: 'Liczba Najemców',
    limited: '{{count, number}} najemca',
    limited_other: '{{count, number}} najemcy',
    unlimited: 'Nieograniczona liczba najemców',
    not_eligible: 'Usuń swoich najemców',
  },
  mau_limit: {
    name: 'Miesięczna liczba aktywnych użytkowników',
    limited: '{{count, number}} MAU',
    unlimited: 'Nieograniczona liczba MAU',
    not_eligible: 'Usuń wszystkich użytkowników',
  },
  token_limit: {
    name: 'Tokens',
    limited: '{{count, number}} token',
    limited_other: '{{count, number}} tokens',
    unlimited: 'Nieograniczona liczba tokenów',
    not_eligible: 'Usuń wszystkich użytkowników, aby zapobiec nowym tokenom',
  },
  applications_limit: {
    name: 'Liczba aplikacji',
    limited: '{{count, number}} aplikacja',
    limited_other: '{{count, number}} aplikacje',
    unlimited: 'Nieograniczona liczba aplikacji',
    not_eligible: 'Usuń swoje aplikacje',
  },
  machine_to_machine_limit: {
    name: 'Machine to machine',
    limited: '{{count, number}} aplikacja machine to machine',
    limited_other: '{{count, number}} aplikacje machine to machine',
    unlimited: 'Nieograniczona liczba aplikacji machine to machine',
    not_eligible: 'Usuń swoje aplikacje machine to machine',
  },
  third_party_applications_limit: {
    name: 'Aplikacje osób trzecich',
    limited: '{{count, number}} aplikacja osób trzecich',
    limited_other: '{{count, number}} aplikacje osób trzecich',
    unlimited: 'Nieograniczona liczba aplikacji osób trzecich',
    not_eligible: 'Usuń swoje aplikacje osób trzecich',
  },
  resources_limit: {
    name: 'Zasoby API',
    limited: '{{count, number}} zasób API',
    limited_other: '{{count, number}} zasoby API',
    unlimited: 'Nieograniczona liczba zasobów API',
    not_eligible: 'Usuń swoje zasoby API',
  },
  scopes_per_resource_limit: {
    name: 'Uprawnienia zasobu',
    limited: '{{count, number}} uprawnienie na zasób',
    limited_other: '{{count, number}} uprawnienia na zasób',
    unlimited: 'Nieograniczone uprawnienie na zasób',
    not_eligible: 'Usuń swoje uprawnienia zasobu',
  },
  custom_domain_enabled: {
    name: 'Niestandardowy domena',
    limited: 'Niestandardowy domena',
    unlimited: 'Niestandardowy domena',
    not_eligible: 'Usuń swoją niestandardową domenę',
  },
  omni_sign_in_enabled: {
    name: 'Omni logowanie',
    limited: 'Omni logowanie',
    unlimited: 'Omni logowanie',
    not_eligible: 'Wyłącz swoje omni logowanie',
  },
  built_in_email_connector_enabled: {
    name: 'Wbudowany konektor e-mail',
    limited: 'Wbudowany konektor e-mail',
    unlimited: 'Wbudowany konektor e-mail',
    not_eligible: 'Usuń swój wbudowany konektor e-mail',
  },
  social_connectors_limit: {
    name: 'Konektory społecznościowe',
    limited: '{{count, number}} konektor społecznościowy',
    limited_other: '{{count, number}} konektory społecznościowe',
    unlimited: 'Nieograniczone konektory społecznościowe',
    not_eligible: 'Usuń swoje konektory społecznościowe',
  },
  standard_connectors_limit: {
    name: 'Darmowe standardowe konektory',
    limited: '{{count, number}} darmowy standardowy konektor',
    limited_other: '{{count, number}} darmowe standardowe konektory',
    unlimited: 'Nieograniczone standardowe konektory',
    not_eligible: 'Usuń swoje standardowe konektory',
  },
  roles_limit: {
    name: 'Role',
    limited: '{{count, number}} rola',
    limited_other: '{{count, number}} role',
    unlimited: 'Nieograniczona liczba ról',
    not_eligible: 'Usuń swoje role',
  },
  machine_to_machine_roles_limit: {
    name: 'Machine to machine roles',
    limited: '{{count, number}} machine to machine role',
    limited_other: '{{count, number}} machine to machine roles',
    unlimited: 'Nieograniczona liczba ról machine to machine',
    not_eligible: 'Usuń swoje role machine to machine',
  },
  scopes_per_role_limit: {
    name: 'Uprawnienia roli',
    limited: '{{count, number}} uprawnienie na rolę',
    limited_other: '{{count, number}} uprawnienia na rolę',
    unlimited: 'Nieograniczone uprawnienia na rolę',
    not_eligible: 'Usuń swoje uprawnienia roli',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} webhook',
    limited_other: '{{count, number}} webhooki',
    unlimited: 'Nieograniczona liczba webhooków',
    not_eligible: 'Usuń swoje webhooki',
  },
  organizations_enabled: {
    name: 'Organizations',
    limited: 'Organizations',
    unlimited: 'Organizations',
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: 'Przechowywanie dzienników audytowych',
    limited: 'Przechowywanie dzienników audytowych: {{count, number}} dzień',
    limited_other: 'Przechowywanie dzienników audytowych: {{count, number}} dni',
    unlimited: 'Nieograniczona liczba dni',
    not_eligible: 'Brak dzienników audytowych',
  },
  email_ticket_support: {
    name: 'Wsparcie poprzez e-maile',
    limited: '{{count, number}} godzina wsparcia poprzez e-maile',
    limited_other: '{{count, number}} godziny wsparcia poprzez e-maile',
    unlimited: 'Wsparcie poprzez e-maile',
    not_eligible: 'Brak wsparcia poprzez e-maile',
  },
  mfa_enabled: {
    name: 'Wielopoziomowe uwierzytelnianie',
    limited: 'Wielopoziomowe uwierzytelnianie',
    unlimited: 'Wielopoziomowe uwierzytelnianie',
    not_eligible: 'Usuń swoje wielopoziomowe uwierzytelnianie',
  },
  sso_enabled: {
    name: 'SSO przedsiębiorstwa',
    limited: 'SSO przedsiębiorstwa',
    unlimited: 'SSO przedsiębiorstwa',
    not_eligible: 'Usuń swoje SSO przedsiębiorstwa',
  },
  tenant_members_limit: {
    name: 'Członkowie najemcy',
    limited: '{{count, number}} członek najemcy',
    limited_other: '{{count, number}} członków najemcy',
    unlimited: 'Nieograniczona liczba członków najemcy',
    not_eligible: 'Usuń swoich członków najemcy',
  },
  custom_jwt_enabled: {
    name: 'Niestandardowy JWT',
    limited: 'Niestandardowy JWT',
    unlimited: 'Niestandardowy JWT',
    not_eligible: 'Usuń swoje niestandardowe narzędzie tworzące JWT',
  },
  impersonation_enabled: {
    name: 'Impersonacja',
    limited: 'Impersonacja',
    unlimited: 'Impersonacja',
    not_eligible: 'Brak pozwolenia na impersonację',
  },
  bring_your_ui_enabled: {
    name: 'Użyj swojego interfejsu użytkownika',
    limited: 'Użyj swojego interfejsu użytkownika',
    unlimited: 'Użyj swojego interfejsu użytkownika',
    not_eligible: 'Usuń swoje niestandardowe zasoby interfejsu użytkownika',
  },
  idp_initiated_sso_enabled: {
    /** UNTRANSLATED */
    name: 'IDP-initiated SSO',
    /** UNTRANSLATED */
    limited: 'IDP-initiated SSO',
    /** UNTRANSLATED */
    unlimited: 'IDP-initiated SSO',
    /** UNTRANSLATED */
    not_eligible: 'IDP-initiated SSO not allowed',
  },
  saml_applications_limit: {
    /** UNTRANSLATED */
    name: 'SAML applications',
    /** UNTRANSLATED */
    limited: '{{count, number}} SAML application',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} SAML applications',
    /** UNTRANSLATED */
    unlimited: 'Unlimited SAML applications',
    /** UNTRANSLATED */
    not_eligible: 'Remove your SAML applications',
  },
};

export default Object.freeze(quota_item);
