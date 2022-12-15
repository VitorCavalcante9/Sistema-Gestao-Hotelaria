import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Hotel } from './Hotel';
import { Movimentacao } from './Movimentacao';
import { Terceirizado } from './Terceirizado';

@Entity('servico')
class Servico {
  @PrimaryColumn()
  id: number;

  @Column()
  terceirizado_cnpj: string;

  @Column()
  movimentacao_id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Movimentacao, (movimentacao) => movimentacao.servicos)
  @JoinColumn({ name: 'movimentacao_id' })
  movimentacao: Movimentacao;

  @ManyToOne(() => Terceirizado, (terceirizado) => terceirizado.servicos)
  @JoinColumn({ name: 'terceirizado_cnpj' })
  terceirizado: Terceirizado;
}

export { Servico };
