import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('mesas')
@Controller('mesas')
@UseGuards(JwtAuthGuard)
export class MesaController {
    constructor(private readonly mesaService: MesaService) {}

    @Get()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener todas las mesas' })
    @ApiResponse({ status: 200, description: 'Lista de mesas', type: [CreateMesaDto] })
    findAll() {
        return this.mesaService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener una mesa por ID' })
    @ApiParam({ name: 'id', description: 'ID de la mesa' })
    @ApiResponse({ status: 200, description: 'Mesa encontrada', type: CreateMesaDto })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
    findOne(@Param('id') id: string) {
        return this.mesaService.findOne(+id);
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Crear una mesa' })
    @ApiResponse({ status: 201, description: 'Mesa creada', type: CreateMesaDto })
    create(@Body() createMesaDto: CreateMesaDto) {
        return this.mesaService.create(createMesaDto);
    }

    @Put(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Actualizar una mesa' })
    @ApiParam({ name: 'id', description: 'ID de la mesa' })
    @ApiResponse({ status: 200, description: 'Mesa actualizada', type: CreateMesaDto })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
    update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
        return this.mesaService.update(+id, updateMesaDto);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Eliminar una mesa' })
    @ApiParam({ name: 'id', description: 'ID de la mesa' })
    @ApiResponse({ status: 200, description: 'Mesa eliminada' })
    @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
    remove(@Param('id') id: string) {
        return this.mesaService.remove(+id);
    }
} 