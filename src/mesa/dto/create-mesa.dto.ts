import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMesaDto {
    @ApiProperty({ example: 5, description: 'Número de la mesa' })
    @IsNumber()
    numero: number;

    @ApiProperty({ example: 1, description: 'ID del recinto al que pertenece la mesa' })
    @IsNumber()
    recintoId: number;
} 