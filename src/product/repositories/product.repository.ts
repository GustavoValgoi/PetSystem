import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create.dto';
import { UpdateProductDto } from '../dtos/update.dto';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class ProductRepository
  implements IRepository<ProductEntity, CreateProductDto, UpdateProductDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body: Omit<CreateProductDto, 'categories'>,
  ): Promise<ProductEntity> {
    return this.prisma.product.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: Omit<UpdateProductDto, 'categories'>,
  ): Promise<ProductEntity> {
    return this.prisma.product.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<ProductEntity | null> {
    return this.prisma.product.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(id: string, petshopId: string): Promise<ProductEntity | null> {
    return this.prisma.product.findFirst({
      where: { id, AND: [{ petshopId }] },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<ProductEntity>> {
    const where = { petshopId };
    const count = await this.prisma.product.count({ where });
    const data = await this.prisma.product.findMany({
      where,
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
