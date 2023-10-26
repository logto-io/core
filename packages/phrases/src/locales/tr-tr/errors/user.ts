const user = {
  username_already_in_use: 'Bu kullanıcı adı zaten kullanımda.',
  email_already_in_use: 'Bu e-posta mevcut bir hesapla ilişkilendirilmiştir.',
  phone_already_in_use: 'Bu telefon numarası mevcut bir hesapla ilişkilendirilmiştir.',
  invalid_email: 'Geçersiz e-posta adresi.',
  invalid_phone: 'Geçersiz telefon numarası.',
  email_not_exist: 'E-posta adresi henüz kaydedilmedi.',
  phone_not_exist: 'Telefon numarası henüz kaydedilmedi',
  identity_not_exist: 'Sosyal platform hesabı henüz kaydedilmedi.',
  identity_already_in_use: 'Sosyal platform hesabı kaydedildi.',
  social_account_exists_in_profile: 'Bu sosyal hesap zaten ilişkilendirilmiş.',
  cannot_delete_self: 'Kendinizi silemezsiniz.',
  sign_up_method_not_enabled: 'Bu kayıt yöntemi etkin değil.',
  sign_in_method_not_enabled: 'Bu oturum açma yöntemi etkin değil.',
  same_password: 'Yeni şifre, eski şifrenizle aynı olamaz.',
  password_required_in_profile: 'Oturum açmadan önce bir şifre belirlemeniz gerekiyor.',
  new_password_required_in_profile: 'Yeni bir şifre belirlemeniz gerekiyor.',
  password_exists_in_profile: 'Şifre profilinizde zaten mevcut.',
  username_required_in_profile: 'Oturum açmadan önce bir kullanıcı adı belirlemeniz gerekiyor.',
  username_exists_in_profile: 'Kullanıcı adı profilinizde zaten mevcut.',
  email_required_in_profile: 'Oturum açmadan önce bir e-posta adresi eklemeniz gerekiyor.',
  email_exists_in_profile: 'Profiliniz zaten bir e-posta adresi ile ilişkilendirilmiştir.',
  phone_required_in_profile: 'Oturum açmadan önce bir telefon numarası eklemeniz gerekiyor.',
  phone_exists_in_profile: 'Profiliniz zaten bir telefon numarası ile ilişkilendirilmiştir.',
  email_or_phone_required_in_profile:
    'Oturum açmadan önce bir e-posta adresi veya telefon numarası eklemeniz gerekiyor.',
  suspended: 'Bu hesap askıya alındı.',
  user_not_exist: '{{identifier}} kimliğine sahip kullanıcı mevcut değil.',
  missing_profile: 'Oturum açmadan önce ek bilgi sağlamanız gerekiyor.',
  role_exists: '{{roleId}} rol kimliği bu kullanıcıya zaten eklenmiştir.',
  invalid_role_type: 'Geçersiz rol türü, makine-makine rolü kullanıcıya atanamaz.',
  /** UNTRANSLATED */
  missing_mfa: 'You need to bind additional MFA before signing-in.',
  /** UNTRANSLATED */
  totp_already_in_use: 'TOTP is already in use.',
  /** UNTRANSLATED */
  backup_code_already_in_use: 'Backup code is already in use.',
};

export default Object.freeze(user);
