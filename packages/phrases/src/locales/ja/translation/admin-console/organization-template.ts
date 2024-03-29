const organization_template = {
  title: '組織テンプレート',
  subtitle:
    'マルチテナントSaaSアプリケーションでは、複数の組織が同一のアクセス制御ポリシーを共有することが一般的です。これには、権限と役割が含まれます。Logtoでは、この概念を「組織テンプレート」と呼びます。これを使用することで、認証モデルの構築と設計のプロセスが簡素化されます。',
  org_roles: {
    tab_name: '組織の役割',
    search_placeholder: '役割名で検索',
    create_org_roles: '組織の役割を作成',
    org_role_column: '組織の役割',
    permissions_column: '権限',
    placeholder_title: '組織の役割',
    placeholder_description:
      '組織の役割は、ユーザーに割り当てることができる権限のグループです。権限は、事前に定義された組織の権限から来なければなりません。',
  },
  org_permissions: {
    tab_name: '組織の権限',
    search_placeholder: '権限名で検索',
    create_org_permission: '組織の権限を作成',
    permission_column: '権限',
    description_column: '説明',
    placeholder_title: '組織の権限',
    placeholder_description:
      '組織の権限は、組織の文脈でリソースにアクセスするための認可を指します。',
    delete_confirm:
      'この権限が削除されると、この権限を含むすべての組織の役割がこの権限を失い、この権限を持っていたユーザーはそれによって与えられたアクセスを失います。',
  },
};

export default Object.freeze(organization_template);
