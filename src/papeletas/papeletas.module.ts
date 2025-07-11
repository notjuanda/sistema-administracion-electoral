import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from '../seccion/entities/seccion.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { Candidatura } from '../candidatura/entities/candidatura.entity';
import { Candidato } from '../candidato/entities/candidato.entity';
import { PartidoPolitico } from '../partido-politico/entities/partido-politico.entity';
import { Papeleta } from './entities/papeleta.entity';
import { PapeletasService } from './papeletas.service';
import { PapeletasController } from './papeletas.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
        Seccion,
        Cargo,
        Candidatura,
        Candidato,
        PartidoPolitico,
        Papeleta
        ])
    ],
    controllers: [PapeletasController],
    providers: [PapeletasService],
    exports: [TypeOrmModule],
})
export class PapeletasModule {} 