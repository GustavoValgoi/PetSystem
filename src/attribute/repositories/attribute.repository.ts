import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from 'src/interfaces/repository.interface';
import { AttributeEntity } from '../entities/attribute.entity';
import { CreateUpdateAttributeDto } from '../dtos/create-update.dto';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';

@Injectable()
export class AttributeRepository
  implements
    IRepository<
      AttributeEntity,
      CreateUpdateAttributeDto,
      CreateUpdateAttributeDto
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUpdateAttributeDto): Promise<AttributeEntity> {
    return this.prisma.attribute.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: CreateUpdateAttributeDto,
  ): Promise<AttributeEntity> {
    return this.prisma.attribute.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<AttributeEntity | null> {
    return this.prisma.attribute.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<AttributeEntity | null> {
    return this.prisma.attribute.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<AttributeEntity>> {
    const where = { petshopId };
    const count = await this.prisma.attribute.count({ where });
    const data = await this.prisma.attribute.findMany({
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
