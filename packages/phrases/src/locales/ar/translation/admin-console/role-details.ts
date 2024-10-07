const role_details = {
  back_to_roles: 'العودة إلى الأدوار',
  identifier: 'المعرف',
  delete_description:
    'بالقيام بذلك، سيتم إزالة الأذونات المرتبطة بهذا الدور من المستخدمين المتأثرين وحذف الربط بين الأدوار والمستخدمين والأذونات.',
  role_deleted: 'تم حذف {{name}} بنجاح.',
  general_tab: 'عام',
  users_tab: 'المستخدمين',
  m2m_apps_tab: 'تطبيقات الجهاز إلى الجهاز',
  permissions_tab: 'الأذونات',
  settings: 'الإعدادات',
  settings_description:
    'الأدوار هي مجموعة من الأذونات التي يمكن تعيينها للمستخدمين. كما توفر وسيلة لتجميع الأذونات المحددة لواجهات برمجة التطبيقات المختلفة، مما يجعل من الأكثر كفاءة إضافة أو إزالة أو ضبط الأذونات مقارنة بتعيينها بشكل فردي للمستخدمين.',
  field_name: 'الاسم',
  field_description: 'الوصف',
  field_is_default: 'الدور الافتراضي',
  field_is_default_description:
    'تعيين هذا الدور كدور افتراضي للمستخدمين الجدد. يمكن تعيين عدة أدوار افتراضية. ستؤثر هذه العملية أيضًا على الأدوار الافتراضية للمستخدمين الذين تم إنشاؤهم عبر واجهة برمجة التطبيقات للإدارة.',
  type_m2m_role_tag: 'الجهاز إلى الجهاز',
  type_user_role_tag: 'المستخدم',
  m2m_role_notification:
    'قم بتعيين هذا الدور من الجهاز إلى الجهاز لتطبيق الجهاز إلى موارد واجهة برمجة التطبيقات ذات الصلة. <a>قم بإنشاء تطبيق الجهاز إلى الجهاز</a> أولاً إذا لم تكن قد قمت بذلك بالفعل.',
  permission: {
    assign_button: 'تعيين الأذونات',
    assign_title: 'تعيين الأذونات',
    assign_subtitle:
      'تعيين الأذونات لهذا الدور. سيحصل الدور على الأذونات المضافة، وسيكون للمستخدمين بهذا الدور هذه الأذونات.',
    assign_form_field: 'تعيين الأذونات',
    added_text_one: 'تمت إضافة {{count, number}} أذونة',
    added_text_other: 'تمت إضافة {{count, number}} أذونة',
    api_permission_count_one: '{{count, number}} أذونة',
    api_permission_count_other: '{{count, number}} أذونة',
    confirm_assign: 'تعيين الأذونات',
    permission_assigned: 'تم تعيين الأذونات المحددة بنجاح لهذا الدور',
    deletion_description:
      'إذا تمت إزالة هذه الأذونة، فسيفقد المستخدم المتأثر بهذا الدور الوصول الذي يتم منحه بواسطة هذه الأذونة.',
    permission_deleted: 'تمت إزالة الأذونة "{{name}}" بنجاح من هذا الدور',
    empty: 'لا توجد أذونة متاحة',
  },
  users: {
    assign_button: 'تعيين المستخدمين',
    name_column: 'المستخدم',
    app_column: 'التطبيق',
    latest_sign_in_column: 'آخر تسجيل دخول',
    delete_description:
      'سيظل المستخدم في مجموعة المستخدمين الخاصة بك ولكنه سيفقد الترخيص لهذا الدور.',
    deleted: 'تمت إزالة {{name}} بنجاح من هذا الدور',
    assign_title: 'تعيين المستخدمين إلى {{name}}',
    assign_subtitle:
      'ابحث عن المستخدمين المناسبين عن طريق البحث بالاسم أو البريد الإلكتروني أو الهاتف أو معرف المستخدم.',
    assign_field: 'تعيين المستخدمين',
    confirm_assign: 'تعيين المستخدمين',
    assigned_toast_text: 'تم تعيين المستخدمين المحددين بنجاح لهذا الدور',
    empty: 'لا يوجد مستخدم متاح',
  },
  applications: {
    assign_button: 'تعيين تطبيقات الجهاز إلى الجهاز',
    name_column: 'التطبيق',
    app_column: 'تطبيق الجهاز إلى الجهاز',
    description_column: 'الوصف',
    delete_description:
      'سيظل التطبيق في مجموعة التطبيقات الخاصة بك ولكنه سيفقد الترخيص لهذا الدور.',
    deleted: 'تمت إزالة {{name}} بنجاح من هذا الدور',
    assign_title: 'تعيين تطبيقات الجهاز إلى الجهاز لـ {{name}}',
    assign_subtitle:
      'ابحث عن تطبيقات الجهاز إلى الجهاز المناسبة عن طريق البحث بالاسم أو الوصف أو معرف التطبيق.',
    assign_field: 'تعيين تطبيقات الجهاز إلى الجهاز',
    confirm_assign: 'تعيين تطبيقات الجهاز إلى الجهاز',
    assigned_toast_text: 'تم تعيين التطبيقات المحددة بنجاح لهذا الدور',
    empty: 'لا يوجد تطبيق متاح',
  },
};

export default Object.freeze(role_details);
