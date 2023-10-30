const session = {
  not_found: 'Сессия не найдена. Вернитесь и войдите в систему снова.',
  invalid_credentials: 'Неправильный аккаунт или пароль. Проверьте ввод.',
  invalid_sign_in_method: 'Текущий метод входа в систему недоступен.',
  invalid_connector_id: 'Не удалось найти доступный коннектор с идентификатором {{connectorId}}.',
  insufficient_info: 'Недостаточно информации для входа в систему.',
  connector_id_mismatch: 'Идентификатор коннектора не соответствует записи сессии.',
  connector_session_not_found: 'Сессия коннектора не найдена. Вернитесь и войдите в систему снова.',
  verification_session_not_found:
    'Верификация не прошла успешно. Перезапустите процесс верификации и попробуйте еще раз.',
  verification_expired:
    'Соединение истекло. Повторите верификацию, чтобы обеспечить безопасность вашей учетной записи.',
  /** UNTRANSLATED */
  verification_blocked_too_many_attempts:
    'Too many attempts in a short time. Please try again {{relativeTime}}.',
  unauthorized: 'Сначала войдите в систему.',
  unsupported_prompt_name: 'Неподдерживаемое имя подсказки.',
  forgot_password_not_enabled: 'Забыли пароль не включен.',
  verification_failed:
    'Верификация не прошла успешно. Перезапустите процесс верификации и попробуйте еще раз.',
  connector_validation_session_not_found: 'Сеанс коннектора для проверки токена не найден.',
  identifier_not_found:
    'Идентификатор пользователя не найден. Вернитесь и войдите в систему снова.',
  interaction_not_found: 'Сессия взаимодействия не найдена. Вернитесь и начните сессию заново.',
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
};

export default Object.freeze(session);
