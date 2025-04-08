import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsUUID()
  petshopId: string;
}
