import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.service';
import { Cargo } from './entities/cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
  controllers: [CargoController],
  providers: [CargoService],
  exports: [CargoService],
})
export class CargoModule {} 