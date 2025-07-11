import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecintoDto {
    @ApiPropertyOptional({ example: 'Universidad Nur', description: 'Nombre del recinto' })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: 'Recinto universitario principal', description: 'Descripción del recinto' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ example: -17.7833, description: 'Latitud del recinto' })
    @IsOptional()
    @IsNumber()
    latitud?: number;

    @ApiPropertyOptional({ example: -63.1821, description: 'Longitud del recinto' })
    @IsOptional()
    @IsNumber()
    longitud?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID de la sección a la que pertenece el recinto' })
    @IsOptional()
    @IsNumber()
    seccionId?: number;
} 