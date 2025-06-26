import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidatura } from './entities/candidatura.entity';
import { PartidoPolitico } from '../partido-politico/entities/partido-politico.entity';
import { Candidato } from '../candidato/entities/candidato.entity';
import { CreateCandidaturaDto } from './dto/create-candidatura.dto';
import { UpdateCandidaturaDto } from './dto/update-candidatura.dto';
import { PartidoPoliticoService } from '../partido-politico/partido-politico.service';
import { CandidatoService } from '../candidato/candidato.service';

@Injectable()
export class CandidaturaService {
    constructor(
        @InjectRepository(Candidatura)
        private candidaturaRepository: Repository<Candidatura>,
        private partidoService: PartidoPoliticoService,
        private candidatoService: CandidatoService,
    ) {}

    async findAll(): Promise<Candidatura[]> {
        return this.candidaturaRepository.find({
            relations: ['partido', 'candidatos']
        });
    }

    async findOne(id: number): Promise<Candidatura | null> {
        return this.candidaturaRepository.findOne({ 
            where: { id },
            relations: ['partido', 'candidatos']
        });
    }

    async create(createCandidaturaDto: CreateCandidaturaDto): Promise<Candidatura> {
        // Verificar que el partido existe
        const partido = await this.partidoService.findOne(createCandidaturaDto.partidoId);
        if (!partido) {
            throw new Error('Partido político no encontrado');
        }

        // Verificar que los candidatos existen
        if (createCandidaturaDto.candidatoIds && createCandidaturaDto.candidatoIds.length > 0) {
            for (const candidatoId of createCandidaturaDto.candidatoIds) {
                const candidato = await this.candidatoService.findOne(candidatoId);
                if (!candidato) {
                    throw new Error(`Candidato con ID ${candidatoId} no encontrado`);
                }
            }
        }

        const candidatura = this.candidaturaRepository.create(createCandidaturaDto);
        return this.candidaturaRepository.save(candidatura);
    }

    async update(id: number, updateCandidaturaDto: UpdateCandidaturaDto): Promise<Candidatura | null> {
        // Verificar que la candidatura existe
        const existingCandidatura = await this.findOne(id);
        if (!existingCandidatura) {
            throw new Error('Candidatura no encontrada');
        }

        // Verificar que el partido existe si se está actualizando
        if (updateCandidaturaDto.partidoId) {
            const partido = await this.partidoService.findOne(updateCandidaturaDto.partidoId);
            if (!partido) {
                throw new Error('Partido político no encontrado');
            }
        }

        // Verificar que los candidatos existen si se están actualizando
        if (updateCandidaturaDto.candidatoIds && updateCandidaturaDto.candidatoIds.length > 0) {
            for (const candidatoId of updateCandidaturaDto.candidatoIds) {
                const candidato = await this.candidatoService.findOne(candidatoId);
                if (!candidato) {
                    throw new Error(`Candidato con ID ${candidatoId} no encontrado`);
                }
            }
        }

        await this.candidaturaRepository.update(id, updateCandidaturaDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.candidaturaRepository.delete(id);
    }
} 