import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BreedRepository } from './repositories/breed.repository';
import { BreedEntity } from './entities/breed.entity';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { CreateUpdateBreedDto } from './dtos/create-update.dto';
import { BreedDto } from './dtos/breed.dto';

@Injectable()
export class BreedService {
  constructor(private readonly breedRepository: BreedRepository) {}

  async create(body: CreateUpdateBreedDto): Promise<BreedEntity> {
    try {
      return this.breedRepository.create(body);
    } catch {
      throw new BadRequestException('Houve um problema ao criar a raça!');
    }
  }

  async update(id: string, body: CreateUpdateBreedDto): Promise<BreedEntity> {
    await this.findById(id, body.petshopId);

    try {
      return this.breedRepository.update(id, body);
    } catch {
      throw new BadRequestException('Houve um problema ao criar a raça!');
    }
  }

  async findById(id: string, petshopId: string): Promise<BreedEntity> {
    const breed = await this.breedRepository.findById(id, petshopId);

    if (!breed) {
      throw new NotFoundException('Raça não encontrada');
    }

    return breed;
  }

  async delete(id: string, petshopId: string): Promise<BreedEntity> {
    await this.findById(id, petshopId);

    try {
      return this.breedRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException('Houve um problema ao excluir a raça!');
    }
  }

  async findAll(
    query: IQueryPagination,
    petshopId: string,
  ): Promise<IFindPagination<BreedDto>> {
    const { data, ...rest } = await this.breedRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(b => new BreedDto(b)) : [],
    };
  }
}
