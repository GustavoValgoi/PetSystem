import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUpdateAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
