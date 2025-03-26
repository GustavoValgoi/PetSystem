import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetshopDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  corporateName: string;

  @IsNotEmpty()
  @IsString()
  cnpjCpf: string;

  @IsOptional()
  @IsString()
  image?: string;
}
