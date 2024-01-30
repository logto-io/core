const quota_table = {
  quota: {
    title: 'Basics',
    base_price: 'Base price',
    mau_limit: 'MAU limit',
    included_tokens: 'Included tokens',
  },
  application: {
    title: 'Applications',
    total: 'Total applications',
    m2m: 'Machine-to-machine apps',
    third_party: 'Third-party apps',
  },
  resource: {
    title: 'API resources',
    resource_count: 'Resource count',
    scopes_per_resource: 'Permissions per resource',
  },
  branding: {
    title: 'UI and branding',
    custom_domain: 'Custom domain',
    custom_css: 'Custom CSS',
    app_logo_and_favicon: 'App logo and favicon',
    dark_mode: 'Dark mode',
    i18n: 'Internationalization',
  },
  user_authn: {
    title: 'User authentication',
    omni_sign_in: 'Omni sign-in',
    password: 'Password',
    passwordless: 'Passwordless - Email and SMS',
    email_connector: 'Email connector',
    sms_connector: 'SMS connector',
    social_connectors: 'Social connectors',
    standard_connectors: 'Standard connectors',
    built_in_email_connector: 'Built-in email connector',
    mfa: 'Multi-factor authentication',
    sso: 'Enterprise SSO',
  },
  user_management: {
    title: 'User management',
    user_management: 'User management',
    roles: 'Roles',
    machine_to_machine_roles: 'Machine-to-machine roles',
    scopes_per_role: 'Permissions per role',
  },
  audit_logs: {
    title: 'Audit logs',
    retention: 'Retention',
  },
  hooks: {
    title: 'Webhooks',
    hooks: 'Webhooks',
  },
  organizations: {
    title: 'Organizations',
    organizations: 'Organizations',
    monthly_active_organization: 'Monthly active organization',
    allowed_users_per_org: 'Allowed users per org',
    invitation: 'Invitation',
    org_roles: 'Org roles',
    org_permissions: 'Org permissions',
    just_in_time_provisioning: 'Just-in-time provisioning',
  },
  support: {
    title: 'Compliance and support',
    community: 'Community',
    customer_ticket: 'Ticket support',
    premium: 'Premium',
    email_ticket_support: 'Email ticket support',
    soc2_report: 'SOC2 report',
    hipaa_or_baa_report: 'HIPAA/BAA report',
  },
  unlimited: 'Unlimited',
  contact: 'Contact',
  monthly_price: '${{value, number}}/mo',
  days_one: '{{count, number}} day',
  days_other: '{{count, number}} days',
  add_on: 'Add-on',
  tier: 'Tier{{value, number}}: ',
  paid_token_limit_tip:
    "Logto will add charges for features that go beyond your quota limit. You can use it at no cost until we're beginning charging around Q2 2024. If you require more tokens, please get in touch with us. By default, we bill $80 per month for every million tokens.",
  paid_quota_limit_tip:
    "Logto will add charges for features that go beyond your quota limit. You can use it at no cost until we're beginning charging around Q2 2024.",
  paid_add_on_feature_tip:
    "This is an add-on feature. You can use it at no cost until we're beginning charging around Q2 2024.",
  million: '{{value, number}} million',
  mau_tip:
    'MAU (monthly active user) means the number of unique users who have exchanged at least one token with Logto in a billing cycle.',
  tokens_tip:
    'All kinds of tokens that issued by Logto, including access token, refresh token, etc.',
  mao_tip:
    'MAO (monthly active org) means the number of unique organizations who has at least one MAU (monthly active user) in a billing cycle.',
  third_party_tip:
    'Use Logto as your OIDC identity provider for third-party app sign-ins and permission grants.',
  included: '{{value, number}} included',
  included_mao: '{{value, number}} MAO included',
  extra_quota_price: 'Then ${{value, number}} per mo / ea after',
  per_month_each: '${{value, number}} per mo / ea',
  extra_mao_price: 'Then ${{value, number}} per MAO',
  per_month: '${{value, number}} per mo',
};

export default Object.freeze(quota_table);
