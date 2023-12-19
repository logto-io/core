const quota_table = {
  quota: {
    title: '配額',
    tenant_limit: '租戶限制',
    base_price: '基本價格',
    mau_unit_price: '* 每月活躍用戶（MAU）單價',
    mau_limit: 'MAU 限制',
  },
  application: {
    title: '應用程式',
    total: '應用程式總數',
    m2m: '機器到機器',
  },
  resource: {
    title: 'API 資源',
    resource_count: '資源數量',
    scopes_per_resource: '每資源權限',
  },
  branding: {
    title: '用戶界面與品牌',
    custom_domain: '自訂網域',
    custom_css: '自訂 CSS',
    app_logo_and_favicon: '應用程式徽標和網站圖示',
    dark_mode: '深色模式',
    i18n: '國際化',
  },
  user_authn: {
    title: '用戶認證',
    omni_sign_in: '全渠道登錄',
    password: '密碼',
    passwordless: '免密碼登錄 - 電子郵件和短信',
    email_connector: '電子郵件連接器',
    sms_connector: '短信連接器',
    social_connectors: '社交連接器',
    standard_connectors: '標準連接器',
    built_in_email_connector: '內置電子郵件連接器',
    mfa: 'MFA',
    sso: '企業 SSO',
  },
  user_management: {
    title: '用戶管理',
    user_management: '用戶管理',
    roles: '角色',
    scopes_per_role: '每角色權限',
  },
  audit_logs: {
    title: '審核日誌',
    retention: '保留期限',
  },
  hooks: {
    title: 'Webhooks',
    hooks: 'Webhooks',
  },
  organizations: {
    title: '組織',
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
    title: '支援',
    community: '社群',
    customer_ticket: '客戶支援票據',
    premium: '高級版',
  },
  mau_unit_price_footnote:
    '* 您的每月活躍用戶（MAU）將根據在結算週期內登錄的頻率分為3個層級。每個層級都有不同的MAU單價。',
  unlimited: '無限制',
  contact: '聯絡',
  monthly_price: '${{value, number}}/月',
  mau_price: '${{value, number}}/MAU',
  days_one: '{{count, number}}天',
  days_other: '{{count, number}}天',
  add_on: '附加功能',
  tier: '層級{{value, number}}：',
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
