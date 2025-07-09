import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { Recinto } from '../recinto/entities/recinto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Mesa, Recinto])],
    controllers: [MesaController],
    providers: [MesaService],
    exports: [TypeOrmModule],
})
export class MesaModule {} 