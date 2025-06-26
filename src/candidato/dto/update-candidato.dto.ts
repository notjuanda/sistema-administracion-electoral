import { PartialType } from '@nestjs/swagger';
import { CreateCandidatoDto } from './create-candidato.dto';

export class UpdateCandidatoDto extends PartialType(CreateCandidatoDto) {} 