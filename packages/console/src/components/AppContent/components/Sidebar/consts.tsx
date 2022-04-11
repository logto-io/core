import React, { FC, ReactNode } from 'react';
import { TFuncKey } from 'react-i18next';

import Contact from './components/Contact';
import BarGraph from './icons/BarGraph';
import Bolt from './icons/Bolt';
import Box from './icons/Box';
import Cloud from './icons/Cloud';
import Connection from './icons/Connection';
import ContactIcon from './icons/Contact';
import Document from './icons/Document';
import List from './icons/List';
import UserProfile from './icons/UserProfile';
import Web from './icons/Web';

type SidebarItem = {
  Icon: FC;
  title: TFuncKey<'translation', 'admin_console.tabs'>;
  modal?: (isOpen: boolean, onCancel: () => void) => ReactNode;
};

type SidebarSection = {
  title: TFuncKey<'translation', 'admin_console.tab_sections'>;
  items: SidebarItem[];
};

export const sections: SidebarSection[] = [
  {
    title: 'overview',
    items: [
      {
        Icon: Bolt,
        title: 'get_started',
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
        Icon: Cloud,
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
    title: 'help_and_support',
    items: [
      {
        Icon: ContactIcon,
        title: 'contact_us',
        modal: (isOpen, onCancel) => <Contact isOpen={isOpen} onCancel={onCancel} />,
      },
      {
        Icon: Document,
        title: 'documentation',
      },
    ],
  },
];
