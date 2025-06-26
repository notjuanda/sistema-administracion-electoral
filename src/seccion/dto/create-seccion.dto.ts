import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoSeccion } from '../../common/enums/estado-seccion.enum';

export class CreatePuntoSeccionDto {
    @ApiProperty({ description: 'Orden del punto en la secuencia', example: 1 })
    @IsString()
    orden: number;

    @ApiProperty({ description: 'Latitud del punto', example: -17.7833 })
    @IsString()
    latitud: number;

    @ApiProperty({ description: 'Longitud del punto', example: -63.1821 })
    @IsString()
    longitud: number;
}

export class CreateSeccionDto {
    @ApiProperty({ description: 'Nombre de la sección', example: 'Sección Centro' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ description: 'Descripción de la sección', example: 'Sección electoral del centro de la ciudad' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ 
        description: 'Estado de la sección', 
        enum: EstadoSeccion,
        example: EstadoSeccion.ACTIVA 
    })
    @IsOptional()
    @IsEnum(EstadoSeccion)
    estado?: EstadoSeccion;

    @ApiProperty({ 
        description: 'Puntos que definen el área de la sección',
        type: [CreatePuntoSeccionDto],
        example: [
        { orden: 1, latitud: -17.7833, longitud: -63.1821 },
        { orden: 2, latitud: -17.7834, longitud: -63.1822 }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePuntoSeccionDto)
    puntos: CreatePuntoSeccionDto[];
} 