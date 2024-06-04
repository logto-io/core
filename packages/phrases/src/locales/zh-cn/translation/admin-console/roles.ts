const roles = {
  page_title: '角色',
  title: '角色',
  subtitle:
    'RBAC 是一种访问控制方法，它使用角色来决定用户可以做什么事情，包括授予用户访问特定资源的权限。',
  create: '创建角色',
  role_name: '角色名称',
  role_type: '角色类型',
  type_user: '用户角色',
  type_machine_to_machine: '机器对机器角色',
  role_description: '描述',
  role_name_placeholder: '输入你的角色名称',
  role_description_placeholder: '输入你的角色描述',
  col_roles: '角色',
  col_type: '类型',
  col_description: '描述',
  col_assigned_entities: '已分配',
  user_counts: '{{count}} 用户',
  application_counts: '{{count}} 应用',
  user_count: '{{count}} 用户',
  application_count: '{{count}} 应用',
  assign_permissions: '分配权限',
  create_role_title: '创建角色',
  create_role_description: '为你的应用程序创建和管理角色。角色包含权限集合，并可以分配给用户。',
  create_role_button: '创建角色',
  role_created: '角色 {{name}} 已成功创建。',
  search: '按角色名称、描述或 ID 搜索',
  placeholder_title: '角色',
  placeholder_description: '角色是可以分配给用户的权限分组。在创建角色之前，请确保先添加权限。',
  assign_user_roles: '分配用户角色',
  assign_m2m_roles: '分配机器到机器角色',
  management_api_access_notification: '要访问Logto管理API，请选择具有管理API权限的角色<flag/>。',
  with_management_api_access_tip: '此机器到机器角色包括Logto管理API权限',
};

export default Object.freeze(roles);
