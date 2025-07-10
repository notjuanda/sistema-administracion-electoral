import { Controller, Post, Body } from '@nestjs/common';
import { AsignacionVotanteMesaService } from './asignacion-votante-mesa.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('asignacion-votante-mesa')
@Controller('asignacion-votante-mesa')
export class AsignacionVotanteMesaController {
  constructor(private readonly asignacionService: AsignacionVotanteMesaService) {}

  @Post('distribuir-automaticamente')
  @ApiOperation({ 
    summary: 'Distribuye votantes automáticamente entre todas las mesas de un recinto', 
    description: 'Recibe el id del recinto y un array de votantes ordenados alfabéticamente por apellido paterno. Distribuye automáticamente los votantes entre todas las mesas del recinto de forma equilibrada.' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        recintoId: { type: 'number', example: 1, description: 'ID del recinto donde se distribuirán los votantes' },
        votantes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456' },
              nombreCompleto: { type: 'string', example: 'Juan Pérez García' },
              ci: { type: 'string', example: '12345678' }
            }
          },
          description: 'Array de votantes ordenados alfabéticamente por apellido paterno'
        }
      },
      required: ['recintoId', 'votantes'],
      example: {
        recintoId: 1,
        votantes: [
          { id: 'b1a7e8c2-1234-4f5a-8b9c-abcdef123456', nombreCompleto: 'Ana García López', ci: '12345678' },
          { id: 'c2b8e9d3-5678-4a6b-9c0d-fedcba654321', nombreCompleto: 'Carlos Pérez Ruiz', ci: '87654321' }
        ]
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Votantes distribuidos correctamente', 
    schema: { 
      example: { 
        mensaje: 'Votantes distribuidos automáticamente entre las mesas del recinto',
        distribucion: [
          { mesaId: 1, cantidadVotantes: 5 },
          { mesaId: 2, cantidadVotantes: 5 }
        ],
        totalVotantes: 10
      } 
    } 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos o recinto sin mesas' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async distribuirVotantesAutomaticamente(
    @Body() body: { recintoId: number; votantes: Array<{ id: string; nombreCompleto: string; ci: string }> }
  ) {
    return this.asignacionService.distribuirVotantesAutomaticamente(body.recintoId, body.votantes);
  }
} 