import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EspacoEventos } from './EspacoEventos';

@Entity('tipos_uso')
class TiposUso {
  @PrimaryColumn()
  hotel_id: number;

  @Column()
  capacidade: number;

  @Column()
  infraestrutura: string;

  @Column()
  status_limpeza: string;

  @ManyToOne(() => EspacoEventos, (espaco_eventos) => espaco_eventos.tipos_uso)
  @JoinColumn({ name: 'hotel_id' })
  espaco_eventos: EspacoEventos;
}

export { TiposUso };
