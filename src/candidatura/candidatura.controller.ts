import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CandidaturaService } from './candidatura.service';
import { Candidatura } from './entities/candidatura.entity';
import { CreateCandidaturaDto } from './dto/create-candidatura.dto';
import { UpdateCandidaturaDto } from './dto/update-candidatura.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('candidaturas')
@ApiBearerAuth('JWT-auth')
@Controller('candidaturas')
@UseGuards(JwtAuthGuard)
export class CandidaturaController {
    constructor(private readonly candidaturaService: CandidaturaService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las candidaturas' })
    @ApiResponse({ status: 200, description: 'Lista de candidaturas obtenida exitosamente', type: [Candidatura] })
    async findAll(): Promise<Candidatura[]> {
        return this.candidaturaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una candidatura por ID' })
    @ApiParam({ name: 'id', description: 'ID de la candidatura' })
    @ApiResponse({ status: 200, description: 'Candidatura encontrada', type: Candidatura })
    @ApiResponse({ status: 404, description: 'Candidatura no encontrada' })
    async findOne(@Param('id') id: string): Promise<Candidatura | null> {
        return this.candidaturaService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva candidatura' })
    @ApiResponse({ status: 201, description: 'Candidatura creada exitosamente', type: Candidatura })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(@Body() createCandidaturaDto: CreateCandidaturaDto): Promise<Candidatura> {
        return this.candidaturaService.create(createCandidaturaDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una candidatura' })
    @ApiParam({ name: 'id', description: 'ID de la candidatura' })
    @ApiResponse({ status: 200, description: 'Candidatura actualizada exitosamente', type: Candidatura })
    @ApiResponse({ status: 404, description: 'Candidatura no encontrada' })
    async update(@Param('id') id: string, @Body() updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura | null> {
        return this.candidaturaService.update(+id, updateCandidaturaDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una candidatura' })
    @ApiParam({ name: 'id', description: 'ID de la candidatura' })
    @ApiResponse({ status: 200, description: 'Candidatura eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Candidatura no encontrada' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.candidaturaService.remove(+id);
    }
} 