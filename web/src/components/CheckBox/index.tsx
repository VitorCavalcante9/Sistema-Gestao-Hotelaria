import React, { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const CheckBox: React.FC<InputProps> = ({ name, ...rest }) => {
  return (
    <label className={styles.wrapper} htmlFor={name}>
      {name}
      <input
        id={name}
        name={name}
        className={styles.checkbox}
        type='checkbox'
        {...rest}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};
