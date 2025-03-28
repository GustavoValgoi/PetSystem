import { VariationEntity } from '../entities/variation.entity';
import { ProductDto } from '../../product/dtos/product.dto';
import { VariationAttributeDto } from '../../variation-attribute/dtos/variation-attribute.dto';
import { VariationImageDto } from '../../variation-image/dtos/variation-image.dto';

export class VariationDto {
  public id: string;
  public amount: number;
  public coust: number | null;
  public stock: number | null;
  public sku: string | null;
  public codebar: string;
  public productId: string;
  public product?: ProductDto;
  public variations?: VariationAttributeDto[];
  public images?: VariationImageDto[];

  constructor(data: VariationEntity) {
    this.id = data.id;
    this.amount = Number(data.amount);
    this.coust = Number(data.coust);
    this.stock = Number(data.stock);
    this.sku = data.sku;
    this.codebar = data.codebar;
    this.productId = data.productId;
    this.product = data.product ? new ProductDto(data.product) : undefined;
    this.variations =
      data.variations && data.variations.length
        ? data.variations.map(v => new VariationAttributeDto(v))
        : [];
    this.images =
      data.images && data.images.length
        ? data.images.map(i => new VariationImageDto(i))
        : [];
  }
}
