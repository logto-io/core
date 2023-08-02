const application_details = {
  page_title: 'Detalhes da aplicação',
  back_to_applications: 'Voltar para Aplicativos',
  check_guide: 'Visualizar o guia',
  settings: 'Configurações',
  settings_description:
    'Os aplicativos são usados para identificar seus aplicativos no Logto para OIDC, experiência de login, logs de auditoria, etc.',
  advanced_settings: 'Configurações avançadas',
  advanced_settings_description:
    'As configurações avançadas incluem termos relacionados ao OIDC. Você pode conferir o Token Endpoint para obter mais informações.',
  application_name: 'Nome do aplicativo',
  application_name_placeholder: 'Meu aplicativo',
  description: 'Descrição',
  description_placeholder: 'Digite a descrição do seu aplicativo',
  config_endpoint: 'OpenID Provider configuração endpoint',
  authorization_endpoint: 'Endpoint de autorização',
  authorization_endpoint_tip:
    'O endpoint para executar autenticação e autorização. É usado para <a>autenticação</a> OpenID Connect.',
  application_id: 'ID do aplicativo',
  application_id_tip:
    'O identificador exclusivo do aplicativo normalmente gerado pela Logto. Também é conhecido como “<a>client_id</a>” em OpenID Connect.',
  application_secret: 'Segredo do aplicativo',
  redirect_uri: 'URI de redirecionamento',
  redirect_uris: 'URIs de redirecionamento',
  redirect_uri_placeholder: 'https://seusite.com.br/app',
  redirect_uri_placeholder_native: 'io.logto://retorno',
  redirect_uri_tip:
    'O URI é redirecionado após o login do usuário (seja bem-sucedido ou não). Consulte OpenID Connect <a>AuthRequest</a> para obter mais informações.',
  post_sign_out_redirect_uri: 'URI de redirecionamento após saída',
  post_sign_out_redirect_uris: 'URIs de redirecionamento após saída',
  post_sign_out_redirect_uri_placeholder: 'https://seusite.com.br/home',
  post_sign_out_redirect_uri_tip:
    'O URI é redirecionado após a saída do usuário (opcional). Pode não ter efeito prático em alguns tipos de aplicativos.',
  cors_allowed_origins: 'Origens permitidas pelo CORS',
  cors_allowed_origins_placeholder: 'https://seusite.com.br',
  cors_allowed_origins_tip:
    'Por padrão, todas as origens de URIs de redirecionamento serão permitidas. Normalmente, nenhuma ação é necessária para este campo. Confira o <a>doc MDN</a> para informações detalhadas.',
  id_token_expiration: 'Expiração do token de ID',
  refresh_token_expiration: 'Expiração do Refresh Token',
  token_endpoint: 'Token Endpoint',
  user_info_endpoint: 'Userinfo Endpoint',
  enable_admin_access: 'Ativar acesso de administrador',
  enable_admin_access_label:
    'Ative ou desative o acesso à API de gerenciamento. Uma vez ativado, você pode usar tokens de acesso para chamar a API de gerenciamento em nome deste aplicativo.',
  always_issue_refresh_token: 'Emitir sempre o token de refresh',
  always_issue_refresh_token_label:
    'Ativar esta configuração permitirá que a Logto emita sempre tokens de Refresh, independentemente de "prompt=consent" ser apresentado na solicitação de autenticação. No entanto, essa prática é desencorajada, a menos que seja necessária, pois não é compatível com o OpenID Connect e pode potencialmente causar problemas.',
  refresh_token_ttl: 'Tempo de vida do Refresh Token em dias',
  refresh_token_ttl_tip:
    'A duração para a qual um Refresh Token pode ser usado para solicitar novos tokens de acesso antes que expire e se torne inválido. As solicitações de token estenderão o TTL do Refresh Token para este valor.',
  rotate_refresh_token: 'Rotacionar Refresh Token',
  rotate_refresh_token_label:
    'Quando ativado, a Logto emitirá um novo Refresh Token para solicitações de token quando 70% do tempo de vida original (TTL) tenha passado ou certas condições sejam atendidas. <a>Saiba mais</a>',
  delete_description:
    'Essa ação não pode ser desfeita. Isso excluirá permanentemente o aplicativo. Insira o nome do aplicativo <span>{{name}}</span> para confirmar.',
  enter_your_application_name: 'Digite o nome do seu aplicativo',
  application_deleted: 'O aplicativo {{name}} foi excluído com sucesso',
  redirect_uri_required: 'Você deve inserir pelo menos um URI de redirecionamento',
};

export default Object.freeze(application_details);
