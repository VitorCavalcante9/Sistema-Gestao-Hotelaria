import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Garagem } from './Garagem';
import { Hospede } from './Hospede';
import { Movimentacao } from './Movimentacao';
import { Piscina } from './Piscina';
import { Quarto } from './Quarto';
import { ReservaArmario } from './ReservaArmario';
import { ReservaGaragem } from './ReservaGaragem';
import { ServicosQuarto } from './ServicosQuarto';

@Entity('reserva')
class Reserva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quarto_id: number;

  @Column()
  hospede_cpf: string;

  @Column({ type: 'datetime' })
  data_checkin: Date;

  @Column({ type: 'datetime' })
  data_checkout: Date;

  @Column()
  preco: number;

  @Column()
  num_quartos: number;

  @ManyToMany(() => Movimentacao, (movimentacao) => movimentacao.reservas, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({ name: 'movimentacao_reserva' })
  movimentacoes: Movimentacao[];

  @ManyToMany(() => Piscina, (piscina) => piscina.reservas, {
    cascade: ['insert', 'update'],
  })
  piscinas: Piscina[];

  @OneToMany(() => ReservaGaragem, (garagem) => garagem.reserva, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'reserva_id' })
  garagens: ReservaGaragem[];

  @OneToMany(() => ReservaArmario, (armario) => armario.reserva, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'reserva_id' })
  armarios: ReservaArmario[];

  @ManyToOne(() => Quarto, (quarto) => quarto.reservas)
  @JoinColumn({ name: 'quarto_id' })
  quarto: Quarto;

  @ManyToOne(() => Hospede, (hospede) => hospede.reservas)
  @JoinColumn({ name: 'hospede_cpf' })
  hospede: Hospede;

  @OneToMany(
    () => ServicosQuarto,
    (servicos_quarto) => servicos_quarto.reserva,
    {
      cascade: ['insert', 'update', 'remove'],
    }
  )
  @JoinColumn({ name: 'reserva_id' })
  servicos_quarto: ServicosQuarto[];
}

export { Reserva };
