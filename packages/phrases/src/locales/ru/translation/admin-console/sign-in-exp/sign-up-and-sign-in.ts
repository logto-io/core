const sign_up_and_sign_in = {
  identifiers_email: 'Адрес электронной почты',
  identifiers_phone: 'Номер телефона',
  identifiers_username: 'Имя пользователя',
  identifiers_email_or_sms: 'Адрес электронной почты или номер телефона',
  identifiers_none: 'Не применимо',
  and: 'и',
  or: 'или',
  sign_up: {
    title: 'РЕГИСТРАЦИЯ',
    sign_up_identifier: 'Идентификатор регистрации',
    identifier_description:
      'Идентификатор регистрации необходим для создания учетной записи и должен быть включен на экране входа в систему.',
    sign_up_authentication: 'Настройки аутентификации для регистрации',
    authentication_description:
      'Все выбранные действия будут обязательны для выполнения пользователем.',
    set_a_password_option: 'Создайте пароль',
    verify_at_sign_up_option: 'Подтвердить при регистрации',
    social_only_creation_description:
      '(Применяется только к созданию учетной записи в социальных сетях)',
  },
  sign_in: {
    title: 'ВХОД',
    sign_in_identifier_and_auth: 'Идентификатор и настройки аутентификации для входа',
    description:
      'Пользователи могут войти, используя любой из доступных вариантов. Настройте расположение, перетаскивая ниже указанные опции.',
    add_sign_in_method: 'Добавить способ входа',
    password_auth: 'Пароль',
    verification_code_auth: 'Код подтверждения',
    auth_swap_tip: 'Переставьте варианты ниже, чтобы определить, какой появится первым в потоке.',
    require_auth_factor: 'Вы должны выбрать хотя бы один фактор аутентификации.',
  },
  social_sign_in: {
    title: 'ВХОД С ПОМОЩЬЮ СОЦИАЛЬНЫХ СЕТЕЙ',
    social_sign_in: 'Вход через социальные сети',
    description:
      'В зависимости от обязательного идентификатора, который вы настроили, ваш пользователь может быть попрошен предоставить идентификатор при регистрации через социальный коннектор.',
    add_social_connector: 'Добавить социальный коннектор',
    set_up_hint: {
      not_in_list: 'Не найден в списке?',
      set_up_more: 'Настроить',
      go_to: 'другие социальные коннекторы.',
    },
  },
  tip: {
    set_a_password: 'Уникальный пароль для вашего имени пользователя является обязательным.',
    verify_at_sign_up:
      'В настоящее время мы поддерживаем только подтвержденный электронный адрес. Ваша база пользователей может содержать большое количество адресов электронной почты низкого качества, если не производится проверка.',
    password_auth:
      'Это необходимо, так как вы включили опцию установки пароля в процессе регистрации.',
    verification_code_auth:
      'Это необходимо, так как вы включили только опцию предоставления кода подтверждения при регистрации. Вы можете снять флажок, когда установка пароля разрешена в процессе регистрации.',
    delete_sign_in_method:
      'Это необходимо, так как вы выбрали {{identifier}} в качестве обязательного идентификатора.',
  },
  advanced_options: {
    title: 'ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ',
    /** UNTRANSLATED */
    enable_single_sign_on: 'Enable enterprise Single Sign-On (SSO)',
    /** UNTRANSLATED */
    enable_single_sign_on_description:
      'Enable users to sign into the application using Single Sign-On with their enterprise identities.',
    single_sign_on_hint: {
      /** UNTRANSLATED */
      prefix: 'Go to ',
      /** UNTRANSLATED */
      link: '"Enterprise SSO"',
      /** UNTRANSLATED */
      suffix: 'section to set up more enterprise connectors.',
    },
    enable_user_registration: 'Включить регистрацию пользователей',
    enable_user_registration_description:
      'Включить или запретить регистрацию пользователей. После отключения пользователи все еще могут быть добавлены через консоль администратора, но пользователи больше не могут создавать учетные записи через пользовательский интерфейс регистрации.',
  },
};

export default Object.freeze(sign_up_and_sign_in);
