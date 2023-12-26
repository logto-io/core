const application_details = {
  page_title: '應用程式詳情',
  back_to_applications: '返回全部應用程式',
  check_guide: '查看指南',
  settings: '設定',
  settings_description: '應用程式用於在 Logto OIDC、登入體驗、審計日誌等方面識別你的應用程式。',
  /** UNTRANSLATED */
  endpoints_and_credentials: 'Endpoints & Credentials',
  /** UNTRANSLATED */
  endpoints_and_credentials_description:
    'Use the following endpoints and credentials to set up the OIDC connection in your application.',
  /** UNTRANSLATED */
  refresh_token_settings: 'Refresh token',
  /** UNTRANSLATED */
  refresh_token_settings_description: 'Manage the refresh token rules for this application.',
  application_roles: '角色',
  machine_logs: '機器日誌',
  application_name: '應用程式名稱',
  application_name_placeholder: '我的應用程式',
  description: '描述',
  description_placeholder: '請輸入應用程式描述',
  config_endpoint: 'OpenID Provider 配置端點',
  authorization_endpoint: '授權端點',
  authorization_endpoint_tip: '進行驗證和授權的端點。用於 OpenID Connect 中的<a>驗證</a> 流程。',
  /** UNTRANSLATED */
  show_endpoint_details: 'Show endpoint details',
  /** UNTRANSLATED */
  hide_endpoint_details: 'Hide endpoint details',
  logto_endpoint: 'Logto endpoint',
  application_id: '應用程式 ID',
  application_id_tip:
    '應用程式的唯一標識，通常由 Logto 生成。等價於 OpenID Connect 中的<a>client_id</a>。',
  application_secret: '應用程式密鑰',
  redirect_uri: '重定向 URI',
  redirect_uris: '重定向 URI',
  redirect_uri_placeholder: 'https://your.website.com/app',
  redirect_uri_placeholder_native: 'io.logto://callback',
  redirect_uri_tip:
    '在使用者登入完成（不論成功與否）後重定向的目標 URI。參見 OpenID Connect <a>AuthRequest</a> 以瞭解更多。',
  post_sign_out_redirect_uri: '登出後重定向 URI',
  post_sign_out_redirect_uris: '登出後重定向 URI',
  post_sign_out_redirect_uri_placeholder: 'https://your.website.com/home',
  post_sign_out_redirect_uri_tip:
    '在使用者登出後重定向的目標 URI（可選）。在某些應用程式類型中可能無實質作用。',
  cors_allowed_origins: 'CORS 允許的來源',
  cors_allowed_origins_placeholder: 'https://your.website.com',
  cors_allowed_origins_tip:
    '所有重定向 URI 的來源將預設被允許。通常不需要對此欄位進行操作。參見 <a>MDN 文檔</a> 以瞭解更多。',
  token_endpoint: 'Token Endpoint',
  user_info_endpoint: '用戶信息端點',
  enable_admin_access: '啟用管理訪問',
  enable_admin_access_label:
    '啟用或禁用對管理 API 的訪問。啟用後，你可以使用訪問權杖代表該應用程式調用管理 API。',
  always_issue_refresh_token: '始終發放 Refresh Token',
  always_issue_refresh_token_label:
    '啟用此配置將允許 Logto 發行 Refresh Token，無論是否在驗證請求中呈現 `prompt=consent`。但是，除非必要，否則不建議這樣做，因為它不兼容 OpenID Connect，可能會引起問題。',
  refresh_token_ttl: 'Refresh Token 的有效期（天）',
  refresh_token_ttl_tip:
    'Refresh Token 可用來在其過期之前請求新的訪問權杖的持續時間。訪問令牌將將缺省的 TTL 延長到此值。',
  rotate_refresh_token: '旋轉 Refresh Token',
  rotate_refresh_token_label:
    '啟用後，當原始 TTL 達到 70% 或滿足某些條件時就可以在令牌請求中為 Refresh Token 發行新的 Refresh Token。 <a>瞭解更多。</a>',
  delete_description: '本操作會永久性地刪除該應用，且不可撤銷。輸入 <span>{{name}}</span> 確認。',
  enter_your_application_name: '輸入你的應用程式名稱',
  application_deleted: '應用 {{name}} 成功刪除。',
  redirect_uri_required: '至少需要輸入一個重定向 URL。',
  roles: {
    name_column: '角色',
    description_column: '描述',
    assign_button: '指派角色',
    delete_description:
      '該操作將從此機器對機器應用程式中刪除該角色。該角色本身仍然存在，但不再與此機器對機器應用程式相關聯。',
    deleted: '{{name}} 已成功從此使用者中刪除。',
    assign_title: '為 {{name}} 指派角色',
    assign_subtitle: '授權 {{name}} 至少一個角色',
    assign_role_field: '指派角色',
    role_search_placeholder: '按角色名稱搜索',
    added_text: '{{value, number}} 已添加',
    assigned_app_count: '{{value, number}} 個應用程式',
    confirm_assign: '指派角色',
    role_assigned: '成功指派角色',
    search: '按角色名稱、描述或 ID 搜索',
    empty: '無可用角色',
  },
};

export default Object.freeze(application_details);
