import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Seccion } from '../seccion/entities/seccion.entity';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
    @InjectRepository(Seccion)
    private seccionRepository: Repository<Seccion>,
  ) {}

  
  async findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find();
  }

  async findOne(id: number): Promise<Cargo | null> {
    return this.cargoRepository.findOne({ where: { id } });
  }

  async create(createCargoDto: CreateCargoDto): Promise<Cargo> {
    const { seccionId, ...rest } = createCargoDto;
    const seccion = await this.seccionRepository.findOne({ where: { id: seccionId } });
    if (!seccion) throw new Error('Sección no encontrada');
    const cargo = this.cargoRepository.create({ ...rest, seccion });
    return this.cargoRepository.save(cargo);
  }

  async update(id: number, updateCargoDto: UpdateCargoDto): Promise<Cargo | null> {
    const { seccionId, ...rest } = updateCargoDto;
    const cargo = await this.cargoRepository.findOne({ where: { id }, relations: ['seccion'] });
    if (!cargo) throw new Error('Cargo no encontrado');
    if (seccionId) {
      const seccion = await this.seccionRepository.findOne({ where: { id: seccionId } });
      if (!seccion) throw new Error('Sección no encontrada');
      cargo.seccion = seccion;
    }
    Object.assign(cargo, rest);
    await this.cargoRepository.save(cargo);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cargoRepository.delete(id);
  }
} 