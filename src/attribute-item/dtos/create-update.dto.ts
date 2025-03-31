import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUpdateAttributeItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  attributeId: string;
}
