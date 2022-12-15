import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './Hotel';
import { Reserva } from './Reserva';

@Entity('piscina')
class Piscina {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  hotel_id: number;

  @Column()
  tipo: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.piscinas, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToMany(() => Reserva, (reserva) => reserva.piscinas, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable({
    name: 'reserva_piscina',
    joinColumn: {
      name: 'piscina_id',
    },
    inverseJoinColumn: {
      name: 'reserva_id',
    },
  })
  reservas: Reserva[];
}

export { Piscina };
