const quota_item = {
  tenant_limit: {
    name: 'Kiracilar',
    limited: '{{count, number}} kiracı',
    limited_other: '{{count, number}} kiracılar',
    unlimited: 'Sınırsız kiracılar',
    not_eligible: 'Kiracılarınızı kaldırın',
  },
  mau_limit: {
    name: 'Aylık aktif kullanıcılar',
    limited: '{{count, number}} MAU',
    unlimited: 'Sınırsız MAU',
    not_eligible: 'Tüm kullanıcılarınızı kaldırın',
  },
  token_limit: {
    /** UNTRANSLATED */
    name: 'Tokens',
    /** UNTRANSLATED */
    limited: '{{count, number}} token',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} tokens',
    /** UNTRANSLATED */
    unlimited: 'Unlimited tokens',
    /** UNTRANSLATED */
    not_eligible: 'Remove your all users to prevent new tokens',
  },
  applications_limit: {
    name: 'Uygulamalar',
    limited: '{{count, number}} uygulama',
    limited_other: '{{count, number}} uygulamalar',
    unlimited: 'Sınırsız uygulamalar',
    not_eligible: 'Uygulamalarınızı kaldırın',
  },
  machine_to_machine_limit: {
    name: 'Makineye Makine',
    limited: '{{count, number}} makineye makine uygulama',
    limited_other: '{{count, number}} makineye makine uygulamalar',
    unlimited: 'Sınırsız makineye makine uygulamalar',
    not_eligible: 'Makineye makine uygulamalarınızı kaldırın',
  },
  resources_limit: {
    name: 'API kaynakları',
    limited: '{{count, number}} API kaynak',
    limited_other: '{{count, number}} API kaynakları',
    unlimited: 'Sınırsız API kaynakları',
    not_eligible: 'API kaynaklarınızı kaldırın',
  },
  scopes_per_resource_limit: {
    name: 'Kaynak izinleri',
    limited: '{{count, number}} izin kaynak başına',
    limited_other: '{{count, number}} izinler kaynak başına',
    unlimited: 'Sınırsız izin kaynak başına',
    not_eligible: 'Kaynak izinlerinizi kaldırın',
  },
  custom_domain_enabled: {
    name: 'Özel alan adı',
    limited: 'Özel alan adı',
    unlimited: 'Özel alan adı',
    not_eligible: 'Özel alan adınızı kaldırın',
  },
  omni_sign_in_enabled: {
    name: 'Omni oturumu aç',
    limited: 'Omni oturumu aç',
    unlimited: 'Omni oturumu aç',
    not_eligible: 'Omni oturumunu devre dışı bırakın',
  },
  built_in_email_connector_enabled: {
    name: 'Dahili e-posta bağlayıcı',
    limited: 'Dahili e-posta bağlayıcı',
    unlimited: 'Dahili e-posta bağlayıcı',
    not_eligible: 'Dahili e-posta bağlayıcınızı kaldırın',
  },
  social_connectors_limit: {
    name: 'Sosyal bağlayıcılar',
    limited: '{{count, number}} sosyal bağlayıcı',
    limited_other: '{{count, number}} sosyal bağlayıcılar',
    unlimited: 'Sınırsız sosyal bağlayıcılar',
    not_eligible: 'Sosyal bağlayıcılarınızı kaldırın',
  },
  standard_connectors_limit: {
    name: 'Ücretsiz standart bağlayıcılar',
    limited: '{{count, number}} ücretsiz standart bağlayıcı',
    limited_other: '{{count, number}} ücretsiz standart bağlayıcılar',
    unlimited: 'Sınırsız standart bağlayıcılar',
    not_eligible: 'Standart bağlayıcılarınızı kaldırın',
  },
  roles_limit: {
    name: 'Roller',
    limited: '{{count, number}} rol',
    limited_other: '{{count, number}} roller',
    unlimited: 'Sınırsız roller',
    not_eligible: 'Rollerinizi kaldırın',
  },
  machine_to_machine_roles_limit: {
    /** UNTRANSLATED */
    name: 'Machine to machine roles',
    /** UNTRANSLATED */
    limited: '{{count, number}} machine to machine role',
    /** UNTRANSLATED */
    limited_other: '{{count, number}} machine to machine roles',
    /** UNTRANSLATED */
    unlimited: 'Unlimited machine to machine roles',
    /** UNTRANSLATED */
    not_eligible: 'Remove your machine to machine roles',
  },
  scopes_per_role_limit: {
    name: 'Rol izinleri',
    limited: '{{count, number}} izin rol başına',
    limited_other: '{{count, number}} izinler rol başına',
    unlimited: 'Sınırsız izin rol başına',
    not_eligible: 'Rol izinlerinizi kaldırın',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}} webhook',
    limited_other: '{{count, number}} webhooks',
    unlimited: 'Sınırsız webhooklar',
    not_eligible: 'Webhooklarınızı kaldırın',
  },
  organizations_enabled: {
    /** UNTRANSLATED */
    name: 'Organizations',
    /** UNTRANSLATED */
    limited: 'Organizations',
    /** UNTRANSLATED */
    unlimited: 'Organizations',
    /** UNTRANSLATED */
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: 'Denetim günlükleri saklama süresi',
    limited: 'Denetim günlükleri saklama süresi: {{count, number}} gün',
    limited_other: 'Denetim günlükleri saklama süresi: {{count, number}} gün',
    unlimited: 'Sınırsız günler',
    not_eligible: 'Denetim günlüğünüz yok',
  },
  community_support_enabled: {
    name: 'Topluluk desteği',
    limited: 'Topluluk desteği',
    unlimited: 'Topluluk desteği',
    not_eligible: 'Topluluk desteği yok',
  },
  customer_ticket_support: {
    name: 'Müşteri destek bileti',
    limited: '{{count, number}} saat müşteri destek bileti',
    limited_other: '{{count, number}} saat müşteri destek bileti',
    unlimited: 'Müşteri destek bileti',
    not_eligible: 'Müşteri destek bileti yok',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: "MFA'nızı devre dışı bırakın",
  },
  sso_enabled: {
    name: 'Kurumsal SSO',
    limited: 'Kurumsal SSO',
    unlimited: 'Kurumsal SSO',
    not_eligible: "Kurumsal SSO'nuzu devre dışı bırakın",
  },
};

export default Object.freeze(quota_item);
