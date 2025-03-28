import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';

@Module({
  providers: [CategoryProductService]
})
export class CategoryProductModule {}
