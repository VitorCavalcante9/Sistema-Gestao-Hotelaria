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
import { Quarto } from './Quarto';
import { ReservaItensFrigobar } from './ReservaItensFrigobar';

@Entity('itens_frigobar')
class ItensFrigobar {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  quarto_id: number;

  @Column()
  nome: string;

  @Column()
  preco: number;

  @ManyToOne(() => Quarto, (quarto) => quarto.amenidades)
  @JoinColumn({ name: 'quarto_id' })
  quarto: Quarto;

  @ManyToOne(
    () => ReservaItensFrigobar,
    (reserva_itens) => reserva_itens.item_frigobar,
    {
      cascade: ['insert', 'update'],
    }
  )
  @JoinColumn([{ name: 'quarto_id' }, { name: 'reserva_id' }])
  reserva_itens: ReservaItensFrigobar[];
}

export { ItensFrigobar };
