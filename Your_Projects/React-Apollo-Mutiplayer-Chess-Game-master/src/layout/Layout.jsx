import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import { LayoutContextProvider } from './LayoutContext';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <LayoutContextProvider>
      <div className={styles.Layout}>
        <Header />
        <main className={styles.Main}>{children}</main>
        <Footer />
      </div>
    </LayoutContextProvider>
  );
};

export default Layout;
