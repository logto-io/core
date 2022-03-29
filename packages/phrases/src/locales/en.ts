const translation = {
  general: {
    placeholder: 'Placeholder',
    add_another: '+ Add Another',
    skip: 'Skip',
    next: 'Next',
    retry: 'Try again',
    confirm: 'Confirm',
    cancel: 'Cancel',
    done: 'Done',
  },
  sign_in: {
    action: 'Sign In',
    loading: 'Signing in...',
    error: 'Username or password is invalid.',
    username: 'Username',
    password: 'Password',
    terms_of_use: 'Terms of Use',
    terms_agreement_prefix: 'I agree with ',
    continue_with: 'Continue With',
    forgot_password: 'Forgot Password?',
  },
  register: {
    create_account: 'Create an Account',
    action: 'Create',
    loading: 'Creating Account...',
    have_account: 'Already have an account?',
  },
  admin_console: {
    title: 'Admin Console',
    copy: {
      pending: 'Copy',
      copying: 'Copying',
      copied: 'Copied',
    },
    form: {
      required: 'Required',
    },
    errors: {
      something_went_wrong: 'Oops! Something went wrong',
      unknown_server_error: 'Unknown server error occurred.',
      empty: 'No Data',
      missing_total_number: 'Unable to find Total-Number in response headers.',
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
      community_support: 'Community Support',
      settings: 'Settings',
    },
    applications: {
      title: 'Applications',
      subtitle:
        'Setup a mobile, single page or traditional application to use Logto for authentication.',
      create: 'Create Application',
      application_name: 'Application Name',
      application_description: 'Application Description',
      select_application_type: 'Select an Application Type',
      no_application_type_selected: 'You have to select an application type to proceed.',
      application_created:
        'The application {{name}} has been successfully created! \nNow finish your application settings.',
      client_id: 'Client ID',
      type: {
        native: {
          title: 'Native App',
          subtitle: 'Mobile, desktop, CLI and smart device apps running natively.',
          description: 'E.g.: iOS, Electron, Apple TV apps',
        },
        spa: {
          title: 'Single Page App',
          subtitle: 'A JavaScript front-end app that uses an API.',
          description: 'E.g.: Angular, React, Vue',
        },
        traditional: {
          title: 'Traditional Web',
          subtitle: 'Traditional web app using redirects.',
          description: 'E.g.: Node.js, Express, ASP.NET, Java, PHP',
        },
      },
      get_started: {
        header_description:
          'Follow a step by step guide to integrate your application or get a sample configured with your account settings',
        get_sample_file: 'Get a sample file',
        title: 'Congratulations! The application has been created successfully.',
        subtitle:
          'Now follow the steps below to finish your app settings. Please select the JS library to continue.',
        description_by_library:
          'This quickstart demonstrates how to add Logto to {{library}} application.',
      },
    },
    application_details: {
      back_to_applications: 'Back to Applications',
      check_help_guide: 'Check Help Guide',
      settings: 'Settings',
      advanced_settings: 'Advanced Settings',
      application_name: 'Application Name',
      description: 'Description',
      authorization_endpoint: 'Authorization Endpiont',
      redirect_uri: 'Redirect URI',
      post_sign_out_redirect_uri: 'Post Sign Out Redirect URI',
      add_another: 'Add another',
      id_token_expiration: 'ID Token Expiration',
      refresh_token_expiration: 'Refresh Token Expiration',
      token_endpoint: 'Token Endpoint',
      user_info_endpoint: 'User Info Endpoint',
      save_changes: 'Save Changes',
      more_options: 'More Options',
      options_delete: 'Delete',
      reminder: 'Reminder',
      delete_description:
        'This action cannot be undone. This will permanently delete the this application. Please enter the application name <span>{{name}}</span> to proceed.',
      enter_your_application_name: 'Enter your application name',
      cancel: 'Cancel',
      delete: 'Delete',
      application_deleted: 'The application {{name}} deleted.',
      save_success: 'Saved!',
      redirect_uri_required: 'You have to enter at least one redirect URI.',
      no_space_in_uri: 'Sapce is not allowed in URI',
    },
    api_resources: {
      title: 'API Resources',
      subtitle: 'Define APIs that you can consume from your authorized applications.',
      create: 'Create API Resource',
      api_name: 'API Name',
      api_identifier: 'API Identifier',
      api_resource_created: 'The API resource {{name}} has been successfully created!',
    },
    api_resource_details: {
      back_to_api_resources: 'Back to my API resources',
      check_help_guide: 'Check Help Guide',
      more_options: 'More Options',
      options_delete: 'Delete',
      settings: 'Settings',
      save_changes: 'Save Changes',
      token_expiration_time_in_seconds: 'Token Expiration Time (in seconds)',
      reminder: 'Reminder',
      delete_description:
        'This action cannot be undone. This will permanently delete the this API resource. Please enter the api resource name <span>{{name}}</span> to proceed.',
      enter_your_api_resource_name: 'Enter your API resource name',
      cancel: 'Cancel',
      delete: 'Delete',
      api_resource_deleted: 'The API Resource {{name}} deleted.',
      save_success: 'Saved!',
    },
    connectors: {
      title: 'Connectors',
      subtitle: 'Setup connectors to enable passwordless and social sign in experience.',
      create: 'Add social connector',
      set_up: 'Set Up',
      tab_email_sms: 'Email and SMS connectors',
      tab_social: 'Social connectors',
      connector_name: 'Connector Name',
      connector_type: 'Type',
      connector_status: 'Status',
      connector_status_enabled: 'Enabled',
      connector_status_disabled: 'Disabled',
      social_connector_eg: 'e.g.: Google, Facebook, Twitter',
      next: 'Next',
      type: {
        email: 'Email Sender',
        sms: 'SMS Sender',
        social: 'Social',
      },
      setup_title: {
        email: 'Setup email sender',
        sms: 'Setup SMS sender',
        social: 'Add social connector',
      },
    },
    connector_details: {
      back_to_connectors: 'Back to Connectors',
      check_readme: 'Check README',
      tab_settings: 'Settings',
      save_changes: 'Save Changes',
      save_error_empty_config: 'Please enter config.',
      save_error_json_parse_error: 'Please enter valid JSON.',
      save_success: 'Saved!',
      send: 'Send',
      send_error_invalid_format: 'Invalid input',
      test_email_sender: 'Test your email sender',
      test_sms_sender: 'Test your SMS sender',
      test_message_sent: 'Test Message Sent!',
      test_sender_description: 'Test sender description',
      options: 'Options',
      options_delete: 'Delete',
      options_change_email: 'Change email connector',
      options_change_sms: 'Change SMS connector',
      more_options: 'MORE OPTIONS',
      connector_deleted: 'The connector has been deleted.',
    },
    users: {
      title: 'User Management',
      subtitle:
        'The tab for managing users, creating a new user, and editing user profiles. Every registered user can be found here.',
      create: 'Add user',
      user_name: 'User',
      application_name: 'Apps',
      latest_sign_in: 'Latest sign in',
      create_form_username: 'Username',
      create_form_password: 'Password',
      create_form_name: 'Full name',
    },
    user_details: {
      back_to_users: 'Back to user management',
      created_title: 'Congratulations! This user has been created.',
      created_guide: 'Now send this following information.',
      created_username: 'User username:',
      created_password: 'Initial password:',
      created_button_close: 'Close',
      created_button_copy: 'Copy',
      more_options: 'MORE OPTIONS',
      menu_delete: 'Delete',
      delete_title: 'Reminder',
      delete_description: 'This action cannot be undone. This will delete the user.',
      delete_cancel: 'Cancel',
      delete_confirm: 'Delete',
      deleted: 'User deleted.',
      reset_password: {
        title: 'Reset Password',
        label: 'New password:',
        reset_password: 'Reset password',
        reset_password_success: 'Reset password successfully.',
      },
      tab_settings: 'Settings',
      tab_logs: 'User Logs',
      field_email: 'Primary Email',
      field_phone: 'Primary Phone',
      field_username: 'Username',
      field_name: 'Name',
      field_avatar: 'Avatar image URL',
      field_roles: 'Roles',
      field_custom_data: 'Custom data',
      field_connectors: 'Social Connectors',
      custom_data_invalid: 'Custom data must be a valid JSON',
      save_changes: 'Save changes',
      saved: 'Saved!',
      connectors: {
        connectors: 'Connectors',
        user_id: 'User ID',
        remove: 'remove',
        not_connected: 'The user is not connected to any social connector.',
      },
    },
  },
};

