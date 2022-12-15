import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DiasUsoArmario } from './DiasUsoArmario';
import { Armario } from './Armario';
import { Reserva } from './Reserva';

@Entity('Armario')
class ReservaArmario {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column()
  reserva_id: number;

  @Column()
  armario_id: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.armarios, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;

  @ManyToOne(() => Armario, (armario) => armario.reservas, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'armario_id' })
  armario: Armario;

  @OneToMany(() => DiasUsoArmario, (dias_uso) => dias_uso.reserva_armario, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'token_armario' })
  dias_uso: DiasUsoArmario[];
}

export { ReservaArmario };
