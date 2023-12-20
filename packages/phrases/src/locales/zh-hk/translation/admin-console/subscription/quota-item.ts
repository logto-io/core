const quota_item = {
  tenant_limit: {
    name: '租戶',
    limited: '{{count, number}} 個租戶',
    limited_other: '{{count, number}} 個租戶',
    unlimited: '無限租戶',
    not_eligible: '刪除您的租戶',
  },
  mau_limit: {
    name: '月活躍用戶',
    limited: '{{count, number}} 個月活躍用戶',
    unlimited: '無限月活躍用戶',
    not_eligible: '刪除您的所有用戶',
  },
  token_limit: {
    /** UNTRANSLATED */
    name: 'Tokens',
    /** UNTRANSLATED */
    limited: '{{count, number}} token',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} tokens',
    /** UNTRANSLATED */
    unlimited: 'Unlimited tokens',
    /** UNTRANSLATED */
    not_eligible: 'Remove your all users to prevent new tokens',
  },
  applications_limit: {
    name: '應用程式',
    limited: '{{count, number}} 個應用程式',
    limited_other: '{{count, number}} 個應用程式',
    unlimited: '無限應用程式',
    not_eligible: '刪除您的應用程式',
  },
  machine_to_machine_limit: {
    name: '機器至機器應用程式',
    limited: '{{count, number}} 個機器至機器應用程式',
    limited_other: '{{count, number}} 個機器至機器應用程式',
    unlimited: '無限機器至機器應用程式',
    not_eligible: '刪除您的機器至機器應用程式',
  },
  resources_limit: {
    name: 'API 資源',
    limited: '{{count, number}} 個 API 資源',
    limited_other: '{{count, number}} 個 API 資源',
    unlimited: '無限 API 資源',
    not_eligible: '刪除您的 API 資源',
  },
  scopes_per_resource_limit: {
    name: '資源權限',
    limited: '{{count, number}} 個資源權限',
    limited_other: '{{count, number}} 個資源權限',
    unlimited: '無限資源權限',
    not_eligible: '刪除您的資源權限',
  },
  custom_domain_enabled: {
    name: '自定義網域',
    limited: '自定義網域',
    unlimited: '自定義網域',
    not_eligible: '刪除您的自定義網域',
  },
  omni_sign_in_enabled: {
    name: '全渠道登入',
    limited: '全渠道登入',
    unlimited: '全渠道登入',
    not_eligible: '停用全渠道登入',
  },
  built_in_email_connector_enabled: {
    name: '內建電子郵件連接器',
    limited: '內建電子郵件連接器',
    unlimited: '內建電子郵件連接器',
    not_eligible: '刪除您的內建電子郵件連接器',
  },
  social_connectors_limit: {
    name: '社交連接器',
    limited: '{{count, number}} 個社交連接器',
    limited_other: '{{count, number}} 個社交連接器',
    unlimited: '無限社交連接器',
    not_eligible: '刪除您的社交連接器',
  },
  standard_connectors_limit: {
    name: '免費標準連接器',
    limited: '{{count, number}} 個免費標準連接器',
    limited_other: '{{count, number}} 個免費標準連接器',
    unlimited: '無限標準連接器',
    not_eligible: '刪除您的標準連接器',
  },
  roles_limit: {
    name: '角色',
    limited: '{{count, number}} 個角色',
    limited_other: '{{count, number}} 個角色',
    unlimited: '無限角色',
    not_eligible: '刪除您的角色',
  },
  machine_to_machine_roles_limit: {
    /** UNTRANSLATED */
    name: 'Machine to machine roles',
    /** UNTRANSLATED */
    limited: '{{count, number}} machine to machine role',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} machine to machine roles',
    /** UNTRANSLATED */
    unlimited: 'Unlimited machine to machine roles',
    /** UNTRANSLATED */
    not_eligible: 'Remove your machine to machine roles',
  },
  scopes_per_role_limit: {
    name: '角色權限',
    limited: '{{count, number}} 個角色權限',
    limited_other: '{{count, number}} 個角色權限',
    unlimited: '無限角色權限',
    not_eligible: '刪除您的角色權限',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} 個 Webhook',
    limited_other: '{{count, number}} 個 Webhooks',
    unlimited: '無限制的 Webhooks',
    not_eligible: '移除您的 Webhooks',
  },
  organizations_enabled: {
    /** UNTRANSLATED */
    name: 'Organizations',
    /** UNTRANSLATED */
    limited: 'Organizations',
    /** UNTRANSLATED */
    unlimited: 'Organizations',
    /** UNTRANSLATED */
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: '審計日誌保留',
    limited: '審計日誌保留：{{count, number}} 天',
    limited_other: '審計日誌保留：{{count, number}} 天',
    unlimited: '無限天數',
    not_eligible: '無審計日誌',
  },
  community_support_enabled: {
    name: '社區支援',
    limited: '社區支援',
    unlimited: '社區支援',
    not_eligible: '無社區支援',
  },
  customer_ticket_support: {
    name: '客戶工單支援',
    limited: '{{count, number}} 小時客戶工單支援',
    limited_other: '{{count, number}} 小時客戶工單支援',
    unlimited: '客戶工單支援',
    not_eligible: '無客戶工單支援',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: '停用你的 MFA',
  },
  sso_enabled: {
    name: '企業SSO',
    limited: '企業SSO',
    unlimited: '企業SSO',
    not_eligible: '禁用你的企業SSO',
  },
};

export default Object.freeze(quota_item);
