import { Module } from '@nestjs/common';
import { VariationAttributeService } from './variation-attribute.service';

@Module({
  providers: [VariationAttributeService]
})
export class VariationAttributeModule {}
