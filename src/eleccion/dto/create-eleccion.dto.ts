import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { TipoEleccion } from '../../common/enums/tipo-eleccion.enum';
import { EstadoEleccion } from '../../common/enums/estado-eleccion.enum';

export class CreateEleccionDto {
    @ApiProperty({ description: 'Nombre de la elección', example: 'Elecciones Municipales 2025' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ description: 'Descripción de la elección', example: 'Elecciones para alcaldes y concejales municipales' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ 
        description: 'Tipo de elección', 
        enum: TipoEleccion,
        example: TipoEleccion.MUNICIPAL 
    })
    @IsEnum(TipoEleccion)
    tipo: TipoEleccion;

    @ApiProperty({ description: 'Fecha de la elección', example: '2025-03-15' })
    @IsDateString()
    fecha: string;

    @ApiPropertyOptional({ 
        description: 'Estado de la elección', 
        enum: EstadoEleccion,
        example: EstadoEleccion.PLANIFICADA 
    })
    @IsOptional()
    @IsEnum(EstadoEleccion)
    estado?: EstadoEleccion;

    @ApiPropertyOptional({ 
        description: 'IDs de las secciones que participan en esta elección',
        type: [Number],
        example: [1, 2, 3]
    })
    @IsOptional()
    @IsArray()
    seccionIds?: number[];

    @ApiPropertyOptional({ 
        description: 'IDs de los cargos en disputa en esta elección',
        type: [Number],
        example: [1, 2]
    })
    @IsOptional()
    @IsArray()
    cargoIds?: number[];
} 