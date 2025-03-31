import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {}
