/* eslint-disable max-lines */
const translation = {
  admin_console: {
    title: 'Admin Console',
    sign_out: 'Sign Out',
    profile: 'Profile',
    admin_user: 'Admin',
    system_app: 'System',
    general: {
      placeholder: 'Placeholder',
      skip: 'Skip',
      next: 'Next',
      retry: 'Try Again',
      done: 'Done',
      search: 'Search',
      clear_result: 'Clear Results',
      save: 'Save',
      save_changes: 'Save Changes',
      saved: 'Saved!',
      loading: 'Loading...',
      redirecting: 'Redirecting...',
      added: 'Added',
      cancel: 'Cancel',
      confirm: 'Confirm',
      check_out: 'Check Out',
      create: 'Create',
      set_up: 'Set Up',
      customize: 'Customize',
      reminder: 'Reminder',
      delete: 'Delete',
      more_options: 'MORE OPTIONS',
      close: 'Close',
      copy: 'Copy',
      copying: 'Copying',
      copied: 'Copied',
      required: 'Required',
      add_another: '+ Add Another',
      deletion_confirmation: 'Are you sure you want to delete this {{title}}?',
      settings_nav: 'Settings',
    },
    errors: {
      something_went_wrong: 'Oops! Something went wrong.',
      page_not_found: 'Page not found',
      unknown_server_error: 'Unknown server error occurred',
      empty: 'No data',
      missing_total_number: 'Unable to find Total-Number in response headers',
      invalid_uri_format: 'Invalid URI format',
      invalid_origin_format: 'Invalid URI origin format',
      required_field_missing: 'Please enter {{field}}',
      required_field_missing_plural: 'You have to enter at least one {{field}}',
      more_details: 'More details',
      username_pattern_error:
        'Username should only contain letters, numbers, or underscore and should not start with a number.',
      password_pattern_error: 'Password requires a minimum of 6 characters',
    },
    tab_sections: {
      overview: 'Overview',
      resource_management: 'Resource Management',
      user_management: 'User Management',
      help_and_support: 'Help and Support',
    },
    tabs: {
      get_started: 'Get Started',
      dashboard: 'Dashboard',
      applications: 'Applications',
      api_resources: 'API Resources',
      sign_in_experience: 'Sign-in Experience',
      connectors: 'Connectors',
      users: 'User Management',
      audit_logs: 'Audit Logs',
      documentation: 'Documentation',
      contact_us: 'Contact Us',
      settings: 'Settings',
    },
    applications: {
      title: 'Applications',
      subtitle:
        'Setup a mobile, single page or traditional application to use Logto for authentication',
      create: 'Create Application',
      application_name: 'Application name',
      application_description: 'Application description',
      select_application_type: 'Select an application type',
      no_application_type_selected: 'You haven’t selected any application type yet',
      application_created:
        'The application {{name}} has been successfully created! \nNow finish your application settings.',
      app_id: 'App ID',
      type: {
        native: {
          title: 'Native App',
          subtitle: 'An app that runs in a native environment',
          description: 'E.g., iOS app, Android app',
        },
        spa: {
          title: 'Single Page App',
          subtitle: 'An app that runs in a web browser and dynamically updates data in place',
          description: 'E.g., React DOM app, Vue app',
        },
        traditional: {
          title: 'Traditional Web',
          subtitle: 'An app that renders and updates pages by the web server alone',
          description: 'E.g., JSP, PHP',
        },
      },
      guide: {
        get_sample_file: 'Get the sample project',
        header_description:
          'Follow a step by step guide to integrate your application or get a sample configured with your account settings',
        title: 'Congratulations! The application has been created successfully.',
        subtitle:
          'Now follow the steps below to finish your app settings. Please select the SDK type to continue.',
        description_by_sdk:
          'This quick start guide demonstrates how to integrate Logto to {{sdk}} application',
      },
    },
    application_details: {
      back_to_applications: 'Back to Applications',
      check_help_guide: 'Check Help Guide',
      advanced_settings: 'Advanced settings',
      application_name: 'Application name',
      description: 'Description',
      authorization_endpoint: 'Authorization endpoint',
      redirect_uri: 'Redirect URIs',
      post_sign_out_redirect_uri: 'Post Sign-out Redirect URIs',
      cors_allowed_origins: 'CORS allowed origins',
      add_another: 'Add Another',
      id_token_expiration: 'ID Token expiration',
      refresh_token_expiration: 'Refresh Token expiration',
      token_endpoint: 'Token endpoint',
      user_info_endpoint: 'Userinfo endpoint',
      delete_description:
        'This action cannot be undone. It will permanently delete the application. Please enter the application name <span>{{name}}</span> to confirm.',
      enter_your_application_name: 'Enter your application name',
      application_deleted: 'Application {{name}} has been successfully deleted.',
      redirect_uri_required: 'You must enter at least one redirect URI',
    },
    api_resources: {
      title: 'API Resources',
      subtitle: 'Define APIs that you can consume from your authorized applications.',
      create: 'Create API Resource',
      api_name: 'API name',
      api_identifier: 'API identifier',
      api_resource_created: 'The API resource {{name}} has been successfully created!',
    },
    api_resource_details: {
      back_to_api_resources: 'Back to API resources',
      token_expiration_time_in_seconds: 'Token expiration time (in seconds)',
      delete_description:
        'This action cannot be undone. It will permanently delete the API resource. Please enter the api resource name <span>{{name}}</span> to confirm.',
      enter_your_api_resource_name: 'Enter your API resource name',
      api_resource_deleted: 'The API Resource {{name}} has been successfully deleted',
    },
    connectors: {
      title: 'Connectors',
      subtitle: 'Setup connectors to enable passwordless and social sign in experience',
      create: 'Add Social Connector',
      tab_email_sms: 'Email and SMS connectors',
      tab_social: 'Social connectors',
      connector_name: 'Connector name',
      connector_type: 'Type',
      connector_status: 'Sign in Experience',
      connector_status_in_use: 'In use',
      connector_status_not_in_use: 'Not in use',
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
      },
      platform: {
        universal: 'Universal',
        web: 'Web',
        native: 'Native',
      },
      add_multi_platform: ' supports multiple platform, select a platform to continue',
      drawer_title: 'Connector Guide',
      drawer_subtitle: 'Follow the instructions to integrate your connector',
    },
    connector_details: {
      back_to_connectors: 'Back to Connectors',
      check_readme: 'Check README',
      save_error_empty_config: 'Please enter config',
      save_error_json_parse_error: 'Please enter valid JSON',
      send: 'Send',
      send_error_invalid_format: 'Invalid input',
      edit_config_label: 'Enter your json here',
      test_email_sender: 'Test your email connector',
      test_sms_sender: 'Test your SMS connector',
      test_message_sent: 'Test message sent!',
      test_sender_description: 'You will receive a message if your json is rightly configured',
      options_change_email: 'Change email connector',
      options_change_sms: 'Change SMS connector',
      connector_deleted: 'The connector has been successfully deleted.',
      type_email: 'Email connector',
      type_sms: 'SMS connector',
      type_social: 'Social connector',
    },
    get_started: {
      progress: 'Get started guide: {{completed}}/{{total}}',
      progress_dropdown_title: 'A few things you can do...',
      title: 'How do you want to get started with Logto?',
      subtitle_part1: 'A few things you can do to quickly get value of Logto',
      subtitle_part2: 'I’m done with this set up',
      hide_this: 'Hide this',
      confirm_message: 'Are you sure you want to hide this page? This action cannot be undone.',
      card1_title: 'Check out the demo',
      card1_subtitle: 'Try Logto sign-in experience now to see how it works',
      card2_title: 'Create and integrate the first application',
      card2_subtitle:
        'Set up a mobile, single page or traditional application to use Logto for authentication',
      card3_title: 'Customize sign-in experience',
      card3_subtitle: 'Customize the sign in UI to match your brand and view in real time',
      card4_title: 'Enable phone number sign-in and email sign-in',
      card4_subtitle:
        'Try passwordless sign in and enable a secure and frictionless experience for your customer',
      card5_title: 'Add a social connector',
      card5_subtitle:
        'Let your customer sign in to your app with the social identities in one click',
      card6_title: 'Further readings',
      card6_subtitle: 'Check out our step-by-step, scenario-based docs without tedious concepts',
    },
    users: {
      title: 'User Management',
      subtitle:
        'Manage user identities including creating users, editing user information, viewing user logs, password resets and deleting users',
      create: 'Add User',
      user_name: 'User',
      application_name: 'From application',
      latest_sign_in: 'Latest sign in',
      create_form_username: 'Username',
      create_form_password: 'Password',
      create_form_name: 'Full name',
      unnamed: 'Unnamed',
    },
    user_details: {
      back_to_users: 'Back to User Management',
      created_title: 'Congratulations! This user has been successfully created.',
      created_guide: 'You can send the following log in information to the user',
      created_username: 'Username:',
      created_password: 'Initial password:',
      menu_delete: 'Delete',
      delete_description: 'This action cannot be undone. It will permanently delete the user.',
      deleted: 'The user has been successfully deleted',
      reset_password: {
        title: 'Reset password',
        label: 'New password:',
        reset_password: 'Reset password',
        reset_password_success: 'Password has been successfully reset',
      },
      tab_logs: 'User logs',
      field_email: 'Primary email',
      field_phone: 'Primary phone',
      field_username: 'Username',
      field_name: 'Name',
      field_avatar: 'Avatar image URL',
      field_custom_data: 'Custom data',
      field_connectors: 'Social connections',
      custom_data_invalid: 'Custom data must be a valid JSON',
      connectors: {
        connectors: 'Connectors',
        user_id: 'User ID',
        remove: 'Remove',
        not_connected: 'The user is not connected to any social connector',
        deletion_confirmation:
          'You are removing the existing <name/> identity. Are you sure you want to do that?',
      },
    },
    contact: {
      title: 'Contact Us',
      description:
        'Join in our community to provide feedback, ask for help and share your thoughts with other developers',
      discord: {
        title: 'Discord channel',
        description: 'Join our public channel to chat with other developers',
        button: 'Join',
      },
      github: {
        title: 'GitHub',
        description: 'Create an issue and submit at GitHub',
        button: 'Contact',
      },
      email: {
        title: 'Send email',
        description: 'Send us an email for further information and help',
        button: 'Send',
      },
    },
    sign_in_exp: {
      title: 'Sign-in Experience',
      description: 'Customize the sign in UI to match your brand and view in real time',
      tabs: {
        branding: 'Branding',
        methods: 'Sign in methods',
        others: 'Others',
      },
      welcome: {
        title:
          'This is the first time you define sign-in experience. This guide will help you go through all necessary settings and quicly get started.',
        get_started: 'Get Started',
        apply_remind:
          'Please note that sign-in experience will apply to all applications under this account.',
        got_it: 'Got It',
      },
      color: {
        title: 'COLOR',
        primary_color: 'Brand color',
        dark_primary_color: 'Brand color (Dark)',
        dark_mode: 'Enable dark mode',
        dark_mode_description:
          'Your app will have an auto-generated dark mode theme based on your brand color and Logto algorithm. You are free to customize.',
      },
      branding: {
        title: 'BRANDING AREA',
        ui_style: 'Style',
        styles: {
          logo_slogan: 'App logo with slogan',
          logo: 'App logo only',
        },
        logo_image_url: 'App logo image URL',
        dark_logo_image_url: 'App logo image URL (Dark)',
        slogan: 'Slogan',
        slogan_placeholder: 'Unleash your creativity',
      },
      terms_of_use: {
        title: 'TERMS OF USE',
        enable: 'Enable terms of use',
        description: 'Add the legal agreements for the use of your product',
        terms_of_use: 'Terms of use',
        terms_of_use_placeholder: 'Terms of use URL',
        terms_of_use_tip: 'Terms of use URL',
      },
      sign_in_methods: {
        title: 'SIGN IN METHODS',
        primary: 'Primary sign in method',
        enable_secondary: 'Enable secondary sign in',
        enable_secondary_description:
          "Once it's turned on, you app will support more sign in method(s) besides the primary one. ",
        methods: 'Sign in method',
        methods_sms: 'Phone number sign-in',
        methods_email: 'Email sign-in',
        methods_social: 'Social sign-in',
        methods_username: 'Username-with-password sign in',
        methods_primary_tag: '(Primary)',
        define_social_methods: 'Define social sign-in methods',
        transfer: {
          title: 'Social connectors',
          footer: {
            not_in_list: 'Not in the list?',
            set_up_more: 'Set up more',
            go_to: 'social connectors or go to “Connectors” section.',
          },
        },
      },
      others: {
        languages: {
          title: 'LANGUAGES',
          mode: 'Language mode',
          auto: 'Auto',
          fixed: 'Fixed',
          fallback_language: 'Fallback language',
          fixed_language: 'Fixed language',
          languages: {
            english: 'English',
            chinese: 'Chinese',
          },
        },
      },
      setup_warning: {
        no_connector: '',
        no_connector_sms:
          'You haven’t set up a SMS connector yet. Your sign in experience won’t go live until you finish the settings first. ',
        no_connector_email:
          'You haven’t set up an Email connector yet. Your sign in experience won’t go live until you finish the settings first. ',
        no_connector_social:
          'You haven’t set up any social connectors yet. Your sign in experience won’t go live until you finish the settings first. ',
        no_added_social_connector:
          'You’ve set up a few social connectors now. Make sure to add some to your sign in experience. Drag and drop to change the order.',
      },
      save_alert: {
        description:
          'You are changing sign in methods. This will impact some of your users. Are you sure you want to do that?',
        before: 'Before',
        after: 'After',
      },
      preview: {
        title: 'Sign in preview',
        languages: {
          english: 'English',
          chinese: 'Chinese',
        },
        dark: 'Dark',
        light: 'Light',
        mobile: 'Mobile',
        desktop_web: 'Desktop Web',
        mobile_web: 'Mobile Web',
      },
    },
    settings: {
      title: 'Settings',
      description: 'Manage the global settings',
      tabs: {
        general: 'General',
      },
      custom_domain: 'Custom domain',
      language: 'Language',
      language_english: 'English',
      language_chinese: 'Chinese',
      appearance: 'Appearance',
      appearance_system: 'Sync with system',
      appearance_light: 'Light mode',
      appearance_dark: 'Dark mode',
    },
    dashboard: {
      title: 'Dashboard',
      description: 'Get an overview about your app performace',
      total_users: 'Total users',
      total_users_tip: 'Total users',
      new_users_today: 'New users today',
      new_users_today_tip: 'New users today',
      new_users_7_days: 'New users past 7 days',
      new_users_7_days_tip: 'New users past 7 days',
      daily_active_users: 'Daily active users',
      daily_active_users_tip: 'Daily active users',
      weekly_active_users: 'Weeky active users',
      weekly_active_users_tip: 'Weeky active users',
      monthly_active_users: 'Monthly active users',
      monthly_active_users_tip: 'Monthly active users',
    },
    logs: {
      title: 'Audit Logs',
      subtitle: 'View log data of authentication events made by your admin and users',
      event: 'Event',
      user: 'User',
      application: 'Application',
      time: 'Time',
      filter_by: 'Filter by',
    },
    log_details: {
      back_to_logs: 'Back to Audit Logs',
      back_to_user: 'Back to {{name}}',
      success: 'Success',
      failed: 'Failed',
      event_type: 'Event type',
      application: 'Application',
      ip_address: 'IP address',
      user: 'User',
      log_id: 'Log ID',
      time: 'Time',
      user_agent: 'User agent',
      tab_details: 'Details',
      raw_data: 'Raw data',
    },
    session_expired: {
      title: 'Session Expired',
      subtitle:
        'Your session might have expired and you have been disconnected. Click the button below to sign in to admin console again.',
      button: 'Sign in again',
    },
    welcome: {
      title: 'Welcome to Logto Admin Console',
      description:
        'Admin console is a web app to manage Logto without coding requirements. Let’s first create an admin account. With this account, you can manage Logto by yourself or on behalf of your company.',
      create_account: 'Create Account',
    },
  },
  demo_app: {
    notification: 'Use the admin username and password to sign in this demo.',
    title: "You've successfully signed in the demo app!",
    subtitle: 'Here is your personal information:',
    username: 'Username: ',
    user_id: 'User ID: ',
    sign_out: 'Sign out the demo app',
    continue_explore: 'Or continue to explore',
    customize_sign_in_experience: 'Customize sign-in experience',
    enable_passwordless: 'Enable passwordless',
    add_social_connector: 'Add a social connector',
  },
};

