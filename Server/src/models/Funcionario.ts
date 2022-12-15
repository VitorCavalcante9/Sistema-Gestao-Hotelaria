import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BeneficioAssalariado } from './BeneficioAssalariado';
import { BeneficioComum } from './BeneficioComum';
import { Hotel } from './Hotel';
import { Pagamento } from './Pagamento';
import { Requisicao } from './Requisicao';

export type Sexo = 'M' | 'F' | 'Outro';

@Entity('funcionario')
class Funcionario {
  @PrimaryColumn()
  cpf: string;

  @Column()
  hotel_id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column({ type: 'date' })
  data_nascimento: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F', 'Outro'],
  })
  sexo: Sexo;

  @Column()
  salario: number;

  @Column()
  cargo: string;

  @Column()
  tipo_contrato: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.funcionarios)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => BeneficioAssalariado, (beneficio) => beneficio.funcionario, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'funcionario_cpf' })
  beneficios_assalariados: BeneficioAssalariado[];

  @OneToMany(() => BeneficioComum, (beneficio) => beneficio.funcionario, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'funcionario_cpf' })
  beneficios_comuns: BeneficioComum[];

  @OneToMany(() => Requisicao, (requisicao) => requisicao.funcionario, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'funcionario_cpf' })
  requisicoes: Requisicao[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.funcionario, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'funcionario_cpf' })
  pagamentos: Pagamento[];
}

export { Funcionario };
