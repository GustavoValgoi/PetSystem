import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PositionRepository } from './repositories/position.repository';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { PositionDto } from './dtos/position.dto';
import { CreateUpdatePositionDto } from './dtos/create-update.dto';
import { PositionEntity } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  async findById(id: string, petshopId: string): Promise<PositionEntity> {
    const position = await this.positionRepository.findById(id, petshopId);

    if (!position) {
      throw new NotFoundException('Função não encontrada');
    }

    return position;
  }

  async create(body: CreateUpdatePositionDto): Promise<PositionEntity> {
    try {
      return this.positionRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar a função, verifique as informações enviadas!',
      );
    }
  }

  async update(
    id: string,
    body: CreateUpdatePositionDto,
  ): Promise<PositionEntity> {
    await this.findById(id, body.petshopId);

    try {
      return this.positionRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar a função, verifique as informações enviadas!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<PositionEntity> {
    await this.findById(id, petshopId);

    try {
      return this.positionRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir a função, verifique as informações enviadas!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<PositionDto>> {
    const { data, ...rest } = await this.positionRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(p => new PositionDto(p)) : [],
    };
  }
}
