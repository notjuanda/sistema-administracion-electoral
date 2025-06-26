import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray, IsInt } from 'class-validator';

export class CreateCandidaturaDto {
    @ApiProperty({ description: 'Nombre de la candidatura', example: 'Candidatura MAS para Alcalde' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ description: 'Descripción de la candidatura', example: 'Candidatura oficial del MAS para alcalde' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ description: 'ID del partido político', example: 1 })
    @IsInt()
    partidoId: number;

    @ApiProperty({ description: 'ID del cargo al que aspira', example: 1 })
    @IsInt()
    cargoId: number;

    @ApiProperty({ description: 'IDs de los candidatos', type: [Number], example: [1, 2] })
    @IsArray()
    @IsInt({ each: true })
    candidatoIds: number[];

    @ApiPropertyOptional({ description: 'Estado de la candidatura', example: 'activa' })
    @IsOptional()
    @IsString()
    estado?: string;
} 