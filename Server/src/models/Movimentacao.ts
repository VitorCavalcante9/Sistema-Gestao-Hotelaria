import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Reserva } from './Reserva';
import { Aluguel } from './Aluguel';
import { Pagamento } from './Pagamento';
import { HistoricoCaixa } from './HistoricoCaixa';
import { Servico } from './Servico';

@Entity('movimentacao')
class Movimentacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @Column()
  valor: number;

  @Column()
  tipo_movimentacao: string;

  @Column()
  num_nota_fiscal: string;

  @ManyToMany(() => Reserva, (reserva) => reserva.movimentacoes, {
    cascade: ['insert', 'update', 'remove'],
  })
  reservas: Reserva[];

  @ManyToMany(() => Aluguel, (aluguel) => aluguel.movimentacoes, {
    cascade: ['insert', 'update', 'remove'],
  })
  alugueis: Aluguel[];

  @ManyToMany(() => Pagamento, (pagamento) => pagamento.movimentacoes, {
    cascade: ['update', 'remove'],
  })
  pagamentos: Pagamento[];

  @OneToMany(
    () => HistoricoCaixa,
    (historicoCaixa) => historicoCaixa.movimentacao,
    {
      cascade: ['insert', 'update', 'remove'],
    }
  )
  historico_caixa: HistoricoCaixa[];

  @OneToMany(() => Servico, (servico) => servico.movimentacao, {
    cascade: ['insert', 'update', 'remove'],
  })
  servicos: Servico[];
}

export { Movimentacao };
