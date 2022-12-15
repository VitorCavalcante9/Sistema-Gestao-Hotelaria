import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Funcionario } from './Funcionario';

@Entity('beneficio_comum')
class BeneficioComum {
  @PrimaryColumn()
  id: number;

  @Column()
  funcionario_cpf: string;

  @Column()
  tipo: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.beneficios_comuns)
  @JoinColumn({ name: 'funcionario_cpf' })
  funcionario: Funcionario;
}

export { BeneficioComum };
