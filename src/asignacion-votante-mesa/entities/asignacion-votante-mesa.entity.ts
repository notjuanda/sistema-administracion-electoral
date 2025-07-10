import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AsignacionVotanteMesa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    votanteId: string;

    @Column()
    mesaId: number;

    @CreateDateColumn()
    fechaAsignacion: Date;
} 