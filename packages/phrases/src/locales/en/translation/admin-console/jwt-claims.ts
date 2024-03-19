const jwt_claims = {
  title: 'JWT claims',
  description:
    'Set up custom JWT claims to include in the access token. These claims can be used to pass additional information to your application.',
  user_jwt_tab: 'User JWT',
  machine_to_machine_jwt_tab: 'Machine-to-machine JWT',
  user_jwt: 'user JWT',
  machine_to_machine_jwt: 'machine-to-machine JWT',
  code_editor_title: 'Customize the {{token}} claims',
  clear: 'Clear',
  cleared: 'Cleared',
  restore: 'Restore defaults',
  restored: 'Restored',
  data_source_tab: 'Data source',
  test_tab: 'Test claim',
  jwt_claims_description:
    'Handler that will be called during the access token generation process to add custom claims to the token. The function should return an object with the custom claims.',
  user_data: {
    title: 'User data',
    subtitle:
      'Input parameter `data.user`, providing essential user information linked to the present access token.',
  },
  token_data: {
    title: 'Token data',
    subtitle:
      'Input parameter `token`, providing the payload of the current access token for contextual reference.',
  },
  fetch_external_data: {
    title: 'Fetch external data',
    subtitle: 'Incorporate data sources from your external APIs directly into your custom claims.',
    description:
      'Use the `fetch` function to call your external APIs and include the data in your custom claims. Example: ',
  },
  environment_variables: {
    title: 'Set environment variables',
    subtitle:
      'Use environment variables to store sensitive information and access them in your custom claims handler.',
    input_field_title: 'Add environment variables',
    sample_code: 'Accessing environment variables in your custom JWT claims handler. Example: ',
  },
  jwt_claims_hint:
    'Limit custom claims to under 50KB. Default JWT claims are automatically included in the token and can not be overridden.',
  tester: {
    title: 'Test',
    subtitle: "Edit the context to adjust the token's request states and test your custom claims.",
    run_button: 'Run',
    result_title: 'Test result',
  },
  form_error: {
    invalid_json: 'Invalid JSON format',
  },
};

export default Object.freeze(jwt_claims);
