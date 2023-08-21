const applications = {
  page_title: '全部應用',
  title: '全部應用',
  subtitle: '創建一個移動、單頁、machine-to-machine 或傳統 web 應用程序，並通過 Logto 進行身份驗證',
  subtitle_with_app_type: '設置 {{name}} 應用程序的 Logto 身份驗證',
  create: '創建應用',
  application_name: '應用名稱',
  application_name_placeholder: '我的應用',
  application_description: '應用描述',
  application_description_placeholder: '請輸入應用描述',
  select_application_type: '選擇應用類型',
  no_application_type_selected: '你還沒有選擇應用類型',
  application_created: '應用創建成功。',
  app_id: 'App ID',
  type: {
    native: {
      title: '原生應用',
      subtitle: '在原生環境中運行的應用程序',
      description: '例如 iOS app，Android app',
    },
    spa: {
      title: '單頁應用',
      subtitle: '在瀏覽器中運行並動態更新數據的應用程序',
      description: '例如 React DOM app，Vue app',
    },
    traditional: {
      title: '傳統網頁應用',
      subtitle: '僅由 Web 伺服器渲染和更新的應用程序',
      description: '例如 Next.js, PHP',
    },
    machine_to_machine: {
      title: 'Machine-to-Machine',
      subtitle: '直接與資源對話的應用程序（通常是服務）',
      description: '例如，後端服務',
    },
  },
  guide: {
    header_title: '選擇框架或教程',
    modal_header_title: '從 SDK 和指南開始',
    header_subtitle: '使用我們預建的 SDK 和教程來快速啟動您的應用程序開發流程。',
    start_building: '開始構建',
    categories: {
      featured: '推薦熱門應用',
      Traditional: '傳統網頁應用',
      SPA: '單頁應用',
      Native: '原生應用',
      MachineToMachine: 'Machine-to-machine',
    },
    filter: {
      title: '過濾框架',
      placeholder: '搜索框架',
    },
    select_a_framework: '選擇一個框架',
    checkout_tutorial: '查看 {{name}} 教程',
    get_sample_file: '獲取示例',
    title: '應用創建成功',
    subtitle: '參考以下步驟完成您的應用設置。首先，選擇要使用的 SDK 類型：',
    description_by_sdk: '本教程將向您展示如何在 {{sdk}} 應用中集成 Logto 登錄功能',
    do_not_need_tutorial: '如果您不需要教程，可以繼續進行不帶框架指南的操作',
    create_without_framework: '無框架創建應用',
    finish_and_done: '完成並結束',
    cannot_find_guide: '找不到指南？',
    describe_guide_looking_for: '描述您正在尋找的指南',
    describe_guide_looking_for_placeholder: '例如，我想將 Logto 集成到我的 Angular 應用中',
    request_guide_successfully: '您的請求已成功提交。謝謝！',
  },
  placeholder_title: '選擇應用程序類型以繼續',
  placeholder_description:
    'Logto 使用 OIDC 的應用程序實體來幫助識別你的應用程序、管理登入和創建審計日誌等任務。',
};

export default Object.freeze(applications);
