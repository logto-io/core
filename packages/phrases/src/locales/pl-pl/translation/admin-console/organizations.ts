const organizations = {
  organization: 'Organizacja',
  page_title: 'Organizacje',
  title: 'Organizacje',
  subtitle:
    'Organizacja to zbiór użytkowników, który obejmuje zespoły, klientów biznesowych i partnerów firm korzystających z Twoich aplikacji.',
  organization_template: 'Szablon organizacji',
  organization_id: 'ID organizacji',
  members: 'Członkowie',
  create_organization: 'Utwórz organizację',
  setup_organization: 'Skonfiguruj swoją organizację',
  organization_list_placeholder_title: 'Organizacja',
  organization_list_placeholder_text:
    'Organizacja jest zazwyczaj stosowana w aplikacjach wielomandantowych typu SaaS lub podobnych. Funkcja organizacji umożliwia klientom B2B lepsze zarządzanie swoimi partnerami i klientami oraz dostosowywanie sposobów, w jakie końcowi użytkownicy mają dostęp do ich aplikacji.',
  organization_name_placeholder: 'Moja organizacja',
  organization_description_placeholder: 'Krótki opis organizacji',
  organization_permission: 'Uprawnienie organizacji',
  organization_permission_other: 'Uprawnienia organizacji',
  organization_permission_description:
    'Uprawnienie organizacji odnosi się do autoryzacji dostępu do zasobu w kontekście organizacji. Uprawnienie organizacji powinno być reprezentowane jako znaczący ciąg znaków, stanowiący także nazwę i unikalny identyfikator.',
  organization_permission_delete_confirm:
    'Jeśli to uprawnienie zostanie usunięte, wszystkie role organizacji, w tym to uprawnienie, stracą to uprawnienie, a użytkownicy, którzy mieli to uprawnienie, stracą dostęp do niego.',
  create_permission_placeholder: 'Odczyt historii spotkań',
  permission: 'Uprawnienie',
  permission_other: 'Uprawnienia',
  organization_role: 'Rola organizacji',
  organization_role_other: 'Role organizacji',
  organization_role_description:
    'Rola organizacji to grupowanie uprawnień, które można przypisać użytkownikom. Uprawnienia muszą pochodzić z wcześniej zdefiniowanych uprawnień organizacji.',
  organization_role_delete_confirm:
    'Spowoduje to usunięcie uprawnień związanych z tą rolą od dotkniętych użytkowników oraz usunięcie relacji między rolami organizacji, członkami organizacji i uprawnieniami organizacji.',
  role: 'Rola',
  create_role_placeholder: 'Użytkownicy z uprawnieniami tylko do odczytu',
  search_placeholder: 'Wyszukaj według nazwy lub ID organizacji',
  search_permission_placeholder: 'Wpisz, aby wyszukać i wybrać uprawnienia',
  search_role_placeholder: 'Wpisz, aby wyszukać i wybrać role',
  empty_placeholder: '🤔 Nie masz jeszcze ustawionego żadnego {{entity}}.',
  organization_and_member: 'Organizacja i członek',
  organization_and_member_description:
    'Organizacja to grupa użytkowników i może reprezentować zespoły, klientów biznesowych i firmy partnerskie, a każdy użytkownik jest "Członkiem". Są to podstawowe jednostki do obsługi wymagań wielu najemców.',
  guide: {
    title: 'Rozpocznij od przewodników',
    subtitle: 'Rozpocznij konfigurację swojej organizacji z naszymi przewodnikami',
    introduction: {
      title: 'Zrozummy, jak działa organizacja w Logto',
      section_1: {
        title: 'Organizacja to grupa użytkowników (tożsamości)',
      },
      section_2: {
        title:
          'Szablon organizacji przeznaczony jest do kontroli dostępu wielomandantowych aplikacji',
        description:
          'W wielomandantowych aplikacjach typu SaaS, wiele organizacji często współdzieli ten sam szablon kontroli dostępu, który obejmuje uprawnienia i role. W Logto nazywamy to "szablonem organizacji".',
        permission_description:
          'Uprawnienie organizacji odnosi się do autoryzacji dostępu do zasobu w kontekście organizacji.',
        role_description:
          'Rola organizacji to grupowanie uprawnień organizacji, które można przypisać członkom.',
      },
      section_3: {
        title: 'Wejdź w interakcję z ilustracją, aby zobaczyć, jak wszystko się łączy',
        description:
          'Przyjrzyjmy się przykładowi. John, Sarah należą do różnych organizacji, o różnych rolach w kontekście różnych organizacji. Najedź kursorem na różne moduły i zobacz, co się dzieje.',
      },
    },
    step_1: 'Krok 1: Zdefiniuj uprawnienia organizacji',
    step_2: 'Krok 2: Zdefiniuj role organizacji',
    step_3: 'Krok 3: Utwórz swoją pierwszą organizację',
    step_3_description:
      'Utwórz swoją pierwszą organizację. Posiada ona unikalne ID i służy jako kontener do obsługi różnych tożsamości bardziej zorientowanych na biznes.',
    more_next_steps: 'Więcej następnych kroków',
    add_members: 'Dodaj członków do swojej organizacji',
    add_members_action: 'Dodaj członków wsadowo i przypisz role',
    organization_permissions: 'Uprawnienia organizacji',
    permission_name: 'Nazwa uprawnienia',
    permissions: 'Uprawnienia',
    organization_roles: 'Role organizacji',
    role_name: 'Nazwa roli',
    organization_name: 'Nazwa organizacji',
    admin: 'Administrator',
    member: 'Członek',
    guest: 'Gość',
    role_description: 'Rola "{{role}}" dzieli ten sam szablon organizacji w różnych organizacjach.',
    john: 'John',
    john_tip:
      'John należy do dwóch organizacji, a adres e-mail "john@email.com" to jego jedyny identyfikator. Jest administratorem organizacji A oraz gościem organizacji B.',
    sarah: 'Sarah',
    sarah_tip:
      'Sarah należy do jednej organizacji, a adres e-mail "sarah@email.com" to jej jedyny identyfikator. Jest administratorem organizacji B.',
  },
};

export default Object.freeze(organizations);
