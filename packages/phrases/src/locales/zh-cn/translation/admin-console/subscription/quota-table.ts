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
    machine_to_machine_roles: '机器对机器角色',
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
    organizations: '组织',
    monthly_active_organization: '每月活跃组织',
    allowed_users_per_org: '每组织允许的用户数',
    invitation: '邀请（即将推出）',
    org_roles: '组织角色',
    org_permissions: '组织权限',
    just_in_time_provisioning: '即时配置',
  },
  support: {
    /** UNTRANSLATED */
    title: 'Compliance and support',
    community: '社区',
    customer_ticket: '客户支持票据',
    premium: '高级版',
    /** UNTRANSLATED */
    email_ticket_support: 'Email ticket support',
    /** UNTRANSLATED */
    soc2_report: 'SOC2 report (Coming soon)',
    /** UNTRANSLATED */
    hipaa_or_baa_report: 'HIPAA/BAA report (Coming soon)',
  },
  mau_unit_price_footnote:
    '* 您的每月活跃用户（MAU）根据在结算周期内登录的频率分为3个层级。每个层级的MAU单价不同。',
  unlimited: '无限制',
  contact: '联系',
  monthly_price: '${{value, number}} / 月',
  mau_price: '${{value, number}} / MAU',
  days_one: '{{count, number}} 天',
  days_other: '{{count, number}} 天',
  add_on: '附加功能',
  tier: '层级{{value, number}}：',
  free_token_limit_tip: '免费发行{{value}}M令牌。',
  paid_token_limit_tip:
    '免费发行{{value}}M令牌。我们可能会在定价确定后，如果您的令牌超过{{value}}M，则会加收费用。',
  paid_quota_limit_tip: '一旦我们确定价格，我们可能会对超出配额限制的功能添加额外费用。',
  beta_feature_tip: '在测试阶段免费使用。一旦我们确定附加功能的定价，我们将开始收费。',
  usage_based_beta_feature_tip:
    '在测试阶段免费使用。一旦我们确定基于组织使用情况的定价，我们将开始收费。',
  beta: '测试版',
  add_on_beta: '附加功能（测试版）',
};

export default Object.freeze(quota_table);
