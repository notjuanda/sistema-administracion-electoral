import { Module } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { RecintoController } from './recinto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto])],
  controllers: [RecintoController],
  providers: [RecintoService],
  exports: [TypeOrmModule],
})
export class RecintoModule {} 