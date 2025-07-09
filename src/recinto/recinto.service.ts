import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from './entities/recinto.entity';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';

@Injectable()
export class RecintoService {
    constructor(
        @InjectRepository(Recinto)
        private readonly recintoRepository: Repository<Recinto>,
    ) {}

    create(createRecintoDto: CreateRecintoDto): Promise<Recinto> {
        const recinto = this.recintoRepository.create(createRecintoDto);
        return this.recintoRepository.save(recinto);
    }

    findAll(): Promise<Recinto[]> {
        return this.recintoRepository.find();
    }

    findOne(id: number): Promise<Recinto | null> {
        return this.recintoRepository.findOneBy({ id });
    }

    async update(id: number, updateRecintoDto: UpdateRecintoDto): Promise<Recinto> {
        const recinto = await this.recintoRepository.findOneBy({ id });
        if (!recinto) throw new NotFoundException('Recinto no encontrado');
        Object.assign(recinto, updateRecintoDto);
        return this.recintoRepository.save(recinto);
    }

    async remove(id: number): Promise<void> {
        const result = await this.recintoRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Recinto no encontrado');
    }
} 