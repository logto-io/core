const user = {
  username_already_in_use: 'This username is already in use.',
  email_already_in_use: 'This email is associated with an existing account.',
  phone_already_in_use: 'This phone number is associated with an existing account.',
  invalid_email: 'Invalid email address.',
  invalid_phone: 'Invalid phone number.',
  email_not_exist: 'The email address has not been registered yet.',
  phone_not_exist: 'The phone number has not been registered yet.',
  identity_not_exist: 'The social account has not been registered yet.',
  identity_already_in_use: 'The social account has been associated with an existing account.',
  social_account_exists_in_profile: 'You have already associated this social account.',
  cannot_delete_self: 'You cannot delete yourself.',
  sign_up_method_not_enabled: 'This sign-up method is not enabled.',
  sign_in_method_not_enabled: 'This sign-in method is not enabled.',
  same_password: 'New password cannot be the same as your old password.',
  password_required_in_profile: 'You need to set a password before signing-in.',
  new_password_required_in_profile: 'You need to set a new password.',
  password_exists_in_profile: 'Password already exists in your profile.',
  username_required_in_profile: 'You need to set a username before signing-in.',
  username_exists_in_profile: 'Username already exists in your profile.',
  email_required_in_profile: 'You need to add an email address before signing-in.',
  email_exists_in_profile: 'Your profile has already associated with an email address.',
  phone_required_in_profile: 'You need to add a phone number before signing-in.',
  phone_exists_in_profile: 'Your profile has already associated with a phone number.',
  email_or_phone_required_in_profile:
    'You need to add an email address or phone number before signing-in.',
  suspended: 'This account is suspended.',
  user_not_exist: 'User with {{ identifier }} does not exist.',
  missing_profile: 'You need to provide additional info before signing-in.',
  role_exists: 'The role id {{roleId}} is already been added to this user',
  invalid_role_type: 'Invalid role type, can not assign machine-to-machine role to user.',
  missing_mfa: 'You need to bind additional MFA before signing-in.',
  totp_already_in_use: 'TOTP is already in use.',
};

export default Object.freeze(user);
