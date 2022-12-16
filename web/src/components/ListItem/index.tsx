import React, { HTMLAttributes } from 'react';

import styles from './index.module.css';

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  handleEdit: () => void;
  handleDelete: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoArea}>{children}</div>
      <div className={styles.buttons}>
        <Button onClick={handleEdit}>Editar</Button>
        <Button isDelete onClick={handleDelete}>
          Excluir
        </Button>
      </div>
    </div>
  );
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isDelete?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isDelete,
  ...rest
}) => {
  const styleButton = isDelete ? styles.deleteButton : styles.editButton;

  return (
    <button className={`${styles.button} ${styleButton}`} {...rest}>
      {children}
    </button>
  );
};
