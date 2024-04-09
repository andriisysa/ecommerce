import { ReactNode } from 'react';

import AppBar from './AppBar';
import Footer from './Footer';
import styles from './styles.module.scss';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <AppBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
