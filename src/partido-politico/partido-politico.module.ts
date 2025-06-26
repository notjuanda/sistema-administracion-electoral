import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoPoliticoController } from './partido-politico.controller';
import { PartidoPoliticoService } from './partido-politico.service';
import { PartidoPolitico } from './entities/partido-politico.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PartidoPolitico])],
    controllers: [PartidoPoliticoController],
    providers: [PartidoPoliticoService],
    exports: [PartidoPoliticoService],
})
export class PartidoPoliticoModule {} 