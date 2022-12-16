import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import styles from './index.module.css';

export const LandingPage = () => {
  return (
    <>
      <h2 className={styles.title}>Escolha uma entidade</h2>
      <div className={styles.buttonsContainer}>
        <Link to='/hotel'>
          <Button>Hotel</Button>
        </Link>
        <Link to='/quartos'>
          <Button>Quartos</Button>
        </Link>
        <Link to='/hospede'>
          <Button>Hospede</Button>
        </Link>
        <Link to='/reserva'>
          <Button>Reserva</Button>
        </Link>
      </div>
    </>
  );
};
