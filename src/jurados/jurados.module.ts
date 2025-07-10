import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jurado } from './entities/jurado.entity';
import { JuradosService } from './jurados.service';
import { JuradosController } from './jurados.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Jurado])],
    controllers: [JuradosController],
    providers: [JuradosService],
    exports: [TypeOrmModule],
})
export class JuradosModule {} 