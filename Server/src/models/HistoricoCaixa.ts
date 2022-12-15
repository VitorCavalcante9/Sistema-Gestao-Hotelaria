import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from './Hotel';
import { Movimentacao } from './Movimentacao';

@Entity('historico_caixa')
class HistoricoCaixa {
  @PrimaryColumn()
  id: number;

  @Column()
  movimentacao_id: string;

  @Column()
  valor_atual: number;

  @ManyToOne(() => Movimentacao, (movimentacao) => movimentacao.historico_caixa)
  @JoinColumn({ name: 'movimentacao_id' })
  movimentacao: Movimentacao;
}

export { HistoricoCaixa };
