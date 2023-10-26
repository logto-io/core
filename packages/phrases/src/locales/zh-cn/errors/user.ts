const user = {
  username_already_in_use: '该用户名已被使用。',
  email_already_in_use: '该邮箱地址已被使用。',
  phone_already_in_use: '该手机号码已被使用。',
  invalid_email: '邮箱地址不正确。',
  invalid_phone: '手机号码不正确。',
  email_not_exist: '邮箱地址尚未注册。',
  phone_not_exist: '手机号码尚未注册。',
  identity_not_exist: '该社交帐号尚未注册。',
  identity_already_in_use: '该社交帐号已被注册。',
  social_account_exists_in_profile: '你已绑定当前社交账号，无需重复操作。',
  cannot_delete_self: '无法删除自己的账户。',
  sign_up_method_not_enabled: '注册方式尚未启用。',
  sign_in_method_not_enabled: '登录方式尚未启用。',
  same_password: '为确保账户安全，新密码不能与旧密码一致。',
  password_required_in_profile: '请设置登录密码。',
  new_password_required_in_profile: '请设置新密码。',
  password_exists_in_profile: '当前用户已设置密码，无需重复操作。',
  username_required_in_profile: '请设置用户名。',
  username_exists_in_profile: '当前用户已设置用户名，无需重复操作。',
  email_required_in_profile: '请绑定邮箱地址',
  email_exists_in_profile: '当前用户已绑定邮箱，无需重复操作。',
  phone_required_in_profile: '请绑定手机号码。',
  phone_exists_in_profile: '当前用户已绑定手机号，无需重复操作。',
  email_or_phone_required_in_profile: '请绑定邮箱地址或手机号码。',
  suspended: '账号已被禁用。',
  user_not_exist: '未找到与 {{identifier}} 相关联的用户。',
  missing_profile: '请于登录时提供必要的用户补充信息。',
  role_exists: '角色 ID {{roleId}} 已添加到此用户',
  invalid_role_type: '无效的角色类型，无法将机器到机器角色分配给用户。',
  /** UNTRANSLATED */
  missing_mfa: 'You need to bind additional MFA before signing-in.',
  /** UNTRANSLATED */
  totp_already_in_use: 'TOTP is already in use.',
  /** UNTRANSLATED */
  backup_code_already_in_use: 'Backup code is already in use.',
};

export default Object.freeze(user);
