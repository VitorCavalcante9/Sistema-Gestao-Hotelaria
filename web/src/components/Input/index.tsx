import React, { InputHTMLAttributes } from 'react';

import styles from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.titleInput} htmlFor={name}>
        {name}
      </label>
      <input id={name} name={name} className={styles.input} {...rest} />
    </div>
  );
};
