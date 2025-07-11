import { Controller, Get, Param, Query } from '@nestjs/common';
import { PapeletasService } from './papeletas.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('papeletas')
@Controller('papeletas')
export class PapeletasController {
    constructor(private readonly papeletasService: PapeletasService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las papeletas' })
    async findAll() {
        return this.papeletasService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una papeleta por id' })
    async findOne(@Param('id') id: string) {
        return this.papeletasService.findOne(+id);
    }

    @Get('por-seccion-eleccion/:seccionId/:eleccionId')
    @ApiOperation({ summary: 'Obtener una papeleta por sección y elección' })
    async findOneBySeccionEleccion(@Param('seccionId') seccionId: string, @Param('eleccionId') eleccionId: string) {
        return this.papeletasService.findOneBySeccionEleccion(+seccionId, +eleccionId);
    }

    @Get('generar-por-seccion/:seccionId/:eleccionId')
    @ApiOperation({ 
        summary: 'Generar papeleta automática por sección', 
        description: 'Genera la estructura de datos de la papeleta electoral para una sección y elección específica, incluyendo todos los cargos, candidaturas y candidatos.' 
    })
    @ApiParam({ name: 'seccionId', description: 'ID de la sección', example: 1 })
    @ApiParam({ name: 'eleccionId', description: 'ID de la elección', example: 1 })
    @ApiResponse({ 
        status: 200, 
        description: 'Papeleta generada correctamente',
        schema: {
        example: {
            seccionId: 1,
            eleccionId: 1,
            seccionNombre: "Sección Centro",
            cargos: [
            {
                cargoId: 1,
                cargoNombre: "Presidente",
                candidaturas: [
                {
                    partidoId: 1,
                    partidoNombre: "Partido A",
                    partidoColor: "#FF0000",
                    partidoSigla: "PA",
                    candidatos: [
                    {
                        id: 1,
                        nombre: "Juan",
                        apellido: "Pérez",
                        foto: "url-foto"
                    }
                    ]
                }
                ]
            }
            ]
        }
        }
    })
    @ApiResponse({ status: 404, description: 'Sección o elección no encontrada o sin cargos definidos' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async generarPapeletaPorSeccion(@Param('seccionId') seccionId: string, @Param('eleccionId') eleccionId: string) {
        return this.papeletasService.generarPapeletaPorSeccion(+seccionId, +eleccionId);
    }
} 