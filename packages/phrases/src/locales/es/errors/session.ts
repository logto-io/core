const session = {
  not_found: 'Sesión no encontrada. Vuelva atrás e inicie sesión nuevamente.',
  invalid_credentials: 'Cuenta o contraseña incorrecta. Verifique su entrada.',
  invalid_sign_in_method: 'El método de inicio de sesión actual no está disponible.',
  invalid_connector_id: 'No se puede encontrar un conector disponible con el id {{connectorId}}.',
  insufficient_info: 'Información de inicio de sesión insuficiente.',
  connector_id_mismatch: 'El identificador del conector no coincide con el registro de la sesión.',
  connector_session_not_found:
    'No se encuentra la sesión del conector. Vuelva atrás e inicie sesión nuevamente.',
  verification_session_not_found:
    'La verificación no se completó correctamente. Reinicie el flujo de verificación e intente de nuevo.',
  verification_expired:
    'La conexión ha expirado. Verifique de nuevo para garantizar la seguridad de su cuenta.',
  /** UNTRANSLATED */
  verification_blocked_too_many_attempts:
    'Too many attempts in a short time. Please try again {{relativeTime}}.',
  unauthorized: 'Inicie sesión primero, por favor.',
  unsupported_prompt_name: 'Nombre de indicación no compatible.',
  forgot_password_not_enabled: 'Olvidé la contraseña no está habilitada.',
  verification_failed:
    'La verificación no se completó correctamente. Reinicie el flujo de verificación e intente de nuevo.',
  connector_validation_session_not_found:
    'No se encuentra la sesión del conector para la validación del token.',
  identifier_not_found:
    'Identificador de usuario no encontrado. Vuelva atrás e inicie sesión nuevamente.',
  interaction_not_found:
    'No se encuentra la sesión de interacción. Vuelva atrás y vuelva a iniciar la sesión.',
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
