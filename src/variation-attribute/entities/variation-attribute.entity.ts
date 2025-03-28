import { Variation_Attribute } from '@prisma/client';
import { AttributeItemEntity } from '../../attribute-item/entities/attribute-item.entity';
import { AttributeEntity } from '../../attribute/entities/attribute.entity';
import { VariationEntity } from '../../variation/entities/variation.entity';

export class VariationAttributeEntity implements Variation_Attribute {
  id: string;
  variationId: string;
  itemId: string;
  attributeId: string;
  createdAt: Date;
  updatedAt: Date;
  item?: AttributeItemEntity;
  attribute?: AttributeEntity;
  variation?: VariationEntity;
}
