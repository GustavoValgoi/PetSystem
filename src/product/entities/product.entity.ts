import { Product } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';
import { CategoryProductEntity } from '../../category-product/entities/category-product.entity';
import { VariationEntity } from '../../variation/entities/variation.entity';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string;
  image: string | null;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  categories?: CategoryProductEntity[];
  variations?: VariationEntity[];
}
