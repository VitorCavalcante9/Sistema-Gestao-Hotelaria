import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from './Hotel';
import { Servico } from './Servico';

@Entity('terceirizado')
class Terceirizado {
  @PrimaryColumn()
  cnpj: string;

  @Column()
  tipo: string;

  @Column()
  nome_fantasia: string;

  @OneToMany(() => Servico, (servico) => servico.terceirizado, {
    cascade: ['insert', 'update', 'remove'],
  })
  servicos: Servico[];
}

export { Terceirizado };
