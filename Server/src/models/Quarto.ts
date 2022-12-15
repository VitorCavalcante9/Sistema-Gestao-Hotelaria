import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Amenidade } from './Amenidade';
import { Hotel } from './Hotel';
import { Reserva } from './Reserva';

@Entity('quarto')
class Quarto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  hotel_id: number;

  @Column()
  status: string;

  @Column()
  preco: number;

  @Column()
  descricao: string;

  @Column()
  tamanho: number;

  @Column()
  status_limpeza: string;

  @Column()
  capacidade: number;

  @Column()
  tipo_acomodacao: string;

  @Column()
  politicas_uso: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.quartos)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Amenidade, (amenidade) => amenidade.quarto, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'quarto_id' })
  amenidades: Amenidade[];

  @OneToMany(() => Reserva, (reserva) => reserva.quarto, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'quarto_id' })
  reservas: Reserva[];
}

export { Quarto };
