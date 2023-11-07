const quota_item = {
  tenant_limit: {
    name: 'Locatários',
    limited: '{{count, number}} locatário',
    limited_other: '{{count, number}} locatários',
    unlimited: 'Locatários ilimitados',
    not_eligible: 'Remova seus locatários',
  },
  mau_limit: {
    name: 'Usuários ativos mensais',
    limited: '{{count, number}} UAM',
    unlimited: 'UAM ilimitados',
    not_eligible: 'Remova todos seus usuários',
  },
  applications_limit: {
    name: 'Aplicações',
    limited: '{{count, number}} aplicação',
    limited_other: '{{count, number}} aplicações',
    unlimited: 'Aplicações ilimitadas',
    not_eligible: 'Remova suas aplicações',
  },
  machine_to_machine_limit: {
    name: 'Aplicações de máquina a máquina',
    limited: '{{count, number}} aplicação de máquina a máquina',
    limited_other: '{{count, number}} aplicações de máquina a máquina',
    unlimited: 'Aplicações de máquina a máquina ilimitadas',
    not_eligible: 'Remova suas aplicações de máquina a máquina',
  },
  resources_limit: {
    name: 'Recursos da API',
    limited: '{{count, number}} recurso da API',
    limited_other: '{{count, number}} recursos da API',
    unlimited: 'Recursos da API ilimitados',
    not_eligible: 'Remova seus recursos da API',
  },
  scopes_per_resource_limit: {
    name: 'Permissões de recursos',
    limited: '{{count, number}} permissão por recurso',
    limited_other: '{{count, number}} permissões por recurso',
    unlimited: 'Permissão por recurso ilimitada',
    not_eligible: 'Remova suas permissões de recursos',
  },
  custom_domain_enabled: {
    name: 'Domínio personalizado',
    limited: 'Domínio personalizado',
    unlimited: 'Domínio personalizado',
    not_eligible: 'Remova seu domínio personalizado',
  },
  omni_sign_in_enabled: {
    /** UNTRANSLATED */
    name: 'SSO',
    /** UNTRANSLATED */
    limited: 'SSO',
    /** UNTRANSLATED */
    unlimited: 'SSO',
    /** UNTRANSLATED */
    not_eligible: 'Disable your SSO',
  },
  built_in_email_connector_enabled: {
    name: 'Conector de email incorporado',
    limited: 'Conector de email incorporado',
    unlimited: 'Conector de email incorporado',
    not_eligible: 'Remova seu conector de email incorporado',
  },
  social_connectors_limit: {
    name: 'Conectores sociais',
    limited: '{{count, number}} conector social',
    limited_other: '{{count, number}} conectores sociais',
    unlimited: 'Conectores sociais ilimitados',
    not_eligible: 'Remova seus conectores sociais',
  },
  standard_connectors_limit: {
    name: 'Conectores padrão gratuitos',
    limited: '{{count, number}} conector padrão gratuito',
    limited_other: '{{count, number}} conectores padrão gratuitos',
    unlimited: 'Conectores padrão ilimitados',
    not_eligible: 'Remova seus conectores padrão',
  },
  roles_limit: {
    name: 'Funções',
    limited: '{{count, number}} função',
    limited_other: '{{count, number}} funções',
    unlimited: 'Funções ilimitadas',
    not_eligible: 'Remova suas funções',
  },
  scopes_per_role_limit: {
    name: 'Permissões de funções',
    limited: '{{count, number}} permissão por função',
    limited_other: '{{count, number}} permissões por função',
    unlimited: 'Permissão por função ilimitada',
    not_eligible: 'Remova suas permissões de função',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} webhook',
    limited_other: '{{count, number}} webhooks',
    unlimited: 'Webhooks ilimitados',
    not_eligible: 'Remova seus webhooks',
  },
  organization_enabled: {
    /** UNTRANSLATED */
    name: 'Organization',
    /** UNTRANSLATED */
    limited: 'Organization',
    /** UNTRANSLATED */
    unlimited: 'Organization',
    /** UNTRANSLATED */
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: 'Permanência de registros de auditoria',
    limited: 'Permanência de registros de auditoria: {{count, number}} dia',
    limited_other: 'Permanência de registros de auditoria: {{count, number}} dias',
    unlimited: 'Dias ilimitados',
    not_eligible: 'Nenhum registro de auditoria',
  },
  community_support_enabled: {
    name: 'Suporte da comunidade',
    limited: 'Suporte da comunidade',
    unlimited: 'Suporte da comunidade',
    not_eligible: 'Nenhum suporte da comunidade',
  },
  customer_ticket_support: {
    name: 'Suporte de tickets de cliente',
    limited: '{{count, number}} hora de suporte de ticket de cliente',
    limited_other: '{{count, number}} horas de suporte de ticket de cliente',
    unlimited: 'Suporte de ticket de cliente',
    not_eligible: 'Nenhum suporte de ticket de cliente',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: 'Desative sua MFA',
  },
};

export default Object.freeze(quota_item);
