import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBreedDto } from '../dtos/create.dto';
import { BreedEntity } from '../entities/breed.entity';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';

@Injectable()
export class BreedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateBreedDto): Promise<BreedEntity> {
    return this.prisma.breed.create({
      data: body,
    });
  }

  async findAll(
    query: IQueryPagination,
    petshopId: string,
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
