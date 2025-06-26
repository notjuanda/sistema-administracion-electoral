import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SeccionService } from './seccion.service';
import { Seccion } from './entities/seccion.entity';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('secciones')
@ApiBearerAuth('JWT-auth')
@Controller('secciones')
@UseGuards(JwtAuthGuard)
export class SeccionController {
    constructor(private readonly seccionService: SeccionService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las secciones' })
    @ApiResponse({ status: 200, description: 'Lista de secciones obtenida exitosamente', type: [Seccion] })
    async findAll(): Promise<Seccion[]> {
        return this.seccionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una sección por ID' })
    @ApiParam({ name: 'id', description: 'ID de la sección' })
    @ApiResponse({ status: 200, description: 'Sección encontrada', type: Seccion })
    @ApiResponse({ status: 404, description: 'Sección no encontrada' })
    async findOne(@Param('id') id: string): Promise<Seccion | null> {
        return this.seccionService.findOne(+id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva sección' })
    @ApiResponse({ status: 201, description: 'Sección creada exitosamente', type: Seccion })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(@Body() createSeccionDto: CreateSeccionDto): Promise<Seccion | null> {
        return this.seccionService.create(createSeccionDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una sección' })
    @ApiParam({ name: 'id', description: 'ID de la sección' })
    @ApiResponse({ status: 200, description: 'Sección actualizada exitosamente', type: Seccion })
    @ApiResponse({ status: 404, description: 'Sección no encontrada' })
    async update(@Param('id') id: string, @Body() updateSeccionDto: UpdateSeccionDto): Promise<Seccion | null> {
        return this.seccionService.update(+id, updateSeccionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.seccionService.remove(+id);
    }
} 