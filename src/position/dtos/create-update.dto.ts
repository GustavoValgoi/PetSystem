import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUpdatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
