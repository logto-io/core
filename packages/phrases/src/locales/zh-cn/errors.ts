const errors = {
  auth: {
    authorization_header_missing: '缺少权限标题',
    authorization_token_type_not_supported: '权限类型不支持',
    unauthorized: '未经授权。请检查凭据及其范围。',
    forbidden: '禁止访问。请检查用户 role 与权限。',
    expected_role_not_found: '未找到期望的 role。请检查用户 role 与权限。',
    jwt_sub_missing: 'JWT 缺失 `sub`',
  },
  guard: {
    invalid_input: '请求中 {{type}} 无效',
    invalid_pagination: '分页参数无效',
  },
  oidc: {
    aborted: '用户终止了交互。',
    invalid_scope: '不支持的 scope: {{scopes}}',
    invalid_scope_plural: '不支持的 scope: {{scopes}}',
    invalid_token: 'Token 无效',
    invalid_client_metadata: '无效的客户端元数据',
    insufficient_scope: '请求 token 缺少权限: {{scopes}}',
    invalid_request: '请求无效',
    invalid_grant: '授权请求无效',
    invalid_redirect_uri: '无效返回链接, 该 redirect_uri 未被此应用注册。',
    access_denied: '拒绝访问',
    invalid_target: '请求资源无效',
    unsupported_grant_type: '不支持的 grant_type',
    unsupported_response_mode: '不支持的 response_mode',
    unsupported_response_type: '不支持的 response_type',
    provider_error: 'OIDC 内部错误: {{message}}',
  },
  user: {
    username_exists_register: '用户名已被注册',
    email_exists_register: '邮箱地址已被注册',
    phone_exists_register: '手机号码已被注册',
    invalid_email: '邮箱地址不正确',
    invalid_phone: '手机号码不正确',
    username_not_exists: '用户名尚未注册',
    email_not_exists: '邮箱地址尚未注册',
    phone_not_exists: '手机号码尚未注册',
    identity_not_exists: '该社交帐号尚未注册',
    identity_exists: '该社交帐号已被注册',
    invalid_role_names: '角色名称（{{roleNames}}）无效',
    cannot_delete_self: '你无法删除自己',
    same_password: '新设置的密码不可与当前密码相同',
  },
  password: {
    unsupported_encryption_method: '不支持的加密方法 {{name}}',
    pepper_not_found: '密码 pepper 未找到。请检查 core 的环境变量。',
  },
  session: {
    not_found: '未找到会话。请返回并重新登录。',
    invalid_credentials: '用户名或密码错误，请检查你的输入。',
    invalid_sign_in_method: '当前登录方式不可用',
    invalid_connector_id: '找不到 ID 为 {{connectorId}} 的可用连接器。',
    insufficient_info: '登录信息缺失，请检查你的输入。',
    connector_id_mismatch: '传入的连接器 ID 与 session 中保存的记录不一致',
    connector_session_not_found: '无法找到连接器登录信息，请尝试重新登录。',
    forgot_password_session_not_found: '无法找到忘记密码验证信息，请尝试重新验证。',
    forgot_password_verification_expired: '忘记密码验证已过期，请尝试重新验证。',
    unauthorized: '请先登录',
    unsupported_prompt_name: '不支持的 prompt name',
  },
  connector: {
    general: '连接器发生未知错误{{errorDescription}}',
    not_found: '找不到可用的 {{type}} 类型的连接器',
    not_enabled: '连接器尚未启用',
    invalid_metadata: '连接器 metadata 参数错误',
    invalid_config_guard: '连接器配置 guard 错误',
    unexpected_type: '连接器类型错误',
    insufficient_request_parameters: '请求参数缺失',
    invalid_request_parameters: '请求参数错误',
    invalid_config: '连接器配置错误',
    invalid_response: '连接器错误响应',
    template_not_found: '无法从连接器配置中找到对应的模板',
    not_implemented: '方法 {{method}} 尚未实现',
    social_invalid_access_token: '当前连接器的 access_token 无效',
    invalid_auth_code: '当前连接器的授权码无效',
    social_invalid_id_token: '当前连接器的 id_token 无效',
    authorization_failed: '用户授权流程失败',
    social_auth_code_invalid: '无法获取 access_token，请检查授权 code 是否有效',
    more_than_one_sms: '同时存在超过 1 个短信连接器',
    more_than_one_email: '同时存在超过 1 个邮件连接器',
    db_connector_type_mismatch: '数据库中存在一个类型不匹配的连接。',
  },
  passcode: {
    phone_email_empty: '手机号与邮箱地址均为空',
    not_found: '验证码不存在，请先请求发送验证码',
    phone_mismatch: '手机号码不匹配，请尝试请求新的验证码。',
    email_mismatch: '邮箱地址不匹配，请尝试请求新的验证码。',
    code_mismatch: '验证码不正确',
    expired: '验证码已过期，请尝试请求新的验证码。',
    exceed_max_try: '超过最大验证次数，请尝试请求新的验证码。',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use: '你启用了“使用条款”，请添加使用条款 URL。',
    empty_logo: '请输入 logo URL',
    empty_slogan: '你选择了 App logo + 标语的布局。请输入你的标语。',
    empty_social_connectors: '你启用了社交登录的方式。请至少选择一个社交连接器。',
    enabled_connector_not_found: '未找到已启用的 {{type}} 连接器',
    not_one_and_only_one_primary_sign_in_method: '主要的登录方式必须有且仅有一个，请检查你的输入。',
    username_requires_password: 'Must enable set a password for username sign up identifier.', // UNTRANSLATED
    passwordless_requires_verify: 'Must enable verify for email/phone sign up identifier.', // UNTRANSLATED
    miss_sign_up_identifier_in_sign_in: 'Sign in methods must contain the sign up identifier.', // UNTRANSLATED
    password_sign_in_must_be_enabled:
      'Password sign in must be enabled when set a password is required in sign up.', // UNTRANSLATED
    code_sign_in_must_be_enabled:
      'Verification code sign in must be enabled when set a password is not required in sign up.', // UNTRANSLATED
  },
  localization: {
    cannot_delete_default_language: '不能删除「登录体验」正在使用的默认语言 {{languageKey}}。', // UNTRANSLATED
  },
  swagger: {
    invalid_zod_type: '无效的 Zod 类型，请检查路由 guard 配置。',
    not_supported_zod_type_for_params: '请求参数不支持的 Zod 类型，请检查路由 guard 配置。',
  },
  entity: {
    create_failed: '创建 {{name}} 失败',
    not_exists: '该 {{name}} 不存在',
    not_exists_with_id: 'ID 为 `{{id}}` 的 {{name}} 不存在',
    not_found: '该资源不存在',
  },
};

export default errors;
