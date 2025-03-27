import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsUUID()
  breedId?: string;

  @IsOptional()
  @IsUUID()
  specieId?: string;
}
