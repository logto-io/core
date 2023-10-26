const user = {
  username_already_in_use: 'Questo nome utente è già in uso.',
  email_already_in_use: 'Questa email è associata ad un account esistente.',
  phone_already_in_use: 'Questo numero di telefono è associato ad un account esistente.',
  invalid_email: 'Indirizzo email non valido.',
  invalid_phone: 'Numero di telefono non valido.',
  email_not_exist: "L'indirizzo email non è stato ancora registrato.",
  phone_not_exist: 'Il numero di telefono non è stato ancora registrato.',
  identity_not_exist: "L'account social non è stato ancora registrato.",
  identity_already_in_use: "L'account social è stato associato ad un account esistente.",
  social_account_exists_in_profile: 'Hai già associato questo account social.',
  cannot_delete_self: 'Non puoi eliminarti da solo.',
  sign_up_method_not_enabled: 'Questo metodo di registrazione non è abilitato.',
  sign_in_method_not_enabled: 'Questo metodo di accesso non è abilitato.',
  same_password: 'La nuova password non può essere uguale alla vecchia password.',
  password_required_in_profile: 'È necessario impostare una password prima di accedere.',
  new_password_required_in_profile: 'È necessario impostare una nuova password.',
  password_exists_in_profile: 'La password esiste già nel tuo profilo.',
  username_required_in_profile: 'È necessario impostare un nome utente prima di accedere.',
  username_exists_in_profile: 'Il nome utente esiste già nel tuo profilo.',
  email_required_in_profile: "È necessario aggiungere un'indirizzo email prima di accedere.",
  email_exists_in_profile: 'Il tuo profilo è già associato ad un indirizzo email.',
  phone_required_in_profile: 'È necessario aggiungere un numero di telefono prima di accedere.',
  phone_exists_in_profile: 'Il tuo profilo è già associato ad un numero di telefono.',
  email_or_phone_required_in_profile:
    'È necessario aggiungere un indirizzo email o un numero di telefono prima di accedere.',
  suspended: 'Questo account è stato sospeso.',
  user_not_exist: "L'utente con {{ identifier }} non esiste.",
  missing_profile: 'È necessario fornire informazioni aggiuntive prima di accedere.',
  role_exists: "L'ID ruolo {{roleId}} è già stato aggiunto a questo utente",
  invalid_role_type:
    'Tipo di ruolo non valido, non è possibile assegnare un ruolo da macchina a utente.',
  /** UNTRANSLATED */
  missing_mfa: 'You need to bind additional MFA before signing-in.',
  /** UNTRANSLATED */
  totp_already_in_use: 'TOTP is already in use.',
  /** UNTRANSLATED */
  backup_code_already_in_use: 'Backup code is already in use.',
};

export default Object.freeze(user);
