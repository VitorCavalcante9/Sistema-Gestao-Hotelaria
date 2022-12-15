import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './Hotel';

@Entity('setores')
class Setores {
  @PrimaryGeneratedColumn('increment')
  hotel_id: number;

  @PrimaryColumn()
  setor: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.setores)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}

export { Setores };
