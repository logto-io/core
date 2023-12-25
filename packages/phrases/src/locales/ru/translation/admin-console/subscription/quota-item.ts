const quota_item = {
  tenant_limit: {
    name: 'Арендаторы',
    limited: '{{count, number}} арендатор',
    limited_other: '{{count, number}} арендаторов',
    unlimited: 'Неограниченное количество арендаторов',
    not_eligible: 'Удалите свои арендаторы',
  },
  mau_limit: {
    name: 'Активные пользователи в месяц',
    limited: '{{count, number}} пользователей в месяц',
    unlimited: 'Неограниченное количество пользователей в месяц',
    not_eligible: 'Удалите всех своих пользователей',
  },
  token_limit: {
    name: 'Токены',
    limited: '{{count, number}} токен',
    limited_other: '{{count, number}} токенов',
    unlimited: 'Неограниченное количество токенов',
    not_eligible: 'Удалите всех пользователей, чтобы предотвратить создание новых токенов',
  },
  applications_limit: {
    name: 'Приложения',
    limited: '{{count, number}} приложение',
    limited_other: '{{count, number}} приложений',
    unlimited: 'Неограниченное количество приложений',
    not_eligible: 'Удалите свои приложения',
  },
  machine_to_machine_limit: {
    name: 'Машина ко машине',
    limited: '{{count, number}} приложение для машины ко машине',
    limited_other: '{{count, number}} приложения для машин ко машине',
    unlimited: 'Неограниченное количество приложений для машин ко машине',
    not_eligible: 'Удалите свои приложения для машин ко машине',
    /** UNTRANSLATED */
    add_on: 'Additional machine-to-machine apps',
  },
  resources_limit: {
    name: 'API ресурсы',
    limited: '{{count, number}} API ресурс',
    limited_other: '{{count, number}} API ресурсов',
    unlimited: 'Неограниченное количество API ресурсов',
    not_eligible: 'Удалите свои API ресурсы',
  },
  scopes_per_resource_limit: {
    name: 'Разрешения ресурса',
    limited: '{{count, number}} разрешение на ресурс',
    limited_other: '{{count, number}} разрешений на ресурс',
    unlimited: 'Неограниченное количество разрешений на ресурс',
    not_eligible: 'Удалите свои разрешения ресурса',
  },
  custom_domain_enabled: {
    name: 'Пользовательский домен',
    limited: 'Пользовательский домен',
    unlimited: 'Пользовательский домен',
    not_eligible: 'Удалите свой пользовательский домен',
  },
  omni_sign_in_enabled: {
    name: 'Omni-вход',
    limited: 'Omni-вход',
    unlimited: 'Omni-вход',
    not_eligible: 'Выключите свой Omni-вход',
  },
  built_in_email_connector_enabled: {
    name: 'Встроенный электронный коннектор',
    limited: 'Встроенный электронный коннектор',
    unlimited: 'Встроенный электронный коннектор',
    not_eligible: 'Удалите свой встроенный электронный коннектор',
  },
  social_connectors_limit: {
    name: 'Социальные коннекторы',
    limited: '{{count, number}} социальный коннектор',
    limited_other: '{{count, number}} социальных коннекторов',
    unlimited: 'Неограниченное количество социальных коннекторов',
    not_eligible: 'Удалите свои социальные коннекторы',
  },
  standard_connectors_limit: {
    name: 'Бесплатные стандартные коннекторы',
    limited: '{{count, number}} бесплатный стандартный коннектор',
    limited_other: '{{count, number}} бесплатных стандартных коннекторов',
    unlimited: 'Неограниченное количество стандартных коннекторов',
    not_eligible: 'Удалите свои стандартные коннекторы',
  },
  roles_limit: {
    name: 'Роли',
    limited: '{{count, number}} роль',
    limited_other: '{{count, number}} ролей',
    unlimited: 'Неограниченное количество ролей',
    not_eligible: 'Удалите свои роли',
  },
  machine_to_machine_roles_limit: {
    name: 'Роли для машины ко машине',
    limited: '{{count, number}} роль для машины ко машине',
    limited_other: '{{count, number}} ролей для машин ко машине',
    unlimited: 'Неограниченное количество ролей для машин ко машине',
    not_eligible: 'Удалите свои роли для машин ко машине',
  },
  scopes_per_role_limit: {
    name: 'Разрешения роли',
    limited: '{{count, number}} разрешение на роль',
    limited_other: '{{count, number}} разрешений на роль',
    unlimited: 'Неограниченное количество разрешений на роль',
    not_eligible: 'Удалите свои разрешения роли',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} webhook',
    limited_other: '{{count, number}} webhooks',
    unlimited: 'Неограниченное количество вебхуков',
    not_eligible: 'Удалите ваши вебхуки',
  },
  organizations_enabled: {
    name: 'Организации',
    limited: 'Организации',
    unlimited: 'Организации',
    not_eligible: 'Удалите свои организации',
  },
  audit_logs_retention_days: {
    name: 'Время хранения аудит-логов',
    limited: 'Время хранения аудит-логов: {{count, number}} день',
    limited_other: 'Время хранения аудит-логов: {{count, number}} дней',
    unlimited: 'Неограниченное количество дней',
    not_eligible: 'Без аудит-логов',
  },
  community_support_enabled: {
    name: 'Поддержка сообщества',
    limited: 'Поддержка сообщества',
    unlimited: 'Поддержка сообщества',
    not_eligible: 'Без поддержки сообщества',
  },
  email_ticket_support: {
    /** UNTRANSLATED */
    name: 'Email ticket support',
    /** UNTRANSLATED */
    limited: '{{count, number}} hour email ticket support',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} hours email ticket support',
    /** UNTRANSLATED */
    unlimited: 'Email ticket support',
    /** UNTRANSLATED */
    not_eligible: 'No email ticket support',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    /** UNTRANSLATED */
    not_eligible: 'Remove your MFA',
  },
  sso_enabled: {
    name: 'Ограниченная',
    limited: 'Ограниченная',
    unlimited: 'Ограниченная',
    /** UNTRANSLATED */
    not_eligible: 'Remove your Enterprise SSO',
  },
};

export default Object.freeze(quota_item);
