const webhook_details = {
  page_title: 'Данные вебхука',
  back_to_webhooks: 'Вернуться к вебхукам',
  not_in_use: 'Не используется',
  success_rate: 'Коэффициент успешности {{value, number}}',
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
    endpoint_url_tip:
      'Введите HTTPS-URL вашей конечной точки, куда будет отправляться нагрузка вебхука при возникновении события.',
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
    test: 'Тестирование',
    test_webhook: 'Протестировать ваш вебхук',
    test_webhook_description:
      'Пожалуйста, завершите настройку вебхука выше. Нажмите кнопку тестирования, и мы отправим индивидуальные примеры нагрузки каждого выбранного события на ваш URL-адрес точки доступа. Это позволит вам проверить, что ваш URL-адрес точки доступа правильно принимает и обрабатывает нагрузку.',
    send_test_payload: 'Отправить тестовую нагрузку',
    test_payload_sent: 'Нагрузка успешно отправлена!',
  },
};

export default webhook_details;
