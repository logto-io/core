const quota_item = {
  tenant_limit: {
    name: '租户',
    limited: '{{count, number}} 个租户',
    limited_other: '{{count, number}} 个租户',
    unlimited: '无限制租户',
    not_eligible: '移除你的租户',
  },
  mau_limit: {
    name: '月活跃用户',
    limited: '{{count, number}} MAU',
    unlimited: '无限制 MAU',
    not_eligible: '移除你的所有用户',
  },
  token_limit: {
    name: '令牌',
    limited: '{{count, number}} 个令牌',
    limited_other: '{{count, number}} 个令牌',
    unlimited: '无限制令牌',
    not_eligible: '移除你的所有用户以防止生成新令牌',
  },
  applications_limit: {
    name: '应用',
    limited: '{{count, number}} 个应用',
    limited_other: '{{count, number}} 个应用',
    unlimited: '无限制应用',
    not_eligible: '移除你的应用',
  },
  machine_to_machine_limit: {
    name: '机器到机器',
    limited: '{{count, number}} 个机器到机器应用',
    limited_other: '{{count, number}} 个机器到机器应用',
    unlimited: '无限制机器到机器应用',
    not_eligible: '移除你的机器到机器应用',
  },
  third_party_applications_limit: {
    name: '第三方应用',
    limited: '{{count, number}} 第三方应用',
    limited_other: '{{count, number}} 第三方应用',
    unlimited: '无限制第三方应用',
    not_eligible: '移除你的第三方应用',
  },
  resources_limit: {
    name: 'API 资源',
    limited: '{{count, number}} 个 API 资源',
    limited_other: '{{count, number}} 个 API 资源',
    unlimited: '无限制 API 资源',
    not_eligible: '移除你的 API 资源',
  },
  scopes_per_resource_limit: {
    name: '资源权限',
    limited: '{{count, number}} 个权限每个资源',
    limited_other: '{{count, number}} 个权限每个资源',
    unlimited: '无限制权限每个资源',
    not_eligible: '移除你的资源权限',
  },
  custom_domain_enabled: {
    name: '自定义域名',
    limited: '自定义域名',
    unlimited: '自定义域名',
    not_eligible: '移除你的自定义域名',
  },
  omni_sign_in_enabled: {
    name: '全渠道登录',
    limited: '全渠道登录',
    unlimited: '全渠道登录',
    not_eligible: '禁用全渠道登录',
  },
  built_in_email_connector_enabled: {
    name: '内置电子邮件连接器',
    limited: '内置电子邮件连接器',
    unlimited: '内置电子邮件连接器',
    not_eligible: '移除你的内置电子邮件连接器',
  },
  social_connectors_limit: {
    name: '社交连接器',
    limited: '{{count, number}} 个社交连接器',
    limited_other: '{{count, number}} 个社交连接器',
    unlimited: '无限制社交连接器',
    not_eligible: '移除你的社交连接器',
  },
  standard_connectors_limit: {
    name: '免费标准连接器',
    limited: '{{count, number}} 个免费标准连接器',
    limited_other: '{{count, number}} 个免费标准连接器',
    unlimited: '无限制标准连接器',
    not_eligible: '移除你的标准连接器',
  },
  roles_limit: {
    name: '角色',
    limited: '{{count, number}} 个角色',
    limited_other: '{{count, number}} 个角色',
    unlimited: '无限制角色',
    not_eligible: '移除你的角色',
  },
  machine_to_machine_roles_limit: {
    name: '机器到机器角色',
    limited: '{{count, number}} 个机器到机器角色',
    limited_other: '{{count, number}} 个机器到机器角色',
    unlimited: '无限制机器到机器角色',
    not_eligible: '移除你的机器到机器角色',
  },
  scopes_per_role_limit: {
    name: '角色权限',
    limited: '{{count, number}} 个权限每个角色',
    limited_other: '{{count, number}} 个权限每个角色',
    unlimited: '无限制权限每个角色',
    not_eligible: '移除你的角色权限',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} 个 Webhook',
    limited_other: '{{count, number}} 个 Webhook',
    unlimited: '无限制的 Webhook',
    not_eligible: '移除你的 Webhook',
  },
  organizations_enabled: {
    name: '组织',
    limited: '组织',
    unlimited: '组织',
    not_eligible: '移除你的组织',
  },
  audit_logs_retention_days: {
    name: '审计日志保留',
    limited: '审计日志保留：{{count, number}} 天',
    limited_other: '审计日志保留：{{count, number}} 天',
    unlimited: '无限制天数',
    not_eligible: '无审计日志',
  },
  email_ticket_support: {
    name: '电子邮件支持',
    limited: '{{count, number}} 小时电子邮件支持',
    limited_other: '{{count, number}} 小时电子邮件支持',
    unlimited: '电子邮件支持',
    not_eligible: '无电子邮件支持',
  },
  mfa_enabled: {
    name: '多因素认证',
    limited: '多因素认证',
    unlimited: '多因素认证',
    not_eligible: '移除您的多因素认证',
  },
  sso_enabled: {
    name: '企业SSO',
    limited: '企业SSO',
    unlimited: '企业SSO',
    not_eligible: '移除你的 企业SSO',
  },
  tenant_members_limit: {
    name: '租户成员',
    limited: '{{count, number}} 个租户成员',
    limited_other: '{{count, number}} 个租户成员',
    unlimited: '无限制租户成员',
    not_eligible: '移除你的租户成员',
  },
  custom_jwt_enabled: {
    name: '自定义 JWT',
    limited: '自定义 JWT',
    unlimited: '自定义 JWT',
    not_eligible: '移除你的 JWT 声明自定义器',
  },
  impersonation_enabled: {
    name: '冒充',
    limited: '冒充',
    unlimited: '冒充',
    not_eligible: '不允许冒充',
  },
  bring_your_ui_enabled: {
    name: '自定义 UI',
    limited: '自定义 UI',
    unlimited: '自定义 UI',
    not_eligible: '移除你的自定义 UI 资产',
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
