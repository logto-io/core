const quota_table = {
  quota: {
    title: 'Quota',
    tenant_limit: 'Tenant limit',
    base_price: 'Base price',
    mau_unit_price: '* MAU unit price',
    mau_limit: 'MAU limit',
  },
  application: {
    title: 'Applications',
    total: 'Total applications',
    m2m: 'Machine-to-machine',
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
    mfa: 'MFA',
    sso: 'Enterprise SSO',
  },
  user_management: {
    title: 'User management',
    user_management: 'User management',
    roles: 'Roles',
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
    invitation: 'Invitation (Coming soon)',
    org_roles: 'Org roles',
    org_permissions: 'Org permissions',
    just_in_time_provisioning: 'Just-in-time provisioning',
  },
  support: {
    title: 'Support',
    community: 'Community',
    customer_ticket: 'Ticket support',
    premium: 'Premium',
  },
  mau_unit_price_footnote:
    '* Your monthly active users (MAU) are divided into 3 tiers based on how often they log in during the billing cycle. Each tier has a different price per MAU unit.',
  unlimited: 'Unlimited',
  contact: 'Contact',
  monthly_price: '${{value, number}}/mo',
  mau_price: '${{value, number}}/MAU',
  days_one: '{{count, number}} day',
  days_other: '{{count, number}} days',
  add_on: 'Add-on',
  tier: 'Tier{{value, number}}: ',
  free_token_limit_tip: 'Free for {{value}}M token issued.',
  paid_token_limit_tip:
    'Free for {{value}}M token issued. We may add charges if you go beyond {{value}}M tokens once we finalize the prices.',
  paid_quota_limit_tip:
    'We may add charges for features that go beyond your quota limit as add-ons once we finalize the prices.',
  beta_feature_tip:
    'Free to use during the beta phase. We will begin charging once we finalize the add-on pricing.',
  beta: 'Beta',
  add_on_beta: 'Add-on (Beta)',
};

export default Object.freeze(quota_table);
