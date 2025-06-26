import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidaturaController } from './candidatura.controller';
import { CandidaturaService } from './candidatura.service';
import { Candidatura } from './entities/candidatura.entity';
import { CandidatoModule } from '../candidato/candidato.module';
import { CargoModule } from '../cargo/cargo.module';
import { EleccionModule } from '../eleccion/eleccion.module';
import { PartidoPoliticoModule } from '../partido-politico/partido-politico.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidatura]),
        CandidatoModule,
        CargoModule,
        EleccionModule,
        PartidoPoliticoModule,
    ],
    controllers: [CandidaturaController],
    providers: [CandidaturaService],
    exports: [CandidaturaService],
})
export class CandidaturaModule {} 