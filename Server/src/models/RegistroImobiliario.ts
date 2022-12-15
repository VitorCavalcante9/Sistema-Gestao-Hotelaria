import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from './Hotel';

@Entity('registro_imobiliario')
class RegistroImobiliario {
  @PrimaryColumn()
  num_registro: string;

  @Column()
  metragem: number;

  @Column()
  descricao: string;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToOne(() => Hotel, (hotel) => hotel.registro_imobiliario, {
    cascade: ['insert', 'update'],
  })
  hotel: Hotel;
}

export { RegistroImobiliario };
