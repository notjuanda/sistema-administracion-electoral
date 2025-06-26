import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateCandidatoDto {
    @ApiProperty({ description: 'Nombres del candidato', example: 'Juan Carlos' })
    @IsString()
    nombres: string;

    @ApiProperty({ description: 'Apellido paterno', example: 'García' })
    @IsString()
    apellidoPaterno: string;

    @ApiProperty({ description: 'Apellido materno', example: 'López' })
    @IsString()
    apellidoMaterno: string;

    @ApiProperty({ description: 'Cédula de identidad', example: '12345678' })
    @IsString()
    cedula: string;

    @ApiProperty({ description: 'Fecha de nacimiento', example: '1980-05-15' })
    @IsDateString()
    fechaNacimiento: string;

    @ApiPropertyOptional({ description: 'Profesión u ocupación', example: 'Ingeniero Civil' })
    @IsOptional()
    @IsString()
    profesion?: string;

    @ApiPropertyOptional({ description: 'Biografía del candidato', example: 'Candidato con amplia experiencia...' })
    @IsOptional()
    @IsString()
    biografia?: string;

    @ApiPropertyOptional({ description: 'URL de la foto del candidato', example: 'https://example.com/foto.jpg' })
    @IsOptional()
    @IsUrl()
    fotoUrl?: string;
} 