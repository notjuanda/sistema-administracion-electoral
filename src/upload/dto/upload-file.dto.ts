import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
    @ApiProperty({ description: 'ID único del archivo', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nombre original del archivo', example: 'foto_candidato.jpg' })
    originalName: string;

    @ApiProperty({ description: 'Nombre del archivo en el servidor', example: 'uuid-foto_candidato.jpg' })
    filename: string;

    @ApiProperty({ description: 'URL pública del archivo', example: '/uploads/candidatos/uuid-foto_candidato.jpg' })
    url: string;

    @ApiProperty({ description: 'Tipo MIME del archivo', example: 'image/jpeg' })
    mimetype: string;

    @ApiProperty({ description: 'Tamaño del archivo en bytes', example: 1024000 })
    size: number;

    @ApiProperty({ description: 'Categoría del archivo', example: 'candidatos' })
    category: string;

    @ApiProperty({ description: 'Descripción del archivo', example: 'Foto de perfil del candidato' })
    description?: string;

    @ApiProperty({ description: 'Fecha de creación' })
    createdAt: Date;
} 