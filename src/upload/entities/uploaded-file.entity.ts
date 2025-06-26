import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('uploaded_files')
export class UploadedFile {
    @ApiProperty({ description: 'ID único del archivo', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nombre original del archivo', example: 'foto_candidato.jpg' })
    @Column({ type: 'varchar', length: 255 })
    originalName: string;

    @ApiProperty({ description: 'Nombre del archivo en el servidor', example: 'uuid-foto_candidato.jpg' })
    @Column({ type: 'varchar', length: 255, unique: true })
    filename: string;

    @ApiProperty({ description: 'Ruta relativa del archivo', example: 'uploads/candidatos/uuid-foto_candidato.jpg' })
    @Column({ type: 'varchar', length: 500 })
    path: string;

    @ApiProperty({ description: 'URL pública del archivo', example: '/uploads/candidatos/uuid-foto_candidato.jpg' })
    @Column({ type: 'varchar', length: 500 })
    url: string;

    @ApiProperty({ description: 'Tipo MIME del archivo', example: 'image/jpeg' })
    @Column({ type: 'varchar', length: 100 })
    mimetype: string;

    @ApiProperty({ description: 'Tamaño del archivo en bytes', example: 1024000 })
    @Column({ type: 'bigint' })
    size: number;

    @ApiProperty({ description: 'Categoría del archivo', example: 'candidatos' })
    @Column({ type: 'varchar', length: 50 })
    category: string;

    @ApiProperty({ description: 'Descripción del archivo', example: 'Foto de perfil del candidato' })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({ description: 'Fecha de creación' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Fecha de última actualización' })
    @UpdateDateColumn()
    updatedAt: Date;
} 