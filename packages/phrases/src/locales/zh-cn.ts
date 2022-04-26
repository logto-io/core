/* eslint-disable max-lines */
import en from './en';

const translation = {
  general: {
    placeholder: '占位符',
    skip: '跳过',
    next: '下一步',
    retry: '重试',
    done: '完成',
    search: '搜索',
    save_changes: '保存更改',
    loading: '读取中...',
    redirecting: '页面跳转中...',
    added: '已添加',
  },
  main_flow: {
    input: {
      username: '用户名',
      password: '密码',
      email: '邮箱',
      phone_number: '手机号',
      confirm_password: '确认密码',
    },
    secondary: {
      sign_in_with: '通过 {{method}} 登录',
      sign_in_with_2: '通过 {{ methods.0 }} 或 {{ methods.1 }} 登录',
    },
    action: {
      sign_in: '登录',
      continue: '继续',
      create_account: '创建账号',
      create: '创建',
      enter_passcode: '输入验证码',
      cancel: '取消',
      confirm: '确认',
      bind: '绑定到 {{address}}',
    },
    description: {
      loading: '读取中...',
      redirecting: '页面跳转中...',
      agree_with_terms: '我已阅读并同意 ',
      agree_with_terms_modal: 'Please read the {{terms}} and then agree the box first.',
      terms_of_use: '使用条款',
      create_account: '创建账号',
      forgot_password: '忘记密码？',
      or: '或',
      enter_passcode: '验证码已经发送至 {{ address }}',
      resend_after_seconds: '在 {{ seconds }} 秒后重发',
      resend_passcode: '重发验证码',
      continue_with: '通过以下方式继续',
      create_account_id_exists: '{{ type }}为 {{ value }} 的账号已存在，您要登录吗？',
      sign_in_id_does_not_exists: '{{ type }}为 {{ value }} 的账号不存在，您要创建一个新账号吗？',
      bind_account_title: '绑定 Logto 账号',
      social_create_account: 'No account? You can create a new account and bind.',
      social_bind_account: 'Already have an account? Sign in to bind it with your social identity.',
      social_bind_with_existing: 'We find a related account, you can bind it directly.',
    },
    error: {
      username_password_mismatch: '用户名和密码不匹配。',
      required: '{{field}} 必填',
      username_exists: '用户名已存在。',
      username_should_not_start_with_number: '用户名不能以数字开头。',
      username_valid_charset: '用户名只能包含英文字母、数字或下划线。',
      invalid_email: '无效的邮箱。',
      invalid_phone: '无效的手机号。',
      password_min_length: '密码最少需要{{min}}个字符。',
      passwords_do_not_match: '密码不匹配。',
      agree_terms_required: '你需要同意使用条款以继续。',
      invalid_passcode: '无效的验证码。',
      request: '请求错误（{{ code }}）：{{ message }}',
      unknown: '未知错误，请稍后重试。',
    },
  },
  admin_console: {
    title: '管理面板',
    copy: {
      pending: '拷贝',
      copying: '拷贝中',
      copied: '已拷贝',
    },
    form: {
      required: '必填',
      add_another: '+ Add Another',
    },
    errors: {
      something_went_wrong: '哎哟喂，遇到了一个错误',
      unknown_server_error: '服务器发生未知错误。',
      empty: '没有数据',
      missing_total_number: '无法从返回的头部信息中找到 Total-Number。',
      no_space_in_uri: 'URI 中不能包含空格',
      required_field_missing: '请输入{{field}}',
      required_field_missing_plural: '{{field}}不能全部为空',
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
      applications: '应用集',
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
      title: '应用集',
      subtitle:
        'Setup a mobile, single page or traditional application to use Logto for authentication.',
      create: 'Create Application',
      application_name: 'Application Name',
      application_description: 'Application Description',
      select_application_type: 'Select an application type',
      no_application_type_selected: 'You have to select an application type to proceed.',
      application_created:
        'The application {{name}} has been successfully created! \nNow finish your application settings.',
      client_id: 'Client ID',
      type: {
        native: {
          title: 'Native App',
          subtitle: 'Mobile, desktop, CLI and smart device apps running natively.',
          description: 'E.g.: iOS, Electron, Apple TV apps',
        },
        spa: {
          title: 'Single Page App',
          subtitle: 'A JavaScript front-end app that uses an API.',
          description: 'E.g.: Angular, React, Vue',
        },
        traditional: {
          title: 'Traditional Web',
          subtitle: 'Traditional web app using redirects.',
          description: 'E.g.: Node.js, Express, ASP.NET, Java, PHP',
        },
      },
      get_started: {
        header_description:
          '参考如下教程，将 Logto 集成到您的应用中。您也可以点击右侧链接，获取我们为您准备好的示范工程。',
        title: '恭喜！您的应用已成功创建。',
        subtitle: '请参考以下步骤完成您的应用设置。首先，请选择您要使用的 Javascript 框架：',
        description_by_library: '本教程向您演示如何在 {{library}} 应用中集成 Logto 登录功能',
      },
    },
    application_details: {
      back_to_applications: '返回应用集',
      check_help_guide: 'Check Help Guide',
      settings: 'Settings',
      advanced_settings: 'Advanced Settings',
      application_name: 'Application Name',
      description: 'Description',
      authorization_endpoint: 'Authorization Endpoint',
      redirect_uri: 'Redirect URI',
      post_sign_out_redirect_uri: 'Post Sign Out Redirect URI',
      add_another: 'Add another',
      id_token_expiration: 'ID Token Expiration',
      refresh_token_expiration: 'Refresh Token Expiration',
      token_endpoint: 'Token Endpoint',
      user_info_endpoint: 'User Info Endpoint',
      save_changes: 'Save Changes',
      more_options: 'More Options',
      options_delete: 'Delete',
      reminder: 'Reminder',
      delete_description:
        'This action cannot be undone. This will permanently delete the this application. Please enter the application name <span>{{name}}</span> to proceed.',
      enter_your_application_name: 'Enter your application name',
      cancel: 'Cancel',
      delete: 'Delete',
      application_deleted: 'The application {{name}} deleted.',
      save_success: 'Saved!',
      redirect_uri_required: 'You have to enter at least one redirect URI.',
    },
    api_resources: {
      title: 'API Resources',
      subtitle: 'Define APIs that you can consume from your authorized applications.',
      create: 'Create API Resource',
      api_name: 'API Name',
      api_identifier: 'API Identifier',
      api_resource_created: 'The API resource {{name}} has been successfully created!',
    },
    api_resource_details: {
      back_to_api_resources: 'Back to my API resources',
      check_help_guide: 'Check Help Guide',
      more_options: 'More Options',
      options_delete: 'Delete',
      settings: 'Settings',
      save_changes: 'Save Changes',
      token_expiration_time_in_seconds: 'Token Expiration Time (in seconds)',
      reminder: 'Reminder',
      delete_description:
        'This action cannot be undone. This will permanently delete the this API resource. Please enter the api resource name <span>{{name}}</span> to proceed.',
      enter_your_api_resource_name: 'Enter your API resource name',
      cancel: 'Cancel',
      delete: 'Delete',
      api_resource_deleted: 'The API Resource {{name}} deleted.',
      save_success: 'Saved!',
    },
    connectors: {
      title: '连接器',
      subtitle: 'Setup connectors to enable passwordless and social sign in experience.',
      create: '添加社会化登录',
      set_up: '设置',
      tab_email_sms: '邮件/短信服务商',
      tab_social: '社会化登录',
      connector_name: '连接器',
      connector_type: '类型',
      connector_status: '状态',
      connector_status_enabled: '已启用',
      connector_status_disabled: '已禁用',
      social_connector_eg: '如: 微信登录，支付宝登录，微博登录',
      next: '下一步',
      type: {
        email: '邮件服务商',
        sms: '短信服务商',
        social: '社会化登录',
      },
      setup_title: {
        email: '设置邮件服务商',
        sms: '设置短信服务商',
        social: '添加社会化登录',
      },
      get_started: {
        subtitle: '请参考下列分步指南，配置您的 connector，或点击按钮获取示例配置文件',
      },
    },
    connector_details: {
      back_to_connectors: '返回连接器',
      check_readme: '查看文档',
      tab_settings: '设置',
      save_changes: '保存',
      save_error_empty_config: '请输入配置内容。',
      save_error_json_parse_error: '请输入符合 JSON 格式的配置。',
      save_success: '保存成功',
      send: 'Send',
      send_error_invalid_format: 'Invalid input',
      test_email_sender: 'Test your email sender',
      test_sms_sender: 'Test your SMS sender',
      test_message_sent: 'Test Message Sent!',
      test_sender_description: 'Test sender description',
      options: '操作',
      options_delete: '删除',
      options_change_email: '更换邮件服务商',
      options_change_sms: '更换短信服务商',
      more_options: '更多选项',
      connector_deleted: '成功删除连接器。',
    },
    get_started: {
      get_sample_file: '获取示例工程',
    },
    users: {
      title: '用户管理',
      subtitle: '管理已注册用户, 创建新用户，编辑用户资料。',
      create: '添加用户',
      user_name: '用户',
      application_name: '应用',
      latest_sign_in: '最后登录',
      create_form_username: '用户名',
      create_form_password: '密码',
      create_form_name: '姓名',
      unnamed: '未命名',
    },
    user_details: {
      back_to_users: '返回用户管理',
      created_title: '恭喜！用户创建成功',
      created_guide: '用户信息如下',
      created_username: '用户名：',
      created_password: '初始密码：',
      created_button_close: '关闭',
      created_button_copy: '拷贝',
      more_options: '更多操作',
      menu_delete: '删除用户',
      delete_title: '注意',
      delete_description: '本操作无法撤回，将删除此用户。',
      delete_cancel: '取消',
      delete_confirm: '删除',
      deleted: '用户已成功删除。',
      reset_password: {
        title: '重置密码',
        label: '新密码：',
        reset_password: '重置密码',
        reset_password_success: '密码已成功重置。',
      },
      tab_settings: '设置',
      tab_logs: '用户日志',
      field_email: '首选邮箱',
      field_phone: '首选手机号码',
      field_username: '用户名',
      field_name: '名称',
      field_avatar: '头像图片链接',
      field_roles: '角色',
      field_custom_data: '自定义数据',
      field_connectors: '社交账号',
      custom_data_invalid: '自定义数据必须是有效的 JSON',
      save_changes: '保存设置',
      saved: '保存成功!',
      connectors: {
        connectors: '连接器',
        user_id: '用户ID',
        remove: '删除',
        not_connected: '该用户还没有绑定社交账号。',
      },
      roles: {
        default: '默认',
        admin: '管理员',
      },
    },
    contact: {
      title: 'Contact us',
      description: 'You can contact us for help and support.',
      slack: {
        title: 'Slack channel',
        description: 'Join our public channel to chat with developers.',
        button: 'Join',
      },
      github: {
        title: 'GitHub',
        description: 'Create an issue.',
        button: 'Contact',
      },
      email: {
        title: 'Send us an email',
        description: 'If you have any question.',
        button: 'Send',
      },
    },
    sign_in_exp: {
      title: 'Sign-in Experience',
      description: 'Customize the sign in experience.',
      tabs: {
        experience: 'Experience',
        methods: 'Sign in methods',
        others: 'Others',
      },
      branding: {
        title: 'BRANDING',
        primary_color: 'Primary color',
        dark_primary_color: 'Primary color (Dark)',
        dark_mode: 'Enable Dark Mode',
        dark_mode_description:
          'Enabling this setting will auto generate the dark mode color. You app won’t have dark mode if it’s turned off.',
        ui_style: 'Define your UI style',
        styles: {
          logo_slogan: 'Logo + slogan',
          logo: 'Logo',
        },
        logo_image_url: 'Logo image URL',
        slogan: 'Slogan',
        slogan_placeholder: 'Unleash your creativity',
      },
      terms_of_use: {
        title: 'TERMS OF USE',
        enable: 'Enable Terms of use',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
        terms_of_use: 'Terms of use',
        terms_of_use_placeholder: 'Terms of use url',
      },
      sign_in_methods: {
        title: 'SIGN IN METHODS',
        primary: 'Primary sign in method',
        enable_secondary: 'Enable secondary sign in',
        enable_secondary_description:
          "Once it's turned on, you app will support more sign in method(s) besides the primary one. ",
        methods: 'Sign in method',
        methods_sms: 'Phone number sign in',
        methods_email: 'Email sign in',
        methods_social: 'Social sign in',
        methods_username: 'Username-with-password sign in',
        methods_primary_tag: '(Primary)',
        define_social_methods: 'Define social sign in methods',
        transfer: {
          title: 'Social connectors',
          footer: {
            not_in_list: 'Not in the list?',
            set_up_more: 'Set up more',
            go_to: 'social connectors or go to “Connectors” section.',
          },
        },
      },
      others: {
        forgot_password: {
          title: 'FORGOT PASSWORD',
          enable: 'Enable forgot password',
          enable_description:
            'Once it’s turned on, you app will support more sign in method(s) besides the primary one. ',
        },
        languages: {
          title: 'LANGUAGES',
          mode: 'Language mode',
          auto: 'Auto',
          fixed: 'Fixed',
          fallback: 'Fallback languages',
          languages: {
            english: 'English',
            chinese: 'Chinese',
          },
        },
      },
    },
    settings: {
      title: '设置',
      description: '全局设置',
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
      saved: '已保存',
    },
  },
};

