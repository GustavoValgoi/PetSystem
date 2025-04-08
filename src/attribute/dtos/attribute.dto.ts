import { AttributeEntity } from '../entities/attribute.entity';
import { AttributeItemDto } from '../../attribute-item/dtos/attribute-item.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { VariationAttributeDto } from '../../variation-attribute/dtos/variation-attribute.dto';

export class AttributeDto {
  public id: string;
  public name: string;
  public petshopId: string;
  public petshop?: PetshopDto;
  public items?: AttributeItemDto[];
  public variations?: VariationAttributeDto[];

  constructor(data: AttributeEntity) {
    this.id = data.id;
    this.name = data.name;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.items =
      data.items && data.items.length
        ? data.items.map(i => new AttributeItemDto(i))
        : [];
    this.variations =
      data.variations && data.variations.length
        ? data.variations.map(i => new VariationAttributeDto(i))
        : [];
  }
}
