import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PartidoPoliticoService } from './partido-politico.service';
import { PartidoPolitico } from './entities/partido-politico.entity';
import { CreatePartidoPoliticoDto } from './dto/create-partido-politico.dto';
import { UpdatePartidoPoliticoDto } from './dto/update-partido-politico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('partidos-politicos')
@ApiBearerAuth('JWT-auth')
@Controller('partidos-politicos')
@UseGuards(JwtAuthGuard)
export class PartidoPoliticoController {
    constructor(private readonly partidoService: PartidoPoliticoService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los partidos políticos' })
    @ApiResponse({ status: 200, description: 'Lista de partidos obtenida exitosamente', type: [PartidoPolitico] })
    async findAll(): Promise<PartidoPolitico[]> {
        return this.partidoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un partido político por ID' })
    @ApiParam({ name: 'id', description: 'ID del partido político' })
    @ApiResponse({ status: 200, description: 'Partido encontrado', type: PartidoPolitico })
    @ApiResponse({ status: 404, description: 'Partido no encontrado' })
    async findOne(@Param('id') id: string): Promise<PartidoPolitico | null> {
        return this.partidoService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo partido político' })
    @ApiResponse({ status: 201, description: 'Partido creado exitosamente', type: PartidoPolitico })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(@Body() createPartidoDto: CreatePartidoPoliticoDto): Promise<PartidoPolitico> {
        return this.partidoService.create(createPartidoDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un partido político' })
    @ApiParam({ name: 'id', description: 'ID del partido político' })
    @ApiResponse({ status: 200, description: 'Partido actualizado exitosamente', type: PartidoPolitico })
    @ApiResponse({ status: 404, description: 'Partido no encontrado' })
    async update(@Param('id') id: string, @Body() updatePartidoDto: UpdatePartidoPoliticoDto): Promise<PartidoPolitico | null> {
        return this.partidoService.update(+id, updatePartidoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un partido político' })
    @ApiParam({ name: 'id', description: 'ID del partido político' })
    @ApiResponse({ status: 200, description: 'Partido eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Partido no encontrado' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.partidoService.remove(+id);
    }
} 