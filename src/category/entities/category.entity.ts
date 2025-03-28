import { Category } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';
import { CategoryProductEntity } from '../../category-product/entities/category-product.entity';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  image: string | null;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  products?: CategoryProductEntity[];
}
