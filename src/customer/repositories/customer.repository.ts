import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from '../dtos/create.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { IRepository } from '../../interfaces/repository.interface';
import { UpdateCustomerDto } from '../dtos/update.dto';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class CustomerRepository
  implements IRepository<CustomerEntity, CreateCustomerDto, UpdateCustomerDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateCustomerDto): Promise<CustomerEntity> {
    return this.prisma.customer.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateCustomerDto): Promise<CustomerEntity> {
    return this.prisma.customer.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<CustomerEntity> {
    return this.prisma.customer.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findById(
    id: string,
    petshopId: string,
  ): Promise<CustomerEntity | null> {
    return this.prisma.customer.findFirst({
      where: { id, AND: [{ petshopId }] },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CustomerEntity>> {
    const where = { petshopId };
    const count = await this.prisma.customer.count({ where });
    const data = await this.prisma.customer.findMany({
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
