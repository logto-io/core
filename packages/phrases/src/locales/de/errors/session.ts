const session = {
  not_found: 'Sitzung nicht gefunden. Bitte melde dich erneut an.',
  invalid_credentials: 'Ungültige Zugangsdaten. Überprüfe deine Eingaben.',
  invalid_sign_in_method: 'Aktuelle Anmeldemethode ist ungültig.',
  invalid_connector_id: 'Connector mit ID {{connectorId}} wurde nicht gefunden.',
  insufficient_info: 'Unzureichende Informationen für die Anmeldung.',
  connector_id_mismatch: 'Connector ID stimmt nicht mit Sitzung überein.',
  connector_session_not_found: 'Connector Sitzung nicht gefunden. Bitte melde dich erneut an.',
  verification_session_not_found:
    'Die Verifizierung war nicht erfolgreich. Starte die Verifizierung neu und versuche es erneut.',
  verification_expired:
    'Die Verbindung wurde unterbrochen. Verifiziere erneut, um die Sicherheit deines Kontos zu gewährleisten.',
  verification_blocked_too_many_attempts:
    'Zu viele Versuche in kurzer Zeit. Bitte versuche es erneut {{relativeTime}}.',
  unauthorized: 'Bitte melde dich erst an.',
  unsupported_prompt_name: 'Nicht unterstützter prompt Name.',
  forgot_password_not_enabled: 'Passwort vergessen ist nicht aktiviert.',
  verification_failed:
    'Die Verifizierung war nicht erfolgreich. Starte die Verifizierung neu und versuche es erneut.',
  connector_validation_session_not_found:
    'Die Connector-Sitzung zur Token-Validierung wurde nicht gefunden.',
  csrf_token_mismatch: 'CSRF-Token stimmt nicht überein.',
  identifier_not_found:
    'Benutzerkennung nicht gefunden. Bitte gehen Sie zurück und melden Sie sich erneut an.',
  interaction_not_found:
    'Interaktionssitzung nicht gefunden. Bitte gehen Sie zurück und starten Sie die Sitzung erneut.',
  not_supported_for_forgot_password:
    'Diese Operation wird für das vergessene Passwort nicht unterstützt.',
  identity_conflict:
    'Identitätskonflikt festgestellt. Bitte starten Sie eine neue Sitzung, um mit einer anderen Identität fortzufahren.',
  mfa: {
    require_mfa_verification: 'MFA-Verifizierung ist erforderlich, um sich anzumelden.',
    mfa_sign_in_only: 'MFA ist nur für die Anmeldeinteraktion verfügbar.',
    pending_info_not_found:
      'Ausstehende MFA-Informationen nicht gefunden. Bitte initiieren Sie zuerst MFA.',
    invalid_totp_code: 'Ungültiger TOTP-Code.',
    webauthn_verification_failed: 'WebAuthn-Verifizierung fehlgeschlagen.',
    webauthn_verification_not_found: 'WebAuthn-Verifizierung nicht gefunden.',
    bind_mfa_existed: 'MFA ist bereits vorhanden.',
    backup_code_can_not_be_alone: 'Backup-Code kann nicht die einzige MFA sein.',
    backup_code_required: 'Backup-Code ist erforderlich.',
    invalid_backup_code: 'Ungültiger Backup-Code.',
    mfa_policy_not_user_controlled: 'MFA-Richtlinie wird nicht vom Benutzer gesteuert.',
  },
  sso_enabled:
    'Einmaliges Anmelden ist für diese gegebene E-Mail aktiviert. Bitte melden Sie sich mit SSO an.',
};

export default Object.freeze(session);
