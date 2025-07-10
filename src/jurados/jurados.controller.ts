import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JuradosService } from './jurados.service';
import { CreateJuradoDto } from './dto/create-jurado.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('jurados')
@Controller('jurados')
export class JuradosController {
    constructor(private readonly juradosService: JuradosService) {}

    @Post()
    @ApiOperation({ 
        summary: 'Asignar un votante como jurado a una mesa', 
        description: 'Asigna un votante como jurado a una mesa específica. Solo puede haber un jurado por mesa.' 
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Jurado asignado correctamente',
        schema: {
        example: {
            id: 1,
            votanteId: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456',
            mesaId: 1,
            fechaCreacion: '2024-01-15T10:30:00.000Z'
        }
        }
    })
    @ApiResponse({ status: 409, description: 'Ya existe un jurado asignado a esta mesa' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createJuradoDto: CreateJuradoDto) {
        return this.juradosService.create(createJuradoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los jurados' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de todos los jurados',
        schema: {
        example: [
            {
            id: 1,
            votanteId: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456',
            mesaId: 1,
            fechaCreacion: '2024-01-15T10:30:00.000Z'
            }
        ]
        }
    })
    findAll() {
        return this.juradosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un jurado por ID' })
    @ApiParam({ name: 'id', description: 'ID del jurado', example: 1 })
    @ApiResponse({ status: 200, description: 'Jurado encontrado' })
    @ApiResponse({ status: 404, description: 'Jurado no encontrado' })
    findOne(@Param('id') id: string) {
        return this.juradosService.findOne(+id);
    }

    @Get('mesa/:mesaId')
    @ApiOperation({ summary: 'Obtener el jurado de una mesa específica' })
    @ApiParam({ name: 'mesaId', description: 'ID de la mesa', example: 1 })
    @ApiResponse({ status: 200, description: 'Jurado de la mesa encontrado' })
    @ApiResponse({ status: 404, description: 'No hay jurado asignado a esta mesa' })
    findByMesa(@Param('mesaId') mesaId: string) {
        return this.juradosService.findByMesa(+mesaId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un jurado' })
    @ApiParam({ name: 'id', description: 'ID del jurado a eliminar', example: 1 })
    @ApiResponse({ status: 200, description: 'Jurado eliminado correctamente' })
    @ApiResponse({ status: 404, description: 'Jurado no encontrado' })
    remove(@Param('id') id: string) {
        return this.juradosService.remove(+id);
    }
} 