import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eleccion } from './entities/eleccion.entity';
import { CreateEleccionDto } from './dto/create-eleccion.dto';
import { UpdateEleccionDto } from './dto/update-eleccion.dto';

@Injectable()
export class EleccionService {
  constructor(
    @InjectRepository(Eleccion)
    private eleccionRepository: Repository<Eleccion>,
  ) {}

  
  async findAll(): Promise<Eleccion[]> {
    return this.eleccionRepository.find();
  }

  async findOne(id: number): Promise<Eleccion | null> {
    return this.eleccionRepository.findOne({ where: { id } });
  }

  async create(createEleccionDto: CreateEleccionDto): Promise<Eleccion> {
    const eleccionData = {
      ...createEleccionDto,
      fecha: new Date(createEleccionDto.fecha)
    };
    const eleccion = this.eleccionRepository.create(eleccionData);
    return this.eleccionRepository.save(eleccion);
  }

  async update(id: number, updateEleccionDto: UpdateEleccionDto): Promise<Eleccion | null> {
    const eleccionData = {
      ...updateEleccionDto,
      ...(updateEleccionDto.fecha && { fecha: new Date(updateEleccionDto.fecha) })
    };
    await this.eleccionRepository.update(id, eleccionData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eleccionRepository.delete(id);
  }
} 