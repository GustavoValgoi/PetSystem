import { Category_Product } from '@prisma/client';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ProductEntity } from '../../product/entities/product.entity';

export class CategoryProductEntity implements Category_Product {
  id: string;
  productId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductEntity;
  category?: CategoryEntity;
}
