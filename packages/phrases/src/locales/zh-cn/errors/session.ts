const session = {
  not_found: '未找到会话。请返回并重新登录。',
  invalid_credentials: '账号或密码错误，请重新输入。',
  invalid_sign_in_method: '当前登录方式不可用',
  invalid_connector_id: '找不到 ID 为 {{connectorId}} 的可用连接器。',
  insufficient_info: '登录信息缺失，请检查你的输入。',
  connector_id_mismatch: '传入的连接器 ID 与 session 中保存的记录不一致',
  connector_session_not_found: '无法找到连接器登录信息，请尝试重新登录。',
  verification_session_not_found: '验证失败，请重新验证。',
  verification_expired: '当前页面已超时。为确保你的账号安全，请重新验证。',
  /** UNTRANSLATED */
  verification_blocked_too_many_attempts:
    'Too many attempts in a short time. Please try again {{relativeTime}}.',
  unauthorized: '请先登录',
  unsupported_prompt_name: '不支持的 prompt name',
  forgot_password_not_enabled: '忘记密码功能没有开启。',
  verification_failed: '验证失败，请重新验证。',
  connector_validation_session_not_found: '找不到连接器用于验证 token 的信息。',
  identifier_not_found: '找不到用户标识符。请返回并重新登录。',
  interaction_not_found: '找不到交互会话。请返回并重新开始会话。',
  /** UNTRANSLATED */
  not_supported_for_forgot_password: 'This operation is not supported for forgot password.',
  mfa: {
    /** UNTRANSLATED */
    require_mfa_verification: 'Mfa verification is required to sign in.',
    /** UNTRANSLATED */
    mfa_sign_in_only: 'Mfa is only available for sign-in interaction.',
    /** UNTRANSLATED */
    pending_info_not_found: 'Pending MFA info not found, please initiate MFA first.',
    /** UNTRANSLATED */
    invalid_totp_code: 'Invalid TOTP code.',
    /** UNTRANSLATED */
    webauthn_verification_failed: 'WebAuthn verification failed.',
    /** UNTRANSLATED */
    webauthn_verification_not_found: 'WebAuthn verification not found.',
    /** UNTRANSLATED */
    bind_mfa_existed: 'MFA already exists.',
    /** UNTRANSLATED */
    backup_code_can_not_be_alone: 'Backup code can not be the only MFA.',
    /** UNTRANSLATED */
    backup_code_required: 'Backup code is required.',
    /** UNTRANSLATED */
    invalid_backup_code: 'Invalid backup code.',
    /** UNTRANSLATED */
    mfa_policy_not_user_controlled: 'MFA policy is not user controlled.',
  },
  sso_enabled: '该邮箱已开启单点登录，请使用 SSO 登录。',
};

export default Object.freeze(session);
