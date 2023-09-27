const user_details = {
  page_title: 'ユーザーの詳細',
  back_to_users: 'ユーザー管理に戻る',
  created_title: 'このユーザーは正常に作成されました',
  created_guide: 'ユーザーがサインインプロセスを支援するための情報です。',
  created_email: 'メールアドレス：',
  created_phone: '電話番号：',
  created_username: 'ユーザー名：',
  created_password: 'パスワード：',
  menu_delete: '削除',
  delete_description: 'この操作は取り消せません。ユーザーが永久に削除されます。',
  deleted: 'ユーザーは正常に削除されました',
  reset_password: {
    reset_password: 'パスワードをリセット',
    title: '本当にパスワードをリセットしますか？',
    content: 'この操作は取り消せません。ユーザーのログイン情報がリセットされます。',
    congratulations: 'このユーザーはリセットされました',
    new_password: '新しいパスワード：',
  },
  tab_settings: '設定',
  tab_roles: '役割',
  tab_logs: 'ユーザーログ',
  settings: '設定',
  settings_description:
    '各ユーザーには、すべてのユーザー情報が含まれるプロファイルがあります。基本データ、ソーシャルアイデンティティ、およびカスタムデータで構成されています。',
  field_email: 'メールアドレス',
  field_phone: '電話番号',
  field_username: 'ユーザー名',
  field_name: '名前',
  field_avatar: 'アバター画像のURL',
  field_avatar_placeholder: 'https://your.cdn.domain/avatar.png',
  field_custom_data: 'カスタムデータ',
  field_custom_data_tip:
    'プリディフィンドされたユーザープロパティにリストされていない、追加のユーザー情報（ユーザーが好みの色や言語など）。',
  field_connectors: 'ソーシャル接続',
  custom_data_invalid: 'カスタムデータは有効なJSONオブジェクトである必要があります',
  connectors: {
    connectors: 'コネクタ',
    user_id: 'ユーザーID',
    remove: '削除',
    not_connected: 'ユーザーはソーシャルコネクタに接続していません',
    deletion_confirmation:
      '既存の<name/>アイデンティティを削除しています。本当にそれをやり遂げますか？',
  },
  mfa: {
    field_name: '多要素認証',
    field_description: 'このユーザーは2段階認証要素を有効にしました。',
    name_column: '多要素認証',
    field_description_empty: 'このユーザーは2段階認証の要因を有効にしていません。',
    deletion_confirmation: '2段階認証の既存の<name/>を削除しています。本当にそれを行いたいですか？',
  },
  suspended: '停止中',
  suspend_user: 'ユーザーを一時停止',
  suspend_user_reminder:
    'ユーザーを一時停止してよろしいですか？この操作を行うと、ユーザーはアプリにサインインできなくなり、現在のアクセストークンが期限切れになった後、新しいアクセストークンを取得できなくなります。さらに、このユーザーによって行われたすべての API リクエストは失敗します。',
  suspend_action: '一時停止',
  user_suspended: 'ユーザーが停止されました。',
  reactivate_user: 'ユーザーをリアクティブ化',
  reactivate_user_reminder:
    'このユーザーをリアクティブ化することを確認しますか？それにより、このユーザーのサインイン試行が許可されます。',
  reactivate_action: '活性化',
  user_reactivated: 'ユーザーが再活性化されました。',
  roles: {
    name_column: '役割',
    description_column: '説明',
    /** UNTRANSLATED */
    assign_button: 'Assign roles',
    delete_description:
      'この操作により、このユーザーからこの役割が削除されます。役割自体はまだ存在しますが、このユーザーに関連付けられなくなります。',
    deleted: '{{name}} はこのユーザーから正常に削除されました。',
    assign_title: '{{name}}に役割を割り当てる',
    assign_subtitle: '{{name}}に1つ以上の役割を承認します',
    assign_role_field: '役割を割り当てる',
    role_search_placeholder: '役割名で検索',
    added_text: '{{value, number}}追加しました',
    assigned_user_count: '{{value, number}}ユーザー',
    confirm_assign: '役割を割り当てる',
    role_assigned: '役割が正常に割り当てられました',
    search: 'ロール名、説明、またはIDで検索',
    empty: '利用可能な役割はありません',
  },
  warning_no_sign_in_identifier:
    'ユーザーは、サインインに少なくとも1つの識別子（ユーザー名、メールアドレス、電話番号、またはソーシャル）を持っている必要があります。続行してよろしいですか？',
};

export default Object.freeze(user_details);
