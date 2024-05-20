const tenants = {
  title: 'Настройки',
  description: 'Эффективное управление настройками арендатора и настройка вашего домена.',
  tabs: {
    settings: 'Настройки',
    /** UNTRANSLATED */
    members: 'Members',
    domains: 'Домены',
    subscription: 'План и выставление счетов',
    billing_history: 'История выставления счетов',
  },
  settings: {
    title: 'НАСТРОЙКИ',
    description:
      'Установите имя арендатора и просмотрите регион размещения данных и тип арендатора.',
    tenant_id: 'ID арендатора',
    tenant_name: 'Имя арендатора',
    tenant_region: 'Регион размещения данных',
    tenant_region_tip: 'Ваши ресурсы арендатора размещаются в {{region}}. <a>Узнайте больше</a>',
    environment_tag_development: 'Разр',
    environment_tag_production: 'Прод',
    tenant_type: 'Тип арендатора',
    development_description:
      'Только для тестирования и не должно использоваться в производстве. Подписка не требуется. Он имеет все профессиональные функции, но с ограничениями, такими как баннер входа.<a>Узнайте больше</a>',
    production_description:
      'Предназначен для приложений, используемых конечными пользователями и может потребовать платную подписку.<a>Узнайте больше</a>',
    tenant_info_saved: 'Информация о квартиросъемщике успешно сохранена.',
  },
  full_env_tag: {
    development: 'Разработка',
    production: 'Производство',
  },
  deletion_card: {
    title: 'УДАЛИТЬ',
    tenant_deletion: 'Удаление арендатора',
    tenant_deletion_description:
      'Удаление арендатора приведет к окончательному удалению всех связанных пользовательских данных и настроек. Пожалуйста, действуйте осторожно.',
    tenant_deletion_button: 'Удалить арендатора',
  },
  leave_tenant_card: {
    /** UNTRANSLATED */
    title: 'LEAVE',
    /** UNTRANSLATED */
    leave_tenant: 'Leave tenant',
    /** UNTRANSLATED */
    leave_tenant_description:
      'Any resources in the tenant will remain but you no longer have access to this tenant.',
    /** UNTRANSLATED */
    last_admin_note: 'To leave this tenant, ensure at least one more member has the Admin role.',
  },
  create_modal: {
    title: 'Создать арендатора',
    subtitle:
      'Создайте нового арендатора, чтобы разделить ресурсы и пользователей. Данные, размещенные в регионе, и типы арендаторов не могут быть изменены после создания.',
    tenant_usage_purpose: 'Для чего вы хотите использовать этот арендатор?',
    development_description:
      'Только для тестирования и не должно использоваться в производстве. Подписка не требуется.',
    development_hint:
      'Он имеет все профессиональные функции, но с ограничениями, такими как баннер входа.',
    production_description:
      'Для использования конечными пользователями и может потребовать платную подписку.',
    available_plan: 'Доступный план:',
    create_button: 'Создать арендатора',
    tenant_name_placeholder: 'Мой арендатор',
  },
  dev_tenant_migration: {
    title:
      'Теперь вы можете бесплатно попробовать наши профессиональные функции, создав новый "Development tenant"!',
    affect_title: 'Как это повлияет на вас?',
    hint_1:
      'Мы заменяем старые <strong>теги окружения</strong> двумя новыми типами арендаторов: <strong>«Development»</strong> и <strong>«Production»</strong>.',
    hint_2:
      'Для обеспечения бесперебойной работы и непрерывной функциональности все заранее созданные арендаторы будут переведены в тип арендатора <strong>Production</strong> вместе с вашей предыдущей подпиской.',
    hint_3: 'Не волнуйтесь, все ваши другие настройки останутся неизменными.',
    about_tenant_type: 'Об типе арендатора',
  },
  delete_modal: {
    title: 'Удалить арендатора',
    /** UNTRANSLATED */
    description_line1:
      'Are you sure you want to delete your tenant "<span>{{name}}</span>" with environment suffix tag "<span>{{tag}}</span>"? This action cannot be undone, and will result in the permanent deletion of all your data and tenant information.',
    /** UNTRANSLATED */
    description_line2:
      'Before deleting tenant, maybe we can help you. <span><a>Contact us via Email</a></span>',
    description_line3:
      'Если вы хотите продолжить, введите название арендатора "<span>{{name}}</span>" для подтверждения.',
    delete_button: 'Навсегда удалить',
    cannot_delete_title: 'Нельзя удалить этого арендатора',
    cannot_delete_description:
      'Извините, вы не можете удалить этого арендатора прямо сейчас. Пожалуйста, убедитесь, что вы используете бесплатный план и оплатили все невыполненные счета.',
  },
  leave_tenant_modal: {
    /** UNTRANSLATED */
    description: 'Are you sure you want to leave this tenant?',
    /** UNTRANSLATED */
    leave_button: 'Leave',
  },
  tenant_landing_page: {
    title: 'Вы еще не создали арендатора',
    description:
      'Чтобы начать настройку вашего проекта с помощью Logto, создайте нового арендатора. Если вам нужно выйти из системы или удалить свою учетную запись, просто нажмите на кнопку аватара в правом верхнем углу.',
    create_tenant_button: 'Создать арендатора',
  },
  status: {
    mau_exceeded: 'Превышение MAU',
    suspended: 'Приостановлен',
    overdue: 'Прошлый срок',
  },
  tenant_suspended_page: {
    title: 'Приостановленный арендатор. Свяжитесь с нами, чтобы восстановить доступ.',
    description_1:
      'Очень сожалеем, но ваша учетная запись арендатора временно заблокирована из-за неправильного использования, включая превышение MAU-лимитов, просроченные платежи или другие неавторизованные действия.',
    description_2:
      'Если вам нужна дополнительная информация или у вас возникли какие-либо вопросы или вы хотите восстановить полную функциональность и разблокировать своих арендаторов, не стесняйтесь немедленно связаться с нами.',
  },
};

export default Object.freeze(tenants);
