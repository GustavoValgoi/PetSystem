import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUpdatePostionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
