import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { CreateUpdateBreedDto } from '../dtos/create-update.dto';
import { BreedEntity } from '../entities/breed.entity';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class BreedRepository
  implements
    IRepository<BreedEntity, CreateUpdateBreedDto, CreateUpdateBreedDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUpdateBreedDto): Promise<BreedEntity> {
    return this.prisma.breed.create({
      data: body,
    });
  }

  async update(id: string, body: CreateUpdateBreedDto): Promise<BreedEntity> {
    return this.prisma.breed.update({
      where: { id },
      data: body,
    });
  }

  async findById(id: string, petshopId: string): Promise<BreedEntity | null> {
    return this.prisma.breed.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async delete(id: string, petshopId: string): Promise<BreedEntity> {
    return this.prisma.breed.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<BreedEntity>> {
    const where = { petshopId };
    const count = await this.prisma.breed.count({ where });
    const data = await this.prisma.breed.findMany({
      where,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(count / query.limit),
      count,
      data,
    };
  }
}
