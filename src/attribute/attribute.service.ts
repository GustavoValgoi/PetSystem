import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeEntity } from './entities/attribute.entity';
import { CreateUpdateAttributeDto } from './dtos/create-update.dto';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { AttributeDto } from './dtos/attribute.dto';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  async findById(id: string, petshopId: string): Promise<AttributeEntity> {
    const attribute = await this.attributeRepository.findById(id, petshopId);

    if (!attribute) {
      throw new NotFoundException('Atributo não encontrado');
    }

    return attribute;
  }

  async create(body: CreateUpdateAttributeDto): Promise<AttributeEntity> {
    try {
      return this.attributeRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar o atributo, verifique as informações enviadas!',
      );
    }
  }

  async update(
    id: string,
    body: CreateUpdateAttributeDto,
  ): Promise<AttributeEntity> {
    await this.findById(id, body.petshopId);

    try {
      return this.attributeRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o atributo, verifique as informações enviadas!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<AttributeEntity> {
    await this.findById(id, petshopId);

    try {
      return this.attributeRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir o atributo, verifique as informações enviadas!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<AttributeDto>> {
    const { data, ...rest } = await this.attributeRepository.findAll(
      petshopId,
      {
        limit: Number(query.limit) || 10,
        page: Number(query.page) || 1,
      },
    );

    return {
      ...rest,
      data: data.length ? data.map(att => new AttributeDto(att)) : [],
    };
  }
}
