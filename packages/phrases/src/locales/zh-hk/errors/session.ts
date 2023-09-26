const session = {
  not_found: '未找到會話。請返回並重新登錄。',
  invalid_credentials: '賬號或密碼錯誤，請重新輸入。',
  invalid_sign_in_method: '當前登錄方式不可用',
  invalid_connector_id: '找不到 ID 為 {{connectorId}} 的可用連接器。',
  insufficient_info: '登錄信息缺失，請檢查你的輸入。',
  connector_id_mismatch: '傳入的連接器 ID 與 session 中保存的記錄不一致',
  connector_session_not_found: '無法找到連接器登錄信息，請嘗試重新登錄。',
  verification_session_not_found: '驗證失敗，請重新驗證。',
  verification_expired: '當前頁面已超時。為確保你的賬號安全，請重新驗證。',
  /** UNTRANSLATED */
  verification_blocked_too_many_attempts:
    'Too many attempts in a short time. Please try again {{relativeTime}}.',
  unauthorized: '請先登錄',
  unsupported_prompt_name: '不支持的 prompt name',
  forgot_password_not_enabled: '忘記密碼功能沒有開啟。',
  verification_failed: '驗證失敗，請重新驗證。',
  connector_validation_session_not_found: '找不到連接器用於驗證 token 的信息。',
  identifier_not_found: '找不到用戶標識符。請返回並重新登錄。',
  interaction_not_found: '找不到互動會話。請返回並重新開始會話。',
  mfa: {
    /** UNTRANSLATED */
    require_mfa_verification: 'Mfa verification is required to sign in.',
    /** UNTRANSLATED */
    mfa_sign_in_only: 'Mfa is only available for sign-in interaction.',
    /** UNTRANSLATED */
    pending_info_not_found: 'Pending MFA info not found, please initiate MFA first.',
    /** UNTRANSLATED */
    invalid_totp_code: 'Invalid TOTP code.',
  },
};

export default Object.freeze(session);
