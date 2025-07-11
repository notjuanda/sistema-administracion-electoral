import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from '../seccion/entities/seccion.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { Candidatura } from '../candidatura/entities/candidatura.entity';
import { Candidato } from '../candidato/entities/candidato.entity';
import { PartidoPolitico } from '../partido-politico/entities/partido-politico.entity';
import { Papeleta } from './entities/papeleta.entity';

@Injectable()
export class PapeletasService {
    constructor(
        @InjectRepository(Seccion)
        private readonly seccionRepo: Repository<Seccion>,
        @InjectRepository(Cargo)
        private readonly cargoRepo: Repository<Cargo>,
        @InjectRepository(Candidatura)
        private readonly candidaturaRepo: Repository<Candidatura>,
        @InjectRepository(Candidato)
        private readonly candidatoRepo: Repository<Candidato>,
        @InjectRepository(PartidoPolitico)
        private readonly partidoRepo: Repository<PartidoPolitico>,
        @InjectRepository(Papeleta)
        private readonly papeletaRepo: Repository<Papeleta>,
    ) {}

    async generarPapeletaPorSeccion(seccionId: number, eleccionId: number) {
        if (!seccionId || !eleccionId) {
            throw new BadRequestException({ message: 'SecciónId y EleccionId son requeridos', code: 'PARAMS_REQUIRED' });
        }
        const seccion = await this.seccionRepo.findOne({ where: { id: seccionId } });
        if (!seccion) {
            throw new NotFoundException({ message: 'Sección no encontrada', code: 'SECCION_NOT_FOUND' });
        }
        const existing = await this.papeletaRepo.findOne({ where: { seccionId, eleccionId } });
        if (existing) {
            throw new BadRequestException({ message: 'Ya existe una papeleta para esta sección y elección', code: 'PAPELETA_EXISTS' });
        }
        const estructura = await this.generarEstructuraPapeleta(seccion, seccionId);
        const papeleta = this.papeletaRepo.create({
            seccionId,
            eleccionId,
            estructura,
        });
        await this.papeletaRepo.save(papeleta);
        return papeleta.estructura;
    }

    private async generarEstructuraPapeleta(seccion: Seccion, seccionId: number) {
        let cargos;
        try {
            cargos = await this.cargoRepo.find({ where: { seccion: { id: seccionId } } });
        } catch (e) {
            throw new InternalServerErrorException({ message: 'Error al buscar cargos', code: 'DB_ERROR' });
        }
        if (cargos.length === 0) {
            throw new NotFoundException({ message: 'No hay cargos definidos para esta sección', code: 'NO_CARGOS' });
        }
        const estructura: any = {
            seccionId: seccion.id,
            seccionNombre: seccion.nombre,
            cargos: []
        };
        for (const cargo of cargos) {
            const candidaturas = await this.candidaturaRepo.find({
                where: { cargoId: cargo.id },
                relations: ['partido']
            });
            if (candidaturas.length === 0) {
                throw new NotFoundException({ message: `No hay candidaturas para el cargo ${cargo.nombre}`, code: 'NO_CANDIDATURAS', cargoId: cargo.id });
            }
            const candidaturasConCandidatos: any[] = [];
            for (const candidatura of candidaturas) {
                const candidatos = await this.candidatoRepo.findByIds(candidatura.candidatoIds);
                if (candidatos.length === 0) {
                    throw new NotFoundException({ message: `No hay candidatos para el partido ${candidatura.partido.nombre} en el cargo ${cargo.nombre}`, code: 'NO_CANDIDATOS', cargoId: cargo.id, partidoId: candidatura.partido.id });
                }
                candidaturasConCandidatos.push({
                    partidoId: candidatura.partido.id,
                    partidoNombre: candidatura.partido.nombre,
                    partidoColor: candidatura.partido.color,
                    partidoSigla: candidatura.partido.sigla,
                    candidatos: candidatos.map(candidato => ({
                        id: candidato.id,
                        nombres: candidato.nombres,
                        apellidoPaterno: candidato.apellidoPaterno,
                        apellidoMaterno: candidato.apellidoMaterno,
                        fotoUrl: candidato.fotoUrl
                    }))
                });
            }
            estructura.cargos.push({
                cargoId: cargo.id,
                cargoNombre: cargo.nombre,
                candidaturas: candidaturasConCandidatos
            });
        }
        return estructura;
    }

    async findAll() {
        return this.papeletaRepo.find();
    }

    async findOneBySeccionEleccion(seccionId: number, eleccionId: number) {
        return this.papeletaRepo.findOne({ where: { seccionId, eleccionId } });
    }

    async findOne(id: number) {
        return this.papeletaRepo.findOne({ where: { id } });
    }
} 