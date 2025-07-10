import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateJuradoDto {
    @ApiProperty({ 
        description: 'UUID del votante que será asignado como jurado', 
        example: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456' 
    })
    @IsString()
    @IsNotEmpty()
    votanteId: string;

    @ApiProperty({ 
        description: 'ID de la mesa donde será jurado', 
        example: 1 
    })
    @IsNumber()
    @IsNotEmpty()
    mesaId: number;
} 