import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRepository } from '../../interfaces/repository.interface';
import { AddressEntity } from '../entities/address.entity';
import { CreateAddressDto } from '../dtos/create.dto';
import { UpdateAddressDto } from '../dtos/update.dto';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';

@Injectable()
export class AddressRepository
  implements IRepository<AddressEntity, CreateAddressDto, UpdateAddressDto>
{
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAddressDto): Promise<AddressEntity> {
    return this.prisma.address.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateAddressDto): Promise<AddressEntity> {
    return this.prisma.address.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, petshopId: string): Promise<AddressEntity> {
    return this.prisma.address.delete({
      where: { id, AND: { petshopId } },
    });
  }

  async findById(id: string, petshopId: string): Promise<AddressEntity | null> {
    return this.prisma.address.findFirst({
      where: { id, AND: { petshopId } },
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<AddressEntity>> {
    const where = { petshopId };
    const count = await this.prisma.address.count({ where });
    const data = await this.prisma.address.findMany({
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
