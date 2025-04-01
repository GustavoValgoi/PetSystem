import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CategoryProductEntity } from '../entities/category-product.entity';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUpdateCategoryProductDto } from '../entities/create.dto';

@Injectable()
export class CategoryProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body: CreateUpdateCategoryProductDto[],
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.category_Product.createMany({
      data: body,
    });
  }

  async findByProductId(
    productId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CategoryProductEntity>> {
    const where = { productId };
    const count = await this.prisma.category_Product.count({ where });
    const data = await this.prisma.category_Product.findMany({
      where,
      include: { category: true },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      count,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(count / query.limit),
      data,
    };
  }

  async findByCategoryId(
    categoryId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CategoryProductEntity>> {
    const where = { categoryId };
    const count = await this.prisma.category_Product.count({ where });
    const data = await this.prisma.category_Product.findMany({
      where,
      include: { product: true },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      count,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(count / query.limit),
      data,
    };
  }
}
