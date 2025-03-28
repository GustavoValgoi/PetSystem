import { Attribute } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';
import { AttributeItemEntity } from '../../attribute-item/entities/attribute-item.entity';
import { VariationAttributeEntity } from '../../variation-attribute/entities/variation-attribute.entity';

export class AttributeEntity implements Attribute {
  id: string;
  name: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  items?: AttributeItemEntity[];
  variations?: VariationAttributeEntity[];
}
