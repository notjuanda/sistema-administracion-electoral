import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CargoService } from './cargo.service';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('cargos')
@ApiBearerAuth('JWT-auth')
@Controller('cargos')
@UseGuards(JwtAuthGuard)
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cargos' })
  @ApiResponse({ status: 200, description: 'Lista de cargos obtenida exitosamente', type: [Cargo] })
  async findAll(): Promise<Cargo[]> {
    return this.cargoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cargo por ID' })
  @ApiParam({ name: 'id', description: 'ID del cargo' })
  @ApiResponse({ status: 200, description: 'Cargo encontrado', type: Cargo })
  @ApiResponse({ status: 404, description: 'Cargo no encontrado' })
  async findOne(@Param('id') id: string): Promise<Cargo | null> {
    return this.cargoService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cargo' })
  @ApiResponse({ status: 201, description: 'Cargo creado exitosamente', type: Cargo })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createCargoDto: CreateCargoDto): Promise<Cargo> {
    return this.cargoService.create(createCargoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cargo' })
  @ApiParam({ name: 'id', description: 'ID del cargo' })
  @ApiResponse({ status: 200, description: 'Cargo actualizado exitosamente', type: Cargo })
  @ApiResponse({ status: 404, description: 'Cargo no encontrado' })
  async update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto): Promise<Cargo | null> {
    return this.cargoService.update(+id, updateCargoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cargo' })
  @ApiParam({ name: 'id', description: 'ID del cargo' })
  @ApiResponse({ status: 200, description: 'Cargo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cargo no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cargoService.remove(+id);
  }
} 