const upsell = {
  pro_tag: 'PRO',
  upgrade_plan: 'Повысить план',
  compare_plans: 'Сравнить планы',
  get_started: {
    title: 'Начните беспрепятственное путешествие по идентификации с бесплатным планом!',
    description:
      'Бесплатный план отлично подходит для опробования Logto в ваших собственных проектах или испытаниях. Чтобы полностью использовать возможности Logto для вашей команды, выполните обновление, чтобы получить неограниченный доступ к премиум-функциям: неограниченное использование MAU, интеграция Машина-к-Машине, управление RBAC, долгосрочные журналы аудита и т.д. <a>Посмотреть все планы</a>',
  },
  create_tenant: {
    title: 'Выберите план арендатора',
    description:
      'Logto предоставляет конкурентные варианты планов с инновационной и доступной ценой, специально разработанными для растущих компаний. <a>Узнать больше</a>',
    base_price: 'Базовая цена',
    monthly_price: '{{value, number}}/мес.',
    mau_unit_price: 'Стоимость единицы MAU',
    view_all_features: 'Просмотреть все функции',
    select_plan: 'Выбрать <name/>',
    free_tenants_limit: 'До {{count, number}} бесплатного арендатора',
    free_tenants_limit_other: 'До {{count, number}} бесплатных арендаторов',
    most_popular: 'Самый популярный',
    upgrade_success: 'Успешно повышен до <name/>',
  },
  paywall: {
    applications:
      'Достигнут лимит {{count, number}} приложения(й) для <planName/>. Обновите план, чтобы удовлетворить потребности вашей команды. При необходимости помощи, не стесняйтесь <a>связаться с нами</a>.',
    applications_other:
      'Достигнут лимит {{count, number}} приложений для <planName/>. Обновите план, чтобы удовлетворить потребности вашей команды. При необходимости помощи, не стесняйтесь <a>связаться с нами</a>.',
    machine_to_machine_feature:
      'Перейдите на платный план, чтобы создать машинное приложение и получить доступ ко всем премиум-функциям. При необходимости помощи, не стесняйтесь <a>связаться с нами</a>.',
    machine_to_machine:
      'Достигнут лимит {{count, number}} машинных приложений для <planName/>. Обновите план, чтобы удовлетворить потребности вашей команды. При необходимости помощи, не стесняйтесь <a>связаться с нами</a>.',
    machine_to_machine_other:
      'Достигнут лимит {{count, number}} машинных приложений для <planName/>. Обновите план, чтобы удовлетворить потребности вашей команды. При необходимости помощи, не стесняйтесь <a>связаться с нами</a>.',
    resources:
      'Достигнут лимит {{count, number}} ресурсов API в плане <planName/>. Повысьте план, чтобы удовлетворить потребности вашей команды. <a>Свяжитесь с нами</a> для получения помощи.',
    resources_other:
      'Достигнут лимит {{count, number}} ресурсов API в плане <planName/>. Повысьте план, чтобы удовлетворить потребности вашей команды. <a>Свяжитесь с нами</a> для получения помощи.',
    scopes_per_resource:
      'Достигнут лимит {{count, number}} разрешений на ресурс API в плане <planName/>. Повысьте план, чтобы увеличить количество разрешений. <a>Свяжитесь с нами</a> для получения помощи.',
    scopes_per_resource_other:
      'Достигнут лимит {{count, number}} разрешений на ресурс API в плане <planName/>. Повысьте план, чтобы увеличить количество разрешений. <a>Свяжитесь с нами</a> для получения помощи.',
    custom_domain:
      'Разблокируйте функциональность настраиваемого домена и ряд премиум-преимуществ, повысив до платного плана. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    social_connectors:
      'Достигнут лимит {{count, number}} социальных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    social_connectors_other:
      'Достигнут лимит {{count, number}} социальных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    standard_connectors_feature:
      'Повысьте до платного плана, чтобы создавать свои собственные коннекторы с использованием протоколов OIDC, OAuth 2.0 и SAML, а также получить неограниченное количество социальных коннекторов и все премиум-функции. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    standard_connectors:
      'Достигнут лимит {{count, number}} социальных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    standard_connectors_other:
      'Достигнут лимит {{count, number}} социальных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    standard_connectors_pro:
      'Достигнут лимит {{count, number}} стандартных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план до Плана предприятия, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    standard_connectors_pro_other:
      'Достигнут лимит {{count, number}} стандартных коннекторов в плане <planName/>. Для удовлетворения потребностей вашей команды повысьте план до Плана предприятия, чтобы получить дополнительные социальные коннекторы и возможность создания собственных коннекторов с использованием протоколов OIDC, OAuth 2.0 и SAML. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    roles:
      'Достигнут лимит {{count, number}} ролей в плане <planName/>. Повысьте план, чтобы добавить дополнительные роли и разрешения. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    roles_other:
      'Достигнут лимит {{count, number}} ролей в плане <planName/>. Повысьте план, чтобы добавить дополнительные роли и разрешения. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    scopes_per_role:
      'Достигнут лимит {{count, number}} разрешений на роль в плане <planName/>. Повысьте план, чтобы добавить дополнительные роли и разрешения. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    scopes_per_role_other:
      'Достигнут лимит {{count, number}} разрешений на роль в плане <planName/>. Повысьте план, чтобы добавить дополнительные роли и разрешения. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    hooks:
      'Достигнут лимит {{count, number}} вебхуков в плане <planName/>. Повысьте план, чтобы создать больше вебхуков. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
    hooks_other:
      'Достигнут лимит {{count, number}} вебхуков в плане <planName/>. Повысьте план, чтобы создать больше вебхуков. Если вам нужна помощь, не стесняйтесь <a>связаться с нами</a>.',
  },
  mau_exceeded_modal: {
    title: 'Превышено количество активных пользователей (MAU). Повысьте свой план.',
    notification:
      'Текущее количество активных пользователей (MAU) превысило лимит в плане <planName/>. Пожалуйста, незамедлительно обновите свой план до премиум-версии, чтобы избежать приостановки сервиса Logto.',
    update_plan: 'Обновить план',
  },
  payment_overdue_modal: {
    title: 'Просрочен платеж за счет',
    notification:
      'Упс! Оплата счета арендатора <span>{{name}}</span> не удалась. Пожалуйста, оплатите счет немедленно, чтобы избежать приостановки сервиса Logto.',
    unpaid_bills: 'Неоплаченные счета',
    update_payment: 'Обновить платеж',
  },
};

export default Object.freeze(upsell);
