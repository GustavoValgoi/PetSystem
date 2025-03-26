import { CreatePetshopDto } from './create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePetshopDto extends PartialType(CreatePetshopDto) {}
