const user_details = {
  back_to_users: '사용자 관리로 돌아가기',
  created_title: '새로운 사용자가 생성되었어요.',
  created_guide: '생성된 정보를 해당 사용자에게 알려주세요.',
  created_username: '사용자 이름:',
  created_password: '비밀번호:',
  menu_delete: '삭제',
  delete_description: '이 사용자를 영원히 삭제할까요? 이 행동은 취소될 수 없어요.',
  deleted: '해당 사용자가 성공적으로 삭제되었어요.',
  reset_password: {
    reset_password: '비밀번호 초기화',
    title: '정말로 비밀번호를 초기화 할까요?',
    content: '정말로 비밀번호를 초기화 할까요? 이 행동은 취소될 수 없어요.',
    congratulations: '해당 사용자의 비밀번호가 성공적으로 초기화 되었어요.',
    new_password: '새로운 비밀번호:',
  },
  tab_settings: 'Settings', // UNTRANSLATED
  tab_roles: 'Roles', // UNTRANSLATED
  tab_logs: '사용자 기록',
  settings: '설정',
  settings_description:
    '각 사용자는 모든 사용자 정보를 포함하는 프로파일을 가지고 있어요. 프로파일은 기본 데이터, 소셜 ID, 사용자 정의 데이터로 구성되어 있어요.',
  field_email: '메인 이메일',
  field_phone: '메인 휴대전화번호',
  field_username: '사용자 이름',
  field_name: '이름',
  field_avatar: '아바타 이미지 URL',
  field_avatar_placeholder: 'https://your.cdn.domain/avatar.png',
  field_custom_data: '사용자 정의 데이터',
  field_custom_data_tip:
    '사용자 정의 색상 및 언어와 같은 미리 정의되지 않은 추가적인 사용자의 정보를 의미해요.',
  field_connectors: '연동된 소셜',
  custom_data_invalid: '사용자 정의 데이터는 반드시 유효한 JSON 객체여야 해요.',
  connectors: {
    connectors: '연동',
    user_id: '사용자 ID',
    remove: '삭제',
    not_connected: '이 사용자는 아직 소셜에 연동되지 않았아요.',
    deletion_confirmation: '<name/> 신원을 삭제하려고 해요. 정말로 진행할까요?',
  },
  suspended: '정지됨',
  roles: {
    name_column: 'Role', // UNTRANSLATED
    description_column: 'Description', // UNTRANSLATED
    assign_button: 'Assign Roles', // UNTRANSLATED
    delete_description:
      'This action will remove this role from this user. The role itself will still exist, but it will no longer be associated with this user.', // UNTRANSLATED
    deleted: '{{name}} was successfully removed from this user!', // UNTRANSLATED
    assign_title: 'Assign roles to {{name}}', // UNTRANSLATED
    assign_subtitle: 'Authorize {{name}} one or more roles', // UNTRANSLATED
    assign_role_field: 'Assign roles', // UNTRANSLATED
    role_search_placeholder: 'Search by role name', // UNTRANSLATED
    added_text: '{{value, number}} added', // UNTRANSLATED
    assigned_user_count: '{{value, number}} users', // UNTRANSLATED
    confirm_assign: 'Assign roles', // UNTRANSLATED
    role_assigned: 'Successfully assigned role(s)', // UNTRANSLATED
  },
};

export default user_details;
