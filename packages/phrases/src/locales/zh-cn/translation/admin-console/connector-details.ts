const connector_details = {
  back_to_connectors: '返回连接器',
  check_readme: '查看 README',
  settings: '通用设置',
  settings_description:
    'Connectors play a critical role in Logto. With their help, Logto enables end-users to use passwordless registration or sign-in and the capabilities of signing in with social accounts.', // UNTRANSLATED
  parameter_configuration: '参数配置',
  test_connection: '连接测试',
  save_error_empty_config: '请输入配置内容',
  send: '发送',
  send_error_invalid_format: '无效输入',
  edit_config_label: '请在此输入你的 JSON 配置',
  test_email_sender: '测试你的邮件连接器',
  test_sms_sender: '测试你的短信连接器',
  test_email_placeholder: 'john.doe@example.com',
  test_sms_placeholder: '+86 131 1234 5678',
  test_message_sent: '测试信息已发送',
  test_sender_description:
    'Logto 使用 "Generic" 模板进行测试。如果你的连接器正确配置，你将收到一条消息。',
  options_change_email: '更换邮件连接器',
  options_change_sms: '更换短信连接器',
  connector_deleted: '成功删除连接器',
  type_email: '邮件连接器',
  type_sms: '短信连接器',
  type_social: '社交连接器',
  in_used_social_deletion_description:
    'This connector is in use in your sign in experience. By deleting, <name/> sign in experience will be deleted in sign in experience settings.', // UNTRANSLATED
  in_used_passwordless_deletion_description:
    'This {{name}} is in-use in your sign-in experience. By deleting, your sign-in experience will not work properly until you resolve the conflict.', // UNTRANSLATED
};

export default connector_details;
