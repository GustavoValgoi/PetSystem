import { CategoryProductDto } from '../../category-product/dtos/category-product.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { ProductEntity } from '../entities/product.entity';
import { VariationDto } from '../../variation/dtos/variation.dto';

export class ProductDto {
  public id: string;
  public name: string;
  public description: string;
  public image: string | null;
  public petshopId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public petshop?: PetshopDto;
  public categories?: CategoryProductDto[];
  public variations?: VariationDto[];

  constructor(data: ProductEntity) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.categories =
      data.categories && data.categories.length
        ? data.categories.map(p => new CategoryProductDto(p))
        : [];
    this.variations =
      data.variations && data.variations.length
        ? data.variations.map(p => new VariationDto(p))
        : [];
  }
}
