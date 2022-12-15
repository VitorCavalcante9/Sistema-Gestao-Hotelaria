import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from './Hotel';
import { TiposUso } from './TiposUso';

@Entity('espaco_eventos')
class EspacoEventos {
  @PrimaryColumn()
  hotel_id: number;

  @Column()
  capacidade: number;

  @Column()
  infraestrutura: string;

  @Column()
  status_limpeza: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.espaco_eventos)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => TiposUso, (tipos_uso) => tipos_uso.espaco_eventos, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  tipos_uso: TiposUso[];
}

export { EspacoEventos };
