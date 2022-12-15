import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

import { Sexo } from './Funcionario';
import { Requisicao } from './Requisicao';
import { Reserva } from './Reserva';

@Entity('hospede')
class Hospede {
  @PrimaryColumn()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  data_nascimento: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F', 'Outro'],
  })
  sexo: Sexo;

  @Column()
  pontos: number;

  @OneToMany(() => Requisicao, (requisicao) => requisicao.hospede, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hospede_cpf' })
  requisicoes: Requisicao[];

  @OneToMany(() => Reserva, (reserva) => reserva.quarto, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'quarto_id' })
  reservas: Reserva[];
}

export { Hospede };
