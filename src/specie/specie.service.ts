import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SpecieRepository } from './repositories/specie.repository';
import { SpecieEntity } from './entities/specie.entity';
import { CreateUpdateSpecieDto } from './dtos/create-update.dto';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { SpecieDto } from './dtos/specie.dto';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';

@Injectable()
export class SpecieService {
  constructor(private readonly specieRepository: SpecieRepository) {}

  async findById(id: string, petshopId: string): Promise<SpecieEntity> {
    const specie = await this.specieRepository.findById(id, petshopId);

    if (!specie) {
      throw new NotFoundException('Espécie não encontrada!');
    }

    return specie;
  }

  async create(body: CreateUpdateSpecieDto): Promise<SpecieEntity> {
    try {
      return this.specieRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar a espécie!',
      );
    }
  }

  async update(id: string, body: CreateUpdateSpecieDto): Promise<SpecieEntity> {
    await this.findById(id, body.petshopId);

    try {
      return this.specieRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar a espécie!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<SpecieEntity> {
    await this.findById(id, petshopId);

    try {
      return this.specieRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException('Houve um problema ao excluir a espécie!');
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<SpecieDto>> {
    const { data, ...rest } = await this.specieRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(i => new SpecieDto(i)) : [],
    };
  }
}
