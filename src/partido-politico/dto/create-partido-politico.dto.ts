import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsHexColor } from 'class-validator';
import { EstadoPartido } from '../../common/enums/estado-partido.enum';

export class CreatePartidoPoliticoDto {
    @ApiProperty({ description: 'Nombre del partido político', example: 'Movimiento al Socialismo' })
    @IsString()
    nombre: string;

    @ApiProperty({ description: 'Sigla del partido', example: 'MAS' })
    @IsString()
    sigla: string;

    @ApiProperty({ description: 'Color del partido (hex)', example: '#FF0000' })
    @IsHexColor()
    color: string;

    @ApiPropertyOptional({ description: 'Descripción del partido', example: 'Partido político de izquierda' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ 
        description: 'Estado del partido', 
        enum: EstadoPartido,
        example: EstadoPartido.ACTIVO 
    })
    @IsOptional()
    @IsEnum(EstadoPartido)
    estado?: EstadoPartido;
} 