const errors = {
  auth: {
    authorization_header_missing: 'O cabeçalho de autorização está ausente.',
    authorization_token_type_not_supported: 'O tipo de autorização não é suportado.',
    unauthorized: 'Não autorizado. Verifique as credenciais e o scope.',
    forbidden: 'Proibido. Verifique os seus cargos e permissões.',
    expected_role_not_found: 'Role esperado não encontrado. Verifique os seus cargos e permissões.',
    jwt_sub_missing: 'Campo `sub` está ausente no JWT.',
    require_re_authentication: 'Re-authentication is required to perform a protected action.', // UNTRANSLATED
  },
  guard: {
    invalid_input: 'O pedido {{type}} é inválido.',
    invalid_pagination: 'O valor de paginação enviado é inválido.',
  },
  oidc: {
    aborted: 'O utilizador final abortou a interação.',
    invalid_scope: 'Scope {{scope}} não é suportado.',
    invalid_scope_plural: 'Scope {{scopes}} não são suportados.',
    invalid_token: 'O Token fornecido é inválido.',
    invalid_client_metadata: 'Metadados de cliente inválidos fornecidos.',
    insufficient_scope: 'Token de acesso sem scope solicitado {{scopes}}.',
    invalid_request: 'Pedido inválido.',
    invalid_grant: 'Pedido Grant inválido.',
    invalid_redirect_uri:
      '`redirect_uri` não correspondeu a nenhum dos `redirect_uris` registados.',
    access_denied: 'Acesso negado.',
    invalid_target: 'Indicador de recurso inválido.',
    unsupported_grant_type: '`grant_type` solicitado não é suportado.',
    unsupported_response_mode: '`response_mode` solicitado não é suportado.',
    unsupported_response_type: '`response_type` solicitado não é suportado.',
    provider_error: 'Erro interno OIDC: {{message}}.',
  },
  user: {
    username_already_in_use: 'This username is already in use.', // UNTRANSLATED
    email_already_in_use: 'This email is associated with an existing account.', // UNTRANSLATED
    phone_already_in_use: 'This phone number is associated with an existing account.', // UNTRANSLATED
    invalid_email: 'Endereço de email inválido.',
    invalid_phone: 'Número de telefone inválido.',
    email_not_exist: 'O endereço de email ainda não foi registada.',
    phone_not_exist: 'O numero do telefone ainda não foi registada.',
    identity_not_exist: 'A conta social ainda não foi registada.',
    identity_already_in_use: 'A conta social foi registada.',
    invalid_role_names: '({{roleNames}}) não são válidos',
    cannot_delete_self: 'Não se pode remover a si mesmo.',
    sign_up_method_not_enabled: 'This sign-up method is not enabled.', // UNTRANSLATED
    sign_in_method_not_enabled: 'This sign-in method is not enabled.', // UNTRANSLATED
    same_password: 'New password cannot be the same as your old password.', // UNTRANSLATED
    password_required_in_profile: 'You need to set a password before signing-in.', // UNTRANSLATED
    new_password_required_in_profile: 'You need to set a new password.', // UNTRANSLATED
    password_exists_in_profile: 'Password already exists in your profile.', // UNTRANSLATED
    username_required_in_profile: 'You need to set a username before signing-in.', // UNTRANSLATED
    username_exists_in_profile: 'Username already exists in your profile.', // UNTRANSLATED
    email_required_in_profile: 'You need to add an email address before signing-in.', // UNTRANSLATED
    email_exists_in_profile: 'Your profile has already associated with an email address.', // UNTRANSLATED
    phone_required_in_profile: 'You need to add a phone number before signing-in.', // UNTRANSLATED
    phone_exists_in_profile: 'Your profile has already associated with a phone number.', // UNTRANSLATED
    email_or_phone_required_in_profile:
      'You need to add an email address or phone number before signing-in.', // UNTRANSLATED
    suspended: 'This account is suspended.', // UNTRANSLATED
    user_not_exist: 'User with {{ identifier }} does not exist.', // UNTRANSLATED,
    missing_profile: 'You need to provide additional info before signing-in.', // UNTRANSLATED
  },
  password: {
    unsupported_encryption_method: 'O método de enncriptação {{name}} não é suportado.',
    pepper_not_found: 'pepper da Password não encontrada. Por favor, verifique os envs.',
  },
  session: {
    not_found: 'Sessão não encontrada. Por favor, volte e faça login novamente.',
    invalid_credentials: 'Credenciais inválidas. Por favor, verifique os dados.',
    invalid_sign_in_method: 'O método de login atual não está disponível.',
    invalid_connector_id:
      'Não foi possível encontrar um conector disponível com o id {{connectorId}}.',
    insufficient_info: 'Informações de login insuficientes.',
    connector_id_mismatch: 'O connectorId não corresponde ao registado na sessão.',
    connector_session_not_found:
      'Sessão do conector não encontrada. Por favor, volte e faça login novamente.',
    verification_session_not_found:
      'The verification was not successful. Restart the verification flow and try again.', // UNTRANSLATED
    verification_expired:
      'The connection has timed out. Verify again to ensure your account safety.', // UNTRANSLATED
    unauthorized: 'Faça login primeiro.',
    unsupported_prompt_name: 'Nome de prompt não suportado.',
    forgot_password_not_enabled: 'Forgot password is not enabled.', // UNTRANSLATED
    verification_failed:
      'The verification was not successful. Restart the verification flow and try again.', // UNTRANSLATED
  },
  connector: {
    general: 'Ocorreu um erro inesperado no conector.{{errorDescription}}',
    not_found: 'Não é possível encontrar nenhum conector disponível para o tipo: {{type}}.',
    not_enabled: 'O conector não está ativo.',
    invalid_metadata: 'Os metadados do conector são inválidos.',
    invalid_config_guard: 'A configuração de proteção do conector é inválida.',
    unexpected_type: 'O tipo do conector é inesperado.',
    invalid_request_parameters: 'The request is with wrong input parameter(s).', // UNTRANSLATED
    insufficient_request_parameters: 'A solicitação pode perder alguns parâmetros de entrada.',
    invalid_config: 'A configuração do conector é inválida.',
    invalid_response: 'A resposta do conector é inválida.',
    template_not_found: 'Não foi possível encontrar o modelo correto na configuração do conector.',
    not_implemented: '{{method}}: ainda não foi implementado.',
    social_invalid_access_token: 'O token de acesso do conector é inválido.',
    invalid_auth_code: 'O código de autenticação do conector é inválido.',
    social_invalid_id_token: 'O token de ID do conector é inválido.',
    authorization_failed: 'O processo de autorização do usuário não foi bem-sucedido.',
    social_auth_code_invalid:
      'Não foi possível obter o token de acesso, verifique o código de autorização.',
    more_than_one_sms: 'O número de conectores SMS é maior que 1.',
    more_than_one_email: 'O número de conectores de e-mail é maior que 1.',
    db_connector_type_mismatch: 'Há um conector no banco de dados que não corresponde ao tipo.',
    not_found_with_connector_id: 'Can not find connector with given standard connector id.', // UNTRANSLATED
    multiple_instances_not_supported:
      'Can not create multiple instance with picked standard connector.', // UNTRANSLATED
    invalid_type_for_syncing_profile: 'You can only sync user profile with social connectors.', // UNTRANSLATED
    can_not_modify_target: 'The connector target can not be modified.', // UNTRANSLATED
    multiple_target_with_same_platform:
      'You can not have multiple social connectors that have same target and platform.', // UNTRANSLATED
    cannot_change_metadata_for_non_standard_connector:
      "This connector's `metadata` cannot be changed.", // UNTRANSLATED
  },
  passcode: {
    phone_email_empty: 'O campos telefone e email estão vazios.',
    not_found: 'Senha não encontrada. Por favor, envie a senha primeiro.',
    phone_mismatch: 'O telefone não correspond. Por favor, solicite uma nova senha.',
    email_mismatch: 'O email não corresponde. Por favor, solicite uma nova senha.',
    code_mismatch: 'Senha inválida.',
    expired: 'A senha expirou. Por favor, solicite uma nova senha.',
    exceed_max_try:
      'Limitação de verificação de senha excedida. Por favor, solicite uma nova senha.',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use:
      'URL dos "Termos de uso" vazio. Adicione o URL se os "Termos de uso" estiverem ativados.',
    empty_logo: 'Insira o URL do seu logotipo',
    empty_slogan:
      'Slogan de marca vazio. Adicione um slogan se o estilo da interface com o slogan for selecionado.',
    empty_social_connectors:
      'Conectores sociais vazios. Adicione conectores sociais e ative os quando o método de login social estiver ativado.',
    enabled_connector_not_found: 'Conector {{type}} ativado não encontrado.',
    not_one_and_only_one_primary_sign_in_method:
      'Deve haver um e apenas um método de login principal. Por favor, verifique sua entrada.',
    username_requires_password: 'Must enable set a password for username sign up identifier.', // UNTRANSLATED
    passwordless_requires_verify: 'Must enable verify for email/phone sign up identifier.', // UNTRANSLATED
    miss_sign_up_identifier_in_sign_in: 'Sign in methods must contain the sign up identifier.', // UNTRANSLATED
    password_sign_in_must_be_enabled:
      'Password sign in must be enabled when set a password is required in sign up.', // UNTRANSLATED
    code_sign_in_must_be_enabled:
      'Verification code sign in must be enabled when set a password is not required in sign up.', // UNTRANSLATED
    unsupported_default_language: 'This language - {{language}} is not supported at the moment.', // UNTRANSLATED
    at_least_one_authentication_factor: 'You have to select at least one authentication factor.', // UNTRANSLATED
  },
  localization: {
    cannot_delete_default_language:
      '{{languageTag}} is set as your default language and can’t be deleted.', // UNTRANSLATED
    invalid_translation_structure: 'Invalid data schemas. Please check your input and try again.', // UNTRANSLATED
  },
  swagger: {
    invalid_zod_type: 'Tipo de Zod inválido. Verifique a configuração do protetor de rota.',
    not_supported_zod_type_for_params:
      'Tipo Zod não suportado para os parâmetros. Verifique a configuração do protetor de rota.',
  },
  entity: {
    create_failed: 'Falha ao criar {{name}}.',
    not_exists: '{{name}} não existe.',
    not_exists_with_id: '{{name}} com o ID `{{id}}` não existe.',
    not_found: 'O recurso não existe.',
  },
  log: {
    invalid_type: 'The log type is invalid.', // UNTRANSLATED
  },
};

export default errors;
