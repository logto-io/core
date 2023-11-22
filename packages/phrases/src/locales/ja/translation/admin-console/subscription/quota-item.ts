const quota_item = {
  tenant_limit: {
    name: 'テナント',
    limited: '{{count, number}} テナント',
    limited_other: '{{count, number}} テナント',
    unlimited: '無制限のテナント',
    not_eligible: 'テナントを削除してください',
  },
  mau_limit: {
    name: '月間アクティブユーザー数',
    limited: '{{count, number}} MAU',
    unlimited: '無制限のMAU',
    not_eligible: '全てのユーザーを削除してください',
  },
  applications_limit: {
    name: 'アプリケーション',
    limited: '{{count, number}} アプリケーション',
    limited_other: '{{count, number}} アプリケーション',
    unlimited: '無制限のアプリケーション',
    not_eligible: 'アプリケーションを削除してください',
  },
  machine_to_machine_limit: {
    name: 'マシン間アプリケーション',
    limited: '{{count, number}} マシン間アプリケーション',
    limited_other: '{{count, number}} マシン間アプリケーション',
    unlimited: '無制限のマシン間アプリケーション',
    not_eligible: 'マシン間アプリケーションを削除してください',
  },
  resources_limit: {
    name: 'APIリソース',
    limited: '{{count, number}} APIリソース',
    limited_other: '{{count, number}} APIリソース',
    unlimited: '無制限のAPIリソース',
    not_eligible: 'APIリソースを削除してください',
  },
  scopes_per_resource_limit: {
    name: 'リソースの権限',
    limited: '{{count, number}} リソースごとの権限',
    limited_other: '{{count, number}} リソースごとの権限',
    unlimited: '無制限のリソースごとの権限',
    not_eligible: 'リソースの権限を削除してください',
  },
  custom_domain_enabled: {
    name: 'カスタムドメイン',
    limited: 'カスタムドメイン',
    unlimited: 'カスタムドメイン',
    not_eligible: 'カスタムドメインを削除してください',
  },
  omni_sign_in_enabled: {
    name: 'Omniサインイン',
    limited: 'Omniサインイン',
    unlimited: 'Omniサインイン',
    not_eligible: 'Omniサインインを無効にしてください',
  },
  built_in_email_connector_enabled: {
    name: '組込みメールコネクタ',
    limited: '組込みメールコネクタ',
    unlimited: '組込みメールコネクタ',
    not_eligible: '組込みメールコネクタを削除してください',
  },
  social_connectors_limit: {
    name: 'ソーシャルコネクタ',
    limited: '{{count, number}} ソーシャルコネクタ',
    limited_other: '{{count, number}} ソーシャルコネクタ',
    unlimited: '無制限のソーシャルコネクタ',
    not_eligible: 'ソーシャルコネクタを削除してください',
  },
  standard_connectors_limit: {
    name: '無料の標準コネクタ',
    limited: '{{count, number}} 無料の標準コネクタ',
    limited_other: '{{count, number}} 無料の標準コネクタ',
    unlimited: '無制限の標準コネクタ',
    not_eligible: '標準コネクタを削除してください',
  },
  roles_limit: {
    name: 'ロール',
    limited: '{{count, number}} ロール',
    limited_other: '{{count, number}} ロール',
    unlimited: '無制限のロール',
    not_eligible: 'ロールを削除してください',
  },
  scopes_per_role_limit: {
    name: 'ロールの権限',
    limited: '{{count, number}} ロールごとの権限',
    limited_other: '{{count, number}} ロールごとの権限',
    unlimited: '無制限のロールごとの権限',
    not_eligible: 'ロールの権限を削除してください',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}}個のWebhook',
    limited_other: '{{count, number}}個のWebhooks',
    unlimited: '無制限のWebhooks',
    not_eligible: 'Webhookを削除してください',
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
    name: '監査ログの保持期間',
    limited: '監査ログの保持期間: {{count, number}} 日',
    limited_other: '監査ログの保持期間: {{count, number}} 日',
    unlimited: '無制限の日数',
    not_eligible: '監査ログがありません',
  },
  community_support_enabled: {
    name: 'コミュニティサポート',
    limited: 'コミュニティサポート',
    unlimited: 'コミュニティサポート',
    not_eligible: 'コミュニティサポートなし',
  },
  customer_ticket_support: {
    name: '顧客チケットサポート',
    limited: '{{count, number}} 時間の顧客チケットサポート',
    limited_other: '{{count, number}} 時間の顧客チケットサポート',
    unlimited: '顧客チケットサポート',
    not_eligible: '顧客チケットサポートなし',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: 'MFAを無効にする',
  },
  sso_enabled: {
    name: 'エンタープライズSSO',
    limited: 'エンタープライズSSO',
    unlimited: 'エンタープライズSSO',
    not_eligible: 'エンタープライズSSOを無効にする',
  },
};

export default Object.freeze(quota_item);
