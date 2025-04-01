import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => {
    try {
      value = JSON.parse(value);
      return Array.isArray(value)
        ? value.map(item => plainToInstance(CategoryId, item))
        : [];
    } catch {
      return value;
    }
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CategoryId)
  categories: CategoryId[];
}

export class CategoryId {
  @IsUUID()
  id: string;
}
