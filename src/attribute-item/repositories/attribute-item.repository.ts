import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../interfaces/repository.interface';
import { AttributeItemEntity } from '../entities/attribute-item.entity';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { CreateUpdateAttributeItemDto } from '../dtos/create-update.dto';

@Injectable()
export class AttributeItemRepository
  implements
    IRepository<
      AttributeItemEntity,
      CreateUpdateAttributeItemDto,
      CreateUpdateAttributeItemDto
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    return this.prisma.attribute_Item.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    return this.prisma.attribute_Item.update({
      where: { id },
      data: body,
    });
  }

  async delete(
    id: string,
    attributeId: string,
  ): Promise<AttributeItemEntity | null> {
    return this.prisma.attribute_Item.delete({
      where: { id, AND: [{ attributeId }] },
    });
  }

  async findById(
    id: string,
    attributeId: string,
  ): Promise<AttributeItemEntity | null> {
    return this.prisma.attribute_Item.findFirst({
      where: { id, AND: [{ attributeId }] },
    });
  }

  async findAll(
    attributeId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<AttributeItemEntity>> {
    const where = { attributeId };
    const count = await this.prisma.attribute_Item.count({ where });
    const data = await this.prisma.attribute_Item.findMany({
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
