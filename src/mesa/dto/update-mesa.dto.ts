import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMesaDto {
    @ApiPropertyOptional({ example: 5, description: 'Número de la mesa' })
    @IsOptional()
    @IsNumber()
    numero?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID del recinto al que pertenece la mesa' })
    @IsOptional()
    @IsNumber()
    recintoId?: number;
} 