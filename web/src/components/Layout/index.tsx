import React, { HTMLAttributes } from 'react';
import styles from './index.module.css';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainBlock}>{children}</div>
    </div>
  );
};
