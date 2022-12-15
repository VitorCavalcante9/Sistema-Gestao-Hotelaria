import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Funcionario } from './Funcionario';

@Entity('beneficio_assalariado')
class BeneficioAssalariado {
  @PrimaryColumn()
  id: number;

  @Column()
  funcionario_cpf: string;

  @Column()
  tipo: string;

  @Column()
  valor: number;

  @ManyToOne(
    () => Funcionario,
    (funcionario) => funcionario.beneficios_assalariados
  )
  @JoinColumn({ name: 'funcionario_cpf' })
  funcionario: Funcionario;
}

export { BeneficioAssalariado };
