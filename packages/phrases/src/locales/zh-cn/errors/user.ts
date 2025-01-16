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
  missing_mfa: '你需要在登录之前绑定额外的MFA。',
  totp_already_in_use: 'TOTP已在使用中。',
  backup_code_already_in_use: '备用代码已在使用中。',
  password_algorithm_required: '密码算法是必需的。',
  password_and_digest: 'You cannot set both plain text password and password digest.',
  personal_access_token_name_exists: '个人访问令牌名称已存在。',
  /** UNTRANSLATED */
  totp_secret_invalid: 'Invalid TOTP secret supplied.',
  /** UNTRANSLATED */
  wrong_backup_code_format: 'Backup code format is invalid.',
  /** UNTRANSLATED */
  username_required: 'Username is a required identifier, you can not set it to null.',
  /** UNTRANSLATED */
  email_or_phone_required:
    'Email address or phone number is a required identifier, at least one is required.',
  /** UNTRANSLATED */
  email_required: 'Email address is a required identifier, you can not set it to null.',
  /** UNTRANSLATED */
  phone_required: 'Phone number is a required identifier, you can not set it to null.',
};

export default Object.freeze(user);
