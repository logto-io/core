const connectors = {
  title: 'Connectors',
  subtitle: 'Set up connectors to enable passwordless and social sign in experience',
  create: 'Add Social Connector',
  config_sie_notice: 'You’ve set up connectors. Make sure to configure it in <a>{{link}}</a>.',
  config_sie_link_text: 'sign in experience',
  tab_email_sms: 'Email and SMS connectors',
  tab_social: 'Social connectors',
  connector_name: 'Connector name',
  connector_type: 'Type',
  connector_status: 'Sign in Experience',
  connector_status_in_use: 'In use',
  connector_status_not_in_use: 'Not in use',
  not_in_use_tip: {
    content:
      'Not in use means your sign in experience hasn’t used this sign in method. <a>{{link}}</a> to add this sign in method. ',
    go_to_sie: 'Go to sign in experience',
  },
  social_connector_eg: 'E.g., Google, Facebook, Github',
  save_and_done: 'Save and Done',
  type: {
    email: 'Email connector',
    sms: 'SMS connector',
    social: 'Social connector',
  },
  setup_title: {
    email: 'Set up email connector',
    sms: 'Set up SMS connector',
    social: 'Add Social Connector',
  },
  guide: {
    subtitle: 'A step by step guide to configure your connector',
    connector_setting: 'Connector setting',
    name: 'Connector name',
    name_tip: 'Connector button’s name will display as "Continue with {{Connector Name}}".',
    logo: 'Connector logo URL',
    logo_placeholder: 'https://your.cdn.domain/logo.png',
    logo_tip: 'The logo image will also display on the connector button.',
    logo_dark: 'Connector logo URL (Dark mode)',
    logo_dark_placeholder: 'https://your.cdn.domain/logo.png',
    logo_dark_tip:
      'This will be used when opening “Enable dark mode” in the setting of sign in experience.',
    logo_dark_collapse: 'Collapse',
    logo_dark_show: 'Show "Logo for dark mode"',
    target: 'Connector identity target',
    target_tip: 'A unique identifier for the connector.',
    target_tootip:
      '"Target" in Logto social connectors refers to the "source" of your social identities. In Logto design, we do not accept the same "target" of a specific platform to avoid conflicts. You should be very careful before you add a connector since you CAN NOT change its value once you create it. <a>Learn more.</a>',
    config: 'Enter your JSON here',
    sync_profile: 'Sync profile information from the social provider',
    sync_profile_only_at_register: 'Only sync at register',
    sync_profile_each_sign_in: 'Always sync at each sign-in',
  },
  platform: {
    universal: 'Universal',
    web: 'Web',
    native: 'Native',
  },
  add_multi_platform: ' supports multiple platform, select a platform to continue',
  drawer_title: 'Connector Guide',
  drawer_subtitle: 'Follow the instructions to integrate your connector',
};

export default connectors;
