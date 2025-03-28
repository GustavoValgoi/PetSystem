import { Module } from '@nestjs/common';
import { VariationController } from './variation.controller';
import { VariationService } from './variation.service';

@Module({
  controllers: [VariationController],
  providers: [VariationService]
})
export class VariationModule {}
