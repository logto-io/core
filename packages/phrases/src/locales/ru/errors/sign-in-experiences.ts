const sign_in_experiences = {
  empty_content_url_of_terms_of_use:
    'Пустой URL-адрес контента "Условия использования". Пожалуйста, добавьте URL-адрес контента, если "Условия использования" включены.',
  empty_social_connectors:
    'Пустые социальные коннекторы. Пожалуйста, добавьте включенные социальные коннекторы, когда включен метод входа в систему через социальные сети.',
  enabled_connector_not_found: 'Включенный коннектор {{type}} не найден.',
  not_one_and_only_one_primary_sign_in_method:
    'Должен быть один и только один первичный метод входа в систему. Пожалуйста, проверьте свой ввод.',
  username_requires_password:
    'Необходимо включить установку пароля для идентификатора создания имени пользователя.',
  passwordless_requires_verify:
    'Необходимо включить проверку для идентификатора создания учетной записи по электронной почте/телефону без пароля.',
  miss_sign_up_identifier_in_sign_in:
    'Методы входа в систему должны содержать идентификаторы создания учетной записи.',
  password_sign_in_must_be_enabled:
    'Вход в систему по паролю должен быть включен, когда для создания учетной записи требуется установка пароля.',
  code_sign_in_must_be_enabled:
    'Вход в систему по коду проверки должен быть включен, когда для создания учетной записи не требуется установка пароля.',
  unsupported_default_language: 'Этот язык - {{language}} не поддерживается в данный момент.',
  at_least_one_authentication_factor: 'Вы должны выбрать как минимум один фактор аутентификации.',
  /** UNTRANSLATED */
  backup_code_cannot_be_enabled_alone: 'Backup code cannot be enabled alone.',
  /** UNTRANSLATED */
  duplicated_mfa_factors: 'Duplicated MFA factors.',
};

export default Object.freeze(sign_in_experiences);