const errors = {
  auth: {
    authorization_header_missing: 'Authorization header is missing.',
    authorization_token_type_not_supported: 'Authorization type is not supported.',
    unauthorized: 'Unauthorized. Please check credentials and its scope.',
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
    unsupported_prompt_name: 'Unsupported prompt name',
  },
  connector: {
    general: 'An unexpected error occurred in connector.',
    not_found: 'Cannot find any available connector for type: {{type}}.',
    not_enabled: 'The connector is not enabled.',
    invalid_config: "The connector's config is invalid.",
    template_not_found: 'Unable to find correct template in connector config.',
    access_token_invalid: "Connector's access token is invalid.",
    oauth_code_invalid: 'Unable to get access token, please check authorization code.',
    more_than_one_sms: 'The number of SMS connectors is larger then 1.',
    more_than_one_email: 'The number of Email connectors is larger then 1.',
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
  swagger: {
    invalid_zod_type: 'Invalid Zod type, please check route guard config.',
  },
  entity: {
    create_failed: 'Failed to create {{name}}.',
    not_exists: 'The {{name}} does not exist.',
    not_exists_with_id: 'The {{name}} with ID `{{id}}` does not exist.',
    not_found: 'The resource does not exist',
  },
  form: {
    required: 'Please enter the {{ fieldName }}',
    terms_required: 'Please check & agree the Terms',
  },
};

const en = Object.freeze({
  translation,
  errors,
});

export default en;
