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
import { ReservaArmario } from './ReservaArmario';

@Entity('armario')
class Armario {
  @PrimaryColumn()
  id: number;

  @Column()
  hotel_id: number;

  @Column()
  preco_diario: number;

  @Column()
  status: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.armarios)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => ReservaArmario, (reserva) => reserva.armario, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'reserva_id' })
  reservas: ReservaArmario[];
}

export { Armario };
