const quota_item = {
  tenant_limit: {
    name: '租戶',
    limited: '{{count, number}} 租戶',
    limited_other: '{{count, number}} 租戶',
    unlimited: '不限租戶數',
    not_eligible: '移除您的租戶',
  },
  mau_limit: {
    name: 'Monthly active users',
    limited: '{{count, number}} 月活用戶',
    unlimited: '不限月活用戶數',
    not_eligible: '移除您的所有用戶',
  },
  applications_limit: {
    name: 'Applications',
    limited: '{{count, number}} 應用程式',
    limited_other: '{{count, number}} 應用程式',
    unlimited: '不限應用程式數',
    not_eligible: '移除您的應用程式',
  },
  machine_to_machine_limit: {
    name: 'Machine to machine',
    limited: '{{count, number}} 機器對機器應用程式',
    limited_other: '{{count, number}} 機器對機器應用程式',
    unlimited: '不限機器對機器應用程式數',
    not_eligible: '移除您的機器對機器應用程式',
  },
  resources_limit: {
    name: 'API 資源',
    limited: '{{count, number}} API 資源',
    limited_other: '{{count, number}} API 資源',
    unlimited: '不限 API 資源數',
    not_eligible: '移除您的 API 資源',
  },
  scopes_per_resource_limit: {
    name: '資源權限',
    limited: '{{count, number}} 權限每資源',
    limited_other: '{{count, number}} 權限每資源',
    unlimited: '不限權限每資源數',
    not_eligible: '移除您的資源權限',
  },
  custom_domain_enabled: {
    name: '自訂網域',
    limited: '自訂網域',
    unlimited: '自訂網域',
    not_eligible: '移除您的自訂網域',
  },
  omni_sign_in_enabled: {
    /** UNTRANSLATED */
    name: 'SSO',
    /** UNTRANSLATED */
    limited: 'SSO',
    /** UNTRANSLATED */
    unlimited: 'SSO',
    /** UNTRANSLATED */
    not_eligible: 'Disable your SSO',
  },
  built_in_email_connector_enabled: {
    name: '內建電子郵件連接程式',
    limited: '內建電子郵件連接程式',
    unlimited: '內建電子郵件連接程式',
    not_eligible: '移除您的內建電子郵件連接程式',
  },
  social_connectors_limit: {
    name: '社交連接程式',
    limited: '{{count, number}} 社交連接程式',
    limited_other: '{{count, number}} 社交連接程式',
    unlimited: '不限社交連接程式數',
    not_eligible: '移除您的社交連接程式',
  },
  standard_connectors_limit: {
    name: '免費標準連接程式',
    limited: '{{count, number}} 免費標準連接程式',
    limited_other: '{{count, number}} 免費標準連接程式',
    unlimited: '不限標準連接程式數',
    not_eligible: '移除您的標準連接程式',
  },
  roles_limit: {
    name: '角色',
    limited: '{{count, number}} 角色',
    limited_other: '{{count, number}} 角色',
    unlimited: '不限角色數',
    not_eligible: '移除您的角色',
  },
  scopes_per_role_limit: {
    name: '角色權限',
    limited: '{{count, number}} 權限每角色',
    limited_other: '{{count, number}} 權限每角色',
    unlimited: '不限權限每角色數',
    not_eligible: '移除您的角色權限',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}}個 Webhook',
    limited_other: '{{count, number}}個 Webhooks',
    unlimited: '無限制的 Webhooks',
    not_eligible: '移除您的 Webhooks',
  },
  organization_enabled: {
    /** UNTRANSLATED */
    name: 'Organization',
    /** UNTRANSLATED */
    limited: 'Organization',
    /** UNTRANSLATED */
    unlimited: 'Organization',
    /** UNTRANSLATED */
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: '審計記錄保留期限',
    limited: '審計記錄保留期限：{{count, number}} 天',
    limited_other: '審計記錄保留期限：{{count, number}} 天',
    unlimited: '不限天數',
    not_eligible: '無審計記錄',
  },
  community_support_enabled: {
    name: '社群支援',
    limited: '社群支援',
    unlimited: '社群支援',
    not_eligible: '無社群支援',
  },
  customer_ticket_support: {
    name: '客戶票證支援',
    limited: '{{count, number}} 小時客戶票證支援',
    limited_other: '{{count, number}} 小時客戶票證支援',
    unlimited: '客戶票證支援',
    not_eligible: '無客戶票證支援',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: '停用你的 MFA',
  },
};

export default Object.freeze(quota_item);
