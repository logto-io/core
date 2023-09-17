const api_resource_details = {
  page_title: 'Detalles del recurso API',
  back_to_api_resources: 'Volver a los recursos de API',
  settings_tab: 'Configuración',
  permissions_tab: 'Permisos',
  settings: 'Configuración',
  settings_description:
    'Los recursos de API, también conocidos como indicadores de recurso, indican los servicios o recursos de destino que se solicitarán, generalmente, una variable de formato URI que representa la identidad del recurso.',
  management_api_settings_description:
    'La API de administración de Logto es una colección completa de API que permiten a los administradores administrar una amplia gama de tareas relacionadas con la identidad, hacer cumplir políticas de seguridad y cumplir con regulaciones y estándares.',
  /** UNTRANSLATED */
  management_api_notice:
    'This API represents Logto entity and cannot be modified or deleted. You can use management API for a wide range of identity related tasks. <a>Learn more</a>',
  token_expiration_time_in_seconds: 'Tiempo de expiración del token (en segundos)',
  token_expiration_time_in_seconds_placeholder: 'Ingrese el tiempo de expiración de su token',
  delete_description:
    'Esta acción no se puede deshacer. Eliminará permanentemente el recurso de API. Por favor, ingrese el nombre del recurso de api <span>{{name}}</span> para confirmar.',
  enter_your_api_resource_name: 'Ingrese el nombre de su recurso de API',
  api_resource_deleted: 'El recurso de API {{name}} ha sido eliminado exitosamente',
  permission: {
    create_button: 'Crear permiso',
    create_title: 'Crear permiso',
    create_subtitle: 'Define los permisos (scopes) necesarios para esta API.',
    confirm_create: 'Crear permiso',
    name: 'Nombre del permiso',
    name_placeholder: 'leer:recurso',
    forbidden_space_in_name: 'El nombre del permiso no debe contener espacios.',
    description: 'Descripción',
    description_placeholder: 'Capacidad para leer los recursos',
    permission_created: 'El permiso {{name}} se ha creado correctamente',
    delete_description:
      'Si se elimina este permiso, el usuario que tenía este permiso perderá el acceso otorgado por él.',
    deleted: '¡El permiso "{{name}}" se eliminó con éxito.',
  },
};

export default Object.freeze(api_resource_details);
