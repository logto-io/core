const quota_table = {
  quota: {
    title: '配额',
    tenant_limit: '租户限制',
    base_price: '基本价格',
    mau_unit_price: '* 每活跃用户（MAU）单价',
    mau_limit: 'MAU 限制',
  },
  application: {
    title: '应用',
    total: '总应用数',
    m2m: '机器对机器',
  },
  resource: {
    title: 'API 资源',
    resource_count: '资源数量',
    scopes_per_resource: '每资源权限',
  },
  branding: {
    title: '界面与品牌',
    custom_domain: '自定义域名',
    custom_css: '自定义 CSS',
    app_logo_and_favicon: '应用图标与网站图标',
    dark_mode: '深色模式',
    i18n: '国际化',
  },
  user_authn: {
    title: '用户认证',
    omni_sign_in: '全渠道登录',
    password: '密码',
    passwordless: '免密码登录 - 电子邮件和短信',
    email_connector: '电子邮件连接器',
    sms_connector: '短信连接器',
    social_connectors: '社交连接器',
    standard_connectors: '标准连接器',
    built_in_email_connector: '内置电子邮件连接器',
    mfa: 'MFA',
    sso: '企业 SSO',
  },
  user_management: {
    title: '用户管理',
    user_management: '用户管理',
    roles: '角色',
    /** UNTRANSLATED */
    machine_to_machine_roles: 'Machine-to-machine roles',
    scopes_per_role: '每角色权限',
  },
  audit_logs: {
    title: '审计日志',
    retention: '保留期限',
  },
  hooks: {
    title: 'Webhooks',
    hooks: 'Webhooks',
  },
  organizations: {
    title: '组织',
    /** UNTRANSLATED */
    organizations: 'Organizations',
    /** UNTRANSLATED */
    monthly_active_organization: 'Monthly active organization',
    /** UNTRANSLATED */
    allowed_users_per_org: 'Allowed users per org',
    /** UNTRANSLATED */
    invitation: 'Invitation (Coming soon)',
    /** UNTRANSLATED */
    org_roles: 'Org roles',
    /** UNTRANSLATED */
    org_permissions: 'Org permissions',
    /** UNTRANSLATED */
    just_in_time_provisioning: 'Just-in-time provisioning',
  },
  support: {
    title: '支持',
    community: '社区',
    customer_ticket: '客户支持票据',
    premium: '高级版',
  },
  mau_unit_price_footnote:
    '* 您的每月活跃用户（MAU）根据在结算周期内登录的频率分为3个层级。每个层级的MAU单价不同。',
  unlimited: '无限制',
  contact: '联系',
  monthly_price: '${{value, number}}/月',
  mau_price: '${{value, number}}/MAU',
  days_one: '{{count, number}}天',
  days_other: '{{count, number}}天',
  add_on: '附加功能',
  tier: '层级{{value, number}}：',
  /** UNTRANSLATED */
  free_token_limit_tip: 'Free for {{value}}M token issued.',
  /** UNTRANSLATED */
  paid_token_limit_tip:
    'Free for {{value}}M token issued. We may add charges if you go beyond {{value}}M tokens once we finalize the prices.',
  /** UNTRANSLATED */
  paid_quota_limit_tip:
    'We may add charges for features that go beyond your quota limit as add-ons once we finalize the prices.',
  /** UNTRANSLATED */
  beta_feature_tip:
    'Free to use during the beta phase. We will begin charging once we finalize the add-on pricing.',
  /** UNTRANSLATED */
  usage_based_beta_feature_tip:
    'Free to use during the beta phase. We will begin charging once we finalize the org usage-based pricing.',
  /** UNTRANSLATED */
  beta: 'Beta',
  /** UNTRANSLATED */
  add_on_beta: 'Add-on (Beta)',
};

export default Object.freeze(quota_table);
