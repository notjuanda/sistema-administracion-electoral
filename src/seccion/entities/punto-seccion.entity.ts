import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Seccion } from './seccion.entity';

@Entity('puntos_seccion')
export class PuntoSeccion {
    @ApiProperty({ description: 'ID único del punto', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Orden del punto en la secuencia', example: 1 })
    @Column({ type: 'int' })
    orden: number;

    @ApiProperty({ description: 'Latitud del punto', example: -17.7833 })
    @Column({ type: 'decimal', precision: 10, scale: 8 })
    latitud: number;

    @ApiProperty({ description: 'Longitud del punto', example: -63.1821 })
    @Column({ type: 'decimal', precision: 11, scale: 8 })
    longitud: number;

    @ApiProperty({ description: 'Sección a la que pertenece el punto', type: () => Seccion })
    @ManyToOne(() => Seccion, seccion => seccion.puntos, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'seccion_id' })
    seccion: Seccion;

    @ApiProperty({ description: 'ID de la sección', example: 1 })
    @Column({ name: 'seccion_id' })
    seccionId: number;
} 