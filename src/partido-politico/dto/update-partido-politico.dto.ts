import { PartialType } from '@nestjs/swagger';
import { CreatePartidoPoliticoDto } from './create-partido-politico.dto';

export class UpdatePartidoPoliticoDto extends PartialType(CreatePartidoPoliticoDto) {} 