const connectors = {
  title: 'Conectores',
  subtitle: 'Configure conectores para habilitar a experiência de login social e sem senha',
  create: 'Adicionar conector social',
  config_sie_notice: 'You’ve set up connectors. Make sure to configure it in <a>{{link}}</a>.', // UNTRANSLATED
  config_sie_link_text: 'sign in experience', // UNTRANSLATED
  tab_email_sms: 'Conectores de Email e SMS',
  tab_social: 'Conectores sociais',
  connector_name: 'Nome do conector',
  connector_type: 'Tipo',
  connector_status: 'Experiência de login',
  connector_status_in_use: 'Em uso',
  connector_status_not_in_use: 'Fora de uso',
  not_in_use_tip: {
    content:
      'Not in use means your sign in experience hasn’t used this sign in method. <a>{{link}}</a> to add this sign in method. ', // UNTRANSLATED
    go_to_sie: 'Go to sign in experience', // UNTRANSLATED
  },
  social_connector_eg: 'Ex., Google, Facebook, Github',
  save_and_done: 'Guardar',
  type: {
    email: 'Email',
    sms: 'SMS',
    social: 'Social',
  },
  setup_title: {
    email: 'Configurar o conector de email',
    sms: 'Configurar o conector de SMS',
    social: 'Adicionar conector social',
  },
  guide: {
    subtitle: 'Um guia passo a passo para configurar o conector',
    connector_setting: 'Connector setting', // UNTRANSLATED
    name: 'Connector name', // UNTRANSLATED
    name_tip: 'Connector button’s name will display as "Continue with {{Connector Name}}".', // UNTRANSLATED
    logo: 'Connector logo URL', // UNTRANSLATED
    logo_placeholder: 'https://your.cdn.domain/logo.png', // UNTRANSLATED
    logo_tip: 'The logo image will also display on the connector button.', // UNTRANSLATED
    logo_dark: 'Connector logo URL (Dark mode)', // UNTRANSLATED
    logo_dark_placeholder: 'https://your.cdn.domain/logo.png', // UNTRANSLATED
    logo_dark_tip:
      'This will be used when opening “Enable dark mode” in the setting of sign in experience.', // UNTRANSLATED
    logo_dark_collapse: 'Collapse', // UNTRANSLATED
    logo_dark_show: 'Show "Logo for dark mode"', // UNTRANSLATED
    target: 'Connector identity target', // UNTRANSLATED
    target_tip: 'A unique identifier for the connector.', // UNTRANSLATED
    config: 'Enter your JSON here', // UNTRANSLATED
    sync_profile: 'Sync profile information from the social provider', // UNTRANSLATED
    sync_profile_only_at_register: 'Only sync at register', // UNTRANSLATED
    sync_profile_each_sign_in: 'Always sync at each sign-in', // UNTRANSLATED
  },
  platform: {
    universal: 'Universal',
    web: 'Web',
    native: 'Nativo',
  },
  add_multi_platform: ' suporta várias plataformas, selecione uma plataforma para continuar',
  drawer_title: 'Guia do conector',
  drawer_subtitle: 'Siga as instruções para integrar o conector',
};

export default connectors;
