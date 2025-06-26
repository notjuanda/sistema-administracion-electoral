import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { EleccionService } from './eleccion.service';
import { Eleccion } from './entities/eleccion.entity';
import { CreateEleccionDto } from './dto/create-eleccion.dto';
import { UpdateEleccionDto } from './dto/update-eleccion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('elecciones')
@ApiBearerAuth('JWT-auth')
@Controller('elecciones')
@UseGuards(JwtAuthGuard)
export class EleccionController {
  constructor(private readonly eleccionService: EleccionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las elecciones' })
  @ApiResponse({ status: 200, description: 'Lista de elecciones obtenida exitosamente', type: [Eleccion] })
  async findAll(): Promise<Eleccion[]> {
    return this.eleccionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una elección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la elección' })
  @ApiResponse({ status: 200, description: 'Elección encontrada', type: Eleccion })
  @ApiResponse({ status: 404, description: 'Elección no encontrada' })
  async findOne(@Param('id') id: string): Promise<Eleccion | null> {
    return this.eleccionService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva elección' })
  @ApiResponse({ status: 201, description: 'Elección creada exitosamente', type: Eleccion })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createEleccionDto: CreateEleccionDto): Promise<Eleccion> {
    return this.eleccionService.create(createEleccionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una elección' })
  @ApiParam({ name: 'id', description: 'ID de la elección' })
  @ApiResponse({ status: 200, description: 'Elección actualizada exitosamente', type: Eleccion })
  @ApiResponse({ status: 404, description: 'Elección no encontrada' })
  async update(@Param('id') id: string, @Body() updateEleccionDto: UpdateEleccionDto): Promise<Eleccion | null> {
    return this.eleccionService.update(+id, updateEleccionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una elección' })
  @ApiParam({ name: 'id', description: 'ID de la elección' })
  @ApiResponse({ status: 200, description: 'Elección eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Elección no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.eleccionService.remove(+id);
  }
} 