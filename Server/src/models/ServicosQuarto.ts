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
import { Reserva } from './Reserva';

@Entity('servicos_quarto')
class ServicosQuarto {
  @PrimaryColumn()
  id: number;

  @Column()
  reserva_id: number;

  @Column()
  nome: string;

  @Column()
  preco: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.servicos_quarto)
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;
}

export { ServicosQuarto };
