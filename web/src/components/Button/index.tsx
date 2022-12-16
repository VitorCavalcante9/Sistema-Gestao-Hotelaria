import React, { ButtonHTMLAttributes } from 'react';
import styles from './index.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBlue?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isBlue,
  ...rest
}) => {
  const styleButton = isBlue ? styles.buttonBlue : styles.buttonWhite;

  return (
    <button className={`${styles.button} ${styleButton}`} {...rest}>
      {children}
    </button>
  );
};
