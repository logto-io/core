const webhook_details = {
  page_title: 'Détails du webhook',
  back_to_webhooks: 'Retour aux webhooks',
  not_in_use: "Pas en cours d'utilisation",
  success_rate: 'Taux de réussite',
  requests: '{{value, number}} requêtes en 24h',
  disable_webhook: 'Désactiver le webhook',
  disable_reminder:
    "Êtes-vous sûr de vouloir réactiver ce webhook? Ceci n'enverra pas de requête HTTP à l'URL de l'endpoint.",
  webhook_disabled: 'Le webhook a été désactivé.',
  webhook_reactivated: 'Le webhook a été réactivé.',
  reactivate_webhook: 'Réactiver le webhook',
  delete_webhook: 'Supprimer le webhook',
  deletion_reminder:
    "Vous êtes en train de supprimer ce webhook. Après suppression, il n'enverra plus de requête HTTP à l'endpoint URL.",
  deleted: 'Le webhook a été supprimé avec succès.',
  settings_tab: 'Paramètres',
  recent_requests_tab: 'Demandes récentes (24 h)',
  settings: {
    settings: 'Paramètres',
    settings_description:
      "Les webhooks vous permettent de recevoir des mises à jour en temps réel sur des événements spécifiques, en envoyant une requête POST à l'URL de votre endpoint. Cela vous permet de prendre des actions immédiatement en fonction des nouvelles informations reçues.",
    events: 'Événements',
    events_description:
      'Sélectionnez les événements déclencheurs que Logto enverra la requête POST.',
    name: 'Nom',
    endpoint_url: "URL de l'endpoint",
    endpoint_url_tip:
      "Entrez l'URL HTTPS de votre endpoint où la charge utile d'un webhook est envoyée lorsque l'événement se produit.",
    signing_key: 'Clé de signature',
    signing_key_tip:
      "Ajoutez la clé secrète fournie par Logto à votre endpoint en tant qu'en-tête de requête pour garantir l'authenticité de la charge utile du webhook.",
    regenerate: 'Régénérer',
    regenerate_key_title: 'Régénérer la clé de signature',
    regenerate_key_reminder:
      "Êtes-vous sûr de vouloir modifier la clé de signature? La régénération sera effective immédiatement. N'oubliez pas de modifier la clé de signature synchroniquement dans votre endpoint.",
    regenerated: 'La clé de signature a été régénérée.',
    custom_headers: 'En-têtes personnalisés',
    custom_headers_tip:
      "Optionnellement, vous pouvez ajouter des en-têtes personnalisés à la charge utile du webhook pour fournir un contexte ou des métadonnées supplémentaires sur l'événement.",
    key_duplicated_error: 'Les clés ne peuvent pas se répéter.',
    key_missing_error: 'La clé est requise.',
    value_missing_error: 'La valeur est requise.',
    test: 'Tester',
    test_webhook: 'Tester votre webhook',
    test_webhook_description:
      "Veuillez finir de configurer le webhook ci-dessus. Cliquez sur le bouton de test, et nous enverrons des exemples de charge utile individuels de chaque événement sélectionné à votre URL d'endpoint. Cela vous permettra de vérifier que votre endpoint reçoit et traite correctement les charges utiles.",
    send_test_payload: 'Envoyer une charge utile de test',
    test_payload_sent: 'La charge utile a été envoyée avec succès!',
  },
};

export default webhook_details;
