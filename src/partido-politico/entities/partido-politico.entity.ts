import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoPartido } from '../../common/enums/estado-partido.enum';

@Entity('partidos_politicos')
export class PartidoPolitico {
    @ApiProperty({ description: 'ID único del partido político', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombre del partido político', example: 'Movimiento al Socialismo' })
    @Column({ type: 'varchar', length: 100, unique: true })
    nombre: string;

    @ApiProperty({ description: 'Sigla del partido', example: 'MAS' })
    @Column({ type: 'varchar', length: 20, unique: true })
    sigla: string;

    @ApiProperty({ description: 'Color del partido (hex)', example: '#FF0000' })
    @Column({ type: 'varchar', length: 7 })
    color: string;

    @ApiProperty({ description: 'Descripción del partido', example: 'Partido político de izquierda' })
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @ApiProperty({ description: 'Estado del partido', enum: EstadoPartido, example: EstadoPartido.ACTIVO })
    @Column({
        type: 'enum',
        enum: EstadoPartido,
        default: EstadoPartido.ACTIVO
    })
    estado: EstadoPartido;

    @ApiProperty({ description: 'Fecha de creación' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de última actualización' })
    @UpdateDateColumn()
    updatedAt: Date;
} 