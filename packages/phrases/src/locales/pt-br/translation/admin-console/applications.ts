const applications = {
  page_title: 'Aplicativos',
  title: 'Aplicativos',
  subtitle:
    'Configure um aplicativo móvel, single page, machine to machine ou tradicional para usar o Logto para autenticação',
  create: 'Criar aplicativo',
  application_name: 'Nome do Aplicativo',
  application_name_placeholder: 'Meu aplicativo',
  application_description: 'Descrição do aplicativo',
  application_description_placeholder: 'Digite a descrição do seu aplicativo',
  select_application_type: 'Selecione um tipo de aplicativo',
  no_application_type_selected: 'Você ainda não selecionou nenhum tipo de aplicativo',
  application_created:
    'O aplicativo {{name}} foi criado com sucesso.\nAgora conclua as configurações do aplicativo.',
  app_id: 'ID do aplicativo',
  type: {
    native: {
      title: 'Aplicativo Nativo',
      subtitle: 'Um aplicativo executado em um ambiente nativo',
      description: 'Ex: aplicativo iOS, aplicativo Android',
    },
    spa: {
      title: 'Aplicativo de Página Única',
      subtitle:
        'Um aplicativo que é executado em um navegador da Web e atualiza dinamicamente os dados no local',
      description: 'Ex: aplicativo React DOM, aplicativo Vue',
    },
    traditional: {
      title: 'Web Tradicional',
      subtitle: 'Um aplicativo que renderiza e atualiza páginas apenas pelo servidor da web',
      description: 'Ex: aplicativo Next.js, PHP',
    },
    machine_to_machine: {
      title: 'Máquina-a-Máquina',
      subtitle: 'Um aplicativo (geralmente um serviço) que fala diretamente com os recursos',
      description: 'Ex: serviço de backend',
    },
  },
  guide: {
    header_title: 'Select a framework or tutorial', // UNTRANSLATED
    modal_header_title: 'Start with SDK and guides', // UNTRANSLATED
    header_subtitle: 'Jumpstart your app development process with our pre-built SDK and tutorials.', // UNTRANSLATED
    start_building: 'Start Building', // UNTRANSLATED
    categories: {
      featured: 'Popular and for you', // UNTRANSLATED
      Traditional: 'Traditional web app', // UNTRANSLATED
      SPA: 'Single page app', // UNTRANSLATED
      Native: 'Native', // UNTRANSLATED
      MachineToMachine: 'Machine-to-machine', // UNTRANSLATED
    },
    filter: {
      title: 'Filter framework', // UNTRANSLATED
      placeholder: 'Search for framework', // UNTRANSLATED
    },
    get_sample_file: 'Obter amostra',
    title: 'O aplicativo foi criado com sucesso',
    subtitle:
      'Agora siga as etapas abaixo para concluir as configurações do aplicativo. Selecione o tipo de SDK para continuar.',
    description_by_sdk:
      'Este guia de início rápido demonstra como integrar o Logto ao aplicativo {{sdk}}',
    do_not_need_tutorial:
      'If you don’t need a tutorial, you can continue without a framework guide', // UNTRANSLATED
    create_without_framework: 'Create app without framework', // UNTRANSLATED
    finish_and_done: 'Concluído',
    cannot_find_guide: "Can't find your guide?", // UNTRANSLATED
    describe_guide_looking_for: 'Describe the guide you are looking for', // UNTRANSLATED
    describe_guide_looking_for_placeholder: 'E.g., I want to integrate Logto into my Angular app.', // UNTRANSLATED
    request_guide_successfully: 'Your request has been successfully submitted. Thank you!', // UNTRANSLATED
  },
  placeholder_title: 'Selecione um tipo de aplicativo para continuar',
  placeholder_description:
    'O Logto usa uma entidade de aplicativo para OIDC para ajudar nas tarefas, como identificar seus aplicativos, gerenciar o login e criar logs de auditoria.',
};

export default Object.freeze(applications);
