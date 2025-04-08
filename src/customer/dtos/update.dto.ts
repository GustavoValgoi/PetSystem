import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional()
  @IsUUID()
  petshopId: string;
}
