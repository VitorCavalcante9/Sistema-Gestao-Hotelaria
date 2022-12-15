import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Quarto } from './Quarto';

@Entity('amenidade')
class Amenidade {
  @PrimaryColumn()
  id: number;

  @Column()
  quarto_id: number;

  @Column()
  descricao: string;

  @Column()
  tipo: string;

  @ManyToOne(() => Quarto, (quarto) => quarto.amenidades)
  @JoinColumn({ name: 'quarto_id' })
  quarto: Quarto;
}

export { Amenidade };
