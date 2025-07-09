import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RecintoService } from './recinto.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('recintos')
@Controller('recintos')
export class RecintoController {
    constructor(private readonly recintoService: RecintoService) {}

    @Get('public')
    @ApiOperation({ summary: 'Obtener todos los recintos (público)' })
    @ApiResponse({ status: 200, description: 'Lista de recintos', type: [CreateRecintoDto] })
    async getPublicRecintos() {
        const recintos = await this.recintoService.findAll();
        return recintos.map(({ id, nombre, latitud, longitud }) => ({ id, nombre, latitud, longitud }));
    }

    @Get('public/:id')
    @ApiOperation({ summary: 'Obtener un recinto por ID (público)' })
    @ApiParam({ name: 'id', description: 'ID del recinto' })
    @ApiResponse({ status: 200, description: 'Recinto encontrado', type: CreateRecintoDto })
    @ApiResponse({ status: 404, description: 'Recinto no encontrado' })
    async getPublicRecintoById(@Param('id') id: string) {
        const recinto = await this.recintoService.findOne(+id);
        if (!recinto) return null;
        const { id: rid, nombre, latitud, longitud } = recinto;
        return { id: rid, nombre, latitud, longitud };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener todos los recintos (protegido)' })
    @ApiResponse({ status: 200, description: 'Lista de recintos', type: [CreateRecintoDto] })
    findAll() {
        return this.recintoService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener un recinto por ID (protegido)' })
    @ApiParam({ name: 'id', description: 'ID del recinto' })
    @ApiResponse({ status: 200, description: 'Recinto encontrado', type: CreateRecintoDto })
    @ApiResponse({ status: 404, description: 'Recinto no encontrado' })
    findOne(@Param('id') id: string) {
        return this.recintoService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Crear un recinto' })
    @ApiResponse({ status: 201, description: 'Recinto creado', type: CreateRecintoDto })
    create(@Body() createRecintoDto: CreateRecintoDto) {
        return this.recintoService.create(createRecintoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Actualizar un recinto' })
    @ApiParam({ name: 'id', description: 'ID del recinto' })
    @ApiResponse({ status: 200, description: 'Recinto actualizado', type: CreateRecintoDto })
    @ApiResponse({ status: 404, description: 'Recinto no encontrado' })
    update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto) {
        return this.recintoService.update(+id, updateRecintoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Eliminar un recinto' })
    @ApiParam({ name: 'id', description: 'ID del recinto' })
    @ApiResponse({ status: 200, description: 'Recinto eliminado' })
    @ApiResponse({ status: 404, description: 'Recinto no encontrado' })
    remove(@Param('id') id: string) {
        return this.recintoService.remove(+id);
    }
} 