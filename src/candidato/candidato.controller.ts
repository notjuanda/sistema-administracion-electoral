import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatoService } from './candidato.service';
import { Candidato } from './entities/candidato.entity';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('candidatos')
@ApiBearerAuth('JWT-auth')
@Controller('candidatos')
@UseGuards(JwtAuthGuard)
export class CandidatoController {
    constructor(private readonly candidatoService: CandidatoService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los candidatos' })
    @ApiResponse({ status: 200, description: 'Lista de candidatos obtenida exitosamente', type: [Candidato] })
    async findAll(): Promise<Candidato[]> {
        return this.candidatoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un candidato por ID' })
    @ApiParam({ name: 'id', description: 'ID del candidato' })
    @ApiResponse({ status: 200, description: 'Candidato encontrado', type: Candidato })
    @ApiResponse({ status: 404, description: 'Candidato no encontrado' })
    async findOne(@Param('id') id: string): Promise<Candidato | null> {
        return this.candidatoService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo candidato' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nombres: { type: 'string', example: 'Juan Carlos' },
                apellidoPaterno: { type: 'string', example: 'García' },
                apellidoMaterno: { type: 'string', example: 'López' },
                cedula: { type: 'string', example: '12345678' },
                fechaNacimiento: { type: 'string', format: 'date', example: '1980-05-15' },
                profesion: { type: 'string', example: 'Ingeniero Civil' },
                biografia: { type: 'string', example: 'Candidato con amplia experiencia...' },
                file: { type: 'string', format: 'binary', description: 'Foto del candidato (opcional)' },
            },
            required: ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'cedula', 'fechaNacimiento'],
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ status: 201, description: 'Candidato creado exitosamente', type: Candidato })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(
        @Body() createCandidatoDto: CreateCandidatoDto,
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<Candidato> {
        return this.candidatoService.createWithImage(createCandidatoDto, file);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un candidato' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nombres: { type: 'string', example: 'Juan Carlos' },
                apellidoPaterno: { type: 'string', example: 'García' },
                apellidoMaterno: { type: 'string', example: 'López' },
                cedula: { type: 'string', example: '12345678' },
                fechaNacimiento: { type: 'string', format: 'date', example: '1980-05-15' },
                profesion: { type: 'string', example: 'Ingeniero Civil' },
                biografia: { type: 'string', example: 'Candidato con amplia experiencia...' },
                file: { type: 'string', format: 'binary', description: 'Foto del candidato (opcional)' },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'id', description: 'ID del candidato' })
    @ApiResponse({ status: 200, description: 'Candidato actualizado exitosamente', type: Candidato })
    @ApiResponse({ status: 404, description: 'Candidato no encontrado' })
    async update(
        @Param('id') id: string,
        @Body() updateCandidatoDto: UpdateCandidatoDto,
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<Candidato | null> {
        return this.candidatoService.updateWithImage(+id, updateCandidatoDto, file);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un candidato' })
    @ApiParam({ name: 'id', description: 'ID del candidato' })
    @ApiResponse({ status: 200, description: 'Candidato eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Candidato no encontrado' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.candidatoService.remove(+id);
    }
} 