const connector = {
  general: '连接器发生错误：{{errorDescription}}',
  not_found: '找不到可用的 {{type}} 类型的连接器',
  not_enabled: '连接器尚未启用',
  invalid_metadata: '连接器 metadata 参数错误',
  invalid_config_guard: '连接器配置 guard 错误',
  unexpected_type: '连接器类型错误',
  insufficient_request_parameters: '请求参数缺失',
  invalid_request_parameters: '请求参数错误',
  invalid_config: '连接器配置错误',
  invalid_response: '连接器错误响应',
  template_not_found: '无法从连接器配置中找到对应的模板',
  rate_limit_exceeded: '触发速率限制。请稍后再试。',
  not_implemented: '方法 {{method}} 尚未实现',
  social_invalid_access_token: '当前连接器的 access_token 无效',
  invalid_auth_code: '当前连接器的授权码无效',
  social_invalid_id_token: '当前连接器的 id_token 无效',
  authorization_failed: '用户授权流程失败',
  social_auth_code_invalid: '无法获取 access_token，请检查授权 code 是否有效',
  more_than_one_sms: '同时存在超过 1 个短信连接器',
  more_than_one_email: '同时存在超过 1 个邮件连接器',
  more_than_one_connector_factory: '找到多个连接器工厂（id 为 {{connectorIds}}），请删除多余项。',
  db_connector_type_mismatch: '数据库中存在一个类型不匹配的连接。',
  not_found_with_connector_id: '找不到所给 connector id 对应的连接器',
  multiple_instances_not_supported: '你选择的连接器不支持创建多实例。',
  invalid_type_for_syncing_profile: '只有社交连接器可以开启用户档案同步。',
  can_not_modify_target: '不可修改连接器 target。',
  should_specify_target: '你需要声明 target 的值。',
  multiple_target_with_same_platform: '同一平台上，多个社交连接器不能重复使用相同的 “Target”。',
  cannot_overwrite_metadata_for_non_standard_connector: '不可覆盖该连接器的 metadata 参数。',
};

export default connector;
