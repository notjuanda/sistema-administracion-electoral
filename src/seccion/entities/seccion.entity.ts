import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PuntoSeccion } from './punto-seccion.entity';
import { EstadoSeccion } from '../../common/enums/estado-seccion.enum';

@Entity('secciones')
export class Seccion {
    @ApiProperty({ description: 'ID único de la sección', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombre de la sección', example: 'Sección Centro' })
    @Column({ type: 'varchar', length: 100, unique: true })
    nombre: string;

    @ApiProperty({ description: 'Descripción de la sección', example: 'Sección electoral del centro de la ciudad' })
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @ApiProperty({ description: 'Estado de la sección', enum: EstadoSeccion, example: EstadoSeccion.ACTIVA })
    @Column({
        type: 'enum',
        enum: EstadoSeccion,
        default: EstadoSeccion.ACTIVA
    })
    estado: EstadoSeccion;

    @ApiProperty({ description: 'Puntos que definen el área de la sección', type: () => [PuntoSeccion] })
    @OneToMany(() => PuntoSeccion, punto => punto.seccion, {
        cascade: true,
        eager: true
    })
    puntos: PuntoSeccion[];

    @ApiProperty({ description: 'Fecha de creación' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de última actualización' })
    @UpdateDateColumn()
    updatedAt: Date;
} 