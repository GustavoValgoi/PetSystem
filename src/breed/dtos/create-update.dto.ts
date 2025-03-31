import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUpdateBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
