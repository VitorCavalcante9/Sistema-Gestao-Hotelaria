import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Hotel } from './Hotel';
import { Reserva } from './Reserva';
import { ReservaGaragem } from './ReservaGaragem';

@Entity('garagem')
class Garagem {
  @PrimaryColumn()
  id: number;

  @Column()
  hotel_id: number;

  @Column()
  preco_diario: number;

  @Column()
  capacidade: number;

  @Column()
  tipo: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.garagens)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => ReservaGaragem, (reserva) => reserva.garagem, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'reserva_id' })
  reservas: ReservaGaragem[];
}

export { Garagem };
