import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from './entities/seccion.entity';
import { PuntoSeccion } from './entities/punto-seccion.entity';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Injectable()
export class SeccionService {
    constructor(
        @InjectRepository(Seccion)
        private seccionRepository: Repository<Seccion>,
        @InjectRepository(PuntoSeccion)
        private puntoSeccionRepository: Repository<PuntoSeccion>,
    ) {}

    async findAll(): Promise<Seccion[]> {
        return this.seccionRepository.find();
    }

    async findOne(id: number): Promise<Seccion | null> {
        return this.seccionRepository.findOne({ where: { id } });
    }

    async create(createSeccionDto: CreateSeccionDto): Promise<Seccion | null> {
        const { puntos, ...seccionData } = createSeccionDto;
        
        const seccion = this.seccionRepository.create(seccionData);
        const savedSeccion = await this.seccionRepository.save(seccion);
        
        if (puntos && puntos.length > 0) {
            const puntosSeccion = puntos.map(punto => 
                this.puntoSeccionRepository.create({
                    ...punto,
                    seccionId: savedSeccion.id
                })
            );
            await this.puntoSeccionRepository.save(puntosSeccion);
        }
        
        return this.findOne(savedSeccion.id);
    }

    async update(id: number, updateSeccionDto: UpdateSeccionDto): Promise<Seccion | null> {
        const { puntos, ...seccionData } = updateSeccionDto;
        
        await this.seccionRepository.update(id, seccionData);
        
        if (puntos) {
            await this.puntoSeccionRepository.delete({ seccionId: id });
            
            if (puntos.length > 0) {
                const puntosSeccion = puntos.map(punto => 
                    this.puntoSeccionRepository.create({
                        ...punto,
                        seccionId: id
                    })
                );
                await this.puntoSeccionRepository.save(puntosSeccion);
            }
        }
        
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.seccionRepository.delete(id);
    }
} 