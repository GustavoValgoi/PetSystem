import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryProductService } from './category-product.service';
import { CategoryProductRepository } from './repositories/category-product.repository';

@Module({
  providers: [CategoryProductService, CategoryProductRepository, PrismaService],
  exports: [CategoryProductService],
})
export class CategoryProductModule {}
