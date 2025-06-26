import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TipoEleccion } from '../../common/enums/tipo-eleccion.enum';
import { EstadoEleccion } from '../../common/enums/estado-eleccion.enum';

@Entity('elecciones')
export class Eleccion {
  @ApiProperty({ description: 'ID único de la elección', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre de la elección', example: 'Elecciones Municipales 2025' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Descripción de la elección', example: 'Elecciones para alcaldes y concejales municipales' })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ description: 'Tipo de elección', enum: TipoEleccion, example: TipoEleccion.MUNICIPAL })
  @Column({
    type: 'enum',
    enum: TipoEleccion
  })
  tipo: TipoEleccion;

  @ApiProperty({ description: 'Fecha de la elección', example: '2025-03-15' })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({ description: 'Estado de la elección', enum: EstadoEleccion, example: EstadoEleccion.PLANIFICADA })
  @Column({
    type: 'enum',
    enum: EstadoEleccion,
    default: EstadoEleccion.PLANIFICADA
  })
  estado: EstadoEleccion;

  @ApiProperty({ description: 'Secciones que participan en esta elección', type: 'array' })
  @ManyToMany('Seccion')
  @JoinTable({
    name: 'elecciones_secciones',
    joinColumn: {
      name: 'eleccion_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'seccion_id',
      referencedColumnName: 'id'
    }
  })
  secciones: any[];

  @ApiProperty({ description: 'Cargos en disputa en esta elección', type: 'array' })
  @ManyToMany('Cargo')
  @JoinTable({
    name: 'elecciones_cargos',
    joinColumn: {
      name: 'eleccion_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'cargo_id',
      referencedColumnName: 'id'
    }
  })
  cargos: any[];

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
} 