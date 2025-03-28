import { Variation } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { VariationAttributeEntity } from '../../variation-attribute/entities/variation-attribute.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { VariationImageEntity } from '../../variation-image/entities/variation-image.entity';

export class VariationEntity implements Variation {
  id: string;
  amount: Decimal;
  coust: Decimal | null;
  stock: Decimal | null;
  sku: string | null;
  codebar: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductEntity;
  variations?: VariationAttributeEntity[];
  images?: VariationImageEntity[];
}
