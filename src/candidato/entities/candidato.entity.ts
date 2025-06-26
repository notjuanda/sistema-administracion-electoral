import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('candidatos')
export class Candidato {
    @ApiProperty({ description: 'ID único del candidato', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombres del candidato', example: 'Juan Carlos' })
    @Column({ type: 'varchar', length: 100 })
    nombres: string;

    @ApiProperty({ description: 'Apellido paterno', example: 'García' })
    @Column({ type: 'varchar', length: 100 })
    apellidoPaterno: string;

    @ApiProperty({ description: 'Apellido materno', example: 'López' })
    @Column({ type: 'varchar', length: 100 })
    apellidoMaterno: string;

    @ApiProperty({ description: 'Cédula de identidad', example: '12345678' })
    @Column({ type: 'varchar', length: 20, unique: true })
    cedula: string;

    @ApiProperty({ description: 'Fecha de nacimiento', example: '1980-05-15' })
    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @ApiProperty({ description: 'Profesión u ocupación', example: 'Ingeniero Civil' })
    @Column({ type: 'varchar', length: 100, nullable: true })
    profesion: string;

    @ApiProperty({ description: 'Biografía del candidato', example: 'Candidato con amplia experiencia...' })
    @Column({ type: 'text', nullable: true })
    biografia: string;

    @ApiProperty({ description: 'URL de la foto del candidato', example: 'https://example.com/foto.jpg' })
    @Column({ type: 'varchar', length: 255, nullable: true })
    fotoUrl: string;

    @ApiProperty({ description: 'Fecha de creación' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de última actualización' })
    @UpdateDateColumn()
    updatedAt: Date;
} 