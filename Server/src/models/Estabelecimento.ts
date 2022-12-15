import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Aluguel } from './Aluguel';
import { Hotel } from './Hotel';

@Entity('estabelecimento')
class Estabelecimento {
  @PrimaryColumn()
  cnpj: string;

  @Column()
  nome_fantasia: string;

  @Column()
  tipo_condomino: string;

  @ManyToMany(() => Hotel, (hotel) => hotel.estabelecimentos, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({ name: 'hotel_estabelecimento' })
  hoteis: Hotel[];

  @OneToMany(() => Aluguel, (aluguel) => aluguel.estabelecimento, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'estabelecimento_cnpj' })
  alugueis: Aluguel[];
}

export { Estabelecimento };
