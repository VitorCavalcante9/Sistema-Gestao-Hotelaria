import React, { HTMLAttributes } from 'react';

import styles from './index.module.css';

// import TrashIcon from './trash.svg';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  trash?: boolean;
}

export const AddOrTrashButton: React.FC<ButtonProps> = ({ trash, ...rest }) => {
  return (
    <>
      {trash ? (
        <button
          className={`${styles.buttonContainer} ${styles.trashButton}`}
          {...rest}
        ></button>
      ) : (
        <button
          className={`${styles.buttonContainer} ${styles.addButton}`}
          {...rest}
        >
          +
        </button>
      )}
    </>
  );
};
