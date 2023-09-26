const application_details = {
  page_title: 'Application details',
  back_to_applications: 'Back to Applications',
  check_guide: 'Check Guide',
  settings: 'Settings',
  settings_description:
    'Applications are used to identify your applications in Logto for OIDC, sign-in experience, audit logs, etc.',
  advanced_settings: 'Advanced Settings',
  advanced_settings_description:
    'Advanced settings include OIDC related terms. You can check out the Token Endpoint for more information.',
  /** UNTRANSLATED */
  application_roles: 'Roles',
  /** UNTRANSLATED */
  machine_logs: 'Machine logs',
  application_name: 'Application name',
  application_name_placeholder: 'My App',
  description: 'Description',
  description_placeholder: 'Enter your application description',
  config_endpoint: 'OpenID Provider configuration endpoint',
  authorization_endpoint: 'Authorization Endpoint',
  authorization_endpoint_tip:
    "The endpoint to perform authentication and authorization. It's used for OpenID Connect <a>Authentication</a>.",
  logto_endpoint: 'Logto endpoint',
  application_id: 'App ID',
  application_id_tip:
    'The unique application identifier normally generated by Logto. It also stands for “<a>client_id</a>” in OpenID Connect.',
  application_secret: 'App Secret',
  redirect_uri: 'Redirect URI',
  redirect_uris: 'Redirect URIs',
  redirect_uri_placeholder: 'https://your.website.com/app',
  redirect_uri_placeholder_native: 'io.logto://callback',
  redirect_uri_tip:
    'The URI redirects after a user sign-in (whether successful or not). See OpenID Connect <a>AuthRequest</a> for more info.',
  post_sign_out_redirect_uri: 'Post Sign-out Redirect URI',
  post_sign_out_redirect_uris: 'Post Sign-out Redirect URIs',
  post_sign_out_redirect_uri_placeholder: 'https://your.website.com/home',
  post_sign_out_redirect_uri_tip:
    'The URI redirects after a user sign-out (optional). It may have no practical effect in some app types.',
  cors_allowed_origins: 'CORS allowed origins',
  cors_allowed_origins_placeholder: 'https://your.website.com',
  cors_allowed_origins_tip:
    'By default, all the origins of Redirect URIs will be allowed. Usually no action is required for this field. See the <a>MDN doc</a> for detailed info.',
  token_endpoint: 'Token Endpoint',
  user_info_endpoint: 'Userinfo Endpoint',
  enable_admin_access: 'Enable admin access',
  enable_admin_access_label:
    'Enable or disable the access to Management API. Once enabled, you can use access tokens to call Management API on behalf on this application.',
  always_issue_refresh_token: 'Always issue Refresh Token',
  always_issue_refresh_token_label:
    'When enabled, Logto will always issue Refresh Tokens, regardless of whether `prompt=consent` is presented in the authentication request. However, this practice is discouraged unless necessary, as it is not compatible with OpenID Connect and may potentially cause issues.',
  refresh_token_ttl: 'Refresh Token Time to Live (TTL) in days',
  refresh_token_ttl_tip:
    'The duration for which a Refresh Token can be used to request new access tokens before it expires and becomes invalid. Token requests will extend the TTL of the Refresh Token to this value.',
  rotate_refresh_token: 'Rotate Refresh Token',
  rotate_refresh_token_label:
    'When enabled, Logto will issue a new Refresh Token for token requests when 70% of the original Time to Live (TTL) has passed or certain conditions are met. <a>Learn more</a>',
  delete_description:
    'This action cannot be undone. It will permanently delete the application. Please enter the application name <span>{{name}}</span> to confirm.',
  enter_your_application_name: 'Enter your application name',
  application_deleted: 'Application {{name}} has been successfully deleted',
  redirect_uri_required: 'You must enter at least one redirect URI',
  roles: {
    /** UNTRANSLATED */
    name_column: 'Role',
    /** UNTRANSLATED */
    description_column: 'Description',
    /** UNTRANSLATED */
    assign_button: 'Assign Roles',
    /** UNTRANSLATED */
    delete_description:
      'This action will remove this role from this user. The role itself will still exist, but it will no longer be associated with this user.',
    /** UNTRANSLATED */
    deleted: '{{name}} was successfully removed from this user.',
    /** UNTRANSLATED */
    assign_title: 'Assign roles to {{name}}',
    /** UNTRANSLATED */
    assign_subtitle: 'Authorize {{name}} one or more roles',
    /** UNTRANSLATED */
    assign_role_field: 'Assign roles',
    /** UNTRANSLATED */
    role_search_placeholder: 'Search by role name',
    /** UNTRANSLATED */
    added_text: '{{value, number}} added',
    /** UNTRANSLATED */
    assigned_app_count: '{{value, number}} applications',
    /** UNTRANSLATED */
    confirm_assign: 'Assign roles',
    /** UNTRANSLATED */
    role_assigned: 'Successfully assigned role(s)',
    /** UNTRANSLATED */
    search: 'Search by role name, description or ID',
    /** UNTRANSLATED */
    empty: 'No role available',
  },
};

export default Object.freeze(application_details);
