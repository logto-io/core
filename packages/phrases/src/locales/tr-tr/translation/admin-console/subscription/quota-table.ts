const quota_table = {
  quota: {
    title: 'Temel',
    base_price: 'Temel fiyat',
    mau_limit: 'MAU limiti',
    included_tokens: 'Dahil olan jetonlar',
  },
  application: {
    title: 'Uygulamalar',
    total: 'Toplam uygulama sayısı',
    m2m: 'Makine-makine uygulamaları',
  },
  resource: {
    title: 'API Kaynakları',
    resource_count: 'Kaynak sayısı',
    scopes_per_resource: 'Kaynak başına izinler',
  },
  branding: {
    title: 'Kullanıcı Arayüzü ve Markalama',
    custom_domain: 'Özel alan adı',
    custom_css: 'Özel CSS',
    app_logo_and_favicon: 'Uygulama logoları ve favicon',
    dark_mode: 'Karanlık mod',
    i18n: 'Uluslararasılaştırma',
  },
  user_authn: {
    title: 'Kullanıcı Kimlik Doğrulama',
    omni_sign_in: 'Çoklu oturum açma',
    password: 'Parola',
    passwordless: 'Parolasız - E-posta ve SMS',
    email_connector: 'E-posta bağlayıcı',
    sms_connector: 'SMS bağlayıcı',
    social_connectors: 'Sosyal bağlayıcılar',
    standard_connectors: 'Standart bağlayıcılar',
    built_in_email_connector: 'Dahili e-posta bağlayıcısı',
    mfa: 'Çoklu faktörlü kimlik doğrulama',
    sso: 'Kurumsal SSO',
  },
  user_management: {
    title: 'Kullanıcı Yönetimi',
    user_management: 'Kullanıcı Yönetimi',
    roles: 'Roller',
    machine_to_machine_roles: 'Makine-makine rolleri',
    scopes_per_role: 'Rol başına izinler',
  },
  audit_logs: {
    title: 'Denetim Günlükleri',
    retention: 'Saklama',
  },
  hooks: {
    title: 'Web Kancaları',
    hooks: 'Web Kancaları',
  },
  organizations: {
    title: 'Organizasyon',
    organizations: 'Organizasyonlar',
    monthly_active_organization: 'Aylık aktif organizasyon',
    allowed_users_per_org: 'Organizasyon başına izin verilen kullanıcılar',
    invitation: 'Davet',
    org_roles: 'Org rolleri',
    org_permissions: 'Org izinleri',
    just_in_time_provisioning: 'İstisnai olana kadar temin',
  },
  support: {
    title: 'Uyumluluk ve destek',
    community: 'Topluluk',
    customer_ticket: 'Müşteri destek bileti',
    premium: 'Premium',
    email_ticket_support: 'E-posta bileti desteği',
    soc2_report: 'SOC2 raporu',
    hipaa_or_baa_report: 'HIPAA/BAA raporu',
  },
  unlimited: 'Sınırsız',
  contact: 'İletişim',
  monthly_price: '${{value, number}}/ay',
  days_one: '{{count, number}} gün',
  days_other: '{{count, number}} gün',
  add_on: 'Ek Hizmet',
  tier: 'Seviye{{value, number}}: ',
  free_token_limit_tip: 'Free for {{value}}M token issued.',
  paid_token_limit_tip:
    'Free for {{value}}M token issued. We may add charges if you go beyond {{value}}M tokens once we finalize the prices.',
  paid_quota_limit_tip:
    "Logto, kota limitinizi aşan özellikler için ücretlendirme ekleyecektir. Şarjımıza başlamadan önce, yaklaşık olarak 2024 Q2'ye kadar ücretsiz olarak kullanabilirsiniz.",
  paid_add_on_feature_tip:
    "Bu bir ek özelliktir. Şarjımıza başlamadan önce, yaklaşık olarak 2024 Q2'ye kadar ücretsiz olarak kullanabilirsiniz.",
  million: '{{value, number}} milyon',
  mau_tip:
    'MAU (aylık aktif kullanıcı) Logto ile en az bir jeton değiştirmiş olan benzersiz kullanıcı sayısını ifade eder.',
  tokens_tip:
    'Logto tarafından ihraç edilen erişim tokeni, yenileme tokeni vb. dahil olmak üzere tüm token türleri.',
  mao_tip:
    "MAO (aylık aktif kuruluş) bir fatura döngüsünde en az bir MAU'ya (aylık aktif kullanıcı) sahip olan benzersiz kuruluşların sayısını ifade eder.",
  included: '{{value, number}} dahil',
  included_mao: '{{value, number}} MAO dahil',
  extra_quota_price: 'Sonra aylık ${{value, number}} / sonrasında her biri',
  per_month_each: 'Aylık ${{value, number}} / her biri',
  extra_mao_price: 'Sonra MAO başına ${{value, number}}',
  per_month: 'Aylık ${{value, number}}',
};

export default Object.freeze(quota_table);
