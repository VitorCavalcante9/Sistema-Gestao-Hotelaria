import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { Estabelecimento } from './Estabelecimento';
import { Hotel } from './Hotel';
import { Movimentacao } from './Movimentacao';

@Entity('aluguel')
class Aluguel {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  estabelecimento_cnpj: string;

  @Column()
  valor_base: number;

  @Column()
  valor_juros: number;

  @Column()
  desconto: number;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.alugueis
  )
  @JoinColumn({ name: 'estabelecimento_cnpj' })
  estabelecimento: Estabelecimento;

  @ManyToOne(() => Movimentacao, (movimentacao) => movimentacao.alugueis, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({ name: 'movimentacao_aluguel' })
  movimentacoes: Movimentacao[];
}

export { Aluguel };
