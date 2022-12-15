import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Funcionario } from './Funcionario';
import { Hospede } from './Hospede';

@Entity('requisicao')
class Requisicao {
  @PrimaryColumn()
  id: number;

  @Column()
  funcionario_cpf: string;

  @Column()
  hospede_cpf: string;

  @Column()
  status: string;

  @Column()
  tipo: string;

  @Column()
  texto: string;

  @Column()
  data_abertura: Date;

  @Column()
  data_fechamento: Date;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.requisicoes)
  @JoinColumn({ name: 'funcionario_cpf' })
  funcionario: Funcionario;

  @ManyToOne(() => Hospede, (hospede) => hospede.requisicoes)
  @JoinColumn({ name: 'hospede_cpf' })
  hospede: Hospede;
}

export { Requisicao };
