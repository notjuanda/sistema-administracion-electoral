import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileDto {
    @ApiProperty({ description: 'ID del archivo eliminado', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nombre del archivo eliminado', example: 'uuid-foto_candidato.jpg' })
    filename: string;

    @ApiProperty({ description: 'Mensaje de confirmación', example: 'Archivo eliminado exitosamente' })
    message: string;

    @ApiProperty({ description: 'Fecha de eliminación' })
    deletedAt: Date;
} 