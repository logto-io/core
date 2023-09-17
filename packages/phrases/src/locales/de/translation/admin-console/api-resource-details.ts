const api_resource_details = {
  /** UNTRANSLATED */
  management_api_notice:
    'This API represents Logto entity and can not be modified or deleted. You can use management API for a wide range of identity-related tasks. <a>{{link}}</a>',
  /** UNTRANSLATED */
  management_api_notice_link_text: 'Learn more',
  page_title: 'API Ressourcendetails',
  back_to_api_resources: 'Zurück zu API Ressourcen',
  settings_tab: 'Einstellungen',
  permissions_tab: 'Berechtigungen',
  settings: 'Einstellungen',
  settings_description:
    'API-Ressourcen, auch Ressourcenindikatoren genannt, geben die Ziel-Dienste oder Ressourcen an, die angefordert werden sollen. Häufig handelt es sich um eine URI-Formatvariable, die die Identität der Ressource darstellt.',
  management_api_settings_description:
    'Die Logto Management-API ist eine umfassende Sammlung von APIs, die Administratoren befähigen, eine Vielzahl von Aufgaben im Zusammenhang mit Identitäten zu verwalten, Sicherheitsrichtlinien durchzusetzen und Vorschriften und Standards einzuhalten.',
  token_expiration_time_in_seconds: 'Token-Ablaufzeit (in Sekunden)',
  token_expiration_time_in_seconds_placeholder: 'Gib die Ablaufzeit des Tokens ein',
  delete_description:
    'Diese Aktion kann nicht rückgängig gemacht werden. Die API-Ressource wird permanent gelöscht. Bitte gib den API-Ressourcennamen <span>{{name}}</span> zur Bestätigung ein.',
  enter_your_api_resource_name: 'Gib einen API-Ressourcennamen ein',
  api_resource_deleted: 'Die API-Ressource {{name}} wurde erfolgreich gelöscht',
  permission: {
    create_button: 'Berechtigung erstellen',
    create_title: 'Berechtigung erstellen',
    create_subtitle: 'Definieren Sie die benötigten Berechtigungen (Bereiche) für diese API.',
    confirm_create: 'Berechtigung erstellen',
    name: 'Berechtigungsname',
    name_placeholder: 'read:resource',
    forbidden_space_in_name: 'Der Berechtigungsname darf keine Leerzeichen enthalten.',
    description: 'Beschreibung',
    description_placeholder: 'Zugriff auf Ressourcen lesen',
    permission_created: 'Die Berechtigung {{name}} wurde erfolgreich erstellt',
    delete_description:
      'Wenn diese Berechtigung gelöscht wird, verliert der Benutzer, der diese Berechtigung hatte, den dadurch gewährten Zugriff.',
    deleted: 'Die Berechtigung "{{name}}" wurde erfolgreich gelöscht.',
  },
};

export default Object.freeze(api_resource_details);
