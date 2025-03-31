import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SpecieEntity } from '../entities/specie.entity';
import { CreateUpdateSpecieDto } from '../dtos/create-update.dto';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class SpecieRepository
  implements
    IRepository<SpecieEntity, CreateUpdateSpecieDto, CreateUpdateSpecieDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, petshopId: string): Promise<SpecieEntity | null> {
    return this.prisma.specie.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async create(body: CreateUpdateSpecieDto): Promise<SpecieEntity> {
    return this.prisma.specie.create({
      data: body,
    });
  }

  async update(id: string, body: CreateUpdateSpecieDto): Promise<SpecieEntity> {
    return this.prisma.specie.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<SpecieEntity> {
    return this.prisma.specie.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<SpecieEntity>> {
    const where = { petshopId };
    const count = await this.prisma.specie.count({ where });
    const data = await this.prisma.specie.findMany({
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
