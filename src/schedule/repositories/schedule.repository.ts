import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create.dto';
import { UpdateScheduleDto } from '../dto/update.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ScheduleEntity } from '../entities/schedule.entity';
import { IRepository } from '../../interfaces/repository.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class ScheduleRepository
  implements IRepository<ScheduleEntity, CreateScheduleDto, UpdateScheduleDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateScheduleDto): Promise<ScheduleEntity> {
    return this.prisma.schedule.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateScheduleDto): Promise<ScheduleEntity> {
    return this.prisma.schedule.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<ScheduleEntity> {
    return this.prisma.schedule.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<ScheduleEntity | null> {
    return this.prisma.schedule.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<ScheduleEntity>> {
    const where = { petshopId };
    const count = await this.prisma.schedule.count({ where });
    const data = await this.prisma.schedule.findMany({
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
