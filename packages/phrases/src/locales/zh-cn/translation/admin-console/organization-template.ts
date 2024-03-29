const organization_template = {
  title: '组织模板',
  subtitle:
    '在多租户SaaS应用中，多个组织共享相同的访问控制政策，包括权限和角色，是很常见的。在Logto中，这一概念被称为“组织模板”。使用它可以简化构建和设计授权模型的过程。',
  org_roles: {
    tab_name: '组织角色',
    search_placeholder: '按角色名称搜索',
    create_org_roles: '创建组织角色',
    org_role_column: '组织角色',
    permissions_column: '权限',
    placeholder_title: '组织角色',
    placeholder_description: '组织角色是一组可以分配给用户的权限。权限必须来自预定义的组织权限。',
  },
  org_permissions: {
    tab_name: '组织权限',
    search_placeholder: '按权限名称搜索',
    create_org_permission: '创建组织权限',
    permission_column: '权限',
    description_column: '描述',
    placeholder_title: '组织权限',
    placeholder_description: '组织权限指的是在组织上下文中访问资源的授权。',
    delete_confirm:
      '如果删除此权限，包括此权限的所有组织角色都将失去此权限，拥有此权限的用户将失去由此权限授予的访问权限。',
  },
};

export default Object.freeze(organization_template);
