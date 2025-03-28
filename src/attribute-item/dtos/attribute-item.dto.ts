import { AttributeDto } from '../../attribute/dtos/attribute.dto';
import { VariationAttributeDto } from '../../variation-attribute/dtos/variation-attribute.dto';
import { AttributeItemEntity } from '../entities/attribute-item.entity';

export class AttributeItemDto {
  public id: string;
  public name: string;
  public attributeId: string;
  public attribute?: AttributeDto;
  public variations?: VariationAttributeDto[];

  constructor(data: AttributeItemEntity) {
    this.id = data.id;
    this.name = data.name;
    this.attributeId = data.attributeId;
    this.attribute = data.attribute
      ? new AttributeDto(data.attribute)
      : undefined;
    this.variations =
      data.variations && data.variations.length
        ? data.variations.map(v => new VariationAttributeDto(v))
        : [];
  }
}
