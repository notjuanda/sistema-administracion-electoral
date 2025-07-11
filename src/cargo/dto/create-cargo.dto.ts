import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { EstadoCargo } from '../../common/enums/estado-cargo.enum';

export class CreateCargoDto {
    @ApiProperty({ description: 'Nombre del cargo', example: 'Alcalde' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ description: 'Descripción del cargo', example: 'Cargo de alcalde municipal' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ 
        description: 'Estado del cargo', 
        enum: EstadoCargo,
        example: EstadoCargo.ACTIVO 
    })
    @IsOptional()
    @IsEnum(EstadoCargo)
    estado?: EstadoCargo;

    @ApiProperty({ 
        description: 'ID de la sección que afecta este cargo',
        type: Number,
        example: 1
    })
    @IsNumber()
    seccionId: number;
} 