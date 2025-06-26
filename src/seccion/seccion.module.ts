import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionController } from './seccion.controller';
import { SeccionService } from './seccion.service';
import { Seccion } from './entities/seccion.entity';
import { PuntoSeccion } from './entities/punto-seccion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Seccion, PuntoSeccion])],
    controllers: [SeccionController],
    providers: [SeccionService],
    exports: [SeccionService],
})
export class SeccionModule {} 