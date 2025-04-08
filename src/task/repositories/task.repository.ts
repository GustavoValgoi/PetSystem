import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create.dto';
import { UpdateTaskDto } from '../dtos/update.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../interfaces/repository.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class TaskRepository
  implements IRepository<TaskEntity, CreateTaskDto, UpdateTaskDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTaskDto): Promise<TaskEntity> {
    return this.prisma.service.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateTaskDto): Promise<TaskEntity> {
    return this.prisma.service.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<TaskEntity> {
    return this.prisma.service.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(id: string, petshopId: string): Promise<TaskEntity | null> {
    return this.prisma.service.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<TaskEntity>> {
    const where = { petshopId };
    const count = await this.prisma.service.count({ where });
    const data = await this.prisma.service.findMany({
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
