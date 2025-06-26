import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatoController } from './candidato.controller';
import { CandidatoService } from './candidato.service';
import { Candidato } from './entities/candidato.entity';
import { PartidoPoliticoModule } from '../partido-politico/partido-politico.module';
import { UploadModule } from '../upload/upload.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidato]),
        PartidoPoliticoModule,
        UploadModule,
    ],
    controllers: [CandidatoController],
    providers: [CandidatoService],
    exports: [CandidatoService],
})
export class CandidatoModule {} 