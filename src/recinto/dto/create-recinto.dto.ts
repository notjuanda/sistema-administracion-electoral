import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecintoDto {
    @ApiProperty({ example: 'Universidad Nur', description: 'Nombre del recinto' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ example: 'Recinto universitario principal', description: 'Descripción del recinto' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ example: -17.7833, description: 'Latitud del recinto' })
    @IsNumber()
    latitud: number;

    @ApiProperty({ example: -63.1821, description: 'Longitud del recinto' })
    @IsNumber()
    longitud: number;

    @ApiProperty({ example: 1, description: 'ID de la sección a la que pertenece el recinto' })
    @IsNumber()
    seccionId: number;
} 