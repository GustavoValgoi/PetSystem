import { CategoryProductEntity } from '../entities/category-product.entity';
import { ProductDto } from '../../product/dtos/product.dto';
import { CategoryDto } from '../../category/dtos/category.dto';

export class CategoryProductDto {
  public id: string;
  public productId: string;
  public categoryId: string;
  public product?: ProductDto;
  public category?: CategoryDto;

  constructor(data: CategoryProductEntity) {
    this.id = data.id;
    this.productId = data.productId;
    this.categoryId = data.categoryId;
    this.product = data.product ? new ProductDto(data.product) : undefined;
    this.category = data.category ? new CategoryDto(data.category) : undefined;
  }
}
