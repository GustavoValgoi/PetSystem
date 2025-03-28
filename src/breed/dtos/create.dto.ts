import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
