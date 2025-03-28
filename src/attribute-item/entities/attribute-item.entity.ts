import { Attribute_Item } from '@prisma/client';
import { AttributeEntity } from '../../attribute/entities/attribute.entity';
import { VariationAttributeEntity } from 'src/variation-attribute/entities/variation-attribute.entity';

export class AttributeItemEntity implements Attribute_Item {
  id: string;
  name: string;
  attributeId: string;
  createdAt: Date;
  updatedAt: Date;
  attribute?: AttributeEntity;
  variations?: VariationAttributeEntity[];
}
