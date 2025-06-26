import { PartialType } from '@nestjs/swagger';
import { CreateCandidaturaDto } from './create-candidatura.dto';

export class UpdateCandidaturaDto extends PartialType(CreateCandidaturaDto) {} 