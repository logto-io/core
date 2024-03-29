const organization_template = {
  title: 'Organizasyon şablonu',
  subtitle:
    'Çok kiracılı SaaS uygulamalarında, birden fazla organizasyonun aynı erişim kontrol politikalarını, izinleri ve rolleri dahil olmak üzere paylaşması yaygındır. Logto\'da bu kavram "organizasyon şablonu" olarak adlandırılır. Bunu kullanmak, yetkilendirme modelinizi oluşturma ve tasarlama sürecini basitleştirir.',
  org_roles: {
    tab_name: 'Org rolleri',
    search_placeholder: 'Role adı ile ara',
    create_org_roles: 'Org rolü oluştur',
    org_role_column: 'Org rolü',
    permissions_column: 'İzinler',
    placeholder_title: 'Organizasyon rolü',
    placeholder_description:
      'Organizasyon rolü, kullanıcılara atanabilecek izinlerin bir gruplamasıdır. İzinler, önceden belirlenmiş organizasyon izinlerinden gelmelidir.',
  },
  org_permissions: {
    tab_name: 'Org izinleri',
    search_placeholder: 'İzin adı ile ara',
    create_org_permission: 'Org izni oluştur',
    permission_column: 'İzin',
    description_column: 'Açıklama',
    placeholder_title: 'Organizasyon izni',
    placeholder_description:
      'Organizasyon izni, organizasyon bağlamında bir kaynağa erişim yetkisi anlamına gelir.',
    delete_confirm:
      'Bu izin silinirse, bu izni içeren tüm organizasyon rolleri bu izni kaybeder ve bu izne sahip kullanıcılar, bu izin tarafından verilen erişimi kaybeder.',
  },
};

export default Object.freeze(organization_template);
