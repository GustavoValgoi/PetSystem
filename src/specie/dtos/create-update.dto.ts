import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUpdateSpecieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
