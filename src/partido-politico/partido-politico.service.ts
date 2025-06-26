import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartidoPolitico } from './entities/partido-politico.entity';
import { CreatePartidoPoliticoDto } from './dto/create-partido-politico.dto';
import { UpdatePartidoPoliticoDto } from './dto/update-partido-politico.dto';

@Injectable()
export class PartidoPoliticoService {
    constructor(
        @InjectRepository(PartidoPolitico)
        private partidoRepository: Repository<PartidoPolitico>,
    ) {}

    async findAll(): Promise<PartidoPolitico[]> {
        return this.partidoRepository.find();
    }

    async findOne(id: number): Promise<PartidoPolitico | null> {
        return this.partidoRepository.findOne({ where: { id } });
    }

    async create(createPartidoDto: CreatePartidoPoliticoDto): Promise<PartidoPolitico> {
        const partido = this.partidoRepository.create(createPartidoDto);
        return this.partidoRepository.save(partido);
    }

    async update(id: number, updatePartidoDto: UpdatePartidoPoliticoDto): Promise<PartidoPolitico | null> {
        await this.partidoRepository.update(id, updatePartidoDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.partidoRepository.delete(id);
    }
} 