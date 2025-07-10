import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jurado } from './entities/jurado.entity';
import { CreateJuradoDto } from './dto/create-jurado.dto';

@Injectable()
export class JuradosService {
    constructor(
        @InjectRepository(Jurado)
        private readonly juradoRepo: Repository<Jurado>,
    ) {}

    async create(createJuradoDto: CreateJuradoDto) {
        const juradoExistente = await this.juradoRepo.findOne({
        where: { mesaId: createJuradoDto.mesaId }
        });

        if (juradoExistente) {
        throw new ConflictException('Ya existe un jurado asignado a esta mesa');
        }

        const jurado = this.juradoRepo.create(createJuradoDto);
        return await this.juradoRepo.save(jurado);
    }

    async findAll() {
        return await this.juradoRepo.find();
    }

    async findOne(id: number) {
        const jurado = await this.juradoRepo.findOne({ where: { id } });
        if (!jurado) {
        throw new NotFoundException('Jurado no encontrado');
        }
        return jurado;
    }

    async findByMesa(mesaId: number) {
        const jurado = await this.juradoRepo.findOne({ where: { mesaId } });
        if (!jurado) {
        throw new NotFoundException('No hay jurado asignado a esta mesa');
        }
        return jurado;
    }

    async remove(id: number) {
        const jurado = await this.findOne(id);
        await this.juradoRepo.remove(jurado);
        return { mensaje: 'Jurado eliminado correctamente' };
    }
} 