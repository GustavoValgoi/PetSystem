import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateVariationDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  codebar: string;

  @IsOptional()
  @IsNumber()
  coust: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  sku: string;
}
