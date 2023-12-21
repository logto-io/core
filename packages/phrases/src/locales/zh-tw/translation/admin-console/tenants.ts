const tenants = {
  title: '設置',
  description: '高效管理租戶設定並自訂您的網域。',
  tabs: {
    settings: '設置',
    domains: '網域',
    subscription: '方案與計費',
    billing_history: '帳單歷史記錄',
  },
  settings: {
    title: '設定',
    description: '設定租戶名稱並查看您的資料托管區域和租戶類型。',
    tenant_id: '租戶 ID',
    tenant_name: '租戶名稱',
    tenant_region: '資料托管地區',
    tenant_region_tip: '您的租戶資源托管於 {{region}}。 <a>了解更多</a>',
    environment_tag_development: '開發',
    environment_tag_staging: '預置',
    environment_tag_production: '產品',
    tenant_type: '租戶類型',
    development_description:
      '僅供測試，不應在生產環境中使用。無需訂閱。它擁有所有專業功能，但存在限制，如登入橫幅。 <a>瞭解更多</a>',
    production_description: '旨在供最終用戶使用，可能需要付費訂閱。 <a>瞭解更多</a>',
    tenant_info_saved: '租戶資訊成功儲存。',
  },
  full_env_tag: {
    development: '開發',
    production: '產品',
  },
  deletion_card: {
    title: '刪除',
    tenant_deletion: '刪除租戶',
    tenant_deletion_description: '刪除租戶將導致所有相關的使用者資料和設定永久移除。請謹慎進行。',
    tenant_deletion_button: '刪除租戶',
  },
  create_modal: {
    title: '建立客戶',
    subtitle: '創建一個具有隔離資源和用戶的新租戶。數據托管的區域和租戶類型在創建後無法修改。',
    tenant_usage_purpose: '您希望將此租戶用於什麼目的？',
    development_description: '僅供測試，不應在生產環境中使用。無需訂閱。',
    development_hint: '它擁有所有專業功能，但存在限制，如登入橫幅。',
    production_description: '供最終用戶使用，可能需要付費訂閱。',
    available_plan: '可用方案：',
    create_button: '建立租戶',
    tenant_name_placeholder: '我的租戶',
  },
  dev_tenant_migration: {
    title: '您現在可以通過創建新的"開發租戶"免費試用我們的專業功能！',
    affect_title: '這對您有什麼影響？',
    hint_1:
      '我們正將舊的<strong>環境標籤</strong>替換為兩種新的租戶類型：<strong>“開發</strong>”和<strong>“產品</strong>”。',
    hint_2:
      '為確保無縫過渡和不間斷的功能，所有早期創建的租戶將提升為<strong>產品</strong>租戶類型，並附上先前的訂閱。',
    hint_3: '別擔心，您的其他設置將保持不變。',
    about_tenant_type: '關於租戶類型',
  },
  dev_tenant_notification: {
    title: '現在您可以在您的開發租戶中訪問<a>Logto Pro所有功能</a>！',
    description: '它完全免費，沒有試用期-永遠免費！',
  },
  delete_modal: {
    title: '刪除租戶',
    description_line1:
      '您確定要刪除帶有環境標籤 "<span>{{tag}}</span>" 的租戶 "<span>{{name}}</span>"？此操作無法撤銷，並將永久刪除所有您的數據和帳戶信息。',
    description_line2:
      '在刪除帳戶前，也許我們能提供幫助。<span><a>通過電子郵件與我們聯繫</a></span>',
    description_line3: '如果您確定要繼續，請輸入租戶名稱 "<span>{{name}}</span>" 以確認。',
    delete_button: '永久刪除',
    cannot_delete_title: '無法刪除此租戶',
    cannot_delete_description:
      '抱歉，您現在無法刪除此租戶。請確保您處於免費方案並已支付所有未結賬單。',
  },
  tenant_landing_page: {
    title: '您尚未建立租戶',
    description:
      '要開始使用Logto配置您的項目，請創建一個新租戶。如果您需要登出或刪除您的帳戶，只需點擊右上角的頭像按鈕。',
    create_tenant_button: '創建租戶',
  },
  status: {
    mau_exceeded: '超過MAU限制',
    suspended: '暫停',
    overdue: '逾期',
  },
  tenant_suspended_page: {
    title: '租戶暫停。聯繫我們以恢復存取。',
    description_1:
      '很抱歉通知您，由於不當使用，包括超過 MAU 限制、逾期付款或其他未經授權的操作，您的租戶帳戶已被暫時停用。',
    description_2:
      '如果您需要進一步的說明、有任何疑慮或希望恢復全部功能並解鎖您的租戶，請立即聯絡我們。',
  },
  signing_keys: {
    title: '簽名密鑰',
    description: '在您的租戶中安全管理簽名密鑰。',
    type: {
      private_key: 'OIDC 私鑰',
      cookie_key: 'OIDC Cookie 密鑰',
    },
    private_keys_in_use: '正在使用的私鑰',
    cookie_keys_in_use: '正在使用的 Cookie 密鑰',
    rotate_private_keys: '輪換私鑰',
    rotate_cookie_keys: '輪換 Cookie 密鑰',
    rotate_private_keys_description:
      '此操作將創建一個新的私密簽名密鑰，輪換當前密鑰並刪除之前的密鑰。您的使用當前密鑰簽署的 JWT 憑證在刪除或另一輪輪換之前仍然有效。',
    rotate_cookie_keys_description:
      '此操作將創建一個新的 Cookie 密鑰，輪換當前密鑰並刪除之前的密鑰。使用當前密鑰簽署的 Cookie 將在刪除或另一輪輪換之前仍然有效。',
    select_private_key_algorithm: '選擇新私鑰的簽名演算法',
    rotate_button: '輪換',
    table_column: {
      id: 'ID',
      status: '狀態',
      algorithm: '簽名演算法',
    },
    status: {
      current: '當前的',
      previous: '之前的',
    },
    reminder: {
      rotate_private_key:
        '您確定要輪換<strong>OIDC私鑰</strong>嗎？新發放的 JWT 憑證將由新的密鑰簽署。現有的 JWT 憑證仍然有效，直到下一輪輪換或刪除。',
      rotate_cookie_key:
        '您確定要輪換<strong>OIDC Cookie 密鑰</strong>嗎？在登入會話中生成的新 Cookie 將由新的 Cookie 密鑰簽署。現有 Cookie 在下一輪輪換或刪除之前仍然有效。',
      delete_private_key:
        '您確定要刪除<strong>OIDC私鑰</strong>嗎？使用此私密簽名密鑰簽署的現有 JWT 憑證將不再有效。',
      delete_cookie_key:
        '您確定要刪除<strong>OIDC Cookie 密鑰</strong>嗎？用此 Cookie 密鑰簽署的舊登入會話將不再有效。這些使用者需要重新驗證。',
    },
    messages: {
      rotate_key_success: '密鑰輪換成功。',
      delete_key_success: '密鑰刪除成功。',
    },
  },
};

export default Object.freeze(tenants);
