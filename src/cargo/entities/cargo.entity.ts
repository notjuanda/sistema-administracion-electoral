import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoCargo } from '../../common/enums/estado-cargo.enum';

@Entity('cargos')
export class Cargo {
  @ApiProperty({ description: 'ID único del cargo', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del cargo', example: 'Alcalde' })
  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @ApiProperty({ description: 'Descripción del cargo', example: 'Cargo de alcalde municipal' })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({ description: 'Estado del cargo', enum: EstadoCargo, example: EstadoCargo.ACTIVO })
  @Column({
    type: 'enum',
    enum: EstadoCargo,
    default: EstadoCargo.ACTIVO
  })
  estado: EstadoCargo;

  @ApiProperty({ description: 'Secciones que afecta este cargo', type: 'array' })
  @ManyToMany('Seccion')
  @JoinTable({
    name: 'cargos_secciones',
    joinColumn: {
      name: 'cargo_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'seccion_id',
      referencedColumnName: 'id'
    }
  })
  secciones: any[];

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
} 