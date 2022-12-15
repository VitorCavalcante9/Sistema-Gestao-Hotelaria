import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { ReservaGaragem } from './ReservaGaragem';

@Entity('dias_uso_garagem')
class DiasUsoGaragem {
  @PrimaryColumn()
  token_garagem: string;

  @PrimaryColumn()
  dia: string;

  @ManyToOne(() => ReservaGaragem, (reserva) => reserva.dias_uso, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'token_garagem' })
  reserva_garagem: ReservaGaragem;
}

export { DiasUsoGaragem };
