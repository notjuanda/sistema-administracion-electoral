import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('papeletas')
@Unique(['seccionId', 'eleccionId'])
export class Papeleta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seccionId: number;

    @Column()
    eleccionId: number;

    @Column({ type: 'jsonb' })
    estructura: any;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 'activa' })
    estado: string;
} 