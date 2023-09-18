const role_details = {
  back_to_roles: '返回角色',
  identifier: '標識符',
  delete_description:
    '這樣做將從受影響的用戶中刪除與該角色關聯的權限，並刪除角色、用戶和權限之間的映射關係。',
  role_deleted: '{{name}} 已成功刪除。',
  settings_tab: '設置',
  users_tab: '用戶',
  permissions_tab: '權限',
  settings: '設置',
  settings_description:
    '角色是一組權限，可以分配給用戶。它們還提供了一種聚合不同 API 定義的權限的方法，使得添加、刪除或調整權限比將其單獨分配給用戶更有效率。',
  field_name: '名稱',
  field_description: '描述',
  permission: {
    assign_button: '分配權限',
    assign_title: '分配權限',
    assign_subtitle: '將權限分配給此角色。角色將獲得添加的權限，具有此角色的用戶將繼承這些權限。',
    assign_form_field: '分配權限',
    added_text_one: '添加了 {{count, number}} 個權限',
    added_text_other: '添加了 {{count, number}} 個權限',
    api_permission_count_one: '{{count, number}} 個權限',
    api_permission_count_other: '{{count, number}} 個權限',
    confirm_assign: '分配權限',
    permission_assigned: '所選的權限已成功分配給此角色',
    deletion_description: '如果刪除此權限，則具有此角色的受影響用戶將失去此權限授予的訪問權限。',
    permission_deleted: '權限 {{name}} 已成功從此角色中刪除',
    empty: '無可用權限',
  },
  users: {
    assign_button: '分配用戶',
    name_column: '用戶',
    app_column: '應用',
    latest_sign_in_column: '最近登錄',
    delete_description: '它將保留在您的用戶池中，但失去此角色的授權。',
    deleted: '{{name}} 已成功從此角色中刪除',
    assign_title: '分配用戶',
    assign_subtitle: '將用戶分配給此角色。通過搜索名稱、電子郵件、電話或用戶 ID 尋找適當的用戶。',
    assign_users_field: '分配用戶',
    confirm_assign: '分配用戶',
    users_assigned: '所選的用戶已成功分配給此角色',
    empty: '無可用用戶',
  },
  applications: {
    /** UNTRANSLATED */
    assign_button: 'Assign applications',
    /** UNTRANSLATED */
    name_column: 'Application',
    /** UNTRANSLATED */
    app_column: 'App',
    /** UNTRANSLATED */
    deleted: '{{name}} was successfully removed from this role',
    /** UNTRANSLATED */
    assign_title: 'Assign applications',
    /** UNTRANSLATED */
    assign_subtitle:
      'Assign applications to this role. Find appropriate applications by searching name, description or app ID.',
    /** UNTRANSLATED */
    assign_applications_field: 'Assign applications',
    /** UNTRANSLATED */
    confirm_assign: 'Assign applications',
    /** UNTRANSLATED */
    applications_assigned: 'The selected applications were successfully assigned to this role',
    /** UNTRANSLATED */
    empty: 'No application available',
  },
};

export default Object.freeze(role_details);
