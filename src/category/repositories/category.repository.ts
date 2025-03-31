import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryEntity } from '../entities/category.entity';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { CreateCategoryDto } from '../dtos/create.dto';
import { IRepository } from '../../interfaces/repository.interface';
import { UpdateCategoryDto } from '../dtos/update.dto';

@Injectable()
export class CategoryRepository
  implements IRepository<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<CategoryEntity | null> {
    return this.prisma.category.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<CategoryEntity | null> {
    return this.prisma.category.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CategoryEntity>> {
    const where = { petshopId };
    const count = await this.prisma.category.count({ where });
    const data = await this.prisma.category.findMany({
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
