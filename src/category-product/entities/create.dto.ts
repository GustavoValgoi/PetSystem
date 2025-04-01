import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUpdateCategoryProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
