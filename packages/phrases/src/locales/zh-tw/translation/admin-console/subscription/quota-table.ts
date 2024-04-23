const quota_table = {
  quota: {
    title: '基本',
    base_price: '基本價格',
    mau_limit: 'MAU 限制',
    included_tokens: '包含的令牌',
  },
  application: {
    title: '應用程式',
    total: '總應用程式數',
    m2m: '機器對機器',
    third_party: '第三方應用程式',
  },
  resource: {
    title: 'API 資源',
    resource_count: '資源數量',
    scopes_per_resource: '每資源權限',
  },
  branding: {
    title: '使用者介面和品牌塑造',
    custom_domain: '自訂網域',
    custom_css: '自訂 CSS',
    app_logo_and_favicon: '應用程式標誌和網站圖示',
    dark_mode: '深色模式',
    i18n: '國際化',
  },
  user_authn: {
    title: '使用者認證',
    omni_sign_in: '全渠道登錄',
    password: '密碼',
    passwordless: '免密碼登入 - 電子郵件和簡訊',
    email_connector: '電子郵件連接器',
    sms_connector: '簡訊連接器',
    social_connectors: '社交連接器',
    standard_connectors: '標準連接器',
    built_in_email_connector: '內建電子郵件連接器',
    mfa: '多因素認證',
    sso: '企業 SSO',
    adaptive_mfa: '自適應MFA',
  },
  user_management: {
    title: '使用者管理',
    user_management: '使用者管理',
    roles: '角色',
    machine_to_machine_roles: '機器對機器角色',
    scopes_per_role: '每角色權限',
  },
  organizations: {
    title: '組織',
    organizations: '組織',
    monthly_active_organization: '每月活躍組織',
    allowed_users_per_org: '組織允許用戶數',
    invitation: '邀請',
    org_roles: '組織角色',
    org_permissions: '組織權限',
    just_in_time_provisioning: '即時供應管理',
  },
  support: {
    title: '合規性與支援',
    community: '社群',
    customer_ticket: '客戶支援票證',
    premium: '進階版',
    email_ticket_support: '郵件票證支援',
    soc2_report: 'SOC2 報告',
    hipaa_or_baa_report: 'HIPAA/BAA 報告',
  },
  developers_and_platform: {
    title: '開發人員與平台',
    hooks: 'Webhooks',
    audit_logs_retention: '審計日誌保留',
    jwt_claims: 'JWT 声明',
    tenant_members: '租戶成員',
  },
  unlimited: '無限制',
  contact: '聯絡',
  monthly_price: '${{value, number}} / 月',
  days_one: '{{count, number}} 天',
  days_other: '{{count, number}} 天',
  add_on: '附加功能',
  tier: '層級{{value, number}}：',
  paid_token_limit_tip:
    'Logto將為超出您額度限制的功能收費。您可以在2024年第二季度左右開始收費之前免費使用它。如果您需要更多的令牌，請與我們聯繫。默認情況下，我們每月為每百萬令牌收費80美元。',
  paid_quota_limit_tip:
    'Logto將為超出配額限制的功能添加費用。在我們從2024年第二季度開始收費之前，您可以免費使用它。',
  paid_add_on_feature_tip:
    '這是一個附加功能。在我們從2024年第二季度開始收費之前，您可以免費使用它。',
  million: '{{value, number}} 百萬',
  mau_tip: 'MAU（每月活躍用戶）是指在計費週期內與Logto交換過至少一個令牌的獨立用戶數量。',
  tokens_tip: 'Logto 發行的所有類型令牌，包括訪問令牌、刷新令牌等。',
  mao_tip: 'MAO（月度活躍組織）指的是在計費週期內至少有一個MAU（月度活躍用戶）的獨特組織數量。',
  third_party_tip: '使用Logto作為您的OIDC身份提供程序，以便第三方應用程式進行登錄和權限授予。',
  included: '已包含{{value, number}}',
  included_mao: '已包含 {{value, number}} MAO',
  extra_quota_price: '然後每月 ${{value, number}} / 每個之後',
  per_month_each: '每月 ${{value, number}} / 每個',
  extra_mao_price: '然後每 MAO ${{value, number}}',
  per_month: '每月 ${{value, number}}',
  per_member: '然後每位會員 ${{value, number}}',
};

export default Object.freeze(quota_table);
