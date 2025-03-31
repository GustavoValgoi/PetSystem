import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dtos/create.dto';
import { PetEntity } from '../entities/pet.entity';
import { IQueryPagination } from '../../interfaces/query-pagination.interface';
import { IFindPagination } from '../../interfaces/pagination.interface';
import { UpdatePetDto } from '../dtos/update.dto';

@Injectable()
export class PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, petshopId: string): Promise<PetEntity | null> {
    return this.prisma.pet.findFirst({
      where: { id, AND: [{ petshopId }] },
      include: {
        customer: true,
        breed: true,
      },
    });
  }

  async create(body: CreatePetDto): Promise<PetEntity> {
    return this.prisma.pet.create({
      data: body,
    });
  }

  async update(id: string, body: UpdatePetDto): Promise<PetEntity> {
    return this.prisma.pet.update({
      where: { id },
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

  async delete(id: string, petshopId: string): Promise<PetEntity | null> {
    return this.prisma.pet.delete({
      where: { id, AND: [{ petshopId }] },
    });
  }
}
