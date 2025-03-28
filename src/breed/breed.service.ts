import { BadRequestException, Injectable } from '@nestjs/common';
import { BreedRepository } from './repositories/breed.repository';
import { BreedEntity } from './entities/breed.entity';
import { CreateBreedDto } from './dtos/create.dto';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { BreedDto } from './dtos/breed.dto';

@Injectable()
export class BreedService {
  constructor(private readonly breedRepository: BreedRepository) {}

  async create(body: CreateBreedDto, petshopId: string): Promise<BreedEntity> {
    try {
      return this.breedRepository.create({ ...body, petshopId });
    } catch {
      throw new BadRequestException('Houve um problema ao criar a raça!');
    }
  }

  async findAll(
    query: IQueryPagination,
    petshopId: string,
  ): Promise<IFindPagination<BreedDto>> {
    const { data, ...rest } = await this.breedRepository.findAll(
      {
        limit: Number(query.limit) || 10,
        page: Number(query.page) || 1,
      },
      petshopId,
    );

    return {
      ...rest,
      data: data.length ? data.map(b => new BreedDto(b)) : [],
    };
  }
}
