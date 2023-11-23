const organizations = {
  organization: '組織',
  page_title: '組織',
  title: '組織',
  subtitle: '組織是包括團隊、企業客戶和合作夥伴公司的使用者集合，這些使用者使用您的應用程式。',
  organization_template: '組織模板',
  organization_id: '組織 ID',
  members: '成員',
  create_organization: '建立組織',
  setup_organization: '設定您的組織',
  organization_list_placeholder_title: '組織',
  organization_list_placeholder_text:
    '組織通常在 SaaS 或類似 SaaS 的多租戶應用程式中使用。組織功能使您的 B2B 客戶能夠更好地管理其合作夥伴和客戶，並自定應用程式最終用戶的訪問方式。',
  organization_name_placeholder: '我的組織',
  organization_description_placeholder: '組織的簡要描述',
  organization_permission: '組織權限',
  organization_permission_other: '組織權限',
  organization_permission_description:
    '組織權限指授權在組織上下文中存取資源的許可。組織權限應該以有意義的字串形式表示，同時作為名稱和唯一標識。',
  organization_permission_delete_confirm:
    '如果刪除此權限，所有包含此權限的組織角色都將失去此權限，具有此權限的用戶將失去其授予的訪問權限。',
  create_permission_placeholder: '讀取預約歷史',
  permission: '權限',
  permission_other: '權限',
  organization_role: '組織角色',
  organization_role_other: '組織角色',
  organization_role_description:
    '組織角色是可以分配給用戶的權限的分組。權限必須來自預定義的組織權限。',
  organization_role_delete_confirm:
    '這樣將從受影響的用戶身上刪除與此角色關聯的權限，並刪除組織角色、組織成員和組織權限之間的關係。',
  role: '角色',
  create_role_placeholder: '僅擁有檢視權限的用戶',
  search_placeholder: '按組織名稱或 ID 搜索',
  search_permission_placeholder: '輸入並搜索選擇權限',
  search_role_placeholder: '輸入並搜索選擇角色',
  empty_placeholder: '🤔 你尚未設置任何 {{entity}}。',
  organization_and_member: '組織與成員',
  organization_and_member_description:
    '組織是一組使用者，可代表團隊、企業客戶和合作夥伴公司，其中每個使用者都是「成員」。這些可以是處理您的多租戶需求的基本實體。',
  guide: {
    title: '開始使用指南',
    subtitle: '跟著我們的指南開始設定組織設置',
    introduction: {
      title: '讓我們了解 Logto 中組織的運作方式',
      section_1: {
        title: '組織是使用者（身份）的集合',
      },
      section_2: {
        title: '組織模板是設計用於多租戶應用程式的訪問控制',
        description:
          '在多租戶 SaaS 應用程式中，多個組織通常共享相同的訪問控制模板，其中包括權限和角色。在 Logto 中，我們稱之為「組織模板」。',
        permission_description: '組織權限指在組織上下文中存取資源的授權。',
        role_description: '組織角色是可以分配給成員的組織權限分組。',
      },
      section_3: {
        title: '交互示意圖，看看它們之間的關係',
        description:
          '讓我們舉個例子。John 和 Sarah 屬於不同的組織，在不同組織中有不同的角色。將滑鼠移到不同模塊上，看看會發生什麼。',
      },
    },
    step_1: '第 1 步：定義組織權限',
    step_2: '第 2 步：定義組織角色',
    step_3: '第 3 步：創建您的第一個組織',
    step_3_description:
      '讓我們來創建您的第一個組織。它具有唯一的 ID，可作為處理各種商業向身份的容器。',
    more_next_steps: '更多下一步',
    add_members: '將成員加入到您的組織',
    add_members_action: '批量添加成員並分配角色',
    organization_permissions: '組織權限',
    permission_name: '權限名稱',
    permissions: '權限',
    organization_roles: '組織角色',
    role_name: '角色名稱',
    organization_name: '組織名稱',
    admin: '管理員',
    member: '成員',
    guest: '訪客',
    role_description: '角色 "{{role}}" 在不同組織中共享相同的組織模板。',
    john: '約翰',
    john_tip:
      '約翰只有一個身份證電子郵件地址「john@email.com」，他是組織 A 的管理員以及組織 B 的訪客。',
    sarah: '莎拉',
    sarah_tip: '莎拉只屬於一個組織，身份為「sarah@email.com」，她是組織 B 的管理員。',
  },
};

export default Object.freeze(organizations);
