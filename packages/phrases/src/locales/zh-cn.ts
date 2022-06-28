/* eslint-disable max-lines */
import en from './en';

const translation = {
  admin_console: {
    title: '管理控制台',
    sign_out: '退出登录',
    profile: '帐户管理',
    admin_user: '管理员',
    system_app: '系统应用',
    general: {
      placeholder: '占位符',
      skip: '跳过',
      next: '下一步',
      retry: '重试',
      done: '完成',
      search: '搜索',
      search_placeholder: '搜索',
      clear_result: '清除结果',
      save: '保存',
      save_changes: '保存更改',
      saved: '保存成功!',
      loading: '读取中...',
      redirecting: '页面跳转中...',
      added: '已添加',
      cancel: '取消',
      confirm: '确认',
      check_out: '查看',
      create: '创建',
      set_up: '配置',
      customize: '自定义',
      reminder: '提示',
      delete: '删除',
      more_options: '更多选项',
      close: '关闭',
      copy: '复制',
      copying: '复制中',
      copied: '已复制',
      required: '必填',
      add_another: '+ 新增',
      deletion_confirmation: '你确定要删除这个 {{title}} 吗?',
      settings_nav: '设置',
    },
    errors: {
      something_went_wrong: '哎呀，出错了！',
      page_not_found: '找不到页面',
      unknown_server_error: '服务器发生未知错误',
      empty: '没有数据',
      missing_total_number: '无法从返回的头部信息中找到 Total-Number',
      invalid_uri_format: '无效的 URI 格式',
      invalid_origin_format: '无效的 URI origin 格式',
      required_field_missing: '请输入{{field}}',
      required_field_missing_plural: '至少需要输入一个{{field}}',
      more_details: '查看详情',
      username_pattern_error: '用户名只能包含英文字母、数字或下划线，且不以数字开头。',
      password_pattern_error: '密码应不少于 6 位',
    },
    tab_sections: {
      overview: '概览',
      resource_management: '资源管理',
      user_management: '用户管理',
      help_and_support: '帮助与支持',
    },
    tabs: {
      get_started: '开始使用',
      dashboard: '仪表盘',
      applications: '全部应用',
      api_resources: 'API 资源',
      sign_in_experience: '登录体验',
      connectors: '连接器',
      users: '用户管理',
      audit_logs: '审计日志',
      documentation: '文档',
      contact_us: '联系我们',
      settings: '设置',
    },
    applications: {
      title: '全部应用',
      subtitle: '创建一个移动、单页或传统 web 应用程序，并通过 Logto 进行身份验证',
      create: '创建应用',
      application_name: '应用名称',
      application_name_placeholder: '我的应用',
      application_description: '应用描述',
      application_description_placeholder: '请输入应用描述',
      select_application_type: '选择应用类型',
      no_application_type_selected: '你还没有选择应用类型',
      application_created: '应用 {{name}} 成功创建! \n现在请完成你的应用设置。',
      app_id: 'App ID',
      type: {
        native: {
          title: '原生应用',
          subtitle: '在原生环境中运行的应用程序',
          description: '例如 iOS app，Android app',
        },
        spa: {
          title: '单页应用',
          subtitle: '在浏览器中运行并动态更新数据的应用程序',
          description: '例如 React DOM app，Vue app',
        },
        traditional: {
          title: '传统网页应用',
          subtitle: '仅由 Web 服务器渲染和更新的应用程序',
          description: '例如 JSP, PHP',
        },
      },
      guide: {
        get_sample_file: '获取示例工程',
        header_description:
          '参考如下教程，将 Logto 集成到你的应用中。你也可以点击右侧链接，获取我们为你准备好的示范工程。',
        title: '恭喜！应用创建成功。',
        subtitle: '参考以下步骤完成你的应用设置。首先，选择你要使用的 SDK 类型：',
        description_by_sdk: '本教程向你演示如何在 {{sdk}} 应用中集成 Logto 登录功能',
      },
    },
    application_details: {
      back_to_applications: '返回全部应用',
      check_help_guide: '查看帮助引导',
      advanced_settings: '高级设置',
      application_name: '应用名称',
      application_name_placeholder: '我的应用',
      description: '描述',
      description_placeholder: '请输入应用描述',
      authorization_endpoint: 'Authorization Endpoint',
      redirect_uri: 'Redirect URIs',
      redirect_uri_placeholder: 'https://myapp.com/sign-in',
      post_sign_out_redirect_uri: 'Post sign out redirect URIs',
      post_sign_out_redirect_uri_placeholder: 'https://myapp.com/sign-in',
      cors_allowed_origins: 'CORS Allowed Origins',
      cors_allowed_origins_placeholder: 'https://sign-in.mydomain.com',
      add_another: '新增',
      id_token_expiration: 'ID Token 过期时间',
      refresh_token_expiration: 'Refresh Token 过期时间',
      token_endpoint: 'Token endpoint',
      user_info_endpoint: 'UserInfo endpoint',
      delete_description:
        '本操作会永久性地删除该应用，且不可撤销。输入 <span>{{name}}</span> 确认。',
      enter_your_application_name: '输入你的应用名称',
      application_deleted: '应用 {{name}} 成功删除.',
      redirect_uri_required: '至少需要输入一个 Redirect URL',
    },
    api_resources: {
      title: 'API 资源',
      subtitle: '定义可以从已授权的应用程序中使用的 API.',
      create: '创建 API 资源',
      api_name: 'API 名称',
      api_name_placeholder: '输入API名称',
      api_identifier: 'API Identifier',
      api_identifier_placeholder: 'https://your-api-identifier/',
      api_resource_created: ' API 资源 {{name}} 已成功创建！',
    },
    api_resource_details: {
      back_to_api_resources: '返回 API 资源',
      token_expiration_time_in_seconds: 'Token 过期时间（秒）',
      token_expiration_time_in_seconds_placeholder: '请输入你的 token 过期时间',
      delete_description:
        '本操作会永久性地删除该 API 资源，且不可撤销。输入 API 资源名称 <span>{{name}}</span> 确认。',
      enter_your_api_resource_name: '输入 API 资源名称',
      api_resource_deleted: ' API 资源 {{name}} 已删除.',
    },
    connectors: {
      title: '连接器',
      subtitle: '设置连接器，开启无密码和社交登录',
      create: '添加社交连接器',
      tab_email_sms: '短信和邮件连接器',
      tab_social: '社交连接器',
      connector_name: '连接器名称',
      connector_type: '类型',
      connector_status: '登录体验',
      connector_status_in_use: '使用中',
      connector_status_not_in_use: '未使用',
      social_connector_eg: '如: 微信登录，支付宝登录',
      save_and_done: '保存并完成',
      type: {
        email: '邮件连接器',
        sms: '短信连接器',
        social: '社交连接器',
      },
      setup_title: {
        email: '设置邮件连接器',
        sms: '设置短信连接器',
        social: '添加社交连接器',
      },
      guide: {
        subtitle: '参考以下步骤完成你的连接器设置',
      },
      platform: {
        universal: '通用',
        web: '网页',
        native: '原生',
      },
      add_multi_platform: ' 支持多平台，选择一个平台继续',
      drawer_title: '连接器配置指南',
      drawer_subtitle: '参考以下步骤完善或修改你的连接器设置',
    },
    connector_details: {
      back_to_connectors: '返回连接器',
      check_readme: '查看 README',
      save_error_empty_config: '请输入配置内容',
      save_error_json_parse_error: '请输入符合 JSON 格式的配置',
      send: '发送',
      send_error_invalid_format: '无效输入',
      edit_config_label: '请在此输入你的 JSON 配置',
      test_email_sender: '测试你的邮件连接器',
      test_sms_sender: '测试你的短信连接器',
      test_message_sent: '测试信息已发送！',
      test_sender_description: '如果你的 JSON 配置正确，你会收到一条测试消息。',
      options_change_email: '更换邮件连接器',
      options_change_sms: '更换短信连接器',
      connector_deleted: '成功删除连接器',
      type_email: '邮件连接器',
      type_sms: '短信连接器',
      type_social: '社交连接器',
    },
    get_started: {
      progress: '开始使用: {{completed}}/{{total}}',
      progress_dropdown_title: '一些快速上手的操作',
      title: '还不知道如何使用 Logto?',
      subtitle_part1: '下列是一些可以快速上手的操作，通过这些，你可以更好地感受 Logto 的价值',
      subtitle_part2: '我已经完成了这些设置',
      hide_this: '隐藏引导',
      confirm_message: '你确认要隐藏该页面吗? 本操作将无法恢复。',
      card1_title: '看看 Demo',
      card1_subtitle: '来体验 Logto 登录吧',
      card2_title: '创建你的第一款应用',
      card2_subtitle: '创建一个原生、单页或传统应用，并通过 Logto 进行身份验证',
      card3_title: '自定义你的登录体验',
      card3_subtitle: '自定义符合品牌形象的登录界面，并实时预览真实效果',
      card4_title: '实现手机号码登录和邮箱登录',
      card4_subtitle: '尝试无密码登录，给你的用户一个安全无缝的体验',
      card5_title: '添加社交连接器',
      card5_subtitle: '让你的用户通过社交帐号一键登录',
      card6_title: '更多阅读',
      card6_subtitle: '查看我们一步一步基于场景的文档，没有复杂的概念，简单上手',
    },
    users: {
      title: '用户管理',
      subtitle:
        '管理你的用户，包括创建新用户，编辑用户资料，查看用户日志，以及重新设置密码和删除用户',
      create: '添加用户',
      user_name: '用户',
      application_name: '注册应用',
      latest_sign_in: '最后登录',
      create_form_username: '用户名',
      create_form_password: '密码',
      create_form_name: '姓名',
      unnamed: '未命名',
    },
    user_details: {
      back_to_users: '返回用户管理',
      created_title: '恭喜！用户创建成功',
      created_guide: '你可以将以下登录信息发送给用户',
      created_username: '用户名：',
      created_password: '初始密码：',
      menu_delete: '删除用户',
      delete_description: '本操作将永久删除该用户，且无法撤销。',
      deleted: '用户已成功删除！',
      reset_password: {
        reset_password: '重置密码',
        title: '确定要重置密码？',
        content: '本操作不可撤销，将会重置用户的登录信息。',
        congratulations: '该用户已被重置',
      },
      tab_logs: '用户日志',
      field_email: '主要邮箱',
      field_phone: '主要手机号码',
      field_username: '用户名',
      field_name: '姓名',
      field_avatar: '头像图片链接',
      field_avatar_placeholder: 'https://your.cdn.domain/avatar.png',
      field_custom_data: '自定义数据',
      field_connectors: '社交帐号',
      custom_data_invalid: '自定义数据必须是有效的 JSON',
      connectors: {
        connectors: '连接器',
        user_id: '用户ID',
        remove: '删除',
        not_connected: '该用户还没有绑定社交帐号',
        deletion_confirmation: '你在正要删除现有的 <name /> 身份，是否确认？',
      },
    },
    contact: {
      title: '联系我们',
      description: '加入我们的社区，在这里你可以给我们提供产品建议，寻求帮助或和其他开发者交流心得',
      discord: {
        title: 'Discord 频道',
        description: '加入我们的公共频道，和其他开发者一起交流使用经验',
        button: '立即加入',
      },
      github: {
        title: 'GitHub',
        description: '通过 GitHub，给我们提一个 issue',
        button: '马上联系',
      },
      email: {
        title: '邮件联系',
        description: '通过邮件联系获取信息或寻求帮助',
        button: '发送邮件',
      },
    },
    sign_in_exp: {
      title: '登录体验',
      description: '自定义登录界面，并实时预览真实效果',
      tabs: {
        branding: '品牌',
        methods: '登录方式',
        others: '其它',
      },
      welcome: {
        title: '这是你首次定义你的登录体验。跟随引导，完成登录体验的必要设置项。',
        get_started: '开始',
        apply_remind: '请注意，登录体验将会应用到当前账户下的所有应用。',
        got_it: '知道了',
      },
      color: {
        title: '颜色',
        primary_color: '品牌颜色',
        dark_primary_color: '品牌颜色 (深色)',
        dark_mode: '开启深色模式',
        dark_mode_description:
          '基于你的品牌颜色和 Logto 的算法，你的应用将会有一个自动生成的深色模式。当然，你可以自定义和修改。',
      },
      branding: {
        title: '品牌定制区',
        ui_style: '样式',
        styles: {
          logo_slogan: 'App logo 和标语',
          logo: '仅有Logo',
        },
        logo_image_url: 'Logo 图片 URL',
        logo_image_url_placeholder: 'https://your.cdn.domain/logo.png',
        dark_logo_image_url: 'Logo 图片 URL (深色)',
        dark_logo_image_url_placeholder: 'https://your.cdn.domain/logo-dark.png',
        slogan: '标语',
        slogan_placeholder: '释放你的创意',
      },
      terms_of_use: {
        title: '使用条款',
        enable: '开启使用条款',
        description: '添加使用产品的法律协议。',
        terms_of_use: '使用条款',
        terms_of_use_placeholder: 'https://your.terms.of.use/',
        terms_of_use_tip: '使用条款 URL',
      },
      sign_in_methods: {
        title: '登录方式',
        primary: '主要登录方式',
        enable_secondary: '启用其它登录方式',
        enable_secondary_description:
          '开启后，除了主要登录方式，你的 app 将会支持更多其它的登录方式 ',
        methods: '登录方式',
        methods_sms: '手机号登录',
        methods_email: '邮箱登录',
        methods_social: '社交帐号登录',
        methods_username: '用户名密码登录',
        methods_primary_tag: '（主要）',
        define_social_methods: '定义社交登录方式',
        transfer: {
          title: '社交连接器',
          footer: {
            not_in_list: '不在列表里？',
            set_up_more: '设置更多',
            go_to: '社交连接器，或前往连接器模块进行设置。',
          },
        },
      },
      others: {
        languages: {
          title: '语言',
          mode: '语言模式',
          auto: '自动',
          fixed: '固定',
          fallback_language: '备用语言',
          fixed_language: '固定语言',
          languages: {
            english: '英文',
            chinese: '中文',
          },
        },
      },
      setup_warning: {
        no_connector: '',
        no_connector_sms: '你还没有设置 SMS 连接器。你需完成设置后登录体验才会生效。',
        no_connector_email: '你还没有设置 email 连接器。你需完成设置后登录体验才会生效。',
        no_connector_social: '你还没有设置社交连接器。你需完成设置后登录体验才会生效。',
        no_added_social_connector:
          '你已经成功设置了一些社会化连接器。确认添加一些到你的登录体验。你可以拖拽改变他们的顺序。',
      },
      save_alert: {
        description: '你正在修改登录方式，这可能会影响部分用户。是否继续保存修改？',
        before: '修改前',
        after: '修改后',
      },
      preview: {
        title: '登录预览',
        languages: {
          english: '英文',
          chinese: '中文',
        },
        dark: '深色',
        light: '浅色',
        mobile: '移动',
        desktop_web: '桌面网页',
        mobile_web: '移动网页',
      },
    },
    settings: {
      title: '设置',
      description: '管理全局设置',
      tabs: {
        general: '通用',
      },
      custom_domain: '自定义域名',
      language: '语言',
      language_english: '英语',
      language_chinese: '中文',
      appearance: '外观',
      appearance_system: '跟随系统',
      appearance_light: '浅色模式',
      appearance_dark: '深色模式',
    },
    dashboard: {
      title: '仪表盘',
      description: '查看所有应用的数据概况',
      total_users: '总用户',
      total_users_tip: '总用户',
      new_users_today: '今日新增',
      new_users_today_tip: '今日新增',
      new_users_7_days: '7日新增',
      new_users_7_days_tip: '7日新增',
      daily_active_users: '日活用户',
      daily_active_users_tip: '日活用户',
      weekly_active_users: '周活用户',
      weekly_active_users_tip: '周活用户',
      monthly_active_users: '月活用户',
      monthly_active_users_tip: '月活用户',
    },
    logs: {
      title: '审计日志',
      subtitle: '查看用户行为和事件',
      event: '事件',
      user: '用户',
      application: '应用',
      time: '时间',
      filter_by: '过滤',
    },
    log_details: {
      back_to_logs: '返回审计日志',
      back_to_user: '返回 {{name}}',
      success: '成功',
      failed: '失败',
      event_type: '事件类型',
      application: '应用',
      ip_address: 'IP 地址',
      user: '用户',
      log_id: '日志 ID',
      time: '时间',
      user_agent: '用户代理',
      tab_details: '详情',
      raw_data: '原始数据',
    },
    session_expired: {
      title: '会话已过期',
      subtitle: '会话可能已过期，你已被退出登录。请点击下方按钮重新登录到管理控制台。',
      button: '重新登录',
    },
    welcome: {
      title: '欢迎使用管理控制台',
      description:
        '管理控制台是一个无代码应用。你可以用它来管理你的登录体验。让我们首先创建一个管理员帐户。你可以用这个账号自己或代表你的公司管理 Logto。',
      create_account: '创建帐户',
    },
  },
  demo_app: {
    notification: '请使用管理员帐号密码登录本示例应用',
    title: '恭喜！你已成功登录到示例应用！',
    subtitle: '以下是你本次登录的用户信息：',
    username: '用户名：',
    user_id: '用户 ID：',
    sign_out: '退出登录',
    continue_explore: '或继续探索',
    customize_sign_in_experience: '自定义登录体验',
    enable_passwordless: '启用无密码登录',
    add_social_connector: '添加社叫连接器',
  },
};

