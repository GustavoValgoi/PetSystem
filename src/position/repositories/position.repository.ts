import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../interfaces/repository.interface';
import { PositionEntity } from '../entities/position.entity';
import { CreateUpdatePostionDto } from '../dtos/create-update.dto';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class PositionRepository
  implements
    IRepository<PositionEntity, CreateUpdatePostionDto, CreateUpdatePostionDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUpdatePostionDto): Promise<PositionEntity> {
    return this.prisma.position.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: CreateUpdatePostionDto,
  ): Promise<PositionEntity> {
    return this.prisma.position.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<PositionEntity | null> {
    return this.prisma.position.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<PositionEntity | null> {
    return this.prisma.position.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<PositionEntity>> {
    const where = { petshopId };
    const count = await this.prisma.employee.count({ where });
    const data = await this.prisma.employee.findMany({
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
