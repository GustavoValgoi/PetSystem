import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PetshopEntity } from '../entities/petshop.entity';
import { CreatePetshopDto } from '../dtos/create.dto';
import { UpdatePetshopDto } from '../dtos/update.dto';

@Injectable()
export class PetshopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePetshopDto): Promise<PetshopEntity> {
    return this.prisma.petshop.create({
      data,
    });
  }

  async update(id: string, data: UpdatePetshopDto): Promise<PetshopEntity> {
    return this.prisma.petshop.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<PetshopEntity | null> {
    return this.prisma.petshop.findFirst({
      where: { id },
    });
  }
}