const errors = {
  auth: {
    authorization_header_missing: 'Authorization 请求 header 遗漏。',
    authorization_token_type_not_supported: '不支持的 authorization 类型。',
    unauthorized: '未授权。请检查相关 credentials 和 scope。',
    jwt_sub_missing: 'JWT 中找不到 `sub`。',
  },
  guard: {
    invalid_input: '请求内容有误。',
    invalid_pagination: '分页参数有误。',
  },
  oidc: {
    aborted: '用户终止了交互。',
    invalid_scope: '不支持的 scope: {{scopes}}。',
    invalid_scope_plural: '不支持的 scope: {{scopes}}。',
    invalid_token: 'token 无效。',
    invalid_client_metadata: '无效 client metadata。',
    insufficient_scope: '请求 token 缺少一下权限: {{scopes}}。',
    invalid_request: '请求失败。',
    invalid_grant: '授权失败。',
    invalid_redirect_uri: '无效返回链接, 该 redirect_uri 未被此应用注册。',
    access_denied: '拒绝访问。',
    invalid_target: '请求资源无效。',
    unsupported_grant_type: '不支持的 grant_type。',
    unsupported_response_mode: '不支持的 response_mode。',
    unsupported_response_type: '不支持的 response_type。',
    provider_error: 'OIDC 错误: {{message}}。',
  },
  user: {
    username_exists_register: '用户名已被注册。',
    email_exists_register: '邮箱地址已被注册。',
    phone_exists_register: '手机号码已被注册。',
    invalid_email: '邮箱地址不正确。',
    invalid_phone: '手机号码不正确。',
    email_not_exists: '邮箱地址尚未注册。',
    phone_not_exists: '手机号码尚未注册。',
    identity_not_exists: '该社交账号尚未注册。',
    identity_exists: '该社交账号已被注册。',
  },
  password: {
    unsupported_encryption_method: '不支持的加密方法 {{name}}。',
    pepper_not_found: '密码 pepper 未找到。请检查 core 的环境变量。',
  },
  session: {
    not_found: 'Session not found. Please go back and sign in again.',
    invalid_credentials: '用户名或密码错误，请检查您的输入。',
    invalid_sign_in_method: '当前登录方式不可用。',
    insufficient_info: '登录信息缺失，请检查您的输入。',
    invalid_connector_id: '无法找到 ID 为 {{connectorId}} 的可用连接器。',
    connector_id_mismatch: '传入的连接器 ID 与 session 中保存的记录不一致。',
    connector_session_not_found: '无法找到连接器登录信息，请尝试重新登录。',
    unauthorized: '请先登录。',
    unsupported_prompt_name: '不支持的 prompt name。',
  },
  connector: {
    general: '连接器发生未知错误。',
    not_found: '找不到可用的 {{type}} 类型的连接器。',
    not_enabled: '连接器尚未启用。',
    invalid_config: '连接器配置错误。',
    template_not_found: '无法从连接器配置中找到对应的模板。',
    access_token_invalid: '当前连接器的 access_token 无效。',
    oauth_code_invalid: '无法获取 access_token，请检查授权 code 是否有效。',
    more_than_one_sms: '同时存在超过 1 个短信连接器。',
    more_than_one_email: '同时存在超过 1 个邮件连接器。',
    db_connector_type_mismatch: '数据库中存在一个类型不匹配的连接器。',
  },
  passcode: {
    phone_email_empty: '手机号与邮箱地址均为空。',
    not_found: '验证码不存在，请先请求发送验证码。',
    phone_mismatch: '手机号码不匹配. 请尝试请求新的验证码。',
    email_mismatch: '邮箱地址不匹配. 请尝试请求新的验证码。',
    code_mismatch: '验证码不正确。',
    expired: '验证码已过期. 请尝试请求新的验证码。',
    exceed_max_try: '超过最大验证次数. 请尝试请求新的验证码。',
  },
  sign_in_experiences: {
    empty_content_url_of_terms_of_use:
      '空的《用户协议》内容链接。当启用《用户协议》时，请添加其内容链接。',
    empty_slogan: '空的标语。当使用包含标语的 UI 风格时，请添加标语。',
    empty_social_connectors:
      '空的 social 连接器。当启用社交网络连接器的登录方式时，请添加可用的 social 连接器。',
    enabled_connector_not_found: '未找到可用的 {{type}} 类型的连接器。',
    invalid_social_connectors:
      '无效的 social 连接器。请确认你选择的所有连接器都可用，并且是 social 类型的。',
    not_one_and_only_one_primary_sign_in_method: '主要的登录方式必须有且仅有一个，请检查你的输入。',
  },
  swagger: {
    invalid_zod_type: '无效的 Zod 类型，请检查路由 guard 配置。',
  },
  entity: {
    create_failed: '创建 {{name}} 失败。',
    not_exists: '该 {{name}} 不存在。',
    not_exists_with_id: 'ID 为 `{{id}}` 的 {{name}} 不存在。',
    not_found: '该资源不存在',
  },
};

const zhCN: typeof en = Object.freeze({
  translation,
  errors,
});

export default zhCN;
/* eslint-enable max-lines */
