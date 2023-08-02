const others = {
  terms_of_use: {
    title: 'TERMS',
    terms_of_use: 'URL ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ',
    terms_of_use_placeholder: 'https://your.terms.of.use/',
    privacy_policy: 'URL ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ',
    privacy_policy_placeholder: 'https://your.privacy.policy/',
  },
  languages: {
    title: 'ЯЗЫКИ',
    enable_auto_detect: 'Включить автоопределение языка',
    description:
      'Ваше программное обеспечение определяет настройки локали пользователя и переключается на локальный язык. Вы можете добавлять новые языки, переводя интерфейс с английского на другой язык.',
    manage_language: 'Управление языком',
    default_language: 'Язык по умолчанию',
    default_language_description_auto:
      'По умолчанию будет использоваться выбранный язык, только если окружение пользователя не содержит соответствующей локали.',
    default_language_description_fixed:
      'Если автоопределение отключено, в приложении будет отображаться только один язык – язык по умолчанию. Включите автоопределение для расширения списка доступных языков.',
  },
  manage_language: {
    title: 'Управление языком',
    subtitle:
      'Локализуйте продукт, добавляя языки и переводы. Ваш вклад может быть установлен как язык по умолчанию.',
    add_language: 'Добавить язык',
    logto_provided: 'Logto предоставил',
    key: 'Ключ',
    logto_source_values: 'Исходные значения Logto',
    custom_values: 'Произвольные значения',
    clear_all_tip: 'Очистить все значения',
    unsaved_description:
      'Изменения не будут сохранены, если вы покинете эту страницу без сохранения.',
    deletion_tip: 'Удалить язык',
    deletion_title: 'Хотите удалить добавленный язык?',
    deletion_description:
      'После удаления пользователи не смогут более просматривать информацию на этом языке.',
    default_language_deletion_title: 'Язык по умолчанию не может быть удален.',
    default_language_deletion_description:
      '{{language}} установлен как язык по умолчанию и не может быть удален. ',
  },
  advanced_options: {
    title: 'ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ',
    enable_user_registration: 'Включить регистрацию пользователей',
    enable_user_registration_description:
      'Разрешить или запретить регистрацию пользователей. После отключения пользователи могут быть добавлены через админ-консоль, но пользователи больше не могут создавать учетные записи через интерфейс входа в систему.',
  },
};

export default Object.freeze(others);
