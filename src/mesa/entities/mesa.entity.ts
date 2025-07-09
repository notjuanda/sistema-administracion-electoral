import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recinto } from '../../recinto/entities/recinto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Mesa {
    @ApiProperty({ example: 1, description: 'ID único de la mesa' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 5, description: 'Número de la mesa' })
    @Column()
    numero: number;

    @ApiProperty({ description: 'Recinto al que pertenece la mesa', type: () => Recinto })
    @ManyToOne(() => Recinto)
    @JoinColumn({ name: 'recintoId' })
    recinto: Recinto;

    @ApiProperty({ example: 1, description: 'ID del recinto al que pertenece la mesa' })
    @Column()
    recintoId: number;
} 