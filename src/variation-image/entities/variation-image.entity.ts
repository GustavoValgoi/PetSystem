import { Variation_Image } from '@prisma/client';
import { VariationEntity } from '../../variation/entities/variation.entity';

export class VariationImageEntity implements Variation_Image {
  id: string;
  image: string | null;
  variationId: string;
  createdAt: Date;
  updatedAt: Date;
  variation?: VariationEntity;
}
