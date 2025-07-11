import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PartidoPolitico } from '../../partido-politico/entities/partido-politico.entity';
import { Candidato } from '../../candidato/entities/candidato.entity';
import { Eleccion } from '../../eleccion/entities/eleccion.entity';
import { Cargo } from '../../cargo/entities/cargo.entity';

@Entity('candidaturas')
export class Candidatura {
    @ApiProperty({ description: 'ID único de la candidatura', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombre de la candidatura', example: 'Candidatura MAS para Alcalde' })
    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @ApiProperty({ description: 'Descripción de la candidatura', example: 'Candidatura oficial del MAS para alcalde' })
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @ApiProperty({ description: 'Partido político de la candidatura', type: () => PartidoPolitico })
    @ManyToOne(() => PartidoPolitico, partido => partido.id)
    @JoinColumn({ name: 'partido_id' })
    partido: PartidoPolitico;

    @ApiProperty({ description: 'ID del partido político', example: 1 })
    @Column({ name: 'partido_id' })
    partidoId: number;

    @ApiProperty({ description: 'Elección a la que pertenece la candidatura', type: () => Eleccion })
    @ManyToOne(() => Eleccion, { eager: false })
    @JoinColumn({ name: 'eleccion_id' })
    eleccion: Eleccion;

    @ApiProperty({ description: 'ID de la elección', example: 1 })
    @Column({ name: 'eleccion_id' })
    eleccionId: number;

    @ApiProperty({ description: 'Cargo al que aspira la candidatura', type: () => Cargo })
    @ManyToOne(() => Cargo, { eager: false })
    @JoinColumn({ name: 'cargo_id' })
    cargo: Cargo;

    @ApiProperty({ description: 'ID del cargo al que aspira', example: 1 })
    @Column({ name: 'cargo_id' })
    cargoId: number;

    @ApiProperty({ description: 'Candidatos de esta candidatura', type: () => [Candidato] })
    @OneToMany(() => Candidato, candidato => candidato.candidatura)
    candidatos: Candidato[];

    @ApiProperty({ description: 'IDs de los candidatos', type: [Number], example: [1, 2] })
    @Column({ type: 'int', array: true, default: [] })
    candidatoIds: number[];

    @ApiProperty({ description: 'Estado de la candidatura', example: 'activa' })
    @Column({ type: 'varchar', length: 20, default: 'activa' })
    estado: string;

    @ApiProperty({ description: 'Fecha de creación' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de última actualización' })
    @UpdateDateColumn()
    updatedAt: Date;
} 