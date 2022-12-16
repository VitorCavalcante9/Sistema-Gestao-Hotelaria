import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import styles from './index.module.css';

interface ActionButtonsProps {
  createButton: () => void;
  listButton: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  createButton,
  listButton,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonsContainer}>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
      <Button onClick={createButton}>Criar</Button>
      <Button onClick={listButton}>Listar</Button>
    </div>
  );
};
