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
    /** UNTRANSLATED */
    third_party: 'Third-party apps',
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
    app_logo_and_favicon: 'Logo aplikacji i ikona',
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
    adaptive_mfa: 'MFA adaptacyjne',
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
    monthly_active_organization: 'Miesięczna liczba aktywnych organizacji',
    allowed_users_per_org: 'Dozwolona liczba użytkowników na organizację',
    invitation: 'Zaproszenie',
    org_roles: 'Role organizacji',
    org_permissions: 'Uprawnienia organizacji',
    just_in_time_provisioning: 'Provisioning w trybie just-in-time',
  },
  support: {
    title: 'Zgodność i wsparcie',
    community: 'Społeczność',
    customer_ticket: 'Zgłoszenie wsparcia',
    premium: 'Premium',
    email_ticket_support: 'Wsparcie za pośrednictwem biletów e-mail',
    soc2_report: 'Raport SOC2',
    hipaa_or_baa_report: 'Raport HIPAA/BAA',
  },
  developers_and_platform: {
    /** UNTRANSLATED */
    title: 'Developers and platform',
    /** UNTRANSLATED */
    hooks: 'Webhooks',
    /** UNTRANSLATED */
    audit_logs_retention: 'Audit logs retention',
    /** UNTRANSLATED */
    jwt_claims: 'JWT claims',
    /** UNTRANSLATED */
    tenant_members: 'Tenant members',
  },
  unlimited: 'Nieograniczone',
  contact: 'Kontakt',
  monthly_price: '${{value, number}}/mies.',
  days_one: '{{count, number}} dzień',
  days_other: '{{count, number}} dni',
  add_on: 'Dodatkowy',
  tier: 'Poziom{{value, number}}: ',
  paid_token_limit_tip:
    'Logto doliczy opłaty za funkcje, które przekraczają Twój limit kwoty. Możesz go używać bezpłatnie do momentu rozpoczęcia naliczania opłat około II kwartału 2024 roku. Jeśli potrzebujesz więcej tokenów, skontaktuj się z nami. Domyślnie naliczamy $80 miesięcznie za milion tokenów.',
  paid_quota_limit_tip:
    'Logto będzie naliczać opłaty za funkcje przekraczające limit kontyngentu. Możesz go używać bezpłatnie do czasu rozpoczęcia naliczania opłat, około II kwartał 2024 roku.',
  paid_add_on_feature_tip:
    'To jest funkcja dodatkowa. Możesz z niej korzystać bezpłatnie do czasu rozpoczęcia naliczania opłat, około II kwartał 2024 roku.',
  million: '{{value, number}} milion',
  mau_tip:
    'MAU (aktywni użytkownicy miesięczni) oznacza liczbę unikalnych użytkowników, którzy wymienili co najmniej jeden token z Logto w cyklu rozliczeniowym.',
  tokens_tip:
    'Wszystkie rodzaje tokenów wydanych przez Logto, w tym tokeny dostępu, tokeny odświeżania, itp.',
  mao_tip:
    'MAO (aktywna organizacja miesięczna) oznacza liczbę unikalnych organizacji, które mają co najmniej jednego aktywnego użytkownika miesięcznie w cyklu rozliczeniowym.',
  /** UNTRANSLATED */
  third_party_tip:
    'Use Logto as your OIDC identity provider for third-party app sign-ins and permission grants.',
  included: '{{value, number}} zawarte',
  included_mao: '{{value, number}} MAO wliczone',
  extra_quota_price: 'Następnie ${{value, number}} za miesiąc / każdy po',
  per_month_each: '${{value, number}} za miesiąc / każdy',
  extra_mao_price: 'Następnie ${{value, number}} za MAO',
  per_month: '${{value, number}} za miesiąc',
  /** UNTRANSLATED */
  per_member: 'Then ${{value, number}} per member',
};

export default Object.freeze(quota_table);
