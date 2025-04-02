import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttributeItemRepository } from './repositories/attribute-item.repository';
import { AttributeItemEntity } from './entities/attribute-item.entity';
import { CreateUpdateAttributeItemDto } from './dtos/create-update.dto';
import { AttributeRepository } from '../attribute/repositories/attribute.repository';

@Injectable()
export class AttributeItemService {
  constructor(
    private readonly attributeItemRepository: AttributeItemRepository,
    private readonly attributeRepository: AttributeRepository,
  ) {}

  async findById(id: string, petshopId: string): Promise<AttributeItemEntity> {
    const attributeItem = await this.attributeItemRepository.findById(id);

    if (!attributeItem) {
      throw new NotFoundException('Item de atributo não encontrado');
    }

    const att = await this.attributeRepository.findById(
      attributeItem.attributeId,
      petshopId,
    );

    if (!att) {
      throw new NotFoundException('Item de atributo não encontrado');
    }

    return attributeItem;
  }

  async create(
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    try {
      return this.attributeItemRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar o item de atributo, verifique as informações enviadas!',
      );
    }
  }

  async update(
    id: string,
    petshopId: string,
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    await this.findById(id, petshopId);

    try {
      return this.attributeItemRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o item de atributo, verifique as informações enviadas!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<AttributeItemEntity> {
    const att = await this.findById(id, petshopId);

    try {
      return this.attributeItemRepository.delete(id, att.attributeId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir o item de atributo, verifique as informações enviadas!',
      );
    }
  }
}
