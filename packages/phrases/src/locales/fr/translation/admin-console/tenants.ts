const tenants = {
  create_modal: {
    title: 'Créer un locataire',
    subtitle: 'Créez un nouveau locataire pour séparer les ressources et les utilisateurs.',
    create_button: 'Créer un locataire',
    tenant_name: 'Nom du locataire',
    tenant_name_placeholder: 'Mon locataire',
    environment_tag: 'Balise environnement',
    environment_tag_description:
      "Utilisez des balises pour différencier les environnements d'utilisation des locataires. Les services dans chaque balise sont identiques, assurant ainsi la cohérence.",
    environment_tag_development: 'Développement',
    environment_tag_staging: 'Mise en scène',
    environment_tag_production: 'Production',
  },
  delete_modal: {
    title: 'Supprimer le locataire',
    description_line1:
      'Voulez-vous vraiment supprimer votre locataire "<span>{{name}}</span>" avec le tag de suffixe d\'environnement "<span>{{tag}}</span>" ? Cette action est irréversible et entraînera la suppression permanente de toutes vos données et informations de compte.',
    description_line2:
      'Avant de supprimer le compte, peut-être pouvons-nous vous aider. <span><a>Contactez-nous par e-mail</a></span>',
    description_line3:
      'Si vous souhaitez continuer, veuillez entrer le nom du locataire "<span>{{name}}</span>" pour confirmer.',
    delete_button: 'Supprimer définitivement',
  },
  tenant_created: "Locataire '{{name}}' créé avec succès.",
};

export default tenants;
