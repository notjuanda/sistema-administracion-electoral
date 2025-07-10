import { Controller, Get, Param } from '@nestjs/common';
import { PapeletasService } from './papeletas.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('papeletas')
@Controller('papeletas')
export class PapeletasController {
    constructor(private readonly papeletasService: PapeletasService) {}

    @Get('generar-por-seccion/:seccionId')
    @ApiOperation({ 
        summary: 'Generar papeleta automática por sección', 
        description: 'Genera la estructura de datos de la papeleta electoral para una sección específica, incluyendo todos los cargos, candidaturas y candidatos.' 
    })
    @ApiParam({ name: 'seccionId', description: 'ID de la sección', example: 1 })
    @ApiResponse({ 
        status: 200, 
        description: 'Papeleta generada correctamente',
        schema: {
        example: {
            seccionId: 1,
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
    @ApiResponse({ status: 404, description: 'Sección no encontrada o sin cargos definidos' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async generarPapeletaPorSeccion(@Param('seccionId') seccionId: string) {
        return this.papeletasService.generarPapeletaPorSeccion(+seccionId);
    }
} 