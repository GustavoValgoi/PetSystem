import { Injectable } from '@nestjs/common';
import { AttributeItemRepository } from './repositories/attribute-item.repository';

@Injectable()
export class AttributeItemService {
  constructor(
    private readonly attributeItemRepository: AttributeItemRepository,
  ) {}
}
