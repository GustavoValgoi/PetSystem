import { Injectable } from '@nestjs/common';
import { IRepository } from '../../interfaces/repository.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { VariationEntity } from '../entities/variation.entity';
import { CreateVariationDto } from '../dtos/create.dto';
import { UpdateVariationDto } from '../dtos/update.dto';

@Injectable()
export class VariationRepository
  implements
    IRepository<VariationEntity, CreateVariationDto, UpdateVariationDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body: Omit<CreateVariationDto, 'petshopId'>,
  ): Promise<VariationEntity> {
    return this.prisma.variation.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: Omit<UpdateVariationDto, 'petshopId'>,
  ): Promise<VariationEntity> {
    return this.prisma.variation.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, productId: string): Promise<VariationEntity> {
    return this.prisma.variation.delete({
      where: { id, AND: [{ productId }] },
    });
  }

  async findById(
    id: string,
    productId: string,
  ): Promise<VariationEntity | null> {
    return this.prisma.variation.findFirst({
      where: { id, AND: [{ productId }] },
    });
  }

  async findAll(
    productId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<VariationEntity>> {
    const where = { productId };
    const count = await this.prisma.variation.count({ where });
    const data = await this.prisma.variation.findMany({
      where,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      limit: query.limit,
      page: query.page,
      totalPages: Math.ceil(count / query.limit),
      count,
      data,
    };
  }
}
