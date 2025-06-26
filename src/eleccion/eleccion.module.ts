import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EleccionController } from './eleccion.controller';
import { EleccionService } from './eleccion.service';
import { Eleccion } from './entities/eleccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eleccion])],
  controllers: [EleccionController],
  providers: [EleccionService],
  exports: [EleccionService],
})
export class EleccionModule {} 