import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Armario } from './Armario';
import { EspacoEventos } from './EspacoEventos';
import { Estabelecimento } from './Estabelecimento';
import { Estoque } from './Estoque';
import { Funcionario } from './Funcionario';
import { Garagem } from './Garagem';
import { Piscina } from './Piscina';
import { Quarto } from './Quarto';
import { RegistroImobiliario } from './RegistroImobiliario';
import { Setores } from './Setores';

@Entity('hotel')
class Hotel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  reg_imobiliario_id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  categoria: string;

  @OneToOne(() => RegistroImobiliario, (regImobiliario) => regImobiliario.hotel)
  @JoinColumn({ name: 'reg_imobiliario_id' })
  registro_imobiliario: RegistroImobiliario;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  funcionarios: Funcionario[];

  @OneToMany(() => Setores, (setores) => setores.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  setores: Setores[];

  @OneToMany(() => Estoque, (estoque) => estoque.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  estoque: Estoque[];

  @OneToMany(() => EspacoEventos, (espaco_eventos) => espaco_eventos.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  espaco_eventos: EspacoEventos[];

  @OneToMany(() => Armario, (armario) => armario.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  armarios: Armario[];

  @OneToMany(() => Garagem, (garagem) => garagem.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  garagens: Garagem[];

  @OneToMany(() => Piscina, (piscina) => piscina.hotel, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'hotel_id' })
  piscinas: Piscina[];

  @OneToMany(() => Quarto, (quarto) => quarto.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'hotel_id' })
  quartos: Quarto[];

  @ManyToMany(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.hoteis,
    {
      cascade: ['insert', 'update', 'remove'],
    }
  )
  estabelecimentos: Estabelecimento[];
}

export { Hotel };
