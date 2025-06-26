import { PartialType } from '@nestjs/swagger';
import { CreateEleccionDto } from './create-eleccion.dto';

export class UpdateEleccionDto extends PartialType(CreateEleccionDto) {} 