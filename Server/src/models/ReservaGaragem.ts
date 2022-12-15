import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DiasUsoGaragem } from './DiasUsoGaragem';
import { Garagem } from './Garagem';
import { Reserva } from './Reserva';

@Entity('garagem')
class ReservaGaragem {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column()
  reserva_id: number;

  @Column()
  garagem_id: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.garagens, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;

  @ManyToOne(() => Garagem, (garagem) => garagem.reservas, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'garagem_id' })
  garagem: Garagem;

  @OneToMany(() => DiasUsoGaragem, (dias_uso) => dias_uso.reserva_garagem, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'token_garagem' })
  dias_uso: DiasUsoGaragem[];
}

export { ReservaGaragem };
