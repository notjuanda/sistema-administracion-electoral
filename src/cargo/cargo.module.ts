import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { Seccion } from '../seccion/entities/seccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cargo, Seccion])
  ],
  controllers: [CargoController],
  providers: [CargoService],
  exports: [CargoService],
})
export class CargoModule {} 