import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaService {
    constructor(
        @InjectRepository(Mesa)
        private readonly mesaRepository: Repository<Mesa>,
    ) {}

    create(createMesaDto: CreateMesaDto): Promise<Mesa> {
        const mesa = this.mesaRepository.create(createMesaDto);
        return this.mesaRepository.save(mesa);
    }

    findAll(): Promise<Mesa[]> {
        return this.mesaRepository.find({ relations: ['recinto'] });
    }

    findOne(id: number): Promise<Mesa | null> {
        return this.mesaRepository.findOne({ where: { id }, relations: ['recinto'] });
    }

    async update(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
        const mesa = await this.mesaRepository.findOneBy({ id });
        if (!mesa) throw new NotFoundException('Mesa no encontrada');
        Object.assign(mesa, updateMesaDto);
        return this.mesaRepository.save(mesa);
    }

    async remove(id: number): Promise<void> {
        const result = await this.mesaRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Mesa no encontrada');
    }
} 