const errors = {
  auth: {
    authorization_header_missing: '缺少权限标题',
    authorization_token_type_not_supported: '权限类型不支持',
    unauthorized: '未经授权。请检查凭据及其范围。',
    forbidden: '禁止访问。请检查用户权限。',
    jwt_sub_missing: 'JWT 缺失 `sub`',
  },
  guard: {
    invalid_input: '请求输入无效',
    invalid_pagination: '分页参数无效',
  },
  oidc: {
    aborted: '用户终止了交互。',
    invalid_scope: '不支持的 scope: {{scopes}}',
    invalid_scope_plural: '不支持的 scope: {{scopes}}',
    invalid_token: 'Token 无效',
    invalid_client_metadata: '无效的客户端元数据',
    insufficient_scope: '请求 token 缺少权限: {{scopes}}',
    invalid_request: '请求无效',
    invalid_grant: '授权请求无效',
    invalid_redirect_uri: '无效返回链接, 该 redirect_uri 未被此应用注册。',
    access_denied: '拒绝访问',
    invalid_target: '请求资源无效',
    unsupported_grant_type: '不支持的 grant_type',
    unsupported_response_mode: '不支持的 response_mode',
    unsupported_response_type: '不支持的 response_type',
    provider_error: 'OIDC 内部错误: {{message}}',
  },
  user: {
    username_exists_register: '用户名已被注册',
    email_exists_register: '邮箱地址已被注册',
    phone_exists_register: '手机号码已被注册',
    invalid_email: '邮箱地址不正确',
    invalid_phone: '手机号码不正确',
    username_not_exists: '用户名尚未注册',
    email_not_exists: '邮箱地址尚未注册',
    phone_not_exists: '手机号码尚未注册',
    identity_not_exists: '该社交帐号尚未注册',
    identity_exists: '该社交帐号已被注册',
  },
  password: {
    unsupported_encryption_method: '不支持的加密方法 {{name}}',
    pepper_not_found: '密码 pepper 未找到。请检查 core 的环境变量。',
  },
  session: {
    not_found: '未找到会话。请返回并重新登录。',
    invalid_credentials: '用户名或密码错误，请检查你的输入。',
    invalid_sign_in_method: '当前登录方式不可用',
    invalid_connector_id: '找不到 ID 为 {{connectorId}} 的可用连接器。',
    insufficient_info: '登录信息缺失，请检查你的输入。',
    connector_id_mismatch: '传入的连接器 ID 与 session 中保存的记录不一致',
    connector_session_not_found: '无法找到连接器登录信息，请尝试重新登录。',
    unauthorized: '请先登录',
    unsupported_prompt_name: '不支持的 prompt name',
  },
  connector: {
    general: '连接器发生未知错误',
    not_found: '找不到可用的 {{type}} 类型的连接器',
    not_enabled: '连接器尚未启用',
    insufficient_request_parameters: '请求参数缺失',
    invalid_config: '连接器配置错误',
    invalid_response: '连接器错误响应',
    template_not_found: '无法从连接器配置中找到对应的模板',
    invalid_access_token: '当前连接器的 access_token 无效',
    invalid_auth_code: '当前连接器的授权码无效',
    invalid_id_token: '当前连接器的 id_token 无效',
    authorization_failed: '用户授权流程失败',
    oauth_code_invalid: '无法获取 access_token，请检查授权 code 是否有效',
    more_than_one_sms: '同时存在超过 1 个短信连接器',
    more_than_one_email: '同时存在超过 1 个邮件连接器',
    db_connector_type_mismatch: '数据库中存在一个类型不匹配的连接。',
  },
  passcode: {
    phone_email_empty: '手机号与邮箱地址均为空',
    not_found: '验证码不存在，请先请求发送验证码',
    phone_mismatch: '手机号码不匹配，请尝试请求新的验证码。',
    email_mismatch: '邮箱地址不匹配，请尝试请求新的验证码。',
    code_mismatch: '验证码不正确',
    expired: '验证码已过期，请尝试请求新的验证码。',
    exceed_max_try: '超过最大验证次数，请尝试请求新的验证码。',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use: '你启用了“使用条款”，请添加使用条款 URL。',
    empty_slogan: '你选择了 App logo + 标语的布局。请输入你的标语。',
    empty_social_connectors: '你启用了社交登录的方式。请至少选择一个社交连接器。',
    enabled_connector_not_found: '未找到已启用的 {{type}} 连接器',
    not_one_and_only_one_primary_sign_in_method: '主要的登录方式必须有且仅有一个，请检查你的输入。',
  },
  swagger: {
    invalid_zod_type: '无效的 Zod 类型，请检查路由 guard 配置。',
    not_supported_zod_type_for_params: '请求参数不支持的 Zod 类型，请检查路由 guard 配置。',
  },
  entity: {
    create_failed: '创建 {{name}} 失败',
    not_exists: '该 {{name}} 不存在',
    not_exists_with_id: 'ID 为 `{{id}}` 的 {{name}} 不存在',
    not_found: '该资源不存在',
  },
};

const zhCN: typeof en = Object.freeze({
  translation,
  errors,
});

export default zhCN;
/* eslint-enable max-lines */
