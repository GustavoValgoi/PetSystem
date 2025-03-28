import { CategoryEntity } from '../entities/category.entity';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { CategoryProductDto } from '../../category-product/dtos/category-product.dto';

export class CategoryDto {
  public id: string;
  public name: string;
  public image: string | null;
  public petshopId: string;
  public petshop?: PetshopDto;
  public products?: CategoryProductDto[];

  constructor(data: CategoryEntity) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.products =
      data.products && data.products.length
        ? data.products.map(p => new CategoryProductDto(p))
        : [];
  }
}
