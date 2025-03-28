import { Module } from '@nestjs/common';
import { VariationImageService } from './variation-image.service';

@Module({
  providers: [VariationImageService]
})
export class VariationImageModule {}
