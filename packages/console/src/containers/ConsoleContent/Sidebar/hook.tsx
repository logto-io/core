import { type Optional } from '@silverhand/essentials';
import type { TFuncKey } from 'i18next';
import type { FC, ReactNode } from 'react';

import BarGraph from '@/assets/images/bar-graph.svg';
import Bolt from '@/assets/images/bolt.svg';
import Box from '@/assets/images/box.svg';
import Connection from '@/assets/images/connection.svg';
import ContactIcon from '@/assets/images/contact.svg';
import Document from '@/assets/images/document.svg';
import Hook from '@/assets/images/hook.svg';
import List from '@/assets/images/list.svg';
import UserProfile from '@/assets/images/profile.svg';
import ResourceIcon from '@/assets/images/resource.svg';
import Role from '@/assets/images/role.svg';
import Web from '@/assets/images/web.svg';
import useDocumentationUrl from '@/hooks/use-documentation-url';
import useUserPreferences from '@/hooks/use-user-preferences';

import Contact from './components/Contact';

type SidebarItem = {
  Icon: FC;
  title: TFuncKey<'translation', 'admin_console.tabs'>;
  isHidden?: boolean;
  modal?: (isOpen: boolean, onCancel: () => void) => ReactNode;
  externalLink?: string;
};

type SidebarSection = {
  title: TFuncKey<'translation', 'admin_console.tab_sections'>;
  items: SidebarItem[];
};

const findFirstItem = (sections: SidebarSection[]): Optional<SidebarItem> => {
  for (const section of sections) {
    const found = section.items.find((item) => !item.isHidden);

    if (found) {
      return found;
    }
  }
};

export const useSidebarMenuItems = (): {
  sections: SidebarSection[];
  firstItem: Optional<SidebarItem>;
} => {
  const {
    data: { getStartedHidden },
  } = useUserPreferences();
  const { documentationSiteUrl } = useDocumentationUrl();

  const sections: SidebarSection[] = [
    {
      title: 'overview',
      items: [
        {
          Icon: Bolt,
          title: 'get_started',
          isHidden: getStartedHidden,
        },
        {
          Icon: BarGraph,
          title: 'dashboard',
        },
      ],
    },
    {
      title: 'resource_management',
      items: [
        {
          Icon: Box,
          title: 'applications',
        },
        {
          Icon: ResourceIcon,
          title: 'api_resources',
        },
        {
          Icon: Web,
          title: 'sign_in_experience',
        },
        {
          Icon: Connection,
          title: 'connectors',
        },
        {
          Icon: Hook,
          title: 'webhooks',
        },
      ],
    },
    {
      title: 'user_management',
      items: [
        {
          Icon: UserProfile,
          title: 'users',
        },
        {
          Icon: List,
          title: 'audit_logs',
        },
      ],
    },
    {
      title: 'access_control',
      items: [
        {
          Icon: Role,
          title: 'roles',
        },
      ],
    },
    {
      title: 'help_and_support',
      items: [
        {
          Icon: ContactIcon,
          title: 'contact_us',
          modal: (isOpen, onCancel) => <Contact isOpen={isOpen} onCancel={onCancel} />,
        },
        {
          Icon: Document,
          title: 'docs',
          externalLink: documentationSiteUrl,
        },
      ],
    },
  ];

  return { sections, firstItem: findFirstItem(sections) };
};
