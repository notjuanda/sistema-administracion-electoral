import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from '../seccion/entities/seccion.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { Candidatura } from '../candidatura/entities/candidatura.entity';
import { Candidato } from '../candidato/entities/candidato.entity';
import { PartidoPolitico } from '../partido-politico/entities/partido-politico.entity';

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
    ) {}

    async generarPapeletaPorSeccion(seccionId: number) {
        const seccion = await this.seccionRepo.findOne({ where: { id: seccionId } });
        if (!seccion) {
        throw new NotFoundException('Sección no encontrada');
        }

        const cargos = await this.cargoRepo
        .createQueryBuilder('cargo')
        .innerJoin('cargo.secciones', 'seccion')
        .where('seccion.id = :seccionId', { seccionId })
        .getMany();

        if (cargos.length === 0) {
        throw new NotFoundException('No hay cargos definidos para esta sección');
        }

        const papeleta: any = {
        seccionId: seccion.id,
        seccionNombre: seccion.nombre,
        cargos: []
        };

        for (const cargo of cargos) {
        const candidaturas = await this.candidaturaRepo.find({
            where: { cargoId: cargo.id },
            relations: ['partido']
        });

        const candidaturasConCandidatos: any[] = [];

        for (const candidatura of candidaturas) {
            const candidatos = await this.candidatoRepo.findByIds(candidatura.candidatoIds);

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

        papeleta.cargos.push({
            cargoId: cargo.id,
            cargoNombre: cargo.nombre,
            candidaturas: candidaturasConCandidatos
        });
        }

        return papeleta;
    }
} 