import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionVotanteMesa } from './entities/asignacion-votante-mesa.entity';
import { Mesa } from '../mesa/entities/mesa.entity';
import { AsignacionVotanteMesaService } from './asignacion-votante-mesa.service';
import { AsignacionVotanteMesaController } from './asignacion-votante-mesa.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AsignacionVotanteMesa, Mesa])],
    controllers: [AsignacionVotanteMesaController],
    providers: [AsignacionVotanteMesaService],
    exports: [TypeOrmModule],
})
export class AsignacionVotanteMesaModule {}
