import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
} 