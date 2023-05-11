const webhook_details = {
  page_title: 'Webhook details',
  back_to_webhooks: 'Back to Webhooks',
  not_in_use: 'Not in use',
  success_rate: '{{value, number}} success rate',
  requests: '{{value, number}} requests in 24h',
  disable_webhook: 'Disable webhook',
  disable_reminder:
    'Are you sure you want to reactivate this webhook? Doing so will not send HTTP request to endpoint URL.',
  webhook_disabled: 'The webhook has been disabled.',
  webhook_reactivated: 'The webhook has been reactivated.',
  reactivate_webhook: 'Reactivate webhook',
  delete_webhook: 'Delete webhook',
  deletion_reminder:
    'You are removing this webhook. After deleting it will not send HTTP request to endpoint URL.',
  deleted: 'The webhook has been successfully deleted.',
  settings_tab: 'Settings',
  recent_requests_tab: 'Recent requests',
  settings: {
    settings: 'Settings',
    settings_description:
      'Webhooks allow you to receive real-time updates on specific events as they happen, by sending a POST request to your endpoint URL. This enables you to take immediate actions based on the new information received.',
    events: 'Events',
    events_description: 'Select the trigger events which Logto will send the POST request.',
    name: 'Name',
    endpoint_url: 'Endpoint URL',
    endpoint_url_tip:
      'Enter the HTTPS URL of your endpoint where a webhook’s payload is sent to when the event occurs.',
    signing_key: 'Signing key',
    signing_key_tip:
      'Add the secret key provided by Logto to your endpoint as a request header to ensure the authenticity of the webhook’s payload.',
    regenerate: 'Regenerate',
    regenerate_key_title: 'Regenerate signing key',
    regenerate_key_reminder:
      'Are you sure you want to modify the signing key? Regenerating it will take effect immediately. Please remember to modify the signing key synchronously in your endpoint.',
    regenerated: 'Signing key has been regenerated.',
    custom_headers: 'Custom headers',
    custom_headers_tip:
      'Optionally, you can add custom headers to the webhook’s payload to provide additional context or metadata about the event.',
    key_duplicated_error: 'Keys cannot be repeated.',
    key_missing_error: 'Key is required',
    value_missing_error: 'Value is required',
    test: 'Test',
    test_webhook: 'Test your webhook',
    test_webhook_description:
      'Please finish configuring the webhook above. Click the test button, and we will send individual payload examples of each selected event to your endpoint URL. This will allow you to verify that your endpoint is correctly receiving and processing the payloads.',
    send_test_payload: 'Send test payload',
    test_payload_sent: 'The payload has been sent successfully!',
  },
};

export default webhook_details;
