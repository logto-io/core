const webhook_details = {
  page_title: 'Данные вебхука',
  back_to_webhooks: 'Вернуться к вебхукам',
  not_in_use: 'Не используется',
  success_rate: 'Коэффициент успешности',
  requests: '{{value, number}} запросов за 24 часа',
  disable_webhook: 'Отключить вебхук',
  disable_reminder:
    'Вы уверены, что хотите включить этот вебхук? Это не приведет к отправке HTTP-запроса на URL-адрес точки доступа.',
  webhook_disabled: 'Вебхук был отключен.',
  webhook_reactivated: 'Вебхук был перезапущен.',
  reactivate_webhook: 'Перезапустить вебхук',
  delete_webhook: 'Удалить вебхук',
  deletion_reminder:
    'Вы удаляете этот вебхук. После удаления он не будет отправлять HTTP-запрос на URL-адрес точки доступа.',
  deleted: 'Вебхук был успешно удален.',
  settings_tab: 'Настройки',
  recent_requests_tab: 'Недавние запросы (за 24ч)',
  settings: {
    settings: 'Настройки',
    settings_description:
      'Вебхуки позволяют получать обновления в режиме реального времени по конкретным событиям по мере их возникновения, отправляя POST-запрос на ваш URL-адрес точки доступа. Это позволяет вам немедленно выполнять действия на основе новой информации.',
    events: 'События',
    events_description: 'Выберите события триггеров, которые Logto будет отправлять POST-запрос.',
    name: 'Имя',
    endpoint_url: 'URL-адрес точки доступа',
    signing_key: 'Ключ подписи',
    signing_key_tip:
      'Добавьте секретный ключ, предоставленный Logto, к своей конечной точке в виде заголовка запроса, чтобы обеспечить подлинность нагрузки вебхука.',
    regenerate: 'Регенерировать',
    regenerate_key_title: 'Регенерировать ключ подписи',
    regenerate_key_reminder:
      'Вы уверены, что хотите изменить ключ подписи? Регенерация приведет к немедленному вступлению в силу. Пожалуйста, не забудьте синхронно изменить ключ подписи в своей конечной точке.',
    regenerated: 'Ключ подписи был обновлен.',
    custom_headers: 'Пользовательские заголовки',
    custom_headers_tip:
      'При желании вы можете добавлять пользовательские заголовки к нагрузке вебхука, чтобы предоставить дополнительный контекст или метаданные о событии.',
    key_duplicated_error: 'Ключи не могут повторяться.',
    key_missing_error: 'Ключ обязателен.',
    value_missing_error: 'Значение обязательно',
    invalid_key_error: 'Ключ недействителен',
    invalid_value_error: 'Значение недействительно',
    test: 'Тестирование',
    test_webhook: 'Протестировать ваш вебхук',
    test_webhook_description:
      'Настройте вебхук и протестируйте его с примерами нагрузки для каждого выбранного события, чтобы проверить правильный прием и обработку.',
    send_test_payload: 'Отправить тестовую нагрузку',
    test_result: {
      endpoint_url: 'URL конечной точки: {{url}}',
      message: 'Сообщение: {{message}}',
      response_status: 'Статус ответа: {{status, number}}',
      response_body: 'Тело ответа: {{body}}',
      request_time: 'Время запроса: {{time}}',
      test_success: 'Тест вебхука на конечную точку прошел успешно.',
    },
  },
};

export default Object.freeze(webhook_details);
