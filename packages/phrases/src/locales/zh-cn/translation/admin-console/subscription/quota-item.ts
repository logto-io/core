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
    limited_other: '{{count, number}} 个 Webhooks',
    unlimited: '无限制的 Webhooks',
    not_eligible: '移除你的 Webhooks',
  },
  organization_enabled: {
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
  community_support_enabled: {
    name: '社区支持',
    limited: '社区支持',
    unlimited: '社区支持',
    not_eligible: '无社区支持',
  },
  customer_ticket_support: {
    name: '客户支持票',
    limited: '{{count, number}} 小时客户支持票',
    limited_other: '{{count, number}} 小时客户支持票',
    unlimited: '客户支持票',
    not_eligible: '无客户支持票',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: '禁用你的 MFA',
  },
};

export default Object.freeze(quota_item);
