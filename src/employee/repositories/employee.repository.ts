import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create.dto';
import { IRepository } from '../../interfaces/repository.interface';
import { UpdateEmployeeDto } from '../dtos/update.dto';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class EmployeeRepository
  implements IRepository<EmployeeEntity, CreateEmployeeDto, UpdateEmployeeDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateEmployeeDto): Promise<EmployeeEntity> {
    return this.prisma.employee.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateEmployeeDto): Promise<EmployeeEntity> {
    return this.prisma.employee.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<EmployeeEntity> {
    return this.prisma.employee.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<EmployeeEntity | null> {
    return this.prisma.employee.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<EmployeeEntity>> {
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
