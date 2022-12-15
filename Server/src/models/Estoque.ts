import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Hotel } from './Hotel';

@Entity('estoque')
class Estoque {
  @PrimaryColumn()
  id: number;

  @Column()
  hotel_id: string;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column()
  tipo_alimento: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.estoque)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}

export { Estoque };
