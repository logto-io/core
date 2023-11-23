const organizations = {
  organization: 'Организация',
  page_title: 'Организации',
  title: 'Организации',
  subtitle:
    'Организация - это набор пользователей, включающий команды, бизнес-клиентов и партнерские фирмы, использующие ваши приложения.',
  organization_template: 'Шаблон организации',
  organization_id: 'Идентификатор организации',
  members: 'Участники',
  create_organization: 'Создать организацию',
  setup_organization: 'Настройка вашей организации',
  organization_list_placeholder_title: 'Организация',
  organization_list_placeholder_text:
    'Организация обычно используется в приложениях с мультиарендой или похожих на мультиаренду SaaS. Функция "Организации" позволяет вашим B2B-клиентам лучше управлять своими партнерами и клиентами, а также настраивать способы доступа конечных пользователей к их приложениям.',
  organization_name_placeholder: 'Моя организация',
  organization_description_placeholder: 'Краткое описание организации',
  organization_permission: 'Разрешение организации',
  organization_permission_other: 'Разрешения организации',
  organization_permission_description:
    'Разрешение организации относится к разрешению доступа к ресурсу в контексте организации. Разрешение организации должно быть представлено в виде осмысленной строки и также служить именем и уникальным идентификатором.',
  organization_permission_delete_confirm:
    'Если это разрешение будет удалено, все роли организации, включая это разрешение, потеряют это разрешение, и пользователи, у которых было это разрешение, потеряют предоставленный им доступ к нему.',
  create_permission_placeholder: 'Чтение истории назначений',
  permission: 'Разрешение',
  permission_other: 'Разрешения',
  organization_role: 'Роль организации',
  organization_role_other: 'Роли организации',
  organization_role_description:
    'Роль организации - это группировка разрешений, которые могут быть назначены пользователям. Разрешения должны быть взяты из предопределенных разрешений организации.',
  organization_role_delete_confirm:
    'При этом будут удалены разрешения, связанные с этой ролью, у затронутых пользователей, и будут удалены отношения между ролями организации, участниками в организации и разрешениями организации.',
  role: 'Роль',
  create_role_placeholder: 'Пользователи с правами только для просмотра',
  search_placeholder: 'Поиск по названию организации или ID',
  search_permission_placeholder: 'Начните вводить для поиска и выбора разрешений',
  search_role_placeholder: 'Начните вводить для поиска и выбора ролей',
  empty_placeholder: '🤔 У вас пока нет никаких {{entity}}.',
  organization_and_member: 'Организация и участник',
  organization_and_member_description:
    'Организация - это группа пользователей, которая может представлять команды, бизнес-клиентов и партнерские компании, при этом каждый пользователь является "Участником". Эти сущности могут быть фундаментальными для удовлетворения ваших требований многопользовательских аренд.',
  guide: {
    title: 'Начать с руководств',
    subtitle: 'Начните настройку вашей организации с помощью наших руководств',
    introduction: {
      title: 'Давайте понянем, как работает организация в Logto',
      section_1: {
        title: 'Организация - это группа пользователей (идентификаторы)',
      },
      section_2: {
        title:
          'Шаблон организации разработан для управления доступом многопользовательских приложений',
        description:
          'В многопользовательских приложениях SaaS множественные организации часто используют один и тот же шаблон управления доступом, который включает разрешения и роли. В Logto мы называем это "шаблон организации".',
        permission_description:
          'Разрешение организации относится к авторизации для доступа к ресурсу в контексте организации.',
        role_description:
          'Роль организации - это группировка разрешений организации, которые могут быть назначены участникам.',
      },
      section_3: {
        title: 'Взаимодействие с иллюстрацией для просмотра связей',
        description:
          'Давайте рассмотрим пример. Джон, Сара принадлежат разным организациям с разными ролями в контексте различных организаций. Наведите курсор на различные модули и посмотрите, что происходит.',
      },
    },
    step_1: 'Шаг 1: Определите разрешения организаций',
    step_2: 'Шаг 2: Определите роли организаций',
    step_3: 'Шаг 3: Создайте свою первую организацию',
    step_3_description:
      'Давайте создадим вашу первую организацию. Она будет иметь уникальный идентификатор и будет служить контейнером для управления различными бизнес-ориентированными идентификаторами.',
    more_next_steps: 'Больше следующих шагов',
    add_members: 'Добавить участников в вашу организацию',
    add_members_action: 'Массовое добавление участников и назначение ролей',
    organization_permissions: 'Разрешения организации',
    permission_name: 'Имя разрешения',
    permissions: 'Разрешения',
    organization_roles: 'Роли организации',
    role_name: 'Имя роли',
    organization_name: 'Имя организации',
    admin: 'Админ',
    member: 'Участник',
    guest: 'Гость',
    role_description: 'Роль "{{role}}" использует тот же шаблон организации в разных организациях.',
    john: 'Джон',
    john_tip:
      'Джон принадлежит двум организациям с электронной почтой "john@email.com" как единственным идентификатором. Он является администратором организации A, а также гостем организации B.',
    sarah: 'Сара',
    sarah_tip:
      'Сара принадлежит одной организации с адресом электронной почты "sarah@email.com" в качестве единственного идентификатора. Она является администратором организации B.',
  },
};

export default Object.freeze(organizations);
