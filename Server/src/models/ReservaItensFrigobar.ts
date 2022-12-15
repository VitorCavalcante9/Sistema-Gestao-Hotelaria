import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from './Hotel';
import { ItensFrigobar } from './ItensFrigobar';

@Entity('reserva_itens_frigobar')
class ReservaItensFrigobar {
  @PrimaryColumn()
  reserva_id: number;

  @PrimaryColumn()
  item_frigobar_id: number;

  @Column()
  quantidade: number;

  @PrimaryColumn()
  quarto_id: number;

  @ManyToOne(
    () => ItensFrigobar,
    (item_frigobar) => item_frigobar.reserva_itens,
    {
      cascade: ['insert', 'update', 'remove'],
    }
  )
  @JoinColumn([{ name: 'quarto_id' }, { name: 'reserva_id' }])
  item_frigobar: ItensFrigobar;
}

export { ReservaItensFrigobar };