const errors = {
  auth: {
    authorization_header_missing: 'Authorization header is missing.',
    authorization_token_type_not_supported: 'Authorization type is not supported.',
    unauthorized: 'Unauthorized. Please check credentials and its scope.',
    forbidden: 'Forbidden. Please check your user roles and permissions.',
    jwt_sub_missing: 'Missing `sub` in JWT.',
  },
  guard: {
    invalid_input: 'The request input is invalid.',
    invalid_pagination: 'The request pagination value is invalid.',
  },
  oidc: {
    aborted: 'The end-user aborted interaction.',
    invalid_scope: 'Scope {{scope}} is not supported.',
    invalid_scope_plural: 'Scope {{scopes}} are not supported.',
    invalid_token: 'Invalid token provided.',
    invalid_client_metadata: 'Invalid client metadata provided.',
    insufficient_scope: 'Access token missing requested scope {{scopes}}.',
    invalid_request: 'Request is invalid.',
    invalid_grant: 'Grant request is invalid.',
    invalid_redirect_uri:
      "`redirect_uri` did not match any of the client's registered `redirect_uris`.",
    access_denied: 'Access denied.',
    invalid_target: 'Invalid resource indicator.',
    unsupported_grant_type: 'Unsupported `grant_type` requested.',
    unsupported_response_mode: 'Unsupported `response_mode` requested.',
    unsupported_response_type: 'Unsupported `response_type` requested.',
    provider_error: 'OIDC Internal Error: {{message}}.',
  },
  user: {
    username_exists_register: 'The username has been registered.',
    email_exists_register: 'The email address has been registered.',
    phone_exists_register: 'The phone number has been registered.',
    invalid_email: 'Invalid email address.',
    invalid_phone: 'Invalid phone number.',
    email_not_exists: 'The email address has not been registered yet.',
    phone_not_exists: 'The phone number has not been registered yet.',
    identity_not_exists: 'The social account has not been registered yet.',
    identity_exists: 'The social account has been registered.',
  },
  password: {
    unsupported_encryption_method: 'The encryption method {{name}} is not supported.',
    pepper_not_found: 'Password pepper not found. Please check your core envs.',
  },
  session: {
    not_found: 'Session not found. Please go back and sign in again.',
    invalid_credentials: 'Invalid credentials. Please check your input.',
    invalid_sign_in_method: 'Current sign-in method is not available.',
    invalid_connector_id: 'Unable to find available connector with id {{connectorId}}.',
    insufficient_info: 'Insufficient sign-in info.',
    connector_id_mismatch: 'The connectorId is mismatched with session record.',
    connector_session_not_found: 'Connector session not found. Please go back and sign in again.',
    unauthorized: 'Please sign in first.',
    unsupported_prompt_name: 'Unsupported prompt name.',
  },
  connector: {
    general: 'An unexpected error occurred in connector.',
    not_found: 'Cannot find any available connector for type: {{type}}.',
    not_enabled: 'The connector is not enabled.',
    insufficient_request_parameters: 'The request might miss some input parameters.',
    invalid_config: "The connector's config is invalid.",
    invalid_response: "The connector's response is invalid.",
    template_not_found: 'Unable to find correct template in connector config.',
    invalid_access_token: "The connector's access token is invalid.",
    invalid_auth_code: "The connector's auth code is invalid.",
    invalid_id_token: "The connector's id token is invalid.",
    authorization_failed: "The user's authorization process is unsuccessful.",
    oauth_code_invalid: 'Unable to get access token, please check authorization code.',
    more_than_one_sms: 'The number of SMS connectors is larger then 1.',
    more_than_one_email: 'The number of Email connectors is larger then 1.',
    db_connector_type_mismatch: 'There is a connector in the DB that does not match the type.',
  },
  passcode: {
    phone_email_empty: 'Both phone and email are empty.',
    not_found: 'Passcode not found. Please send passcode first.',
    phone_mismatch: 'Phone mismatch. Please request a new passcode.',
    email_mismatch: 'Email mismatch. Please request a new passcode.',
    code_mismatch: 'Invalid passcode.',
    expired: 'Passcode has expired. Please request a new passcode.',
    exceed_max_try: 'Passcode verification limitation exceeded. Please request a new passcode.',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use:
      'Empty "Terms of use" content URL. Please add the content URL if "Terms of use" is enabled.',
    empty_slogan:
      'Empty branding slogan. Please add a branding slogan if a UI style containing the slogan is selected.',
    empty_social_connectors:
      'Empty social connectors. Please add enabled social connectors when the social sign-in method is enabled.',
    enabled_connector_not_found: 'Enabled {{type}} connector not found.',
    not_one_and_only_one_primary_sign_in_method:
      'There must be one and only one primary sign-in method. Please check your input.',
  },
  swagger: {
    invalid_zod_type: 'Invalid Zod type. Please check route guard config.',
    not_supported_zod_type_for_params:
      'Not supported Zod type for the parameters. Please check route guard config.',
  },
  entity: {
    create_failed: 'Failed to create {{name}}.',
    not_exists: 'The {{name}} does not exist.',
    not_exists_with_id: 'The {{name}} with ID `{{id}}` does not exist.',
    not_found: 'The resource does not exist.',
  },
};

const en = Object.freeze({
  translation,
  errors,
});

export default en;
/* eslint-enable max-lines */
