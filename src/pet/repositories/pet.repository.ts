import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dtos/create.dto';
import { PetEntity } from '../entities/pet.entity';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';
import { IFindPagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePetDto): Promise<PetEntity> {
    return this.prisma.pet.create({
      data: body,
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<PetEntity>> {
    const where = {
      petshopId,
    };

    const count = await this.prisma.pet.count({ where });

    const data = await this.prisma.pet.findMany({
      where,
      include: {
        customer: true,
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      page: query.page,
      limit: query.limit,
      count,
      totalPages: Math.ceil(count / query.limit),
      data,
    };
  }
}
