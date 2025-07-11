import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Seccion } from '../../seccion/entities/seccion.entity';

@Entity()
export class Recinto {
    @ApiProperty({ example: 1, description: 'ID único del recinto' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Universidad Nur', description: 'Nombre del recinto' })
    @Column()
    nombre: string;

    @ApiProperty({ example: 'Recinto universitario principal', description: 'Descripción del recinto' })
    @Column({ nullable: true })
    descripcion: string;

    @ApiProperty({ example: -17.7833, description: 'Latitud del recinto' })
    @Column('float')
    latitud: number;

    @ApiProperty({ example: -63.1821, description: 'Longitud del recinto' })
    @Column('float')
    longitud: number;

    @ManyToOne(() => Seccion)
    @JoinColumn({ name: 'seccionId' })
    seccion: Seccion;

    @ApiProperty({ example: 1, description: 'ID de la sección a la que pertenece el recinto' })
    @Column()
    seccionId: number;
} 