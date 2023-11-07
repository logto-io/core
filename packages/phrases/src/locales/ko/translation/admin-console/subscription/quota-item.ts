const quota_item = {
  tenant_limit: {
    name: '성주',
    limited: '{{count, number}} 성주',
    limited_other: '{{count, number}} 성주',
    unlimited: '제한 없는 성주',
    not_eligible: '성주를 제거하십시오',
  },
  mau_limit: {
    name: '월간 활성 사용자',
    limited: '{{count, number}} 월간 활성 사용자',
    unlimited: '제한 없는 월간 활성 사용자',
    not_eligible: '모든 사용자를 제거하십시오',
  },
  applications_limit: {
    name: '애플리케이션',
    limited: '{{count, number}} 애플리케이션',
    limited_other: '{{count, number}} 애플리케이션',
    unlimited: '제한 없는 애플리케이션',
    not_eligible: '애플리케이션을 제거하십시오',
  },
  machine_to_machine_limit: {
    name: '기계 간 통신',
    limited: '{{count, number}} 기계 간 앱',
    limited_other: '{{count, number}} 기계 간 앱',
    unlimited: '제한 없는 기계 간 앱',
    not_eligible: '기계 간 앱을 제거하십시오',
  },
  resources_limit: {
    name: 'API 리소스',
    limited: '{{count, number}} API 리소스',
    limited_other: '{{count, number}} API 리소스',
    unlimited: '제한 없는 API 리소스',
    not_eligible: 'API 리소스를 제거하십시오',
  },
  scopes_per_resource_limit: {
    name: '리소스 권한',
    limited: '{{count, number}} 리소스당 권한',
    limited_other: '{{count, number}} 리소스당 권한',
    unlimited: '제한 없는 리소스당 권한',
    not_eligible: '리소스 권한을 제거하십시오',
  },
  custom_domain_enabled: {
    name: '사용자 정의 도메인',
    limited: '사용자 정의 도메인',
    unlimited: '사용자 정의 도메인',
    not_eligible: '사용자 정의 도메인을 제거하십시오',
  },
  omni_sign_in_enabled: {
    /** UNTRANSLATED */
    name: 'SSO',
    /** UNTRANSLATED */
    limited: 'SSO',
    /** UNTRANSLATED */
    unlimited: 'SSO',
    /** UNTRANSLATED */
    not_eligible: 'Disable your SSO',
  },
  built_in_email_connector_enabled: {
    name: '내장된 이메일 커넥터',
    limited: '내장된 이메일 커넥터',
    unlimited: '내장된 이메일 커넥터',
    not_eligible: '내장된 이메일 커넥터를 제거하십시오',
  },
  social_connectors_limit: {
    name: '소셜 커넥터',
    limited: '{{count, number}} 소셜 커넥터',
    limited_other: '{{count, number}} 소셜 커넥터',
    unlimited: '제한 없는 소셜 커넥터',
    not_eligible: '소셜 커넥터를 제거하십시오',
  },
  standard_connectors_limit: {
    name: '무료 표준 커넥터',
    limited: '{{count, number}} 무료 표준 커넥터',
    limited_other: '{{count, number}} 무료 표준 커넥터',
    unlimited: '제한 없는 표준 커넥터',
    not_eligible: '표준 커넥터를 제거하십시오',
  },
  roles_limit: {
    name: '역할',
    limited: '{{count, number}} 역할',
    limited_other: '{{count, number}} 역할',
    unlimited: '제한 없는 역할',
    not_eligible: '역할을 제거하십시오',
  },
  scopes_per_role_limit: {
    name: '역할 권한',
    limited: '{{count, number}} 역할당 권한',
    limited_other: '{{count, number}} 역할당 권한',
    unlimited: '제한 없는 역할당 권한',
    not_eligible: '역할 권한을 제거하십시오',
  },
  hooks_limit: {
    name: 'Webhooks',
    limited: '{{count, number}}개의 Webhook',
    limited_other: '{{count, number}}개의 Webhooks',
    unlimited: '무제한 Webhooks',
    not_eligible: '웹훅을 삭제하세요',
  },
  organization_enabled: {
    /** UNTRANSLATED */
    name: 'Organization',
    /** UNTRANSLATED */
    limited: 'Organization',
    /** UNTRANSLATED */
    unlimited: 'Organization',
    /** UNTRANSLATED */
    not_eligible: 'Remove your organizations',
  },
  audit_logs_retention_days: {
    name: '감사 로그 보존 기간',
    limited: '감사 로그 보존 기간: {{count, number}} 일',
    limited_other: '감사 로그 보존 기간: {{count, number}} 일',
    unlimited: '제한 없는 기간',
    not_eligible: '감사 로그 없음',
  },
  community_support_enabled: {
    name: '커뮤니티 지원',
    limited: '커뮤니티 지원',
    unlimited: '커뮤니티 지원',
    not_eligible: '커뮤니티 지원 없음',
  },
  customer_ticket_support: {
    name: '고객 지원 티켓',
    limited: '{{count, number}} 시간 고객 지원 티켓',
    limited_other: '{{count, number}} 시간 고객 지원 티켓',
    unlimited: '고객 지원 티켓',
    not_eligible: '고객 지원 티켓 없음',
  },
  mfa_enabled: {
    name: 'MFA',
    limited: 'MFA',
    unlimited: 'MFA',
    not_eligible: 'MFA 비활성화',
  },
};

export default Object.freeze(quota_item);
