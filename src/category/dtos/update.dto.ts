import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsUUID()
  petshopId: string;
}
