import React from 'react';

import './scss/normalized.scss';
import * as styles from './App.module.scss';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

export const App = () => {
  return (
    <div className={styles.skeleton}>
      <Topbar />
      <div className={styles.content}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};
