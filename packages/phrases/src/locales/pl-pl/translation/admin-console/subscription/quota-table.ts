const quota_table = {
  quota: {
    title: 'Podstawy',
    base_price: 'Cena podstawowa',
    mau_limit: 'Limit MAU',
    included_tokens: 'Zawarte tokeny',
  },
  application: {
    title: 'Aplikacje',
    total: 'Liczba aplikacji',
    m2m: 'Aplikacja typu maszyna-maszyna',
    third_party: 'Aplikacje firm trzecich',
  },
  resource: {
    title: 'Zasoby API',
    resource_count: 'Liczba zasobów',
    scopes_per_resource: 'Uprawnienia na zasób',
  },
  branding: {
    title: 'Interfejs użytkownika i branding',
    custom_domain: 'Domena niestandardowa',
    custom_css: 'Niestandardowy CSS',
    logo_and_favicon: 'Logo i favicon',
    bring_your_ui: 'Przynieś swój interfejs użytkownika',
    dark_mode: 'Tryb ciemny',
    i18n: 'Internacjonalizacja',
  },
  user_authn: {
    title: 'Uwierzytelnianie użytkowników',
    omni_sign_in: 'Omni logowanie',
    password: 'Hasło',
    passwordless: 'Logowanie bez hasła - E-mail i SMS',
    email_connector: 'Podłączenie e-mail',
    sms_connector: 'Podłączenie SMS',
    social_connectors: 'Podłączenia społecznościowe',
    standard_connectors: 'Standardowe podłączenia',
    built_in_email_connector: 'Wbudowane podłączenie e-mail',
    mfa: 'Wielopoziomowa autentykacja',
    sso: 'SSO przedsiębiorstwowe',
    impersonation: 'Podszywanie się',
  },
  user_management: {
    title: 'Zarządzanie użytkownikami',
    user_management: 'Zarządzanie użytkownikami',
    roles: 'Role',
    machine_to_machine_roles: 'Role maszyna-maszyna',
    scopes_per_role: 'Uprawnienia na rolę',
  },
  organizations: {
    title: 'Organizacja',
    organizations: 'Organizacje',
    organization: 'Organizacja',
    organization_count: 'Liczba organizacji',
    allowed_users_per_org: 'Użytkownicy na organizację',
    invitation: 'Zaproszenia (API zarządzania)',
    org_roles: 'Role organizacji',
    org_permissions: 'Uprawnienia organizacyjne',
    just_in_time_provisioning: 'Provisioning w trybie just-in-time',
  },
  support: {
    title: 'Wsparcie',
    community: 'Społeczność',
    customer_ticket: 'Zgłoszenie wsparcia',
    premium: 'Premium',
    email_ticket_support: 'Wsparcie za pośrednictwem biletów e-mail',
    discord_private_channel: 'Prywatny kanał na Discordzie',
    premium_support: 'Wsparcie premium',
    developer_onboarding: 'Wprowadzenie dewelopera',
    solution_engineer_support: 'Wsparcie inżyniera rozwiązania',
    sla: 'Umowa SLA',
    dedicated_computing_resources: 'Dedykowane zasoby obliczeniowe',
  },
  compliance: {
    title: 'Zgodność',
    soc2_compliant: 'Zgodność z SOC2',
    soc2_report: 'Raport SOC2',
    hipaa_or_baa_report: 'Raport HIPAA/BAA',
  },
  developers_and_platform: {
    title: 'Deweloperzy i platforma',
    hooks: 'Webhooks',
    audit_logs_retention: 'Retention logów audit',
    jwt_claims: 'Pretensje JWT',
    tenant_members: 'Członkowie najemcy',
  },
  unlimited: 'Nieograniczone',
  contact: 'Kontakt',
  monthly_price: '${{value, number}}/mies.',
  days_one: '{{count, number}} dzień',
  days_other: '{{count, number}} dni',
  add_on: 'Dodatkowy',
  tier: 'Poziom{{value, number}}: ',
  million: '{{value, number}} milion',
  mau_tip:
    'MAU (aktywni użytkownicy miesięczni) oznacza liczbę unikalnych użytkowników, którzy wymienili co najmniej jeden token z Logto w cyklu rozliczeniowym.',
  tokens_tip:
    'Wszystkie rodzaje tokenów wydanych przez Logto, w tym tokeny dostępu, tokeny odświeżania, itp.',
  mao_tip:
    'MAO (aktywna organizacja miesięczna) oznacza liczbę unikalnych organizacji, które mają co najmniej jednego aktywnego użytkownika miesięcznie w cyklu rozliczeniowym.',
  third_party_tip:
    'Używaj Logto jako dostawcy tożsamości OIDC do logowania firm trzecich i udzielania zgód.',
  included: '{{value, number}} zawarte',
  included_mao: '{{value, number}} MAO wliczone',
  extra_quota_price: 'Następnie ${{value, number}} za miesiąc / każdy po',
  extra_token_price: 'Następnie ${{value, number}} za miesiąc / {{amount, number}} po',
  per_month_each: '${{value, number}} za miesiąc / każdy',
  extra_mao_price: 'Następnie ${{value, number}} za MAO',
  per_month: '${{value, number}} za miesiąc',
  per_member: 'Następnie ${{value, number}} za członka',
};

export default Object.freeze(quota_table);
