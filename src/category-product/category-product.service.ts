import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CategoryProductRepository } from './repositories/category-product.repository';
import { CreateUpdateCategoryProductDto } from './entities/create.dto';

@Injectable()
export class CategoryProductService {
  constructor(
    private readonly categoryProductRepository: CategoryProductRepository,
  ) {}

  async create(
    body: CreateUpdateCategoryProductDto[],
  ): Promise<Prisma.BatchPayload> {
    return this.categoryProductRepository.create(body);
  }
}
