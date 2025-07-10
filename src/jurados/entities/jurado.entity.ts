import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('jurados')
export class Jurado {
    @ApiProperty({ description: 'ID único del jurado', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'UUID del votante asignado como jurado', example: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456' })
    @Column({ type: 'varchar', length: 36 })
    votanteId: string;

    @ApiProperty({ description: 'ID de la mesa donde es jurado', example: 1 })
    @Column()
    mesaId: number;

    @ApiProperty({ description: 'Fecha de creación del jurado' })
    @CreateDateColumn()
    fechaCreacion: Date;
} 