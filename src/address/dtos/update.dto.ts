import { IsOptional, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsOptional()
  @IsUUID()
  petshopId: string;
}
