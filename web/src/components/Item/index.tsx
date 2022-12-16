import React from 'react';

import styles from './index.module.css';

interface ItemProps {
  title: string;
  text: string;
}

export const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
