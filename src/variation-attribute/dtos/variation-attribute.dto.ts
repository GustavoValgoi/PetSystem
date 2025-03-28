import { VariationAttributeEntity } from '../entities/variation-attribute.entity';
import { VariationDto } from '../../variation/dtos/variation.dto';
import { AttributeDto } from '../../attribute/dtos/attribute.dto';
import { AttributeItemDto } from '../../attribute-item/dtos/attribute-item.dto';

export class VariationAttributeDto {
  public id: string;
  public variationId: string;
  public itemId: string;
  public attributeId: string;
  public item?: AttributeItemDto;
  public attribute?: AttributeDto;
  public variation?: VariationDto;

  constructor(data: VariationAttributeEntity) {
    this.id = data.id;
    this.itemId = data.itemId;
    this.variationId = data.variationId;
    this.attributeId = data.attributeId;
    this.item = data.item ? new AttributeItemDto(data.item) : undefined;
    this.attribute = data.attribute
      ? new AttributeDto(data.attribute)
      : undefined;
    this.variation = data.variation
      ? new VariationDto(data.variation)
      : undefined;
  }
}
