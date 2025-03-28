import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
