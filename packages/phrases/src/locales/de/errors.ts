const errors = {
  auth: {
    authorization_header_missing: 'Autorisierungs-Header fehlt.',
    authorization_token_type_not_supported: 'Autorisierungs-Typ wird nicht unterstützt.',
    unauthorized: 'Unautorisiert. Bitte überprüfe deine Zugangsdaten.',
    forbidden: 'Verboten. Bitte überprüfe deine Rollen und Berechtigungen.',
    expected_role_not_found:
      'Erwartete Rolle nicht gefunden. Bitte überprüfe deine Rollen und Berechtigungen.',
    jwt_sub_missing: '`sub` fehlt in JWT.',
    require_re_authentication: 'Re-authentication is required to perform a protected action.', // UNTRANSLATED
  },
  guard: {
    invalid_input: 'Die Anfrage {{type}} ist ungültig.',
    invalid_pagination: 'Die Paginierung der Anfrage ist ungültig.',
  },
  oidc: {
    aborted: 'Der Endnutzer hat die Interaktion abgebrochen.',
    invalid_scope: 'Scope {{scope}} wird nicht unterstützt.',
    invalid_scope_plural: 'Scopes {{scopes}} werden nicht unterstützt.',
    invalid_token: 'Ungültiger Token übermittelt.',
    invalid_client_metadata: 'Ungültige Client Metadaten übermittelt.',
    insufficient_scope: 'Access token fehlen angefragte scope {{scopes}}.',
    invalid_request: 'Anfrage ist ungültig.',
    invalid_grant: 'Grant request ist ungültig.',
    invalid_redirect_uri:
      '`redirect_uri` stimmt nicht mit den registrierten `redirect_uris` des Clients überein.',
    access_denied: 'Zugang verweigert.',
    invalid_target: 'Ungültiger resource indicator.',
    unsupported_grant_type: 'Nicht unterstützter `grant_type` angefragt.',
    unsupported_response_mode: 'Nicht unterstützter `response_mode` angefragt.',
    unsupported_response_type: 'Nicht unterstützter `response_type` angefragt.',
    provider_error: 'OIDC interner Fehler: {{message}}.',
  },
  user: {
    username_already_in_use: 'This username is already in use.', // UNTRANSLATED
    email_already_in_use: 'This email is associated with an existing account.', // UNTRANSLATED
    phone_already_in_use: 'This phone number is associated with an existing account.', // UNTRANSLATED
    invalid_email: 'Ungültige E-Mail.',
    invalid_phone: 'Ungültige Telefonnummer.',
    email_not_exist: 'Die E-Mail wurde noch nicht registriert.',
    phone_not_exist: 'Die Telefonnummer wurde noch nicht registriert.',
    identity_not_exist: 'Die Identität wurde noch nicht registriert.',
    identity_already_in_use: 'Die Identität wurde registriert.',
    invalid_role_names: 'Rollennamen ({{roleNames}}) sind ungültig',
    cannot_delete_self: 'Du kannst dich nicht selbst löschen.',
    sign_up_method_not_enabled: 'This sign-up method is not enabled.', // UNTRANSLATED
    sign_in_method_not_enabled: 'This sign-in method is not enabled.', // UNTRANSLATED
    same_password: 'Das neue Passwort muss sich vom alten unterscheiden.',
    password_required_in_profile: 'You need to set a password before signing-in.', // UNTRANSLATED
    new_password_required_in_profile: 'You need to set a new password.', // UNTRANSLATED
    password_exists_in_profile: 'Password already exists in your profile.', // UNTRANSLATED
    username_required_in_profile: 'You need to set a username before signing-in.', // UNTRANSLATED
    username_exists_in_profile: 'Username already exists in your profile.', // UNTRANSLATED
    email_required_in_profile: 'You need to add an email address before signing-in.', // UNTRANSLATED
    email_exists_in_profile: 'Your profile has already associated with an email address.', // UNTRANSLATED
    phone_required_in_profile: 'You need to add a phone number before signing-in.', // UNTRANSLATED
    phone_exists_in_profile: 'Your profile has already associated with a phone number.', // UNTRANSLATED
    email_or_phone_required_in_profile:
      'You need to add an email address or phone number before signing-in.', // UNTRANSLATED
    suspended: 'This account is suspended.', // UNTRANSLATED
    user_not_exist: 'User with {{ identifier }} does not exist.', // UNTRANSLATED,
    missing_profile: 'You need to provide additional info before signing-in.', // UNTRANSLATED
  },
  password: {
    unsupported_encryption_method: 'Die Verschlüsselungsmethode {{name}} wird nicht unterstützt.',
    pepper_not_found: 'Password pepper not found. Please check your core envs.',
  },
  session: {
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
    unauthorized: 'Bitte melde dich erst an.',
    unsupported_prompt_name: 'Nicht unterstützter prompt Name.',
    forgot_password_not_enabled: 'Forgot password is not enabled.',
    verification_failed:
      'Die Verifizierung war nicht erfolgreich. Starte die Verifizierung neu und versuche es erneut.',
  },
  connector: {
    // UNTRANSLATED
    general: 'An unexpected error occurred in connector.{{errorDescription}}',
    not_found: 'Cannot find any available connector for type: {{type}}.',
    not_enabled: 'The connector is not enabled.',
    invalid_metadata: "The connector's metadata is invalid.",
    invalid_config_guard: "The connector's config guard is invalid.",
    unexpected_type: "The connector's type is unexpected.",
    invalid_request_parameters: 'The request is with wrong input parameter(s).',
    insufficient_request_parameters: 'The request might miss some input parameters.',
    invalid_config: "The connector's config is invalid.",
    invalid_response: "The connector's response is invalid.",
    template_not_found: 'Unable to find correct template in connector config.',
    not_implemented: '{{method}}: has not been implemented yet.',
    social_invalid_access_token: "The connector's access token is invalid.",
    invalid_auth_code: "The connector's auth code is invalid.",
    social_invalid_id_token: "The connector's id token is invalid.",
    authorization_failed: "The user's authorization process is unsuccessful.",
    social_auth_code_invalid: 'Unable to get access token, please check authorization code.',
    more_than_one_sms: 'The number of SMS connectors is larger then 1.',
    more_than_one_email: 'The number of Email connectors is larger then 1.',
    db_connector_type_mismatch: 'There is a connector in the DB that does not match the type.',
    not_found_with_connector_id: 'Can not find connector with given standard connector id.',
    multiple_instances_not_supported:
      'Can not create multiple instance with picked standard connector.',
    invalid_type_for_syncing_profile: 'You can only sync user profile with social connectors.',
    can_not_modify_target: 'The connector target can not be modified.',
    multiple_target_with_same_platform:
      'You can not have multiple social connectors that have same target and platform.',
    cannot_change_metadata_for_non_standard_connector:
      "This connector's `metadata` cannot be changed.",
  },
  passcode: {
    phone_email_empty: 'Telefonnummer oder E-Mail darf nicht leer sein.',
    not_found: 'Passcode nicht gefunden. Bitte sende erst einen Passcode.',
    phone_mismatch:
      'Telefonnummer stimmt nicht mit Passcode überein. Frage einen neuen Passcode an.',
    email_mismatch: 'E-Mail stimmt nicht mit Passcode überein. Frage einen neuen Passcode an.',
    code_mismatch: 'Ungültiger Passcode.',
    expired: 'Passcode ist abgelaufen. Frage einen neuen Passcode an.',
    exceed_max_try: 'Passcode wurde zu oft versucht. Frage einen neuen Passcode an.',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use:
      'Leere "Nutzungsbedingungen" URL. Bitte füge die URL hinzu, wenn "Nutzungsbedingungen" aktiviert ist.',
    empty_logo: 'Bitte füge eine Logo URL hinzu.',
    empty_slogan:
      'Leerer Branding-Slogan. Bitte füge einen Branding-Slogan hinzu, wenn ein UI-Stil ausgewählt wird, der den Slogan enthält.',
    empty_social_connectors:
      'Leere Social Connectors. Bitte füge aktivierte Social Connectoren hinzu, wenn Social Anmeldung aktiviert ist.',
    enabled_connector_not_found: 'Aktivierter {{type}} Connector nicht gefunden.',
    not_one_and_only_one_primary_sign_in_method:
      'Es darf nur eine primäre Anmeldemethode geben. Bitte überprüfe deine Eingabe.',
    username_requires_password: 'Must enable set a password for username sign up identifier.', // UNTRANSLATED
    passwordless_requires_verify: 'Must enable verify for email/phone sign up identifier.', // UNTRANSLATED
    miss_sign_up_identifier_in_sign_in: 'Sign in methods must contain the sign up identifier.', // UNTRANSLATED
    password_sign_in_must_be_enabled:
      'Password sign in must be enabled when set a password is required in sign up.', // UNTRANSLATED
    code_sign_in_must_be_enabled:
      'Verification code sign in must be enabled when set a password is not required in sign up.', // UNTRANSLATED
    unsupported_default_language: 'Die Sprache - {{language}} wird momentan nicht unterstützt.',
    at_least_one_authentication_factor: 'You have to select at least one authentication factor.', // UNTRANSLATED
  },
  localization: {
    cannot_delete_default_language:
      '{{languageTag}} ist die Standard-Sprache und kann nicht gelöscht werden.',
    invalid_translation_structure: 'Ungültige Übersetzungsstruktur. Bitte überprüfe deine Eingabe.',
  },
  swagger: {
    invalid_zod_type: 'Ungültiger Zod Typ. Überprüfe deine route guard Konfiguration.',
    not_supported_zod_type_for_params:
      'Nicht unterstützter Zod Typ für diese Parameter. Überprüfe deine route guard Konfiguration.',
  },
  entity: {
    create_failed: 'Fehler beim erstellen von {{name}}.',
    not_exists: '{{name}} existiert nicht.',
    not_exists_with_id: '{{name}} mit ID `{{id}}` existiert nicht.',
    not_found: 'Die Ressource wurde nicht gefunden.',
  },
  log: {
    invalid_type: 'Der Log Typ ist ungültig.',
  },
};

export default errors;
