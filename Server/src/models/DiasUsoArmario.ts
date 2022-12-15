import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ReservaArmario } from './ReservaArmario';

@Entity('dias_uso_armario')
class DiasUsoArmario {
  @PrimaryColumn()
  token_armario: string;

  @PrimaryColumn()
  dia: string;

  @ManyToOne(() => ReservaArmario, (reserva) => reserva.dias_uso, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'token_garagem' })
  reserva_armario: ReservaArmario;
}

export { DiasUsoArmario };
