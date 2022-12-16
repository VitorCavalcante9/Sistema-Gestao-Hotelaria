import React, { SelectHTMLAttributes } from 'react';

import styles from './index.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  style?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  style,
  ...rest
}) => {
  return (
    <div className={styles.selectBlock} style={style}>
      <label htmlFor={name}>{label}</label>
      <select value='' id={name} {...rest}>
        <option value='' disabled hidden>
          Selecione uma opção
        </option>

        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
