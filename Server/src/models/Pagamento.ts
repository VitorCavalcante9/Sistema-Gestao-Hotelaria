import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Funcionario } from './Funcionario';
import { Movimentacao } from './Movimentacao';

@Entity('pagamento')
class Pagamento {
  @PrimaryColumn()
  id: string;

  @Column()
  funcionario_cpf: string;

  @Column()
  valor_base: number;

  @Column()
  acrescimo: number;

  @Column()
  desconto: number;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.pagamentos)
  @JoinColumn({ name: 'funcionario_cpf' })
  funcionario: Funcionario;

  @ManyToMany(() => Movimentacao, (movimentacao) => movimentacao.pagamentos, {
    cascade: ['update'],
  })
  @JoinTable({ name: 'movimentacao_pagamento' })
  movimentacoes: Movimentacao[];
}

export { Pagamento };
