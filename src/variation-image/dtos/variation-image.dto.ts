import { VariationImageEntity } from '../entities/variation-image.entity';
import { VariationDto } from '../../variation/dtos/variation.dto';

export class VariationImageDto {
  public id: string;
  public image: string | null;
  public variationId: string;
  public variation?: VariationDto;

  constructor(data: VariationImageEntity) {
    this.id = data.id;
    this.image = data.image;
    this.variationId = data.variationId;
    this.variation = data.variation
      ? new VariationDto(data.variation)
      : undefined;
  }
}
