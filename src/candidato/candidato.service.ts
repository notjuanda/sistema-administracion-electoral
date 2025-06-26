import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidato } from './entities/candidato.entity';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CandidatoService {
    constructor(
        @InjectRepository(Candidato)
        private candidatoRepository: Repository<Candidato>,
        private readonly uploadService: UploadService,
    ) {}

    async findAll(): Promise<Candidato[]> {
        return this.candidatoRepository.find();
    }

    async findOne(id: number): Promise<Candidato | null> {
        return this.candidatoRepository.findOne({ where: { id } });
    }

    async create(createCandidatoDto: CreateCandidatoDto): Promise<Candidato> {
        const candidato = this.candidatoRepository.create(createCandidatoDto);
        return this.candidatoRepository.save(candidato);
    }

    async createWithImage(createCandidatoDto: CreateCandidatoDto, file?: Express.Multer.File): Promise<Candidato> {
        let fotoUrl: string | undefined = undefined;
        if (file) {
            const uploadResult = await this.uploadService.uploadFile(file, 'candidatos', 'Foto de perfil');
            fotoUrl = uploadResult.url;
        }
        const candidato = this.candidatoRepository.create({ ...createCandidatoDto, fotoUrl });
        return this.candidatoRepository.save(candidato);
    }

    async update(id: number, updateCandidatoDto: UpdateCandidatoDto): Promise<Candidato | null> {
        await this.candidatoRepository.update(id, updateCandidatoDto);
        return this.findOne(id);
    }

    async updateWithImage(id: number, updateCandidatoDto: UpdateCandidatoDto, file?: Express.Multer.File): Promise<Candidato | null> {
        const candidato = await this.findOne(id);
        let fotoUrl: string | undefined = undefined;
        if (file) {
            // Si hay foto anterior, eliminarla
            if (candidato?.fotoUrl) {
                try {
                    await this.uploadService.deleteFileByUrl(candidato.fotoUrl);
                } catch (e) { /* ignorar si no existe */ }
            }
            const uploadResult = await this.uploadService.uploadFile(file, 'candidatos', 'Foto de perfil');
            fotoUrl = uploadResult.url;
        }
        await this.candidatoRepository.update(id, { ...updateCandidatoDto, ...(fotoUrl ? { fotoUrl } : {}) });
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const candidato = await this.findOne(id);
        if (candidato?.fotoUrl) {
            try {
                await this.uploadService.deleteFileByUrl(candidato.fotoUrl);
            } catch (e) { /* ignorar si no existe */ }
        }
        await this.candidatoRepository.delete(id);
    }
} 