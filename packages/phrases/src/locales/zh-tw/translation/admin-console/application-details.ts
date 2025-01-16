const application_details = {
  page_title: '應用詳細資料',
  back_to_applications: '返回全部應用',
  check_guide: '查看指南',
  settings: '設置',
  settings_description:
    '一個「應用程式」是一個已註冊的軟體或服務，可以存取使用者資訊或代表使用者進行操作。應用程式有助於辨識是誰向 Logto 要求什麼，並處理登入和權限問題。填寫驗證所需的字段。',
  integration: '整合',
  integration_description:
    '使用由 Cloudflare 邊緣網路提供動力的 Logto 安全工作者部署，實現全球頂級性能和 0 毫秒全球冷啟動。',
  service_configuration: '服務配置',
  service_configuration_description: '在您的服務中完成必要的配置。',
  session: '會話',
  endpoints_and_credentials: '端點與憑證',
  endpoints_and_credentials_description: '使用以下端點和憑證設置應用程式中的 OIDC 連接。',
  refresh_token_settings: '刷新令牌',
  refresh_token_settings_description: '管理此應用程式的刷新令牌規則。',
  machine_logs: '機器日誌',
  application_name: '應用程式姓名',
  application_name_placeholder: '我的應用程式',
  description: '說明',
  description_placeholder: '請輸入應用程式說明',
  config_endpoint: 'OpenID Provider 配置端點',
  issuer_endpoint: '發行者端點',
  authorization_endpoint: '授權端點',
  authorization_endpoint_tip: '進行驗證與授權的端點。用於 OpenID Connect 中的 <a>驗證</a> 流程。',
  show_endpoint_details: '顯示端點詳情',
  hide_endpoint_details: '隱藏端點詳情',
  logto_endpoint: 'Logto 端點',
  application_id: '應用程式 ID',
  application_id_tip:
    '應用程式的唯一標識，通常由 Logto 生成。相當於 OpenID Connect 中的 <a>client_id</a>。',
  application_secret: '應用程式秘鑰',
  application_secret_other: '應用程式秘鑰',
  redirect_uri: '重定向 URI',
  redirect_uris: '重定向 URIs',
  redirect_uri_placeholder: 'https://your.website.com/app',
  redirect_uri_placeholder_native: 'io.logto://callback',
  redirect_uri_tip:
    '在用戶登錄完成（不論成功與否）後，重新導向的目標 URI。參見 OpenID Connect <a>AuthRequest</a> 以了解更多。',
  /** UNTRANSLATED */
  mixed_redirect_uri_warning:
    'Your application type is not compatible with at least one of the redirect URIs. It does not follow best practices and we strongly recommend keeping the redirect URIs consistent.',
  post_sign_out_redirect_uri: '登出後重定向的 URI',
  post_sign_out_redirect_uris: '登出後重定向的 URIs',
  post_sign_out_redirect_uri_placeholder: 'https://your.website.com/home',
  post_sign_out_redirect_uri_tip:
    '在用戶登出後，重新導向的目標 URI（可選）。在某些應用程式類型中可能無實質作用。',
  cors_allowed_origins: 'CORS 允許的來源',
  cors_allowed_origins_placeholder: 'https://your.website.com',
  cors_allowed_origins_tip:
    '所有重新導向 URI 的來源都將默認被允許。通常不需要對此欄位進行操作。參見 <a>MDN 文件</a> 以了解更多。',
  token_endpoint: 'Token 端點',
  user_info_endpoint: '用戶資訊端點',
  enable_admin_access: '啟用管理訪問',
  enable_admin_access_label:
    '啟用或禁用對管理 API 的訪問。啟用後，你可以使用訪問令牌代表該應用程式調用管理 API。',
  always_issue_refresh_token: '始終發放 Refresh Token',
  always_issue_refresh_token_label:
    '啟用此配置將使 Logto 無論在驗證請求中是否提供 prompt=consent，都能始終發放 Refresh Token。然而，除非必要，否則不鼓勵這種做法，因為它與 OpenID Connect 不相容並可能引起問題。',
  refresh_token_ttl: 'Refresh Token 有效期（天數）',
  refresh_token_ttl_tip:
    'Refresh Token 可用來獲取新的訪問令牌，失效日期之前可用。獲取訪問令牌時，該令牌的期限將被延長至此值。',
  rotate_refresh_token: '旋轉 Refresh Token',
  rotate_refresh_token_label:
    '啟用此配置將使 Logto 當 Refresh Token 的原始有效期剩下 70% 時或當滿足某些條件時，授予新的 Refresh Token 以獲取新的 Access Token。<a>了解更多</a>',
  /** UNTRANSLATED */
  rotate_refresh_token_label_for_public_clients:
    'When enabled, Logto will issue a new refresh token for each token request. <a>Learn more</a>',
  backchannel_logout: '後台登出',
  backchannel_logout_description: '配置 OpenID Connect 後台登出端點以及此應用程式是否需要會話。',
  backchannel_logout_uri: '後台登出 URI',
  backchannel_logout_uri_session_required: '需要會話嗎？',
  backchannel_logout_uri_session_required_description:
    '啟用後，RP 要求 logout token 中包含 `sid`（會話 ID）聲明，以便當使用 `backchannel_logout_uri` 時識別 RP 與 OP 的會話。',
  delete_description:
    '本操作會永久性地刪除該應用程式，且不可撤銷。輸入 <span>{{name}}</span> 確認。',
  enter_your_application_name: '輸入你的應用程式姓名',
  application_deleted: '應用 {{name}} 成功刪除。',
  redirect_uri_required: '至少需要輸入一個重定向 URL。',
  app_domain_description_1: '隨時使用由 Logto 提供動力的 {{domain}} 域，其永久有效。',
  app_domain_description_2: '隨時使用您的域 <domain>{{domain}}</domain>，其永久有效。',
  custom_rules: '自定義身份驗證規則',
  custom_rules_placeholder: '^/(admin|privacy)/.+$',
  custom_rules_description: '使用正則表達式設置需要身份驗證的路徑規則。預設: 若留空則全站保護。',
  authentication_routes: '身份驗證路徑',
  custom_rules_tip:
    "這裡有兩個案例：<ol><li>僅對 '/admin' 和 '/privacy' 路徑進行身份驗證: ^/(admin|privacy)/.*</li><li>排除 JPG 圖片不進行身份驗證: ^(?!.*\\.jpg$).*$</li></ol>",
  authentication_routes_description:
    '使用指定路徑重新導向您的身份驗證按鈕。注意: 這些路徑不可替代。',
  protect_origin_server: '保護您的源伺服器',
  protect_origin_server_description:
    '確保保護您的源伺服器免受直接訪問。請參閱指南以獲取更多 <a>詳細說明</a>。',
  session_duration: '會話持續時間（天數）',
  try_it: '試試看',
  no_organization_placeholder: '未找到組織。<a>前往組織</a>',
  field_custom_data: '自定義資料',
  field_custom_data_tip: '額外的自定義應用資訊，不在預定義的應用屬性中，例如業務特定的設置和配置。',
  custom_data_invalid: '自定義資料必須是有效的 JSON 對象',
  branding: {
    name: '品牌',
    description: '在同意畫面上自訂應用程式的顯示名稱和標誌。',
    description_third_party: '自訂應用程式的顯示名稱和標誌在同意畫面上。',
    app_logo: '應用圖標',
    app_level_sie: '應用層級登入體驗',
    app_level_sie_switch:
      '啟用應用層級登入體驗，並設置應用特定的品牌。如果禁用，將使用全局登入體驗。',
    more_info: '更多資訊',
    more_info_description: '在同意畫面上提供有關您的應用程式的更多詳細資訊。',
    display_name: '顯示名稱',
    application_logo: '應用程式標誌',
    application_logo_dark: '應用程式標誌（深色）',
    brand_color: '品牌顏色',
    brand_color_dark: '品牌顏色（深色）',
    terms_of_use_url: '應用程式使用條款網址',
    privacy_policy_url: '應用程式隱私政策網址',
  },
  permissions: {
    name: '權限',
    description: '選擇第三方應用程式需要的許可權，以便用戶授權訪問特定資料類型。',
    user_permissions: '個人用戶資料',
    organization_permissions: '組織訪問',
    table_name: '授予權限',
    field_name: '權限',
    field_description: '在同意畫面上顯示',
    delete_text: '刪除權限',
    permission_delete_confirm:
      '此操作將撤銷授予第三方應用程式的權限，防止其要求授權訪問特定資料類型。確定要繼續嗎？',
    permissions_assignment_description: '選擇第三方應用程式請求用戶授權訪問特定資料類型的權限。',
    user_profile: '用戶資料',
    api_permissions: 'API 權限',
    organization: '組織權限',
    user_permissions_assignment_form_title: '添加用戶資料權限',
    organization_permissions_assignment_form_title: '添加組織權限',
    api_resource_permissions_assignment_form_title: '添加 API 資源權限',
    user_data_permission_description_tips:
      '您可以通過「登入體驗 > 內容 > 管理語言」修改個人用戶資料權限的描述。',
    permission_description_tips:
      '當 Logto 作為第三方應用程式中的身份提供者（IdP）用於身份驗證時，用戶被要求授權，此描述將顯示在同意畫面上。',
    user_title: '用戶',
    user_description: '選擇由第三方應用程式請求的用於訪問特定用戶資料的權限。',
    grant_user_level_permissions: '授予用戶資料權限',
    organization_title: '組織',
    organization_description: '選擇由第三方應用程式請求的用於訪問特定組織資料的權限。',
    grant_organization_level_permissions: '授予組織資料權限',
  },
  roles: {
    assign_button: '分配機器對機器角色',
    delete_description:
      '此操作將從此機器到機器應用程式中刪除該角色。該角色本身仍然存在，但不再與此機器到機器應用程式關聯。',
    deleted: '已成功從此用戶中刪除 {{name}}。',
    assign_title: '將機器對機器角色分配給 {{name}}',
    assign_subtitle: '機器對機器應用程式必須具有機器對機器類型的角色才能訪問相關的 API 資源。',
    assign_role_field: '分配機器對機器角色',
    role_search_placeholder: '按角色名稱搜索',
    added_text: '{{value, number}} 已添加',
    assigned_app_count: '{{value, number}} 應用程式',
    confirm_assign: '分配機器對機器角色',
    role_assigned: '成功分配角色',
    search: '按角色名稱、描述或 ID 搜索',
    empty: '沒有可用的角色',
  },
  secrets: {
    value: '值',
    empty: '應用程式沒有任何秘鑰。',
    created_at: '創建於',
    expires_at: '到期於',
    never: '從不',
    create_new_secret: '創建新秘鑰',
    delete_confirmation: '此操作無法撤銷。你確定要刪除此秘鑰嗎？',
    /** UNTRANSLATED */
    deleted: 'The secret has been successfully deleted.',
    /** UNTRANSLATED */
    activated: 'The secret has been successfully activated.',
    /** UNTRANSLATED */
    deactivated: 'The secret has been successfully deactivated.',
    legacy_secret: '舊版秘鑰',
    expired: '已過期',
    expired_tooltip: '此秘鑰已於 {{date}} 過期。',
    create_modal: {
      title: '創建應用程式秘鑰',
      expiration: '到期',
      expiration_description: '秘鑰將於 {{date}} 到期。',
      expiration_description_never: '秘鑰不會過期。我們建議設置到期日期以增強安全性。',
      days: '{{count}} 天',
      days_other: '{{count}} 天',
      /** UNTRANSLATED */
      years: '{{count}} year',
      /** UNTRANSLATED */
      years_other: '{{count}} years',
      created: '秘鑰 {{name}} 創建成功。',
    },
    edit_modal: {
      title: '編輯應用程式秘鑰',
      edited: '秘鑰 {{name}} 編輯成功。',
    },
  },
  saml_idp_config: {
    /** UNTRANSLATED */
    title: 'SAML IdP metadata',
    /** UNTRANSLATED */
    description:
      'Use the following metadata and certificate to configure the SAML IdP in your application.',
    /** UNTRANSLATED */
    metadata_url_label: 'IdP metadata URL',
    /** UNTRANSLATED */
    single_sign_on_service_url_label: 'Single sign-on service URL',
    /** UNTRANSLATED */
    idp_entity_id_label: 'IdP entity ID',
  },
  saml_idp_certificates: {
    /** UNTRANSLATED */
    title: 'SAML signing certificate',
    /** UNTRANSLATED */
    expires_at: 'Expires at',
    /** UNTRANSLATED */
    finger_print: 'Fingerprint',
    /** UNTRANSLATED */
    status: 'Status',
    /** UNTRANSLATED */
    active: 'Active',
    /** UNTRANSLATED */
    inactive: 'Inactive',
  },
  saml_idp_name_id_format: {
    /** UNTRANSLATED */
    title: 'Name ID format',
    /** UNTRANSLATED */
    description: 'Select the name ID format of the SAML IdP.',
    /** UNTRANSLATED */
    persistent: 'Persistent',
    /** UNTRANSLATED */
    persistent_description: 'Use Logto user ID as Name ID',
    /** UNTRANSLATED */
    transient: 'Transient',
    /** UNTRANSLATED */
    transient_description: 'Use one-time user ID as Name ID',
    /** UNTRANSLATED */
    unspecified: 'Unspecified',
    /** UNTRANSLATED */
    unspecified_description: 'Use Logto user ID as Name ID',
    /** UNTRANSLATED */
    email_address: 'Email address',
    /** UNTRANSLATED */
    email_address_description: 'Use email address as Name ID',
  },
  saml_encryption_config: {
    /** UNTRANSLATED */
    encrypt_assertion: 'Encrypt SAML assertion',
    /** UNTRANSLATED */
    encrypt_assertion_description: 'By enabling this option, the SAML assertion will be encrypted.',
    /** UNTRANSLATED */
    encrypt_then_sign: 'Encrypt then sign',
    /** UNTRANSLATED */
    encrypt_then_sign_description:
      'By enabling this option, the SAML assertion will be encrypted and then signed; otherwise, the SAML assertion will be signed and then encrypted.',
    /** UNTRANSLATED */
    certificate: 'Certificate',
    /** UNTRANSLATED */
    certificate_tooltip:
      'Copy and paste the x509 certificate you get from your service provider to encrypt the SAML assertion.',
    /** UNTRANSLATED */
    certificate_placeholder:
      '-----BEGIN CERTIFICATE-----\nMIICYDCCAcmgAwIBA...\n-----END CERTIFICATE-----\n',
    /** UNTRANSLATED */
    certificate_missing_error: 'Certificate is required.',
    /** UNTRANSLATED */
    certificate_invalid_format_error:
      'Invalid certificate format detected. Please check the certificate format and try again.',
  },
  saml_app_attribute_mapping: {
    /** UNTRANSLATED */
    name: 'Attribute mappings',
    /** UNTRANSLATED */
    title: 'Base attribute mappings',
    /** UNTRANSLATED */
    description: 'Add attribute mappings to sync user profile from Logto to your application.',
    /** UNTRANSLATED */
    col_logto_claims: 'Value of Logto',
    /** UNTRANSLATED */
    col_sp_claims: 'Value name of your application',
    /** UNTRANSLATED */
    add_button: 'Add another',
  },
};

export default Object.freeze(application_details);
