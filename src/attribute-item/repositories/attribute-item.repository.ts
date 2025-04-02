import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AttributeItemEntity } from '../entities/attribute-item.entity';
import { CreateUpdateAttributeItemDto } from '../dtos/create-update.dto';

@Injectable()
export class AttributeItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    return this.prisma.attribute_Item.create({
      data: body,
    });
  }

  async update(
    id: string,
    body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemEntity> {
    return this.prisma.attribute_Item.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string, attributeId: string): Promise<AttributeItemEntity> {
    return this.prisma.attribute_Item.delete({
      where: { id, AND: [{ attributeId }] },
    });
  }

  async findById(id: string): Promise<AttributeItemEntity | null> {
    return this.prisma.attribute_Item.findFirst({
      where: { id },
      include: {
        attribute: true,
      },
    });
  }
}
