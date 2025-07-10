import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionVotanteMesa } from './entities/asignacion-votante-mesa.entity';
import { Mesa } from '../mesa/entities/mesa.entity';

@Injectable()
export class AsignacionVotanteMesaService {
  constructor(
    @InjectRepository(AsignacionVotanteMesa)
    private readonly asignacionRepo: Repository<AsignacionVotanteMesa>,
    @InjectRepository(Mesa)
    private readonly mesaRepo: Repository<Mesa>,
  ) {}

  async distribuirVotantesAutomaticamente(
    recintoId: number, 
    votantes: Array<{ id: string; nombreCompleto: string; ci: string }>
  ) {
    // Obtener todas las mesas del recinto
    const mesas = await this.mesaRepo.find({ where: { recintoId } });
    
    if (mesas.length === 0) {
      throw new Error('No hay mesas en este recinto');
    }

    const votantesPorMesa = Math.ceil(votantes.length / mesas.length);
    
    const distribucion: Array<{ mesaId: number; cantidadVotantes: number }> = [];
    const todasLasAsignaciones: AsignacionVotanteMesa[] = [];

    for (let i = 0; i < votantes.length; i++) {
      const mesaIndex = Math.floor(i / votantesPorMesa);
      const mesaId = mesas[mesaIndex].id;
      
      const asignacion = this.asignacionRepo.create({
        votanteId: votantes[i].id,
        mesaId: mesaId
      });
      todasLasAsignaciones.push(asignacion);
      
      const mesaEnReporte = distribucion.find(d => d.mesaId === mesaId);
      if (mesaEnReporte) {
        mesaEnReporte.cantidadVotantes++;
      } else {
        distribucion.push({ mesaId, cantidadVotantes: 1 });
      }
    }

    await this.asignacionRepo.save(todasLasAsignaciones);

    return {
      mensaje: 'Votantes distribuidos automáticamente entre las mesas del recinto',
      distribucion,
      totalVotantes: votantes.length,
      totalMesas: mesas.length
    };
  }
} 